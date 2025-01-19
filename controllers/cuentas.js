const pool = require('../db/db')

const tabla = 'cuentas'
const tabla2 = 'registros'

const getAll = async (req, res) => {
    try {
        const cuenta = await pool.query(`SELECT * FROM ${tabla} ORDER BY created_at DESC`)
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo) VALUES (?,?)`, ['Mostrar todo', tabla])
        res.json(cuenta[0])
        } catch (error) {
            console.log(error)
            }
            }

const getById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await pool.query(`SELECT * FROM ${tabla} WHERE id = $1`,[id])
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Mostrar por ID', tabla, req.user])
        res.json(data.rows)
        } catch (error) {
            console.log(error)
            }
            }

const create = async (req, res) => {
    try {
        const { cuenta, tipo, saldo } = req.body
        const data = await pool.query(`INSERT INTO ${tabla} (cuenta, tipo, saldo) VALUES ($1, $2, $3) RETURNING *`, [cuenta, tipo, saldo])
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Crear', tabla, req.user])
        res.json(data.rows)
        } catch (error) {
            console.log(error)
            }
            }

const update = async (req, res) => {
    try {
        const id = req.params.id
        const { cuenta, tipo, saldo } = req.body
        const data = await pool.query(`UPDATE ${tabla} SET cuenta = $1, tipo =  $2, saldo = $3 WHERE id = ${id} RETURNING *`, [cuenta, tipo, saldo])   
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Actualizar', tabla, req.user])    
        res.json(data.rows)
        } catch (error) {
            console.log(error)
            }
            }

const deleted = async (req, res) => {
    try {
        const id = req.params.id
        const data = await pool.query(`DELETE FROM ${tabla} WHERE id = ${id}`, [id])
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Eliminar', tabla, req.user])
        res.json(data.rows)
        } catch (error) {
            console.log(error)
            }
        }


module.exports = {
    getAll,
    getById,
    create,
    update,
    deleted
    }