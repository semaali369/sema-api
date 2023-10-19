const express = require('express')
const logger = require('./middleware/logger')
const {notFound,errorHandler} = require('./middleware/errors')
require('dotenv').config()
const connectToDB = require('./config/db')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')
//connection to database
connectToDB()
//init app
const app = express()
//static folder
app.use(express.static(path.join(__dirname,'images')))
//apply middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(logger)
//helmet
app.use(helmet())
//cors to apecific the domain
// app.use(cors(
//   {  origin:'http://localhost:3000'}
// ))
app.use(cors())//all domins
app.set('view engine','ejs')
//routes
app.use('/api/books',require('./routes/books'))
app.use('/api/authors',require('./routes/author'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/user',require('./routes/user'))
app.use('/api/upload',require('./routes/upload'))
app.use('/password',require('./routes/password'))
//error handler middleware
app.use(notFound)
app.use(errorHandler)
//runnig the srever
const PORT = process.env.PORT || 3000
app.listen(PORT,()=> console.log(`server is running in ${process.env.NODE_ENV}on port ${PORT}`))