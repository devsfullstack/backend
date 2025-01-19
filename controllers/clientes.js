const pool = require('../db/db')

const tabla = 'clientes'
const tabla2 = 'registros'

const getAll = async (req, res) => {
    try {
        const cliente = await pool.query(`SELECT * FROM ${tabla} ORDER BY created_at DESC`);
        
        await pool.query(`INSERT INTO ${tabla2} (modulo, accion) VALUES (?, ?)`,[tabla, "Mostrar todo"]);
    
        return res.status(200).json(cliente[0]);
    }
    catch (err) {
        console.error(err.message)
    }
    }


const getById = async (req, res) => {
    try {
        const id = req.params.id
        const cliente = await pool.query(`SELECT * FROM ${tabla} WHERE id = $1`, [id])
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Mostrar por ID', tabla, req.user])
        res.json(cliente.rows)
        }
        catch (err) {
            console.error(err.message)
            }
            }


const create = async (req, res) => {
    try {
        const {cliente, nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal,usuariomeli,pagweb, saldoinicial,observaciones } = req.body
        const clienteNuevo = await pool.query(`INSERT INTO ${tabla} (cliente, nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal,usuariomeli,pagweb, saldoinicial,observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *`, [cliente, nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal,usuariomeli,pagweb, saldoinicial,observaciones])
        await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Crear', tabla, req.user])
        res.json(clienteNuevo.rows)
        }
        catch (err) {
            console.error(err.message)
            }
            }

const update = async (req, res) => {
    try {
        const id = req.params.id
        const { cliente, nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal,usuariomeli,pagweb, saldoinicial,observaciones } = req.body   
        const clienteActualizado = await pool.query(`UPDATE ${tabla} SET cliente = $1, nombre = $2, apellido = $3, email = $4, telefono = $5, direccion = $6, localidad = $7, provincia = $8, dni = $9, cuit = $10, condicion = $11, razonsocial = $12, domiciliofiscal = $13, localidadfiscal = $14, provinciafiscal = $15, codpostalfiscal = $16,usuariomeli = $17,pagweb = $18, saldoinicial = $19,observaciones = $20 WHERE id = ${id} RETURNING *`, [cliente, nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal,usuariomeli,pagweb, saldoinicial,observaciones])   
    await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Actualizar', tabla, req.user])
        res.json(clienteActualizado.rows)
    }catch (err) {
            console.error(err.message)
    }
}

const deleted = async (req, res) => {
    try {
        const id = req.params.id
        const clienteEliminado = await pool.query(`DELETE FROM ${tabla} WHERE id = ${id}`, [id])    
    await pool.query(`INSERT INTO ${tabla2} (accion, tabla, usuario) VALUES (?,?,?)`, ['Eliminar', tabla, req.user])    
        res.json(clienteEliminado.rows)
    }catch (err) {
            console.error(err.message)
    }
}



module.exports = {
    getAll,
    getById,
    create,
    update,
    deleted
}