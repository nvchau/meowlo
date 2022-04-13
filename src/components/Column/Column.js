import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown } from 'react-bootstrap'

import './Column.scss'
import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/sorts'

function Column(props) {
  const { column, onCardDrop } = props
  const cards = mapOrder({ array: column.cards, order: column.cardOrder, key: 'id' })

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          {column.title}
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Item>Add card</Dropdown.Item>
              <Dropdown.Item>Remove column</Dropdown.Item>
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
          onDrop={dropResult => onCardDrop({ columnId: column.id, dropResult })}
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
      </div>
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon"></i> Add another card
        </div>
      </footer>
    </div>
  )
}

export default Column
