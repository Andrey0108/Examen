import { Router } from 'express'
import { CuentaController } from '../controllers/cuenta.controller.js'
// rutas
export const createCuentaRouter = ({ cuentaModel }) => {
  const cuentaRouter = Router()

  const cuentaController = new CuentaController({ cuentaModel })

  cuentaRouter.get('/', cuentaController.get)
  cuentaRouter.post('/', cuentaController.post)
  cuentaRouter.patch('/:numeroCuenta', cuentaController.patch)
  cuentaRouter.delete('/:numeroCuenta', cuentaController.delete)

  return cuentaRouter
}
