import React, { useState, useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import './Card.scss'
import CardDetailModal from 'components/Common/CardDetailModal/CardDetailModal'
import { saveContentAfterPressEnter } from 'utilities/contentEditable'
import { isEmpty, cloneDeep } from 'lodash'
import { updateCard } from 'actions/ApiCall'

function Task(props) {
  const { card } = props

  const [cardTitle, setCardTitle] = useState('')
  const handleCardTitleChange = (e) => setCardTitle(e.target.value)

  const [showCardDetailModal, setShowCardDetailModal] = useState(false)
  const toggleShowCardDetailModal = () => setShowCardDetailModal(!showCardDetailModal)

  const [showCardTitleEditor, setShowCardTitleEditor] = useState(false)
  const toggleShowCardTitleEditor = () => setShowCardTitleEditor(!showCardTitleEditor)

  const cardTitleChangeInputRef = useRef(null)

  useEffect(() => {
    setCardTitle(card.title)
  }, [card.title])

  useEffect(() => {
    if (cardTitleChangeInputRef && cardTitleChangeInputRef.current) {
      cardTitleChangeInputRef.current.focus()
      cardTitleChangeInputRef.current.select()
    }
  }, [showCardTitleEditor])

  const handleCardTitleBlur = () => {
    // Check if cardTitle is empty or only spaces
    if (isEmpty(cardTitle) || !cardTitle.replace(/\s/g, '').length) {
      setCardTitle(card.title)
      toggleShowCardTitleEditor()
      return false
    }

    // If cardTitle changes => call API
    if (cardTitle !== card.title) {
      let cardDataUpdate = cloneDeep(card)
      cardDataUpdate.title = cardTitle
      // Call API update card | If error, set cardTitle back to card.title
      updateCard(card._id, cardDataUpdate).then(() => {
        card.title = cardTitle
      }).catch(() => setCardTitle(card.title))
    }
    toggleShowCardTitleEditor()
  }

  const onCardDetailModalAction = () => {
    // console.log('Do some thing')
    toggleShowCardDetailModal()
  }

  return (
    <>
      <div className="card-item">
        <i className="fa fa-pencil-square-o icon edit-card-title-button" onClick={toggleShowCardTitleEditor}></i>

        <div onClick={toggleShowCardDetailModal}>
          {card.cover &&
            <img
              src={card.cover}
              className="card-cover"
              alt="card-cover"
              draggable="false"
            />
          }

          {showCardTitleEditor ? (
            <>
              <Form.Control
                className="textarea-edit-card-title"
                side="sm"
                type="text"
                as="textarea"
                rows={3}
                value={cardTitle}
                ref={cardTitleChangeInputRef}
                onChange={handleCardTitleChange}
                onBlur={handleCardTitleBlur}
                onKeyDown={saveContentAfterPressEnter}
                spellCheck="false"
              />
            </>
          ) : (
            <span>
              {cardTitle}
            </span>
          )}
        </div>
      </div>

      <CardDetailModal
        show={showCardDetailModal}
        card={card}
        onAction={onCardDetailModalAction}
      />
    </>
  )
}

export default Task
