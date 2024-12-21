const db = require('../db/db')

const config = require('../config/config')

const tabla = 'productos'

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