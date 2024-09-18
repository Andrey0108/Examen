// El modelo se conecta directamente con la base de datos

// Importa el esquema "CuentaSchema" desde el archivo "cuenta.schema.js" ubicado un directorio hacia arriba. Este esquema define la estructura de los documentos que representarán las cuentas en la base de datos.
import { CuentaSchema } from '../schemas/cuenta.schema.js'

// Define una clase llamada "CuentaModel" que encapsulará todas las operaciones relacionadas con las cuentas
export class CuentaModel {
  // get: obtener
  //  "aync get()" Método asíncrono que devuelve todas las cuentas de la base de datos.
  async get () {
    // CuentaSchema.find() busca todos los documentos en la colección de cuentas (información de base de datos)
    const data = await CuentaSchema.find() // await: espera a que la funcion termine para continuar
    // CuentaSchema.find(): obtiene todas las cuentas de la base de datos

    // Retorna las cuentas encontradas
    return data
  }

  // getById: obtener por id (identificador)
  // "getById" obtiene la informacion de una cuenta en especifico
  async getById (numeroCuenta) { // numeroCuenta es el parametro que se le envia a la funcion (desde el controller)
    const data = await CuentaSchema.findOne({ numeroCuenta })
    // "CuentaSchema.findOne({ numeroCuenta })" busca un solo documento que coincida con el número de cuenta proporcionado

    // retorna la cuenta encontrada
    return data
  }

  // post: crear

  async post (obj) { // "async post" Método asíncrono para crear una nueva cuenta en este caso como un objeto
    const data = await new CuentaSchema(obj).save()
    // Se crea una nueva cuenta en la base de datos usando el schema (informacion de la base de datos)

    return data
    // retorna la cuenta creada
  }

  // patch: Actualizar
  async patch (numeroCuenta, obj) {
    const data = await CuentaSchema.findOneAndUpdate({ numeroCuenta }, obj, { // numeroCuenta y obj son los parametros que se le envian a la funcion    (desde el controller) para luego actualizar la informacion de la cuenta en la base de datos usando el schema
      new: true
      // "new: true"  devuelve el documento actualizado y no el documento original
    })
    // retorna la cuenta actualizada
    return data
  }

  // delete: eliminar
  async delete (numeroCuenta) { // numeroCuenta es el parametro que se le envia a la funcion (desde el controller)
    // Se elimina la informacion de la cuenta en la base de datos usando el schema (informacion de la base de datos)
    const data = await CuentaSchema.findOneAndDelete({ numeroCuenta })
    // se busca la cuenta por el numero de cuenta para luego eliminarse
    return data
    // Retorna la cuenta eliminada
  }

  async getBySucursal (sucursal) { // sucursal: Es el parámetro que indica la sucursal que queremos buscar.
    // obtiene cuentas basadas en la sucursal a la que pertenecen.
    const data = await CuentaSchema.find({ sucursal })
    // CuentaSchema.find(): Este método se utiliza para buscar múltiples documentos en la base de datos que cumplan con ciertos criterios.
    // await: Pausa la ejecución de esta línea hasta que la operación de búsqueda se complete.
    // data: Almacena un array de documentos que cumplen con el criterio de búsqueda.
    return data
    // retorna las cuentas asociadas a una misma sucursal
  }
}
