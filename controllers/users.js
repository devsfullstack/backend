const db = require('../db/db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

const tabla = 'usuarios'
const tabla2 = 'registros'

const getAll = (req, res) => {

    const sql = (`SELECT * FROM ${tabla} ORDER BY created_at DESC`)
    const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar todo", "${req.user}")`)

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
            }
            db.query(sql2)
            return res.status(200).json({
                results
            })
            });
            };


const getOne = (req, res) => {
    const {id, usuario, email, nombre, cargo, rol} = req.body
    const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar uno", "${req.user}")`)
    
    if(id > 0){
        const sql = (`SELECT * FROM ${tabla} WHERE id_user = '${id}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por ID", "${req.user}")`)
    
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                }
                if (results.length === 0) {
                    return res.status(404).send(`El usuario con id '${id}' no existe`);
                    }
                    db.query(sql2)
                    return res.status(200).json({
                        results
    
    
        })
    })
    }else if (usuario){
        const sql = (`SELECT * FROM ${tabla} WHERE usuario = '${usuario}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por usuario", "${req.user}")`)
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                }
                if (results.length === 0) {
                    return res.status(404).send(`El usuario '${usuario}' no existe`);
                    }
                    db.query(sql2)
                    return res.status(200).json({
                        results
                    })
                })

        }else if(email){
            const sql = (`SELECT * FROM ${tabla} WHERE email = '${email}'`)
            const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por email", "${req.user}")`)
            
            db.query(sql, (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                    }
                    if (results.length === 0) {
                        return res.status(404).send(`El usuario con email ${email} no existe`);
                        }
                        db.query(sql2)
                        return res.status(200).json({
                            results
                            })
                            })
        }else if(nombre){
            const sql = (`SELECT * FROM ${tabla} WHERE nombre = '${nombre}'`)
            const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por nombre", "${req.user}")`)
            db.query(sql, (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                    }
                    if (results.length === 0) {
                        return res.status(404).send(`El usuario con nombre ${nombre} no existe`);
                        }
                        db.query(sql2)
                        return res.status(200).json({
                            results
                            })
                            })

        }else if(cargo){
            const sql = (`SELECT * FROM ${tabla} WHERE cargo = '${cargo}'`)
            const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por cargo", "${req.user}")`)
            db.query(sql, (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                    }
                    if (results.length === 0) {
                        return res.status(404).send(`El usuario con cargo ${cargo} no existe`);
                        }
                        db.query(sql2)
                        return res.status(200).json({
                            results
                            })
                            })
        }else if(rol){
            const sql = (`SELECT * FROM ${tabla} WHERE rol = '${rol}'`)
            const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por rol", "${req.user}")`)
           
            db.query(sql, (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                    }
                    if (results.length === 0) {
                        return res.status(404).send(`El usuario con rol ${rol} no existe`);
                        }
                        db.query(sql2)
                        return res.status(200).json({
                            results
                            })
                            })
                        }
                    
}


const create = (req, res) => {

    const { nombre, apellido, usuario, contraseña, email, cargo, rol } = req.body;

    if(!nombre || !apellido || !usuario || !contraseña || !email || !cargo || !rol){
        return res.status(400).send('Faltan campos por completar')
        }
    


    const password2 = bcrypt.hashSync(contraseña, 10);
 
    const sql = (`INSERT INTO ${tabla} (nombre, apellido, usuario, contraseña, email, cargo, rol) VALUES ("${nombre}", "${apellido}", "${usuario}", "${password2}", "${email}", "${cargo}","${rol}")`)
    const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Crear Usuario", "${req.user}")`)
    
    db.query(sql, (err, results) => {
        if (err) { 
            return res.status(500).send(`Error creando registro en tabla: ${tabla}`) 
        }else{
        db.query(sql2)    
        return res.status(200).json(results)
        }
    });

}



    const update = (req, res)=>{
        const {id, nombre, apellido, usuario, contraseña, email, cargo, rol} = req.body;

        const hashedPassword = bcrypt.hashSync(contraseña, 10);

        const sql = (`UPDATE ${tabla} SET nombre = '${nombre}', apellido = '${apellido}', usuario = '${usuario}', contraseña = '${hashedPassword}', email = '${email}', cargo = '${cargo }', rol = '${rol}' WHERE id_user = '${id}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Actualizar Usuario", "${req.user}")`)
        
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(`Error actualizando registro en tabla: ${tabla}`)
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send(`El usuario con id '${id}' no existe`)
                    }
                    db.query(sql2)
                    return res.status(200).json(results)
                    })
    }    

    const deleted = (req,res) =>{
        const {id} = req.body;

        const sql = (`DELETE FROM ${tabla} WHERE id_user = '${id}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Eliminar Usuario", "${req.user}")`)
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(`Error eliminando registro en tabla: ${tabla}`)
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send(`El usuario con id ${id} no existe`)
                    }
                    db.query(sql2)
                    return res.status(200).json(results)
                    })
    }
    
module.exports = {
    getOne,
    getAll,
    create,
    update,
    deleted
}
