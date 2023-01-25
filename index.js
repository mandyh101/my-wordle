//backend code for this app
const PORT = 8000
const axios = require('axios')

require('dotenv').config()

//import CORS package
const cors = require('cors')

//import express
const express = require('express')
//initialise express to the app
const app = express()

app.use(cors()) //call the cors package to remove cors errors
//set up route
app.get('/word', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: { count: '20', wordLength: '5' },
    headers: {
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
    },
  }

  axios
    .request(options)
    .then((response) => {
      res.json(response.data[0])
    })
    .catch((error) => {
      console.error(error)
    })
})

app.listen(PORT, () => console.log('Server running on port: ' + PORT))
