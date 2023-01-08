import express from 'express'
const notesRouter = express.Router();
import expressAsyncHandler from 'express-async-handler'
import Note from '../models/note.js'

const app = express()
// app.use(cors())

notesRouter.get('/', expressAsyncHandler(async(request, response) => {
      const responseServer = await Note.find({})
      return response.json(responseServer)
    })) 

const generateId = () => { 
    const maxId = Note.length > 0    
  return maxId+1
  }
    
const importanceBoolean = () => {
  if(Math.round(Math.random()*10) > 5){
    return true
  }else{
    return false
  }
}

notesRouter.post('/', expressAsyncHandler(async(request, response) => {  
  const body = request.body
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })} else {
      const note = {
        content: body.content,
        important: importanceBoolean() || false,
        id: generateId()}
      
        const responseServer = Note.create(note)
        return response.json(responseServer)
    }
  }
))

notesRouter.put('/:id' , expressAsyncHandler(async(request, response)=>{   
  const id = request.params.id
  const body = request.body.important
  const responseServer = await Note.findByIdAndUpdate(id,{important:body}, {new:true})
  return response.json(responseServer)
})) 

// notesRouter.get('/:id', (request, response) => {
//   const id = Number(request.params.id)
//   Note.findById(id).then(note =>{
//     console.log("NOTE GET ID", note)
//     if (note) {
//       response.json(note)
//     } else {
//       response.status(404).end()
//     }
// })
// })  
  

// notesRouter.delete('/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const note = Note.filter(note => note.id !== id)
//   if (note) {
//       response.json(note)
//     } else {
//   response.status(202).end() 
//     }
// })
 

  
export default notesRouter 

app.listen(3003, () => {
  console.log(`Server running on port 3003`)
})
 