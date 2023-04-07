import express from 'express'
const notesRouter = express.Router();
import expressAsyncHandler from 'express-async-handler'
import Note from '../models/note.js'
import User from '../models/user.js';
import jsonwebtoken from 'jsonwebtoken'

const jwt = jsonwebtoken

const generateId = () => { 
  const maxId = Note.length > 0    
  return maxId+1
}

//>>> THIS FUNCTION CREATES THE RANDOM NUMBER THAT WILL DEFINE WHETHER THE NOTE IS IMPORTANT OR NOT
const importanceBoolean = () => {
if(Math.round(Math.random()*10) > 5){
    return true
  }else{
    return false
  }
}

//>>>THIS FUNCTION IS USED TO VALIDATE ID THE HEADER CONTAINS THE 'AUTHORIZATION CODE'
const getTokenFrom = request => {
  // request.headers.authorization = 'Bearer ' + process.env.SECRET;
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const createToken = information => {
  const token = jwt.sign(information, process.env.SECRET)
  return token
}

notesRouter.get('/', expressAsyncHandler(async(request, response) => {
  response.setHeader('authorization', process.env.SECRET)
  //>>> THIS WORKS WHEN WE ARE NOT USING USERS
    // const responseNote = await Note.find({})
    // response.json(responseNote)

  //>>> THIS WORKS WHEN WE HAVE USERS
      const responseServer = await Note.find({})
      // const responseServer = await Note.find({}).populate('Users')
      // const userPopulate = await User.find({}).populate('notes')
      response.json(responseServer)
      // response.json(userPopulate)
    })) 

notesRouter.get('/user', authenticateToken, expressAsyncHandler(async(request, response) => {
  response.setHeader('authorization', process.env.SECRET)
  //>>> THIS WORKS WHEN WE HAVE USERS
      const responseServer = await Note.find({})
      // const userPopulate = await User.find({}).populate('notes')
      response.json(responseServer)
      // response.json(userPopulate)
    })) 

    function authenticateToken(req, res, next) {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
    
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: missing token' });
      }
    
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: 'Forbidden: invalid token' });
        }
        req.user = decoded.username;
        next();
      });
    }

notesRouter.post('/', expressAsyncHandler(async(request, response) => { 
  response.setHeader('authorization', process.env.SECRET)
  const body = request.body 
  // const token = jwt.sign(body, process.env.SECRET)

  // if(body.content==="test3"){
  //   response.json({token})
  // }

  // const decodedToken = jwt.verify(token, process.env.SECRET)
  // if(!decodedToken.id){
  //   response.status(401).json({ error: 'token invalid' })
  // }

  //const user = await User.findById(body.id)

  let note = new Note({
    content: body.content,
    important: body.important === undefined ? false : importanceBoolean(),
    date: new Date()
    //userId: user._id
  })

  const savedNote = await note.save()
  // user.notes = user.notes.concat(savedNote._id)
  response.json(savedNote)  
  }))

notesRouter.put('/:id' , expressAsyncHandler(async(request, response)=>{   
  const id = request.params.id
  const body = request.body.important
  const responseServer = await Note.findByIdAndUpdate(request.params.id,request.body, {new:true})  
  return response.json(responseServer)
  
})) 

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
 
notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})
  
export default notesRouter 
