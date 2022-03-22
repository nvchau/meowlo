import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

import './BoardContent.scss'

import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'

import { initialData } from 'actions/initialData'

function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState({})

    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
        if (boardFromDB) {
            setBoard(boardFromDB)

            // sort columns by columnOrder (order of columns)
            setColumns(mapOrder({ array: boardFromDB.columns, order: boardFromDB.columnOrder, key: 'id' }))
        }
    }, [])

    if (isEmpty(board)) {
        return <div className="not-found" style={{ 'padding': '10px', 'color': 'white' }}>Board not found</div>
    }

    return (
        <div className="board-content">
            {columns.map((column, index) => (
                <Column key={index} column={column} />
            ))}
        </div>
    )
}

export default BoardContent
