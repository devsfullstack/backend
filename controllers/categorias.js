const db = require('../db/db')

const tabla = 'categorias'
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
    const {id, categoria, tipo} = req.body
    
    if(id > 0){
        const sql = (`SELECT * FROM ${tabla} WHERE id_categoria = '${id}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por ID", "${req.user}")`)
    
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                }
                if (results.length === 0) {
                    return res.status(404).send(`Categoria con id '${id}' no existe`);
                    }
                    db.query(sql2)
                    return res.status(200).json({
                        results
    
    
        })
    })
    }else if (categoria){

        const sql = (`SELECT * FROM ${tabla} WHERE categoria = '${categoria}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por categoria", "${req.user}")`)

        db.query(sql, (err, results) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                }
                if (results.length === 0) {
                    return res.status(404).send(`La categoria '${categoria}' no existe`);
                    }
                    db.query(sql2)
                    return res.status(200).json({
                        results
                    })
                })

        }else if(tipo){

            const sql = (`SELECT * FROM ${tabla} WHERE tipo = '${tipo}'`)
            const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Mostrar por tipo", "${req.user}")`)
            
            db.query(sql, (err, results) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(`Error al consultar la tabla: ${tabla}`);
                    }
                    if (results.length === 0) {
                        return res.status(404).send(`La categoria con tipo ${tipo} no existe`);
                        }
                        db.query(sql2)
                        return res.status(200).json({
                            results
                            })
                            })
                    
}}


const create = (req, res) => {

    const { categoria, tipo } = req.body;

    if(!categoria || !tipo){
        return res.status(400).send('Faltan campos por completar')
        }
     
    const sql = (`INSERT INTO ${tabla} (categoria, tipo) VALUES ("${categoria}", "${tipo}")`)
    const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Crear Categoria", "${req.user}")`)
    
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
        const {id, categoria, tipo} = req.body;

        const sql = (`UPDATE ${tabla} SET categoria = '${categoria}', tipo = '${tipo}' WHERE id_categoria = '${id}'`)
        const sql2 = (`INSERT INTO ${tabla2} (modulo, accion, usuario) VALUES ("${tabla}", "Actualizar Usuario", "${req.user}")`)
        
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(`Error actualizando registro en tabla: ${tabla}`)
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send(`La categoria con id '${id}' no existe`)
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
