import app from './app.js' // la aplicación Express real
import http from 'http'
import cors from 'cors'
import config from './utils/config.js'
import logger from './utils/logger.js'

app.use(cors())

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`SERVER running on port ${config.PORT}`)
})