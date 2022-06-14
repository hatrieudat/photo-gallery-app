import React, { useEffect, useState } from 'react'
import { actions, useCallAPIsStore, getPhotosAPI } from '../../Stores/CallAPIsStore'
import ListPlaceholder from '../Shared/ListPlaceholder'
import ToastError from '../Shared/ToastError'
import RenderImages from '../Shared/RenderImages'
import RenderSpinner from '../Shared/RenderSpinner'

const Dashboard = () => {
  const [state, dispatch] = useCallAPIsStore()
  const [show, setShow] = useState(true)
  const [visibleBtnScrollTop, setVisibleBtnScrollTop] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const { isLoading, photos, error, page, pages, largeSizePhotos, smallestSizePhotos } = state

  useEffect(() => {
    document.title = "Photo Gallery App"
  }, [])

  useEffect(() => {
    dispatch(actions.pendingAPI())
    const getPhotos = async () => {
      try {
        const res = await getPhotosAPI()
        if (res.stat === 'fail') {
          throw res.message
        }
        dispatch(actions.successAPI(res.photos))
      } catch (e) {
        dispatch(actions.errorAPI(e))
        setShow(true)
      }
    }
    getPhotos()
  }, [dispatch])

  useEffect(() => {
    if (loadMore) {
      const getNextPagePhotos = async () => {
        try {
          const res = await getPhotosAPI(page + 1);
          if (res.stat === 'fail') {
            throw res.message
          }
          dispatch(actions.updatePhotos(res.photos))
        } catch (error) {

        } finally {
          setLoadMore(false)
        }
      }
      getNextPagePhotos()
    }
  }, [dispatch, loadMore, page])

  useEffect(() => {
    const handleScrollToBottom = () => {
      const windowHeight = window.innerHeight ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;

      if (windowBottom > docHeight - 500
        && page <= pages
        && !loadMore
        && photos.length) {
        setLoadMore(true)
      }

      if (html.scrollTop > 300) {
        setVisibleBtnScrollTop(true)
      } else {
        setVisibleBtnScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScrollToBottom)

    return () => {
      window.removeEventListener('scroll', handleScrollToBottom)
    }
  })

  if (isLoading  || error !== null) {
    return (
      <div className='container mx-auto'>
        <ListPlaceholder length={16} />
        {error !== null
          ? <ToastError msg={error} show={show} handleShow={() => setShow(false)} />
          : <></>
        }
      </div>
    )
  }

  return (
    <div className='container mx-auto text-center mt-2'>
      <RenderImages photos={photos} smallestSizePhotos={smallestSizePhotos} largeSizePhotos={largeSizePhotos} visible={visibleBtnScrollTop} />
      {loadMore
        ? <RenderSpinner />
        : <></>
      }
    </div>
  )
}

export default Dashboard