const db = require('../db/db')
//const bcrypt = require('bcrypt')
const getAll = (req, res, tabla) => {
    const sql = ("SELECT * FROM users")
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error fetching users');
            }
            res.json(results)
            });
            };


const getOne = (req, res) => {

        const id = req.params.id;
        const sql = ("SELECT * FROM users WHERE id = ?")
        db.query(sql, {id}, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Error buscando usuario');
                }
                return res.status(200).json({
                    results})
                    });
                    };

const create = (req, res) => {
    const { name, email, password } = req.body;
    const sql = ("INSERT INTO users SET ?")
    db.query(sql, { name, email, password }, (err, results) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error creando usuario');
            }
            res.json(results)
            });
        }


        const update = (req,res)=>{}
        const deleted = (req,res)=>{}
        
        module.exports = {
            getOne,
            getAll,
            create,
            update,
            deleted
        
            }