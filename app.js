//create a variable for each tile using a html class selector
const tileDisplay = document.querySelector('.tile-container')

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
  //append buttonElement to the keyboard
  keyboard.append(buttonElement)
})
