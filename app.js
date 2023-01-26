//SET UP WORD FOR TESTING
let wordle = ''

//TODO set up names route so people cant visit this URL to see the word
const getWordle = () => {
  fetch('http://localhost:8000/word')
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      wordle = json.toUpperCase()
    })
    .catch((err) => console.log(err))
}
//TODO add this to a start/try again click handler
//call the function to start the game
getWordle()

//WIP hit API endpoint with guessed word to check it is a real word
const checkWordExists = (word) => {
  fetch('http://localhost:8000/check/')
}

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

//function that adds the colour to the key in the keyboard to show what letters have been
const addColourToKey = (keyLetter, colour) => {
  const key = document.getElementById(keyLetter)
  key.classList.add(colour)
}

//flips the tile to reveal whether each letter was guessed correctly using colours
//green is right letter, right place
//yellow is right letter wrong place
//grey is wrong letter
const flipTile = () => {
  //get all the children element inside the parent row div
  const rowTiles = document.querySelector('#wordRow-' + currentRow).childNodes

  //assign a variable that can be used to check and remove letters from the wordle word based on th eplayer's guesses
  let checkWordle = wordle
  const guessedWord = []

  //push each letter from the entered wordRow into the empty guess array
  rowTiles.forEach((tile) => {
    guessedWord.push({ letter: tile.getAttribute('data'), color: 'grey' })
  })

  //check if the letters in the guessed word are an exact match. Everytime a letter is matched it's removed from the checkWordle variable
  //update the tile colour and replace the matched letter in the checkWordle variable with an empty array
  guessedWord.forEach((guess, index) => {
    if (guess.letter === wordle[index]) {
      guess.color = 'green'
      checkWordle = checkWordle.replace(guess.letter, '')
    }
  })

  //if a guessed letter exists in the wordle but in a different place,
  //update the colour and remove the letter from the checkWordle
  guessedWord.forEach((guess) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = 'yellow'
      checkWordle = checkWordle.replace(guess.letter, '')
    }
  })

  //for each game tile in the row, add the colour class that matches the color of the guess letter at the same index
  //add a class to trigger the css flip animation on each tile as it's checked
  //add the colour class to the keybaord key too
  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add('flip')
      tile.classList.add(guessedWord[index].color)
      addColourToKey(guessedWord[index].letter)
    }, 500 * index)
  })
}
