const express = require('express')
const morgan = require('morgan')
var bodyParser = require('body-parser');
const app = express()


app.set('view engine', 'ejs')

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json({ type: 'application/*+json' }))
//router
app.use(require('./api/notify'))



module.exports = app