import React, { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { isEmpty } from 'lodash'

import './BoardContent.scss'

import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'

import { initialData } from 'actions/initialData'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState({})

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === 'board-1'
    )
    if (boardFromDB) {
      setBoard(boardFromDB)

      // sort columns by columnOrder (order of columns)
      setColumns(
        mapOrder({
          array: boardFromDB.columns,
          order: boardFromDB.columnOrder,
          key: 'id'
        })
      )
    }
  }, [])

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
    newBoard.columnOrder = newColumns.map(column => column.id)
    // update columns of board
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = ({ columnId, dropResult }) => {
    // which column has removedIndex and addedIndex other than null (ie interactive) will run logic
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]

      let currentColumn = newColumns.find(column => column.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(card => card.id)

      setColumns(newColumns)
      // console.log({newColumns})
    }
  }

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle" // can only drag header tag with className="column-drag-handle" (on the side of Column.js component)
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <div className="add-new-column">
        <i className="fa fa-plus icon"></i> Add another column
      </div>
    </div>
  )
}

export default BoardContent
