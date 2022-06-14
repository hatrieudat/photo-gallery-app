import React from 'react'
import { Spinner } from 'react-bootstrap'

const RenderSpinner = () => {
    return (
        <div className='py-4'>
            <Spinner animation="border" variant="primary" />
        </div>
    )
}

export default React.memo(RenderSpinner)