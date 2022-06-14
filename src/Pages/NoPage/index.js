import React, { useEffect } from 'react'
import { Image } from 'react-bootstrap'

import NotFoundSVG from '../../Assets/page-not-found.svg'

const NoPage = () => {

  useEffect(() => {
    document.title = "Page not found"
  }, [])

  return (
    <div className='container-fluid text-center py-5 bg-light'>
      <Image className='w-50' src={NotFoundSVG} alt='Page not found' />
      <h5 className='pt-3 text-uppercase' style={{ color: '#3f3d56' }}><label>Page not found</label></h5>
    </div>
  )
}

export default NoPage