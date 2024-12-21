const db = require('../db/db')

const config = require('../config/config')

const tabla = 'proveedores'

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
    const id = req.body
    
    if(id > 0){
        const sql = (`SELECT * FROM ${tabla} WHERE id = ${id}`)
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                }
                if (results.length === 0) {
                    return res.status(404).send(`El proveedor con id ${id} no existe`);
                    }
                    return res.status(200).json({
                        results
    
    
        })
    })
    }else if (user){
        const sql = (`SELECT * FROM ${tabla} WHERE documento = ${documento}`)
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                }
                if (results.length === 0) {
                    return res.status(404).send(`El proveedor con documento ${documento} no existe`);
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
            const sql = (`SELECT * FROM ${tabla} WHERE nombre = ${nombre}`)
            db.query(sql, (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                    }
                    if (results.length === 0) {
                        return res.status(404).send(`El proveedor con nombre ${nombre} no existe`);
                        }
                        return res.status(200).json({
                            results
                            })
                            })

        }
}


const create = (req, res) => {

    const {tipodoc, documento, nombre, razonsocial,direccion,condicion,tipofactura,localidad,provincia,codpostal,telefono,email,saldoinicial} = req.body;
 
    const sql = (`INSERT INTO ${tabla} (tipodoc, documento, nombre, razonsocial,direccion,condicion,tipofactura,localidad,provincia,codpostal,telefono,email,saldoinicial) VALUES ("${tipodoc}", "${documento}", "${nombre}", "${razonsocial}", "${direccion}", "${condicion}","${tipofactura}","${localidad}","${provincia}","${codpostal}","${telefono}","${email}","${saldoinicial}")`)
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