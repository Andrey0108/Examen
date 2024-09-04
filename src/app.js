// config
import { Server } from './models/server.js'

// routes
import { createCuentaRouter } from './routes/cuenta.routes.js'

// models
import { CuentaModel } from './models/cuenta.model.js'

const server = new Server()
const cuentaModel = new CuentaModel()

server.app.get('/', (req, res) => {
  res.send('Examen04/09/2024')
})
server.app.use('/cuenta', createCuentaRouter({ cuentaModel }))

server.dbConnection()
server.listen()
