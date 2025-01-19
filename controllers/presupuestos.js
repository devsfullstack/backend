const pool = require('../db/db')
const tabla = 'presupuestos'
const tabla2 = 'registros'


const getAll = async (req, res) => {
    try {
        const presupuesto = await pool.query(`SELECT * FROM ${tabla} ORDER BY created_at DESC`)
        await pool.query(`INSERT INTO ${tabla2}(accion, modulo) values(?,?)`,["Obtener Todo", tabla])
        return res.status(200).json(presupuesto[0])
    } catch (error) {
            res.status(500).json({ message: "Error al obtener los datos" })
    }
}


const getById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await pool.query(`SELECT * FROM ${tabla} WHERE id = $1`, [id])
        await pool.query(`INSERT INTO ${tabla2} values(?,?,?)`,["Obtener por id", tabla, req.user])
        res.json(data.rows)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los datos" })
    }
}

const create = async (req, res) => {
    try {
        const {numero, estado, emision, vencimiento, cliente_id, categoria_id, productos, subtotal, descuento, iva, total, formapago, metodoenvio,notacliente, notainterna} = req.body
        const data = await pool.query(`INSERT INTO ${tabla} (numero, estado, emision, vencimiento, cliente_id, categoria_id, subtotal, descuento, iva, total, formapago, metodoenvio,notacliente, notainterna) values($1, $ 2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`, [numero, estado, emision, vencimiento, cliente_id, categoria_id, subtotal, descuento, iva, total, formapago, metodoenvio,notacliente, notainterna])  
        await pool.query(`INSERT INTO ${tabla2} values(?,?,?)`,["Crear", tabla, req.user])
        res.json(data.rows)
    } catch (error) {
            res.status(500).json({ message: "Error al crear los datos" })
    }
}
const update = async (req, res) => {
    try {
        const id = req.params.id    
        const {numero, estado, emision, vencimiento, cliente_id, categoria_id, subtotal, descuento, iva, total, formapago, metodoenvio,notacliente, notainterna} = req.body
        const data = await pool.query(`UPDATE ${tabla} SET numero = $1, estado = $2, emision = $3, vencimiento = $4, cliente_id = $ 5, categoria_id = $6, subtotal = $7, descuento = $8, iva = $9, total = $10, formapago = $11, metodoenvio = $12,notacliente = $13, notainterna = $14 WHERE id = $15 RETURNING *`, [numero, estado, emision, vencimiento, cliente_id, categoria_id, subtotal, descuento, iva, total, formapago, metodoenvio, notacliente, notainterna])
        await pool.query(`INSERT INTO ${tabla2} values(?,?,?)`,["Actualizar", tabla , req.user])    
        res.json(data.rows)
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar los datos" })  
    }
}

const deleted = async (req, res) => {
     try {
        const id = req.params.id
        const data = await pool.query(`DELETE FROM ${tabla} WHERE id = $1`, [id])
        await pool.query(`INSERT INTO ${tabla2} values(?,?,?)`,["Eliminar", tabla, req.user])   
        res.json(data.rows)
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar los datos" })
    }
}





module.exports = {
    getAll,
    getById,
    create,
    update,
    deleted
}
