const CuentaEmprendedor = require('../models/CuentaEmprendedor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Registro
exports.register = async (req, res) => {
    try {
        const { nombreNegocio, nombre, apellido, celular, email, contrasena } = req.body;
        
        const existingUser = await CuentaEmprendedor.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        const newUser = await CuentaEmprendedor.create({ nombreNegocio, nombre, apellido, celular, email, contrasena });
        res.status(201).json({ message: 'Cuenta creada con éxito', userId: newUser.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la cuenta', error });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    try {
        const { email, contrasena } = req.body;
        const user = await CuentaEmprendedor.findByEmail(email);

        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión', error });
    }
};

// Obtener datos de la cuenta
exports.getAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await CuentaEmprendedor.findById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos de la cuenta', error });
    }
};

// Actualizar cuenta
exports.updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        await CuentaEmprendedor.update(id, req.body);
        res.json({ message: 'Cuenta actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la cuenta', error });
    }
};

// Eliminar cuenta
exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        await CuentaEmprendedor.delete(id);
        res.json({ message: 'Cuenta eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la cuenta', error });
    }
};
