const db = require('../db/db')
//const bcrypt = require('bcrypt')

const getAll = (req, res, tabla) => {
    const sql = ("SELECT * FROM categorias")
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error buscando categorias');
            }
            res.json(results)
            });
            };


const getOne = (req, res) => {

        const id = req.params.id;
        const sql = ("SELECT * FROM categorias WHERE id = ?")
        db.query(sql, {id}, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Error buscando categoria');
                }
                return res.status(200).json({
                    results})
                    });
                    };

const create = (req, res) => {
    const { name, email, password } = req.body;
    const sql = ("INSERT INTO categorias SET ?")
    db.query(sql, { name, email, password }, (err, results) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error creando usuario');
            }
            res.json(results)
            });
        }

const update = (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const sql = ("UPDATE categorias SET ? WHERE id = ?")
    db.query(sql, [{name, email, password}, id], (err, results) =>
        {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Error actualizando usuario');
                }
                res.json(results)
                });
                }

const deleted = (req, res) => {}

module.exports = {
    getOne,
    getAll,
    create,
    update,
    deleted

    }
