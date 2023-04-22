import * as dotenv from 'dotenv' 
dotenv.config()
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

//const notesRouter = express.Router();

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  name:{
    type:String,
    required: true
  },
  password: {
    type: String,
    minlength:3
  }
}, {collection:'users'})

loginSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

loginSchema.plugin(uniqueValidator)

loginSchema.post('validate', function(error, doc, next) {
  console.log(error) // Add this line to log the error
  next(error)
})

const Login = new mongoose.model('Login', loginSchema)
export default Login
