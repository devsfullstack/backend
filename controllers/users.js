const db = require('../db/db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

const tabla = 'usuarios'

const getAll = (req, res) => {

    const sql = (`SELECT * FROM ${tabla}`)
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


const getOne = (req, res) => {
    const {id, user, email, nombre} = req.body
    
    if(id > 0){
        const sql = (`SELECT * FROM ${tabla} WHERE id = '${id}'`)
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                }
                if (results.length === 0) {
                    return res.status(404).send(`El usuario con id '${id}' no existe`);
                    }
                    return res.status(200).json({
                        results
    
    
        })
    })
    }else if (user){
        const sql = (`SELECT * FROM ${tabla} WHERE user = '${user}'`)
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                }
                if (results.length === 0) {
                    return res.status(404).send(`El usuario '${user}' no existe`);
                    }
                    return res.status(200).json({
                        results
                    })
                })
        }else if(email){
            const sql = (`SELECT * FROM ${tabla} WHERE email = '${email}'`)
            db.query(sql, (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                    }
                    if (results.length === 0) {
                        return res.status(404).send(`El usuario con email ${email} no existe`);
                        }
                        return res.status(200).json({
                            results
                            })
                            })
        }else if(nombre){
            const sql = (`SELECT * FROM ${tabla} WHERE nombre = '${nombre}'`)
            db.query(sql, (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                    }
                    if (results.length === 0) {
                        return res.status(404).send(`El usuario con nombre ${nombre} no existe`);
                        }
                        return res.status(200).json({
                            results
                            })
                            })

        }
}


const create = (req, res) => {

    const { nombre, apellido, usuario, contraseña, email, cargo, rol } = req.body;


    const password2 = bcrypt.hashSync(contraseña, 10);
 
    const sql = (`INSERT INTO ${tabla} (nombre, apellido, usuario, contraseña, email, cargo, rol) VALUES ("${nombre}", "${apellido}", "${usuario}", "${password2}", "${email}", "${cargo}","${rol}")`)
    db.query(sql, (err, results) => {
        if (err) { return res.status(500).send(`Error creando registro en tabla: ${tabla}`) }
            
        return res.status(200).json(results)});

        }



    const update = (req, res)=>{}    

    const deleted = (req,res) =>{}
    
module.exports = {
    getOne,
    getAll,
    create,
    update,
    deleted
}
