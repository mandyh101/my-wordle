//SET UP WORD FOR TESTING
const wordle = 'SUPER'
//set up for keyboard
const keyboard = document.querySelector('.key-container')
//SET UP FOR MESSAGE DISPLAY
const messageDisplay = document.querySelector('.message-container')

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
    checkRow()
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
    showMessage("Sorry you can't go back on an empty row!")
  }
}

//checks the row to see if any correct letters have been entered
const checkRow = () => {
  //get the current row and turn the array of letters in this row into a string
  const guessedWord = wordRows[currentRow].join('')

  //if the user is at the last tile, check to see if game is over or if they need to guess again
  if (currentTile > 4) {
    //check the letters in the row
    flipTile()
    //if the guessedWord equals the wordle word, end the game
    if (wordle === guessedWord) {
      showMessage('Nice one – you got the correct word!')
      isGameOver = true
      return
    }
    //if the guess is incorrect and user no more guesses, end the game and share the worlde
    else if (currentRow >= 5) {
      isGameOver = true
      showMessage(
        `Sorry, you have no more guesses! The correct word was ${wordle}`
      )
      return
    }
    //if the user has more guesses left, move to the first tile on the next row
    else if (currentRow < 5) {
      isGameOver = false
      currentRow++
      currentTile = 0
    }
  }
}

//function to display messages on page
const showMessage = (message) => {
  console.log(message)
  const messageElement = document.createElement('p')
  messageElement.textContent = message
  messageDisplay.append(messageElement)
  setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

const flipTile = () => {
  //get all the children element inside the parent row div
  const rowTiles = document.querySelector('#wordRow-' + currentRow).childNodes
  //get the data inside each tile to determine what colours to use
  rowTiles.forEach((tile, index) => {
    const dataLetter = tile.getAttribute('data')

    //set a timer so that each tile has some time to flip over and reveal the colour
    //then increment by the index so that they flip one by one not all at once
    setTimeout(() => {
      //add a class to say that this tile has been flipped
      tile.classList.add('flip')
      //work through colour logic
      if (dataLetter == wordle[index]) {
        tile.classList.add('green')
      } else if (wordle.includes(dataLetter)) {
        tile.classList.add('yellow')
      } else {
        tile.classList.add('grey')
      }
    }, 500 * index)
  })
}
