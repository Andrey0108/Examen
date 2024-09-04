import { CuentaSchema } from '../schemas/cuenta.schema.js'
export class CuentaModel {
  async get () {
    const data = await CuentaSchema.find()
    return data
  }

  async getById (numeroCuenta) {
    const data = await CuentaSchema.findOne({ numeroCuenta })
    return data
  }

  async post (obj) {
    const data = await new CuentaSchema(obj).save()
    return data
  }

  async patch (numeroCuenta, obj) {
    const data = await CuentaSchema.findOneAndUpdate({ numeroCuenta }, obj, { new: true })
    return data
  }

  async delete (numeroCuenta) {
    const data = await CuentaSchema.findOneAndDelete({ numeroCuenta })
    return data
  }
}
