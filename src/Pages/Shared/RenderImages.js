import clsx from 'clsx'
import React, { useCallback, useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import Masonry from 'react-masonry-css'
import ModalDownloadAndLiveImg from './ModalDownloadAndLiveImg'

import styles from './shared.module.scss'

const RenderImages = ({ photos, visible, largeSizePhotos, smallestSizePhotos }) => {
    const [show, setShow] = useState(false)
    const [imgURL, setImgURL] = useState('')
    const [placeHolderImgURL, setPlaceholderImgURL] = useState('')

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleZoomIn = useCallback((index) => {
        setShow(true);
        setImgURL(largeSizePhotos[index])
        setPlaceholderImgURL(smallestSizePhotos[index])
    }, [largeSizePhotos, smallestSizePhotos])

    return (
        <>
            <Masonry
                breakpointCols={{
                    default: 4,
                    1100: 3,
                    700: 2,
                    500: 1
                }}
                className={clsx(styles.myMasonryGrid, 'my-5')}
                columnClassName={clsx(styles.myMasonryGridColumn)}
            >
                {photos.map((item, idx) => (
                    <Image 
                        className={clsx('w-100', styles.animated)} 
                        src={item} 
                        key={idx} 
                        onClick={() => handleZoomIn(idx)}
                        alt='' 
                        fluid
                    />
                ))}
            </Masonry>
            <ModalDownloadAndLiveImg 
                show={show} 
                imgURL={imgURL} 
                placeholderImgURL={placeHolderImgURL}
                handleClose={() => setShow(false)} />
            <Button 
                className={clsx(styles.btnScrollTop, 'shadow')} 
                variant="primary" 
                size='lg'
                onClick={scrollToTop}
                style={{
                    visibility: visible ? 'visible' : 'hidden'
                }}
            >
                <i className="bi bi-caret-up-fill"></i>
            </Button>
        </>
    )
}

export default React.memo(RenderImages)