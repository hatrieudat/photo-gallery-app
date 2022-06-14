import React from 'react'
import { Image } from 'react-bootstrap'
import NoResultSVG from '../../Assets/no-result.svg'

const NoResultFound = () => {
  return (
    <div className='container-fluid text-center mt-3 py-5 bg-light'>
      <Image className='w-25' src={NoResultSVG} alt='No result found' />
      <h5 className='pt-3 text-uppercase mb-1' style={{ color: '#3f3d56' }}><label>No result found</label></h5>
      <p><label>Try different keywords</label></p>
    </div>
  )
}

export default NoResultFound