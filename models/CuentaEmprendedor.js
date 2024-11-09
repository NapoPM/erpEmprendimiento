const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Crear nueva cuenta de emprendedor
exports.create = async ({ nombreNegocio, nombre, apellido, celular, email, contrasena }) => {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO CuentaEmprendedor (nombreNegocio, nombre, apellido, celular, email, contrasena) VALUES (?, ?, ?, ?, ?, ?)',
            [nombreNegocio, nombre, apellido, celular, email, hashedPassword],
            (error, results) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    });
};

// Obtener cuenta por email
exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM CuentaEmprendedor WHERE email = ?',
            [email],
            (error, results) => {
                if (error) reject(error);
                resolve(results[0]);
            }
        );
    });
};

// Obtener cuenta por ID
exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM CuentaEmprendedor WHERE id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                resolve(results[0]);
            }
        );
    });
};

// Actualizar datos de la cuenta
exports.update = (id, data) => {
    const { nombreNegocio, nombre, apellido, celular } = data;
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE CuentaEmprendedor SET nombreNegocio = ?, nombre = ?, apellido = ?, celular = ? WHERE id = ?',
            [nombreNegocio, nombre, apellido, celular, id],
            (error, results) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    });
};

// Eliminar cuenta
exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM CuentaEmprendedor WHERE id = ?',
            [id],
            (error, results) => {
                if (error) reject(error);
                resolve(results);
            }
        );
    });
};
