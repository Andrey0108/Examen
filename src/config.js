import 'dotenv/config'

// Desestructuracion de datos de process.env
export const {
  PORT = 3000, // value default
  MONGO_CNN = 'mongodb://localhost:27017/cuenta' // value default
} = process.env
