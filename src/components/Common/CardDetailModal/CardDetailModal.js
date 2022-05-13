import React from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
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
        <Modal.Title className="h6 font-weight-bold">
          <i className="fa fa-align-right card-icon"/>{card.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={9}>
            <p className="header"><i className="fa fa-file-image-o card-icon"/>Cover</p>
            {card.cover &&
              <div className="card-detail-cover">
                <ModalImage
                  className="card-cover"
                  small={card.cover}
                  large={card.cover}
                  showRotate={true}
                  alt="card-cover"
                />
                <div className="card-cover-overlay"></div>
              </div>
            }
            <br />

            <p className="header"><i className="fa fa-list card-icon"/>Description</p>
            <div className="card-detail-content">
              <a>This is the content of the card</a>
            </div>
          </Col>
          <Col md={3}>
            <p className="header">Add to card</p>
            <div className="option">
              <a className="option-item"><i className="fa fa-user card-icon"/>Members</a>
              <a className="option-item"><i className="fa fa-tag card-icon"/>Labels</a>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="close-btn" variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
          Cancel
        </Button>
        <Button className="confirm-btn" variant="info" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CardModal