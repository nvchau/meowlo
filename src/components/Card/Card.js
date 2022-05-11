import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import './Card.scss'
import CardDetailModal from 'components/Common/CardDetailModal/CardDetailModal'

function Task(props) {
  const { card } = props

  const [showCardDetailModal, setShowCardDetailModal] = useState(false)
  const toggleShowCardDetailModal = () => setShowCardDetailModal(!showCardDetailModal)

  const onCardDetailModalAction = () => {
    console.log('Do some thing')
    toggleShowCardDetailModal()
  }

  return (
    <>
      <div className="card-item">
        <i className="fa fa-pencil-square-o icon edit-card" onClick={() => {console.log('oke')}}></i>

        <div onClick={toggleShowCardDetailModal}>
          {card.cover &&
            <img
              src={card.cover}
              className="card-cover"
              alt="card-cover"
              draggable="false"
            />
          }

          {card.title}
        </div>
      </div>

      {/* <Form.Control
        className="textarea-enter-new-column"
        side="sm"
        as="textarea"
        rows="3"
        placeholder='Enter a title for this card...'
        // ref={newCardTextAreaRef}
        value={card.title}
        // onChange={onNewCardTitleChange}
        // onKeyDown={(e) => (e.key === 'Enter') && addNewCard()}
      /> */}

      <CardDetailModal
        show={showCardDetailModal}
        card={card}
        onAction={onCardDetailModalAction}
      />
    </>
  )
}

export default Task
