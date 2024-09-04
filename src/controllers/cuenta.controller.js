// controllerCuenta
export class CuentaController {
  constructor ({ cuentaModel }) {
    this.cuentaModel = cuentaModel
  }

  get = async (req, res) => {
    const data = await this.cuentaModel.get()
    res.status(200).json(data)
  }

  getById = async (req, res) => {
    const data = await this.cuentaModel.getById(req.params.numeroCuenta)
    res.status(200).json(data)
  }

  post = async (req, res) => {
    const data = await this.cuentaModel.post(req.body)
    res.status(201).json(data)
  }

  patch = async (req, res) => {
    const value = await this.cuentaModel.getById(req.params.numeroCuenta)

    if (value.saldo > 0 && req.body.retiro) {
      value.saldo = value.saldo - req.body.retiro

      if (value.saldo < 0) {
        return res.status(400).json({ message: 'No se puede realizar el retiro, el monto es mayor al saldo de la cuenta' })
      }
    }

    if (req.body.deposito) {
      value.saldo = value.saldo + req.body.deposito
    }

    const data = await this.cuentaModel.patch(req.params.numeroCuenta, value)
    res.status(200).json(data)
  }

  delete = async (req, res) => {
    const value = await this.cuentaModel.getById(req.params.numeroCuenta)
    if (value.saldo > 0) {
      return res.status(400).json({ message: 'No se puede eliminar la cuenta, tiene saldo pendiente' })
    }
    const data = await this.cuentaModel.delete(req.params.numeroCuenta)
    res.status(200).json(data)
  }
}
