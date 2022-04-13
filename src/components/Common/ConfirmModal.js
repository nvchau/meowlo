import React from 'react'
import { Modal } from 'react-bootstrap'

function ConfirmModal(props) {
  const { title, content, show, onAction } = props

  return (
    <Modal 
      show={show}
      onHide={() => onAction}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Delete
        </Button>
      </Modal.Footer>
      {/* https://www.youtube.com/watch?v=QV8PrXAi6os&list=PLP6tw4Zpj-RKdGMqhYpfdl94cd4fu-RFg&index=9
      25:38 */}
    </Modal>
  )
}

export default ConfirmModal