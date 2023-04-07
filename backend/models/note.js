import * as dotenv from 'dotenv' 
dotenv.config()
import mongoose from 'mongoose'
import express from 'express'
const notesRouter = express.Router();

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  date: Date,
  important: Boolean,
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
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