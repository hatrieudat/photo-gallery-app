import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { actions, getPhotosAPI, useCallAPIsStore } from '../../Stores/CallAPIsStore'
import ListPlaceholder from '../Shared/ListPlaceholder'
import RenderImages from '../Shared/RenderImages'
import RenderSpinner from '../Shared/RenderSpinner'
import ToastError from '../Shared/ToastError'
import NoResultFound from './NoResultFound'

const Result = () => {
  const { keySearch } = useParams()
  const [state, dispatch] = useCallAPIsStore()
  const [loadMore, setLoadMore] = useState(false)
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)
  const { photos, isLoading, error, page, pages, largeSizePhotos, smallestSizePhotos } = state

  useEffect(() => {
    document.title = "Photo Gallery App | " + keySearch
  }, [keySearch])

  useEffect(() => {
    dispatch(actions.pendingAPI())
    const getPhotos = async () => {
      try {
        const res = await getPhotosAPI(undefined, keySearch)
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
  }, [keySearch, dispatch])

  useEffect(() => {
    if (loadMore) {
      const getNextPagePhotos = async () => {
        try {
          const res = await getPhotosAPI(page + 1, keySearch);
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
  }, [dispatch, loadMore, page, keySearch])

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
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScrollToBottom)

    return () => {
      window.removeEventListener('scroll', handleScrollToBottom)
    }
  })

  if (isLoading || error !== null) {
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

  if (photos.length === 0 && !isLoading) {
    return (
      <NoResultFound />
    )
  }

  return (
    <div className='container mx-auto text-center mt-2'>
      <RenderImages photos={photos} visible={visible} smallestSizePhotos={smallestSizePhotos} largeSizePhotos={largeSizePhotos} />
      {loadMore
        ? <RenderSpinner />
        : <></>
      }
    </div>
  )
}
export default Result