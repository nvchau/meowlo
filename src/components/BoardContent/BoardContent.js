import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'
import { isEmpty } from 'lodash'

import './BoardContent.scss'

import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import { fetchBoardDetails, createNewColumn } from 'actions/ApiCall'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  // use ref for input focus
  const newColumnInputRef = useRef(null)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

  useEffect(() => {
    const boardId = '626122b32f8eb1c4b8251553'
    fetchBoardDetails(boardId).then(board => {
      setBoard(board)

      // sort columns by columnOrder (order of columns)
      setColumns(
        mapOrder({
          array: board.columns,
          order: board.columnOrder,
          key: '_id'
        })
      )
    })
  }, [])

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumnForm]) // if openNewColumnForm change -> focus the input

  if (isEmpty(board)) {
    return (
      <div className="not-found" style={{ padding: '10px', color: 'white' }}>
        Board not found
      </div>
    )
  }

  const onColumnDrop = (dropResult) => {
    // colone columns
    let newColumns = [...columns]
    // update columns with applyDrag function of react-smooth-dnd library
    newColumns = applyDrag(newColumns, dropResult)

    // colone board
    let newBoard = { ...board }
    // update columnOrder of board
    newBoard.columnOrder = newColumns.map((column) => column._id)
    // update columns of board
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = ({ columnId, dropResult }) => {
    // which column has removedIndex and addedIndex other than null (ie interactive) will run logic
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]

      let currentColumn = newColumns.find((column) => column._id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map((card) => card._id)

      setColumns(newColumns)
      // console.log({newColumns})
    }
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus() // if newColumnTitle null -> focus the input
      return
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim() // trim to remove leading and trailing spaces
    }

    // Call API
    createNewColumn(newColumnToAdd).then(createdColumn => {
      let newColumns = [...columns]
      newColumns.push(createdColumn)

      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map((column) => column._id)
      newBoard.columns = newColumns

      setColumns(newColumns)
      setBoard(newBoard)

      setNewColumnTitle('')
      toggleOpenNewColumnForm()
    })
  }

  const onUpdateColumnSate = ({ newColumnToUpdate }) => {
    const columnIdToUpdate = newColumnToUpdate._id

    let newColumns = [...columns]

    const columnIndexToUpdate = newColumns.findIndex(item => item._id === columnIdToUpdate)

    if (newColumnToUpdate._destroy) {
      // remove column
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      // update column info (ex: add new card)
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map((column) => column._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  return (
    <div className="board-content">
      <Container
        orientation='horizontal'
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector='.column-drag-handle' // can only drag header tag with className="column-drag-handle' (on the side of Column.js component)
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumnSate={onUpdateColumnSate}
            />
          </Draggable>
        ))}
      </Container>

      <BootstrapContainer className="meowlo-container">
        {!openNewColumnForm &&
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon"></i> Add another column
            </Col>
          </Row>
        }

        {openNewColumnForm &&
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                className="input-enter-new-column"
                side='sm'
                type='text'
                placeholder='Enter column title...'
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(e) => (e.key === 'Enter') && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>Add column</Button>
              <span className="cancel-icon" onClick={toggleOpenNewColumnForm}>
                <i className="fa fa-trash icon"></i>
              </span>
            </Col>
          </Row>
        }
      </BootstrapContainer>
    </div>
  )
}

export default BoardContent
