import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'

import './Column.scss'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import { mapOrder } from 'utilities/sorts'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { selectAllInlineText, saveContentAfterPressEnter } from 'utilities/contentEditable'
import { createNewCard, updateColumn } from 'actions/ApiCall'

function Column(props) {
  const { column, onCardDrop, onUpdateColumnSate } = props
  const cards = mapOrder({ array: column.cards, order: column.cardOrder, key: '_id' })

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = (e) => setColumnTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const newCardTextAreaRef = useRef(null)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect(() => {
    if (newCardTextAreaRef && newCardTextAreaRef.current) {
      newCardTextAreaRef.current.focus()
      newCardTextAreaRef.current.select()
    }
  }, [openNewCardForm])

  // Remove column
  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true
      }

      // Call API update column
      updateColumn(newColumn._id, newColumn).then(updatedColumn => {
        onUpdateColumnSate({ newColumnToUpdate: updatedColumn })
      })
    }
    toggleShowConfirmModal()
  }

  // Update column title
  const handleColumnTitleBlur = () => {
    // If columnTitle changes => call API
    if (columnTitle !== column.title) {
      const newColumn = {
        ...column,
        title: columnTitle
      }

      // Call API update column
      updateColumn(newColumn._id, newColumn).then(updatedColumn => {
        updatedColumn.cards = newColumn.cards
        onUpdateColumnSate({ newColumnToUpdate: updatedColumn })
      })
    }
  }

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextAreaRef.current.focus() // if newCardTitle null -> focus the input
      return
    }

    const newCardToAdd = {
      boardId: column.boardId,
      columnId: column._id,
      title: newCardTitle.trim() // trim to remove leading and trailing spaces
    }

    // Call API
    createNewCard(newCardToAdd).then(createdCard => {
      let newColumn = cloneDeep(column)
      // let newColumn = JSON.stringify(column) // or use this one
      // newColumn = JSON.parse(newColumn)
      newColumn.cards.push(createdCard)
      newColumn.cardOrder.push(createdCard._id)

      //used in common with the function onUpdateColumnSate
      onUpdateColumnSate({ newColumnToUpdate: newColumn })
      setNewCardTitle('')
      toggleOpenNewCardForm()
    })
  }

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            className="meowlo-content-editable"
            side='sm'
            type='text'
            value={columnTitle}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onClick={selectAllInlineText}
            onMouseDown={e => e.preventDefault()} // When dragging and dropping, there is no error focusing on the input title of the column
            spellCheck="false"
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenNewCardForm}>Add card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column</Dropdown.Item>
              <Dropdown.Item>Move all cards in this column (bate)...</Dropdown.Item>
              <Dropdown.Item>Archive all cards in this column (bate)...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          orientation="vertical" // default
          groupName="meowlo-columns"
          onDrop={dropResult => onCardDrop({ columnId: column._id, dropResult })}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {openNewCardForm &&
          <div className="add-new-card-area">
            <Form.Control
              className="textarea-enter-new-column"
              side="sm"
              as="textarea"
              rows="3"
              placeholder='Enter a title for this card...'
              ref={newCardTextAreaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={(e) => (e.key === 'Enter') && addNewCard()}
            />
            <Button variant="success" size="sm" onClick={addNewCard}>Add card</Button>
            <span className="cancel-icon" onClick={toggleOpenNewCardForm}>
              <i className="fa fa-trash icon"></i>
            </span>
          </div>
        }
      </div>
      <footer>
        {!openNewCardForm &&
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <i className="fa fa-plus icon"></i> Add another card
          </div>
        }
      </footer>

      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title={'Remove column'}
        content={`Are you sure you want to remove <strong>${column.title}</strong>. <br /> All related cards will also be removed!`}
      />
    </div>
  )
}

export default Column
