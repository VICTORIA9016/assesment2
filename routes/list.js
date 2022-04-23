
const { Router } = require('express');
const { check } = require('express-validator');
const { crearList, obtenerLists, obtenerList, eliminarList, obtenerListasPorUsuario } = require('../controllers/list');
const { isAuthenticated } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeListPorId } = require('../helpers/db-validators');

const router = new Router();

router.get('/', [
  isAuthenticated,
  validarCampos
], obtenerLists);

router.get('/:id', [
  isAuthenticated,
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeListPorId),
  validarCampos
], obtenerList);

router.post('/', [
  isAuthenticated,
  check('title', 'El título es obligatorio').not().isEmpty(),
  check('description', 'La descripcion es obligatorio').not().isEmpty(),
  check('link', 'El link es obligatorio').not().isEmpty(),
  validarCampos
], crearList);

router.delete('/:id', [
  isAuthenticated,
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeListPorId),
  validarCampos
], eliminarList);

router.get('/listasPorUsuario/:id', [
  isAuthenticated,
  check('id', 'No es un id válido').isMongoId(),
  validarCampos
], obtenerListasPorUsuario)

module.exports = router;
