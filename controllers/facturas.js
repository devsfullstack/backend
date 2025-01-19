const pool = require('../db/db')
const tabla = 'facturas'
const tabla2 = 'registros'

const getAll = async (req, res) => {
    try {
        const factura = await pool.query(`SELECT * FROM ${tabla} ORDER BY created_at DESC`)
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo) VALUES (?,?)`, ['Mostrar todo', tabla])    
        res.json(factura[0])
        }
        catch (err) {
            console.error(err)
            }
            }

const getById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await pool.query(`SELECT * FROM ${tabla} WHERE id = $1`, [id]) 
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Mostrar por ID', tabla, req.user])  
        res.json(data.rows)
        }
        catch (err) {
            console.error(err)
            }
        }

const create = async (req, res) => {
    try {
        
        const {tipo, numero, fecha, cliente_id, productos, subtotal, iva, total, estado} = req.body
        const data = await pool.query(`INSERT INTO ${tabla} (tipo, numero, fecha,   cliente_id, productos, subtotal, iva, total, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [tipo, numero, fecha, cliente_id, productos, subtotal, iva, total, estado])  
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Crear', tabla, req.user])   
        res.json(data.rows[0])
        }
        catch (err) {
            console.error(err)
            }
            }

const update = async (req, res) => {
    try {
        const id = req.params.id
        const {tipo, numero, fecha, cliente_id, productos, subtotal, iva, total , estado} = req.body    
        const data = await pool.query(`UPDATE ${tabla} SET tipo = $1, numero =      $2, fecha = $3, cliente_id = $4, productos = $5, subtotal = $6, iva = $7, total = $8, estado = $9 WHERE id = ${id} RETURNING *`, [tipo, numero, fecha, cliente_id, productos, subtotal, iva, total, estado])   
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Actualizar', tabla, req.user])  
        res.json(data.rows[0])
        }
        catch (err) {
            console.error(err)
            }
            }

const deleted = async (req, res) => {
    try {
        const id = req.params.id
        const data = await pool.query(`DELETE FROM ${tabla} WHERE id = $1`, [id])   
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
