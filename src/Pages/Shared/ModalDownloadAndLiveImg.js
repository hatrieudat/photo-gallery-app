import React, { useEffect, useState } from 'react'
import { Button, CloseButton, Image as ImageComponent, Modal, Spinner } from 'react-bootstrap'

const ModalDownloadAndLiveImg = ({ show, handleClose, imgURL, placeholderImgURL }) => {

    const [isDownloading, setIsDownloading] = useState(false)
    const [isLoadingImg, setIsLoadingImg] = useState(true)
    const [currentSrc, setCurrentSrc] = useState(placeholderImgURL)

    const handleDownload = async () => {
        setIsDownloading(true)

        const image = await fetch(imgURL)
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)

        const link = document.createElement('a')
        link.href = imageURL
        link.download = window.btoa(Date.now()) // File name
        document.body.appendChild(link)
        link.click()

        // Remove after download image
        document.body.removeChild(link)
        URL.revokeObjectURL(imageURL);

        setIsDownloading(false)
    }
   
    useEffect(() => {
        const imgToLoad = new Image()
        imgToLoad.src = imgURL
        imgToLoad.onload = () => {
            setCurrentSrc(imgURL)
            setIsLoadingImg(false)
        }

        return () => {
            setIsLoadingImg(true)
        }
    }, [imgURL])

    return (
        <Modal
            show={show}
            size='xl'
            onHide={handleClose}
            centered
        >
            <ImageComponent
                className='rounded position-relative'
                src={currentSrc === imgURL ? currentSrc : placeholderImgURL}
                style={{
                    filter: isLoadingImg ? 'blur(8px)' : 'none',
                    transition: 'filter .5s linear'
                }}
                alt=''
                fluid
            />
            <Button
                variant="primary position-absolute shadow"
                style={{
                    top: '10px',
                    left: '10px'
                }}
                size='lg'
                disabled={isDownloading}
                onClick={!isDownloading ? handleDownload : null}
            >
                {isDownloading
                    ?
                    <>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"    
                            className='align-baseline'                        
                        /> 
                        <span className='ms-1'>Downloading...</span>
                    </>
                    :
                    <>
                        <i className="bi bi-download pe-2"></i>
                        Download
                    </>
                }
            </Button>
            <CloseButton
                className='position-absolute bg-danger shadow p-2'
                style={{
                    top: '10px',
                    right: '10px'
                }}
                onClick={handleClose}
            />
        </Modal>
    )
}

export default React.memo(ModalDownloadAndLiveImg)