const pool = require('../db/db')

const tabla = 'egresos'
const tabla2 = 'registros'

const getAll = async (req, res) => {
    try {
        const egreso = await pool.query(`SELECT * FROM ${tabla} ORDER BY created_at DESC`)
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo) VALUES (?,?)`, ['Mostrar todo', tabla])    
        res.json(egreso[0])
        }
        catch (err) {
            console.error(err)
            }
            }

const getById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await pool.query(`SELECT * FROM ${tabla} WHERE id=${id}`, [id])
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Mostrar por ID', tabla, req.user])
        res.json(data.rows)
        }
        catch (err) {
            console.error(err)
            }
            }

const create = async (req, res) => {
    try {
        const {tipo, proveedor_id, categoria_id, numero, status, facturatipo, productos, subtotal, descuento, iva, total, formapago,cuenta_id,notacliente,notainterna} = req.body
        const data = await pool.query(`INSERT INTO ${tabla} (tipo, proveedor_id, categoria_id, numero, status, facturatipo, productos, subtotal, descuento, iva, total, formapago,cuenta_id,notacliente,notainterna) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`, [tipo, proveedor_id, categoria_id, numero, status, facturatipo, productos, subtotal, descuento, iva, total, formapago,cuenta_id,notacliente,notainterna])     
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Crear', tabla, req.user])   
        res.json(data.rows[0])
        }
        catch (err) {
            console.error(err)
            }
            }

const update = async (req, res) => {
    try {
        const {tipo, proveedor_id, categoria_id, numero, status, facturatipo,   productos, subtotal, descuento, iva, total, formapago,cuenta_id,notacliente,notainterna} = req.body 
        const   data = await pool.query(`UPDATE ${tabla} SET tipo = $1, proveedor_id = $2, categoria_id = $3, numero = $4, status = $5, facturatipo = $6, productos = $7, subtotal = $8, descuento = $9, iva = $10, total = $11, formapago = $12,cuenta_id = $13,notacliente = $14,notainterna = $15 WHERE id = ${req.params.id} RETURNING *`, [tipo, proveedor_id, categoria_id, numero, status, facturatipo, productos, subtotal, descuento, iva, total, formapago,cuenta_id,notacliente,notainterna])    
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Actualizar', tabla, req.user])
        res.json(data.rows[0])
        }
        catch (err) {
            console.error(err)
            }
            }

const deleted = async (req, res) => {
    try {
        const data = await pool.query(` DELETE FROM ${tabla} WHERE id = $1`, [req.params.id])   
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Eliminar', tabla, req.user])
        res.json(data.rows)
        }
        catch (err) {
            console.error(err)
            }
        }


module.exports = {
    getAll,
    getById,
    create,
    update,
    deleted
    }