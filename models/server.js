
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      usuario: '/api/usuario',
      auth: '/api/auth',
      list: '/api/favs'
    }
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use( cors() );
    this.app.use( express.json() );
  }

  routes() {
    this.app.use(this.paths.usuario, require('../routes/usuario'));
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.list, require('../routes/list'));
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log('Server corriendo en el puerto', this.port);
    })
  }

}

module.exports = Server