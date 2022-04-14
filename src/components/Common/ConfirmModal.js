import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'

import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants'

import './ConfirmModal.scss'

function ConfirmModal(props) {
  const { title, content, show, onAction } = props

  return (
    <Modal 
      show={show}
      onHide={() => onAction(MODAL_ACTION_CLOSE)}
      backdrop={'static'}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5">{HTMLReactParser(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
      <Modal.Footer>
        <Button className="close-btn" variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
          Close
        </Button>
        <Button className="confirm-btn" variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal