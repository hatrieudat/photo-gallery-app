import clsx from 'clsx'
import React from 'react'
import { Toast } from 'react-bootstrap'

import styles from './shared.module.scss'

const ToastError = ({ msg, show, handleShow }) => {
  return (
    <Toast
      className={clsx(styles.toastContainter, 'border-danger')}
      onClose={handleShow}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Header closeVariant='white' className="bg-danger text-white">
        <i className="bi bi-exclamation-triangle"></i>
        <strong className="me-auto px-2">Error</strong>
      </Toast.Header>
      <Toast.Body>
        {msg}
      </Toast.Body>
    </Toast>
  )
}

export default ToastError