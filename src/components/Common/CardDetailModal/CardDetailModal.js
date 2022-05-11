import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'
import ModalImage from 'react-modal-image'

import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants'

import './CardDetailModal.scss'

function CardModal(props) {
  const { show, card, onAction } = props

  return (
    <Modal
      show={show}
      onHide={() => onAction(MODAL_ACTION_CLOSE)}
      backdrop={'static'}
      keyboard={false}
      className="card-detail-modal"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5">{HTMLReactParser(card.title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card-detail-cover">
          {card.cover &&
            <>
              <ModalImage
                className="card-cover"
                small={card.cover}
                large={card.cover}
                showRotate={true}
                alt="card-cover"
              />

              <div className="card-cover-overlay"></div>
            </>
          }
        </div>
        <div className="card-detail-content">
          <a>This is the content of the card</a>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="close-btn" variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
          Cancel
        </Button>
        <Button className="confirm-btn" variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CardModal