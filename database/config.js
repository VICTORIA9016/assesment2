
const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Base de datos conectada');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de querer conectarse a la base de datos');
  }
}

module.exports = {
  dbConnection
}