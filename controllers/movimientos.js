const db = require('../db/db')

const tabla = 'movimientos'

const getAll = (req, res) => {

    const sql = (`SELECT * FROM ${tabla} ORDER BY created_at DESC`)
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
            }
            return res.status(200).json({
                results
            })
            });
            };


const create = (req, res) => {

    const { categoria, tipo } = req.body;

    const user = 1
    const sql = (`INSERT INTO ${tabla} (categoria, tipo, id_user) VALUES ("${categoria}","${tipo}", "${user}")`)
    db.query(sql, (err, results) => {
        if (err) { 
            return res.status(500).send(`Error creando registro en tabla: ${tabla}`) 
        }else{
            
        return res.status(200).json(results)
        }
    })


       
}
    


    const getOne = (req, res) => {}

    const update = (req, res)=>{}    

    const deleted = (req,res) =>{}
    
module.exports = {
    getOne,
    getAll,
    create,
    update,
    deleted
}
