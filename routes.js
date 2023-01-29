const express = require('express')
const router = express.Router()
const axios = require('axios')
require('dotenv').config()
const cors = require('cors') //import CORS package
router.use(cors()) //call the cors package to remove cors errors

//route to GET a word
router.get('/word', (req, res) => {
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

//route to check a word is legit
router.get('/check', (req, res) => {
  //get the params
  const word = req.query.word
  const options = {
    method: 'GET',
    url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
    params: { entry: word },
    headers: {
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
    },
  }

  axios
    .request(options)
    .then((response) => {
      console.log(response.data)
      res.json(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
})

module.exports = router
