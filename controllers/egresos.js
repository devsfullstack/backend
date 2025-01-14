const db = require('../db/db')

const tabla = 'egresos'
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
    const {id, tipo, proveedor, categoria, numero, status, facturatipo, productos, subtotal, descuento, iva, total, formapago, cuenta, notacliente, notainterna } = req.body
    
    if(id > 0){
        const sql = (`SELECT * FROM ${tabla} WHERE id_egresos = '${id}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por ID", "${req.user}")`)
    
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                }
                if (results.length === 0) {
                    return res.status(404).send(`Egreso con id '${id}' no existe`);
                    }
                    db.query(sql2)
                    return res.status(200).json({
                        results
    
    
        })
    })
    }else if (tipo){

        const sql = (`SELECT * FROM ${tabla} WHERE tipo = '${tipo}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por tipo", "${req.user}")`)

        db.query(sql, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                }
                if (results.length === 0) {
                    return res.status(404).send(`El tipo '${tipo}' no existe`);
                    }
                    db.query(sql2)
                    return res.status(200).json({
                        results
                    })
                })

        }else if(numero){

            const sql = (`SELECT * FROM ${tabla} WHERE numero = '${numero}'`)
            const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por numero", "${req.user}")`)
            
            db.query(sql, (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                    }
                    if (results.length === 0) {
                        return res.status(404).send(`El egreso tipo ${tipo} no existe`);
                        }
                        db.query(sql2)
                        return res.status(200).json({
                            results
                            })
                            })
                    
        }else if(status){

            const sql = (`SELECT * FROM ${tabla} WHERE numero = '${numero}'`)
            const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por status", "${req.user}")`)
            
            db.query(sql, (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                    }
                    if (results.length === 0) {
                        return res.status(404).send(`El egreso con status ${status} no existe`);
                        }
                        db.query(sql2)
                        return res.status(200).json({
                            results
                            })
                            })
                    
        }else if(facturatipo){

            const sql = (`SELECT * FROM ${tabla} WHERE numero = '${numero}'`)
            const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por tipo de factura", "${req.user}")`)
            
            db.query(sql, (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                    }
                    if (results.length === 0) {
                        return res.status(404).send(`La factura tipo ${facturatipo} no existe`);
                        }
                        db.query(sql2)
                        return res.status(200).json({
                            results
                            })
                            })
                    
}



}


const create = (req, res) => {

    const {id, tipo, proveedor, categoria, numero, status, facturatipo, productos, subtotal, descuento, iva, total, formapago, cuenta, notacliente, notainterna } = req.body;

    if(!tipo || !proveedor || !categoria || !numero || !status || !facturatipo || !productos || !subtotal || !descuento || !iva || !total || !formapago || !cuenta || !notacliente || !notainterna){
        return res.status(400).send('Faltan campos por completar')
        }
     
    const sql = (`INSERT INTO ${tabla} (tipo, proveedor, categoria, numero, status, facturatipo, productos, subtotal, descuento, iva, total, formapago, cuenta, notacliente, notainterna) VALUES ("${tipo}", "${proveedor}", "${categoria}", "${numero}", "${status}", "${facturatipo}", "${productos}", "${subtotal}", "${descuento}", "${iva}", "${total}", "${formapago}", "${cuenta}", "${notacliente}", "${notainterna}")`)
    const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Crear Egreso", "${req.user}")`)
    
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
        const {id, tipo, proveedor, categoria, numero, status, facturatipo, productos, subtotal, descuento, iva, total, formapago, cuenta, notacliente, notainterna } = req.body;

        const sql = (`UPDATE ${tabla} SET tipo = '${tipo}', proveedor = '${proveedor}', categoria = '${categoria}', numero='${numero}', status='${status}', facturatipo='${facturatipo}', productos='${productos}', subtotal='${subtotal}', descuento='${descuento}', iva='${iva}', total='${total}', formapago='${formapago}', cuenta='${cuenta}', notacliente='${notacliente}', notainterna='${notainterna}' WHERE id_categoria = '${id}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Actualizar Egreso", "${req.user}")`)
        
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(`Error actualizando registro en tabla: ${tabla}`)
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send(`Egreso con id '${id}' no existe`)
                    }
                    db.query(sql2)
                    return res.status(200).json(results)
                    })
    }    

    const deleted = (req,res) =>{
 
        const {id} = req.body;

        const sql = (`DELETE FROM ${tabla} WHERE id_categoria = '${id}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Eliminar Usuario", "${req.user}")`)
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(`Error eliminando registro en tabla: ${tabla}`)
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send(`La categoria con id ${id} no existe`)
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
