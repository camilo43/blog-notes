import express from 'express'
const loginRouter = express.Router();
import Login from '../models/login.js'
import bcrypt from 'bcrypt'
import expressAsyncHandler from 'express-async-handler'
import jsonwebtoken from 'jsonwebtoken'

loginRouter.get('/', async(request, response)=>{
    response.send("TEXTO")
})

loginRouter.post('/', async (request, response) => {
    const body = request.body 
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const login = new Login({
        username: body.username,
        name: body.name,
        password: passwordHash
      })   
      
      try{
        const savedLogin = await login.save()
        // user.notes = user.notes.concat(savedNote._id)
      response.json(savedLogin) 
      }catch(error){
        response.status(500).send({ message: "Lo sentimos, en este momento no podemos completar su transacción" });        
      }
      
      
  });

  export default loginRouter