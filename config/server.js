const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require("../routes/routes");
const app = express();
const config = require('../config/config')
const PORT = config.PORT;
const morgan = require('morgan');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'../public')))


app.use('/',(req, res)=>{
    return res.status(200).json({
        message: 'Servidor funcionando correctamente',
        status: 200
        })
})
// Define tus rutas
app.use('/api', routes); // Montar las rutas

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});


const server = async() =>{
    try {
        await app.listen(PORT, () => {
            console.log(`API corriendo por: http://localhost:${PORT}`);
        });
                
    } catch (error) {
        throw new Error('Error al iniciar el servidor');
    }
}

module.exports = server;
