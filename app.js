//set up for keyboard
const keyboard = document.querySelector('.key-container')

const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Enter',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '<<',
]

//handles the click event on a key in the keyboard
const handleClick = () => {
  console.log('click')
}

//foreach key in the array, create a button tag
keys.forEach((key) => {
  const buttonElement = document.createElement('button')
  //with each button created, give it the text content of the key
  buttonElement.textContent = key
  //set the key of each button element as it's id
  buttonElement.setAttribute('id', key)
  //add an event listener to each button element
  buttonElement.addEventListener('click', handleClick)
  //append buttonElement to the keyboard
  keyboard.append(buttonElement)
})

//set up for the game tiles

//create a variable for each tile using a html class selector
const tileDisplay = document.querySelector('.tile-container')

//set up an array of 5 empty strings to represent each row on the gamebaord where the user will input a word as their guess
const wordRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
]

//loop through the wordRows, getting each guessrow and its index
wordRows.forEach((wordRow, wordRowIndex) => {
  //create a div to conatin each row
  const rowElement = document.createElement('div')
  //give each wordRow an did based on its index in the array
  rowElement.setAttribute('id', 'wordRow-' + wordRowIndex)

  //now put five tiles inside each of wordRow
  wordRow.forEach((letter, letterIndex) => {
    //create a div to contain each letter tile in a word row
    const letterElement = document.createElement('div')
    //set the id for each letter tile
    letterElement.setAttribute(
      'id',
      'wordRow-' + wordRowIndex + '-tile-' + letterIndex
    )
    letterElement.classList.add('tile')
    rowElement.append(letterElement)
  })

  //append each rowElement to the tileDisplay container
  tileDisplay.append(rowElement)
})
