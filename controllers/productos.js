const pool = require('../db/db')

const tabla = 'productos'
const tabla2 = 'registros'

const getAll = async (req, res) => {
    try {
        const producto = await pool.query(`SELECT * FROM ${tabla} ORDER BY created_at DESC`)
        await pool.query(`INSERT INTO ${tabla2} (accion, modulo) values (?,?)`,["Mostrar Todo", tabla])
        return res.status(200).json(producto[0])    
        } catch (error) {
            console.log(error)
            }
            }

const getById = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await pool.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id])
        await pool.query(`INSERT INTO ${tabla2} values (?,?,?)`,["Mostrar ID", tabla, req.user])
        return resultado
        } catch (error) {
            console.log(error)
            }
            }

const create = async (req, res) => {
    try {
        const { codigo, nombre, tipo, tipo2, proveedor_id, depósito, general, stock, costo, ivacompra, precioventa,ivaventa,activo, mostrarventa,mostrarcompra,imagen } = req.body
        const resultado = await pool.query(`INSERT INTO ${tabla} values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?)`, [codigo, nombre, tipo, tipo2, proveedor_id, depósito, general, stock, costo, ivacompra, precioventa,ivaventa,activo,mostrarventa,mostrarcompra,imagen])
        await pool.query(`INSERT INTO ${tabla2} values (?,?,?)`,["Crear", tabla, req.user]) 
        return resultado
        } catch (error) {
            console.log(error)
            }
            }

const update = async (req, res) => {
    try {
        const id = req.params.id
        const { codigo, nombre, tipo, tipo2, proveedor_id, depósito, general, stock, costo, ivacompra, precioventa,ivaventa,activo, mostrarventa, mostrarcompra,imagen } = req.body     
        const resultado = await pool.query(`UPDATE ${tabla} SET codigo = ?, nombre = ?, tipo = ?, tipo2 = ?, proveedor_id = ?, depósito = ?, general = ?, stock = ?, costo = ?, ivacompra = ?, precioventa = ?, ivaventa = ?, activo = ?, mostrarventa = ?, mostrarcompra = ?, imagen = ? WHERE id = ?`, [ codigo, nombre, tipo, tipo2, proveedor_id, depósito, general, stock, costo, ivacompra, precioventa,ivaventa,activo,mostrarventa, mostrarcompra, imagen])
        await pool.query(`INSERT INTO ${tabla2} values (?,?,?)`,["Actualizar", tabla, req.user])    
        return resultado
        } catch (error) {
            console.log(error)
            }
            }

const deleted = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await pool.query(`DELETE FROM ${tabla} WHERE id = ?`, [id])
        await pool.query(`INSERT INTO ${tabla2} values (?,?,?)`,["Eliminar", tabla, req.user])  
        return resultado
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