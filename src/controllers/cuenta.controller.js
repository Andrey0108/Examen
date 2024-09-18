// Controla la informacion desde el frontend (postman || rapidapi) y recibe la informacion del backend (model & schema)

export class CuentaController {
  // #region Constructor: construye el modelo que vamos a usar y se asigna desde el app (inicio de la aplicacion)
  constructor ({ cuentaModel }) { // recibe el modelo como un objeto
    this.cuentaModel = cuentaModel // cuentaModel es el modelo que se le asigna al controller para que lo use
  }
  // #endregion

  // #region Metodos de la clase

  // getAll: obtener la informacion de todas las cuentas
  getAll = async (req, res) => {
    const data = await this.cuentaModel.getAll() // Se obtiene la informacion de todas las cuentas

    // Responer con un formato json la data encontrada
    res.status(200).json(data)
  }

  // getById: obtener la informacion de una cuenta en especifico
  getById = async (req, res) => {
    const data = await this.cuentaModel.getById(req.params.numeroCuenta) // req.params.numeroCuenta es el valor que se le envia desde la url como parametro para identificar la cuenta que va a buscar

    // Responer con un formato json la data encontrada (una sola cuenta)
    res.status(200).json(data)
  }

  // post: crear una nueva cuenta
  post = async (req, res) => {
    const data = await this.cuentaModel.post(req.body) // req.body es la informacion que se le envia desde el json en el postman (rapidapi) esta basado en los parametros obligatorios del schema

    // Responer con un formato json la data creada
    res.status(201).json(data)
  }

  patch = async (req, res) => {
    // Este método se encarga de actualizar el saldo de una cuenta, ya sea realizando un retiro o un depósito.

    // Obtener la cuenta a partir del número de cuenta enviado en la solicitud.
    const value = await this.cuentaModel.getById(req.params.numeroCuenta)

    // Valida si se realiza un retiro y si hay suficiente saldo para relaizar el retiro
    if (value.saldo > 0 && req.body.retiro > 0) {
      // Resta el monto del retiro al saldo actual
      value.saldo = value.saldo - req.body.retiro

      // Valida si el saldo se vuelve negativo.
      if (value.saldo < 0) {
        // Si el saldo es negativo, retornar un error 400 indicando que no hay suficiente saldo.
        return res
          .status(400)
          .json({
            message: 'No se puede realizar el retiro, el monto es mayor al saldo de la cuenta'
          })
      }
    }

    // Si se realiza un depósito, sumar el monto al saldo y aumenta el contador de consignaciones
    if (req.body.deposito > 0) {
      value.saldo = value.saldo + req.body.deposito
      value.consignaciones = value.consignaciones + 1
    }

    // Actualiza la cuenta en la base de datos con los nuevos valores
    const data = await this.cuentaModel.patch(req.params.numeroCuenta, value)

    // Retorna una respuesta exitosa con los datos de la cuenta actualizada.
    res.status(200).json(data)
  }

  // delete: eliminar una cuenta
  delete = async (req, res) => {
  // Se obtiene la informacion de la cuenta
    const value = await this.cuentaModel.getById(req.params.numeroCuenta)

    // Valida si la cuenta tiene saldo para evitar que se elimine
    if (value.saldo > 0) {
      res.status(400).json({
        message: 'No se puede eliminar la cuenta, tiene saldo pendiente'
      })
    }

    // Se elimina la cuenta enviando la informacion necesaria al modelo para que haga todo en base de datos
    const data = await this.cuentaModel.delete(req.params.numeroCuenta) // req.params.numeroCuenta es el valor que se le envia desde la url como parametro para identificar la cuenta
    res.status(200).json(data)
  }
}
