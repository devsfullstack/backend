const pool = require('../db/db')
const bcrypt = require('bcryptjs');

const tabla = 'usuarios'
const tabla2 = 'registros'

const getAll = async (req, res) => {
    try {
        const usuario = await pool.query(`SELECT * FROM ${tabla} ORDER BY created_at DESC`);
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo) VALUES (?,?)`, ['Listar usuarios', tabla]);
        return res.status(200).json(usuario[0]);
        
        } catch (error) {
        res.json({ error: error.message });
        }
        }

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await pool.query(`SELECT * FROM ${tabla} WHERE id = $1`, [id]);
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo, usuario) VALUES (?,?,?)`, ['Buscar usuario',tabla, req.user]); 
        

        if (usuario.rows.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
            return res.status(200).json(usuario.rows[0]);
            }
            } catch (error) {
                return res.status(500).json({ error: error.message });
                }
                }

const create = async (req, res) => {
    try {
        const { nombre, apellido, usuario, contraseña, email, cargo, rol } = req.body;
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const datos = await pool.query(`INSERT INTO ${tabla} (nombre, apellido, usuario, contraseña, email, cargo, rol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [nombre, apellido, usuario, hashedPassword, email, cargo, rol]);
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo, usuario) VALUES (?,?,?)`, ['Crear usuario',tabla, req.user]);

        return res.status(200).json(datos.rows[0]);
        } catch (error) {
            res.json({ error: error.message });
            }
            }

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await pool.query(`UPDATE ${tabla} SET nombre = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`, [nombre, email, hashedPassword, id]);
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo, usuario) VALUES (?,?,?)`, ['Actualizar usuario',tabla, req.user]);
        if (usuario.rows.length === 0) {
            res.json({ error: 'Usuario no encontrado' });
            } else {
                res.json(usuario.rows[0]);
                }
                } catch (error) {
                    res.json({ error: error.message });
                    }
                    }

const deleted = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await pool.query(`DELETE FROM ${tabla} WHERE id = $1`, [id] );
        
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo, usuario) VALUES (?,?,?)`, ['Eliminar usuario',tabla, req.user]);
        if (usuario.rows.length === 0) {
            res.json({ error: 'Usuario no encontrado' });
            } else {
                res.json({ message: 'Usuario eliminado' });
                }
                } catch (error) {
                    res.json({ error: error.message });
                    }
                    }


module.exports = {
    getAll,
    getById,
    create,
    update,
    deleted
    };
