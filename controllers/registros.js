const pool = require('../db/db');

const tabla = 'registros'

const getAll = async (req, res) => {
    try {
        const registro = await pool.query(`SELECT * FROM ${tabla} ORDER BY created_at DESC`);
        return res.status(200).json(registro[0])
        } catch (error) {
            console.error(error);
            return null;
            }
            }

const getById = async (req, res) => {
    try {
        const respuesta = await pool.query(`SELECT * FROM ${tabla} WHERE id = $1`, [id]);
        return res.status(200).json(respuesta.rows[0])
        } catch (error) {
            console.error(error);
            return null;
            }
            }
            

module.exports = {
    getAll,
    getById,
}
