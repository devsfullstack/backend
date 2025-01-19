const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const config = require('../config/config')
const PORT = config.PORT;
const morgan = require('morgan');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'../public')))


// Define tus rutas
app.use('/api', require('../routes/auth'));
app.use('/api', require('../routes/users'))
app.use('/api', require('../routes/categorias'))
app.use('/api', require('../routes/clientes'))
app.use('/api', require('../routes/comisiones'))
app.use('/api', require('../routes/cuentas'))
app.use('/api', require('../routes/egresos'))
app.use('/api', require('../routes/ingresos'))
app.use('/api', require('../routes/registros'))
app.use('/api', require('../routes/presupuestos'))
app.use('/api', require('../routes/productos'))
app.use('/api', require('../routes/proveedores'))
app.use('/api', require('../routes/facturas'))
app.use('/api', require('../routes/estadisticas'))


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
