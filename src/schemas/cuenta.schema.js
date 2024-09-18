import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const cuentaSchema = new Schema({
  numeroCuenta: {
    type: Number,
    unique: [true, 'El valor no puede ser repetido']
  },
  documentoCliente: {
    type: String,
    unique: [true, 'El valor no puede ser repetido'],
    required: [true, 'El documento del cliente es requerido']
  },
  fechaApertura: {
    type: Date,
    default: Date.now
  },
  saldo: {
    type: Number,
    min: [0, 'El saldo no puede ser negativo'],
    default: 0
  },
  sucursal: {
    type: String
  },
  claveAcceso: {
    type: String,
    minLength: [4, 'La clave de acceso debe tener al menos 4 caracteres']
  },
  consignaciones: {
    type: Number,
    default: 0
  }
})
// atributo donde se acumularan todas las consignacioneses que se han hecho, y un metodo que permita listar las consignacioneses

// Realizar un autoincremetable en el campo numeroCuenta
cuentaSchema.pre('save', async function (next) {
  const cuenta = this
  if (!cuenta.isNew) {
    return next()
  }

  bcrypt
    .genSalt(10)
    .then((salts) => {
      bcrypt
        .hash(this.claveAcceso, salts)
        .then((hash) => {
          this.claveAcceso = hash
          next()
        })
        .catch((err) => {
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })

  const ultimoRegistro = await CuentaSchema.findOne().sort({
    numeroCuenta: -1
  })
  cuenta.numeroCuenta = ultimoRegistro ? ultimoRegistro.numeroCuenta + 1 : 1

  next()
})

export const CuentaSchema = model('Cuenta', cuentaSchema)
