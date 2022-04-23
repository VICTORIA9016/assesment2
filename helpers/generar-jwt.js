
const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
  return new Promise((resolve, rejected) => {
    const payload = { uid };
    jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if(err){
        console.log(err);
        rejected('No se pudo generar el token')
      } else {
        resolve(token)
      }
    });
  })
}

module.exports = {
  generarJWT
}