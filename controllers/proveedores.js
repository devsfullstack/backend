const pool = require('../db/db')

const tabla = 'proveedores'
const tabla2 = 'registros'

const getAll = async (req, res) => {
    try {
        const proveedor = await pool.query(`SELECT * FROM ${tabla} ORDER BY created_at DESC`)
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo) values (?,?)`, ["Ver todo", tabla])
        return res.status(200).json(proveedor[0])
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Error al obtener proveedores'})
            }
            }

const getById = async (req, res) => {
    try {
        const id = req.params.id
        const proveedor = await pool.query(`SELECT * FROM ${tabla} WHERE id = $1 `, [id])   
        if (proveedor.rows.length === 0) {
            return res.status(404).json({message: 'Proveedor no encontrado'})
            }
            await pool.query(`INSERT INTO ${tabla2} values (?,?,?)`, ["Ver", tabla, req.user])
            res.json(proveedor.rows[0])
            } catch (error) {
                console.error(error)
                res.status(500).json({message: 'Error al obtener proveedor'})
                }
                }

const create = async (req, res) => {
    try {
        const {nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal, usuariomeli, pagweb, saldoinicial, observaciones} = req.body
        const proveedor = await pool.query(`INSERT INTO ${tabla} (nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal, usuariomeli, pagweb, saldoinicial, observaciones) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`, [nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal, usuariomeli, pagweb, saldoinicial, observaciones])    
        await pool.query(`INSERT INTO ${tabla2} values (?,?,?)`, ["Crear", tabla, req.user])    
        res.json(proveedor.rows[0])
        } catch (error) {
            console.error(error)
            res.status(500).json({message: 'Error al crear proveedor'}) 
            }
        }

const update = async (req, res) => {
    try {
        const id = req.params.id
        const {nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal, usuariomeli, pagweb, saldoinicial, observaciones} = req.body  
        const proveedor = await pool.query(`UPDATE ${tabla} SET nombre = $1, apellido = $2, email = $3, telefono = $4, direccion = $5, localidad = $6, provincia = $7, dni = $8, cuit = $9, condicion = $10, razonsocial = $11, domiciliofiscal = $12, localidadfiscal = $13, provinciafiscal = $14, codpostalfiscal = $15, usuariomeli = $16, pagweb = $17, saldoinicial = $18, observaciones = $19 WHERE id = $20 RETURNING *`, [nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal, usuariomeli, pagweb, saldoinicial, observaciones, id])        
        await pool.query(`INSERT INTO ${tabla2} values (?,?,?)`, ["Editar", tabla, req.user])   
        res.json(proveedor.rows[0])
        } catch (error) {
            console.error(error)
            res.status(500).json({message: 'Error al actualizar proveedor'})
            }
        }

const deleted = async (req, res) => {
    try {
        const id = req.params.id
        const proveedor = await pool.query(`DELETE FROM ${tabla} WHERE id = $1 RETURNING *`, [id])  
        if (proveedor.rows.length === 0) {
            return res.status(404).json({message: 'Proveedor no encontrado'})
            }
            await pool.query(`INSERT INTO ${tabla2} values (?,?,?)`, ["Eliminar", tabla , req.user])    
            res.json(proveedor.rows[0])
            } catch (error) {
                console.error(error)
                res.status(500).json({message: 'Error al eliminar proveedor'})
                }
            }
    
module.exports = {
    getAll,
    getById,
    create,
    update,
    deleted
}
