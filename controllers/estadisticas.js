const db = require('../db/db');

// Función para calcular el porcentaje de crecimiento
const calcularCrecimiento = (actual, anterior) => {
    if (anterior === 0) return 0;  // Evitar división por cero
    return ((actual - anterior) / anterior) * 100;  // Fórmula para calcular el porcentaje de crecimiento
};


const getStats = (req, res) => {
    try {
        const fechaActual = new Date();
        const fechaAnterior = new Date();
        fechaAnterior.setMonth(fechaActual.getMonth() - 1); // Restar un mes

        // Obtener estadísticas de ventas
        const ventasDataActual = db.query(`SELECT COUNT(*) AS ventasCreadas, AVG(monto) AS ventasPromedio, SUM(monto) AS ingresosTotales FROM ${ventas} WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?`, [fechaActual.getMonth() + 1, fechaActual.getFullYear()]);
        
        const ventasDataAnterior = db.query(`SELECT SUM(monto) AS ingresosTotales FROM ${ventas} WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?`, [fechaAnterior.getMonth() + 1, fechaAnterior.getFullYear()]);

        const ventasCreadas = ventasDataActual.ventasCreadas || 0;
        const ventasPromedio = ventasDataActual.ventasPromedio || 0;
        const ingresosTotales = ventasDataActual.ingresosTotales || 0;
        const ingresosTotalesAnterior = ventasDataAnterior.ingresosTotales;
        
        const porcentajeCrecimientoVentas = calcularCrecimiento(ingresosTotales, ingresosTotalesAnterior);

        // Obtener estadísticas de compras
        const comprasDataActual =  db.query(`SELECT SUM(monto) AS comprasTotales FROM ${compras} WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?`, [fechaActual.getMonth() + 1, fechaActual.getFullYear()]);

        const comprasDataAnterior = db.query(`SELECT SUM(monto) AS comprasTotales FROM ${compras} WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?`, [fechaAnterior.getMonth() + 1, fechaAnterior.getFullYear()]);

        const comprasTotales = comprasDataActual.comprasTotales || 1;
        const comprasTotalesAnterior = comprasDataAnterior.comprasTotales || 1;
        const porcentajeCrecimientoCompras = calcularCrecimiento(comprasTotales, comprasTotalesAnterior);

        // Obtener estadísticas de gastos
        const gastosDataActual = db.query(`SELECT SUM(monto) AS gastosTotales FROM ${gastos} WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?`, [fechaActual.getMonth() + 1, fechaActual.getFullYear()]);

        const gastosDataAnterior = db.query(`SELECT SUM(monto) AS gastosTotales FROM ${gastos} WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?`, [fechaAnterior.getMonth() + 1, fechaAnterior.getFullYear()]);

        const gastosTotales = gastosDataActual.gastosTotales || 1;
        const gastosTotalesAnterior = gastosDataAnterior.gastosTotales || 1;
        const porcentajeCrecimientoGastos = calcularCrecimiento(gastosTotales, gastosTotalesAnterior);

        // Responder con los datos
        return res.status(200).json({
            ventasCreadas,
            ventasPromedio,
            ingresosTotales,
            comprasTotales,
            gastosTotales,
            porcentajeCrecimientoVentas,
            porcentajeCrecimientoCompras,
            porcentajeCrecimientoGastos,
        });

    } catch (err) {
        console.error('Error al obtener las estadísticas:', err);
        res.status(500).json({ error: 'Error al obtener las estadísticas' });
    }
};


module.exports = {
    getStats,
    calcularCrecimiento,
};
