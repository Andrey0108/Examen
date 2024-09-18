import { Router } from 'express'
import { CuentaController } from '../controllers/cuenta.controller.js'
export const createCuentaRouter = ({ cuentaModel }) => {
  const cuentaRouter = Router()

  const cuentaController = new CuentaController({ cuentaModel })

  cuentaRouter.get('/', cuentaController.get)
  cuentaRouter.get('/getbysucursal/:sucursal', cuentaController.getBySucursal)
  cuentaRouter.get('/:numeroCuenta', cuentaController.getById)
  cuentaRouter.post('/', cuentaController.post)
  cuentaRouter.patch('/:numeroCuenta', cuentaController.patch)
  cuentaRouter.delete('/:numeroCuenta', cuentaController.delete)

  return cuentaRouter
}
