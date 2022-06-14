import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container fluid className="mt-auto py-2 bg-dark border-top text-center text-light fs-6 font-monospace">
      <label >
        |PHOTO GALLERY|
      </label>
    </Container>
  )
}

export default React.memo(Footer)