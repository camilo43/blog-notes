import * as dotenv from 'dotenv' 
dotenv.config()
import mongoose from 'mongoose'
import express from 'express'
const notesRouter = express.Router();

const app = express()

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {console.log('connected to MongoDB')})  
  .catch((error) => {console.log('error connecting to MongoDB:', error.message)})

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = new mongoose.model('Note', noteSchema)
export default Note

// app.listen(3004, () => {
//   console.log(`Server running on port 3004`)
// })