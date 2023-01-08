import express from 'express'
import cors from 'cors'
import notesRouter from '../backend/controllers/notes.js'
import mongoose from 'mongoose'
import logger from '../backend/utils/logger.js'
import config from '../backend/utils/config.js'

//logger.info(">> Connecting to:", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(()=> logger.info("// Connected to mongoDB"))
  .catch((error)=> logger.error("* Error connecting mongoDB", error.message))

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/notes', notesRouter)

export default app


