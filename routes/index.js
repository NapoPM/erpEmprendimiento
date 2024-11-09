const express = require('express');
const router = express.Router();
const CuentaEmprendedorController = require('../controllers/CuentaEmprendedorController');

// Rutas para CuentaEmprendedor
router.post('/emprendedor/registro', CuentaEmprendedorController.register);
router.post('/emprendedor/login', CuentaEmprendedorController.login);
router.get('/emprendedor/:id', CuentaEmprendedorController.getAccount);
router.put('/emprendedor/:id', CuentaEmprendedorController.updateAccount);
router.delete('/emprendedor/:id', CuentaEmprendedorController.deleteAccount);

module.exports = router;
