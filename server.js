const routes = require('./routes') //TODO check if should use ES format: import routes from './routes'
const express = require('express') //TODO check if should use ES format: import express from 'express'
const server = express() //initialise express to the server

// Server configuration
// server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))
server.use('/', routes)

module.exports = server
