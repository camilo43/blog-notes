import express from 'express'
import cors from 'cors'
import notesRouter from '../backend/controllers/notes.js'
import usersRouter from '../backend/controllers/users.js'
import loginRouter from './controllers/loginC.js'
import mongoose from 'mongoose'
import logger from '../backend/utils/logger.js'
import config from '../backend/utils/config.js'
mongoose.set('strictQuery', false)
//logger.info(">> Connecting to:", config.MONGODB_URI)


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(config.MONGODB_URI)
  .then(()=> logger.info("// Connected to mongoDB"))
  .catch((error)=> logger.error("* Error connecting mongoDB", error.message))

app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
// app.use('/api/login', loginRouter)

export default app


