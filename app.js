//SET UP WORD FOR TESTING
const wordle = 'SUPER'
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

//foreach key in the array, create a button tag
keys.forEach((key) => {
  const buttonElement = document.createElement('button')
  //with each button created, give it the text content of the key
  buttonElement.textContent = key
  //set the key of each button element as it's id
  buttonElement.setAttribute('id', key)
  //add an event listener to each button element
  buttonElement.addEventListener('click', () => handleClick(key))
  //append buttonElement to the keyboard
  keyboard.append(buttonElement)
})

//SET UP FOR THE GAME TILES

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

//SET UP GAME LOGIC AND FUNCTIONS

let currentRow = 0
let currentTile = 0

//handles the click event on a key in the keyboard by calling the addLetter function on a click event
const handleClick = (key) => {
  if (key === '<<') {
    deleteLetter()
    console.log('row', wordRows)
    return
  }
  if (key === 'Enter') {
    console.log('Check the word in the row')
    console.log('row', wordRows)
    return
  }
  addLetter(key)
}

//function that takes the value of the key board key that is passed and adds that value as html content on the letter tile
const addLetter = (key) => {
  if (currentTile < 5 && currentRow < 6) {
    const letter = document.getElementById(
      'wordRow-' + currentRow + '-tile-' + currentTile
    )

    //render the key value inside the letter element
    letter.textContent = key

    wordRows[currentRow][currentTile] = key

    //set data atrribute to be used when colouring letters
    letter.setAttribute('data', key)

    //increment the tile number to move to the next tile in the row
    currentTile++
    console.log('row', wordRows)
  }
}
//removes the most recently input letter letter
//TODO allow the user to move through letters to delete any letter in the row
const deleteLetter = () => {
  if (currentTile > 0) {
    //go back to the previous tile
    currentTile--
    //get the letter by id
    const letter = document.getElementById(
      'wordRow-' + currentRow + '-tile-' + currentTile
    )
    //clear the letter value displayed in the tile and within the wordRow html
    letter.textContent = ''
    wordRows[currentRow][currentTile] = ''
    letter.setAttribute('data', '')
  } else {
    //TODO turn this alert into a message on the screen
    alert("Sorry you can't go back on an empty row!")
  }
}
