
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, obtenerUsuarios, editarUsuario, eliminarUsuario } = require('../controllers/usuario');
const { emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { isAuthenticated } = require('../middlewares/validar-jwt');

const router = new Router();

router.get('/obtenerUsuarios', obtenerUsuarios);

router.post('/crearUsuario', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('apellido', 'El apellido es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatorio').not().isEmpty(),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExiste),
  validarCampos
], crearUsuario);

router.put('/editarUsuario/:id', [
  isAuthenticated,
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], editarUsuario);

router.delete('/eliminarUsuario/:id', [
  isAuthenticated,
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], eliminarUsuario)

module.exports = router