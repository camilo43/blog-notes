import express from 'express'
import cors from 'cors'
import notesRouter from './controllers/notesRouter.js'
import usersRouter from '../backend/controllers/users.js'
import loginRouter from './controllers/login.js'
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Authorization')
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
})
  
app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

// app.use('/api/login', loginRouter)

export default app

