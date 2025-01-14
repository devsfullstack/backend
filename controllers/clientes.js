const db = require('../db/db')

const tabla = 'clientes'
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
    const {id, cliente, nombre} = req.body
    
    if(id > 0){
        const sql = (`SELECT * FROM ${tabla} WHERE id_cliente = '${id}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por ID", "${req.user}")`)
    
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                }
                if (results.length === 0) {
                    return res.status(404).send(`Cliente con id '${id}' no existe`);
                    }
                    db.query(sql2)
                    return res.status(200).json({
                        results
    
    
        })
    })
    }else if (cliente){

        const sql = (`SELECT * FROM ${tabla} WHERE cliente = '${cliente}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por cliente", "${req.user}")`)

        db.query(sql, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                }
                if (results.length === 0) {
                    return res.status(404).send(`El cliente '${cliente}' no existe`);
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
                        return res.status(404).send(`El cliente ${nombre} no existe`);
                        }
                        db.query(sql2)
                        return res.status(200).json({
                            results
                            })
                            })
                    
}}


const create = (req, res) => {

    const { cliente, nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal, usuaeiomeli, pagweb, saldoinicial, observaciones } = req.body;

    if(!cliente || !nombre || !apellido || !email || !telefono || !direccion || !localidad || !provincia || !dni || !cuit){
        return res.status(400).send('Faltan campos por completar')
        }
     
    const sql = (`INSERT INTO ${tabla} (cliente, nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal, usuaeiomeli, pagweb, saldoinicial, observaciones) VALUES ("${cliente}", "${nombre}", "${apellido}", "${email}", "${telefono}", "${direccion}", "${localidad}", "${provincia}", "${dni}", "${cuit}", "${condicion}", "${razonsocial}", "${domiciliofiscal}", "${localidadfiscal}", "${provinciafiscal}", "${codpostalfiscal}", "${usuaeiomeli}", "${pagweb}", "${saldoinicial}", "${observaciones}")`)
    const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Crear Cliente", "${req.user}")`)
    
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
        const {cliente, nombre, apellido, email, telefono, direccion, localidad, provincia, dni, cuit, condicion, razonsocial, domiciliofiscal, localidadfiscal, provinciafiscal, codpostalfiscal, usuaeiomeli, pagweb, saldoinicial, observaciones} = req.body;

        const sql = (`UPDATE ${tabla} SET cliente = '${cliente}', nombre= '${nombre}', apellido= '${apellido}', email= '${email}', telefono= '${telefono}', direccion= '${direccion}', localidad= '${localidad}', provincia= '${provincia}', dni= '${dni}', cuit= '${cuit}', condicion= '${condicion}', razonsocial= '${razonsocial}', domiciliofiscal= '${domiciliofiscal}', localidadfiscal= '${localidadfiscal}', provinciafiscal= '${provinciafiscal}', codpostalfiscal= '${codpostalfiscal}', usuaeiomeli= '${usuaeiomeli}', pagweb= '${pagweb}', saldoinicial= '${saldoinicial}', observaciones= '${observaciones}' WHERE id_cliente = '${id}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Actualizar Cliente", "${req.user}")`)
        
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(`Error actualizando registro en tabla: ${tabla}`)
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send(`El cliente con id '${id}' no existe`)
                    }
                    db.query(sql2)
                    return res.status(200).json(results)
                    })
    }    

    const deleted = (req,res) =>{
 
        const {id} = req.body;

        const sql = (`DELETE FROM ${tabla} WHERE id_cliente = '${id}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Eliminar Cliente", "${req.user}")`)
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(`Error eliminando registro en tabla: ${tabla}`)
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send(`El cliente con id ${id} no existe`)
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
