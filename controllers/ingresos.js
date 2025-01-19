const pool = require('../db/db');

const tabla = 'ingresos'
const tabla2 = 'registros'

const getAll = async (req, res) => {
    try {
        const ingreso = await pool.query(`SELECT * FROM ${tabla} ORDER BY created_at DESC`)   
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo) VALUES (?,?)`, ['Mostrar todo', tabla])    
        return res.status(200).json(ingreso[0])
        } catch (error) {
            console.log(error)
            }
            }

const getById = async (req, res) => {
    try {
        const id = req.params.id
        const result = await pool.query(`SELECT * FROM ${tabla} WHERE id = ${id} `, [id])   
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Mostrar por ID', tabla, req.user])  
        res.json(result.rows)
        }
        catch (error) {
            console.log(error)
            }
            }

const create = async (req, res) => {
    try {
        const {cliente_id, status, facturatipo, categoria_id, productos, subtotal, descuento, subtotalcondesc, iva, total, formapago, metodoenvio, cuenta_id, notacliente, notainterna} = req.body  
        const result = await pool.query(`INSERT INTO ${tabla} (cliente_id, status, facturatipo, categoria_id, productos, subtotal, descuento, subtotalcondesc, iva, total, formapago, metodoenvio, cuenta_id, notacliente, notainterna) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`, [cliente_id, status, facturatipo, categoria_id, productos, subtotal, descuento, subtotalcondesc, iva, total, formapago, metodoenvio, cuenta_id, notacliente, notainterna])  
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Crear', tabla, req.user])   
        res.json(result.rows[0])
        }   
        catch (error) {
            console.log(error)
            }
            }

const update = async (req, res) => {
    try {
        const id = req.params.id
        const {cliente_id, status, facturatipo, categoria_id, productos, subtotal, descuento, subtotalcondesc, iva, total, formapago, metodoenvio, cuenta_id, notacliente, notainterna} = req.body  
        const result = await pool.query(`UPDATE ${tabla} SET cliente_id = $1, status = $2, facturatipo = $3, categoria_id = $4, productos = $5, subtotal = $6, descuento = $7, subtotalcondesc = $8, iva = $9, total = $10, formapago = $11, metodoenvio = $12, cuenta_id = $13, notacliente = $14, notainterna = $15 WHERE id = ${id} RETURNING *`, [cliente_id, status, facturatipo, categoria_id, productos, subtotal, descuento, subtotalcondesc, iva, total, formapago, metodoenvio, cuenta_id, notacliente, notainterna]) 
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Actualizar', tabla, req.user])  
        res.json(result.rows[0])
        }
        catch (error) {
            console.log(error)  
            }
        }

const deleted = async (req, res) => {
    try {
        const id = req.params.id
        const   result = await pool.query(`DELETE FROM ${tabla} WHERE id = $1`, [id])   
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (   ?,?,?)`, ['Eliminar', tabla, req.user]) 
        res.json({message: 'Registro eliminado con éxito.'})
        }
        catch (error) {
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
