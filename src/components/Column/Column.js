import React from 'react'
import './Column.scss'

import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/sorts'

function Column(props) {
    const { column } = props
    const cards = mapOrder({ array: column.cards, order: column.cardOrder, key: 'id' })

    return (
        <div className="column">
            <header>{column.title}</header>
            <ul className="card-list">
                {cards.map((card, index) => (
                    <Card key={index} card={card} />
                ))}
            </ul>
            <footer>Add another card</footer>
        </div>
    )
}

export default Column
