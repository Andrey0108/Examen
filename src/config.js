import 'dotenv/config'

// Desestructuracion de datos de process.env
export const {
  PORT = 3000, // value default
  MONGO_CNN = 'mongodb+srv://alanandrey234:1234@cluster0.mtqwtib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' // value default
} = process.env
