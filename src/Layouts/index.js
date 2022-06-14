import React from 'react'
import Header from './Header'
import Footer from './Footer'

import './index.scss'

const Layouts = ({ children }) => {
  return (
    <>
        <Header />
        { children }
        <Footer />
    </>
  )
}

export default Layouts