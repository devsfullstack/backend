const pool = require('../db/db')

const tabla = 'categorias'
const tabla2 = 'registros'

const getAll = async (req, res) => {
    try {
      const categorias = await pool.query(`SELECT * FROM ${tabla} ORDER BY created_at DESC`);
      
      await pool.query(`INSERT INTO ${tabla2} (modulo, accion) VALUES (?, ?)`,[tabla, "Mostrar todo"]);
  
      return res.status(200).json(categorias[0]);
    } catch (err) {
      console.error('Error al obtener las categorías:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
   const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const [categoria] = await pool.query(`SELECT * FROM ${tabla} WHERE id_categoria = ?`, [id]);
        if (!categoria.length) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            await pool.query(
                `INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES (?, ?, ?)`,
                [tabla, "Mostrar por ID", req.user]
            );
            return res.status(200).json(categoria);
        }
        catch (err) {
            console.error('Error al obtener la categoría:', err.message);
            return res.status(500).json({ error: 'Error interno del servidor' });
            }
            };

const create = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const [categoria] = await pool.query(`INSERT INTO ${tabla} (nombre, descripcion) VALUES (?, ?)`, [nombre, descripcion]);
        await pool.query(
            `INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES (?, ?, ?)`,
            [tabla, "Crear", req.user]
        );
        return res.status(201).json(categoria);
        } catch (err) {
            console.error('Error al crear la categoría:', err.message);
            return res.status(500).json({ error: 'Error interno del servidor' });
            }
            }

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const [categoria] = await pool.query(`UPDATE ${tabla} SET nombre = ?, descripcion = ? WHERE id_categoria = ?`, [nombre, descripcion, id]);
            await pool.query(`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES (?, ?, ?)`, [tabla, "Actualizar", req.user]);
            return res.status(200).json(categoria);
            } catch (err) {
                console.error('Error al actualizar la categoría:', err.message);
                return res.status(500).json({ error: 'Error interno del servidor' });
                }
                };

const deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const [categoria] = await pool.query(`DELETE FROM ${tabla} WHERE id_categoria = ?`, [id]);  
        await pool.query(`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES (?, ?, ?)`, [tabla, "Eliminar", req.user]);
        return res.status(200).json(categoria);
        } catch (err) {
            console.error('Error al eliminar la categoría:', err.message);
            return res.status(500).json({ error: 'Error interno del servidor' });
            }
            }



module.exports = {
    getAll,
    getById,
    create,
    update,
    deleted

    
}
