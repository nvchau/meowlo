// Select all input value when click
export const selectAllInlineText = (e) => {
  e.target.focus()
  e.target.select() // select all text in input
}

// onKeydown
export const saveContentAfterPressEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
  }

  // if (e.keyCode === 27) {
  //   e.target.blur()
  // }
}
