import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
const notesRouter = express.Router()
import User from '../models/user.js'
import Note from '../models/note.js'


// const getTokenFrom = request => {
//     const authorization =  request.headers['authorization']
//     console.log(">>>>>AUTHORIZATION", authorization)
//         if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')}
//         return null}

const getTokenFrom = (request, response) => {
    const body = request.body
    
    // token expires in 60*60 seconds, that is, in one hour
    const token = jwt.sign(body, process.env.SECRET, { expiresIn: 60*60 }  )
      response
        .status(200)
        .send({ token})
}

notesRouter.post('/', async (request, response) => {
    console.log("ENTRA NOTES ROUTER ====== POST")
  const body = request.body
  getTokenFrom(request, response)
  console.log("BODY", body)
//   const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
//     if (!decodedToken.id) {
//         return response.status(401).json({ error: 'token invalid' })
    // }
// const user = await User.findById({id:body.id})
// const note = new Note({
//     content: body.content,
//     important: body.important === undefined ? false : body.important,
//     user: user._id
//   })

// const savedNote = await note.save()
//   user.notes = user.notes.concat(savedNote._id)
//   await user.save()

//   response.json(savedNote)
})

export default notesRouter