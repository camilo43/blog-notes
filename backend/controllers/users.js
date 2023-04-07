import bcrypt from 'bcrypt'
import express from 'express'
const usersRouter = express.Router() 
import User from '../models/user.js'

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    // const users = await User.find({}).populate('Note', { content: 1, important: 1 })
    response.json(users)
  })
  
  //Se encontró que en esta parte no es necesario hacer el savedUser. Motivo: Cuando el susuario se salva, no ha escrito notas.

  export default usersRouter