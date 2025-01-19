CREATE DATABASE IF NOT EXISTS poceanico DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE poceanico;

CREATE TABLE IF NOT EXISTS `usuarios` 
(

  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(255) NOT NULL,
  `apellido` VARCHAR(255) NOT NULL,
  `usuario` VARCHAR(255) NOT NULL,
  `contraseña` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `cargo` VARCHAR(255) NOT NULL,
  `rol` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `categorias`
(
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `categoria` VARCHAR(20) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS `cuentas`
(
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `cuenta` varchar(50) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `saldo` float NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 

CREATE TABLE IF NOT EXISTS `comisiones` 
(
  `id` int(11) AUTO_INCREMENT,
  `usuario_id` varchar(20) NOT NULL,
  `status` VarChar(20) NOT NULL,
  `monto` float NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS `registros` 
(
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `modulo` VarChar(20) NOT NULL, 
  `accion` VarChar(20) NOT NULL,
  `usuario` varchar(20) not null,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `presupuestos`
(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `numero` VarChar(20) NOT NULL,
    `estado` VarChar(20) NOT NULL, /* Enum: 'pendiente', 'aceptado', 'rechazado', 'cobrado'*/
    `emision` timestamp NOT NULL,
    `vencimiento` timestamp NOT NULL,
    `cliente_id` varchar(20) NOT NULL,
    `categoria_id`  varchar(20) NOT NULL,
    `productos_id` VarChar(20) NOT NULL,
    `subtotal` float NOT NULL,  /*Suma de los productos */
    `descuento` float NOT NULL, /* Descuento del cliente */
    `iva` float NOT NULL, /* IVA del subtotal */
    `total` float NOT NULL, /* Total con impuestos */
    `formapago` varchar(30) NOT NULL, /* Enum: 'efectivo', 'tarjeta', 'cheque', 'transferencia', 'otros' */
    `metodoenvio` varchar(30) NOT NULL, /* Enum: 'envio', 'recogida', 'otros' */
    `notacliente` varchar(30),  
    `notainterna` varchar(30),  
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (productos_id) REFERENCES productos(id)    
);

CREATE TABLE IF NOT EXISTS `ingresos`
(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `cliente_id` varchar(20) NOT NULL,
    `status` VarChar(20) NOT NULL, /* Enum: 'pendiente', 'aceptado', 'rechazado', 'cobrado', '', */
    `facturatipo` VarChar(20) NOT NULL, /* Enum: 'A', 'B', 'C', 'M', 'E' */
    `categoria_id`  varchar(20) NOT NULL,
    `productos` VarChar(20) NOT NULL,
    `subtotal` float NOT NULL,  /*Suma de los productos */
    `descuento` float NOT NULL, /* Descuento del cliente */
    `subtotalcondesc` float NOT NULL, /* Subtotal con descuento */
    `iva` float NOT NULL, /* IVA del subtotal */
    `total` float NOT NULL, /* Total con impuestos */
    `formapago` varchar(30) NOT NULL, /* Enum: 'efectivo', 'tarjeta', 'cheque', 'transferencia', 'otros' */
    `metodoenvio` varchar(30) NOT NULL, /* Enum: 'envio', 'recogida', 'otros' */
    `cuenta_id` varchar(20) NOT NULL,
    `notacliente` varchar(30),  
    `notainterna` varchar(30),  
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (cuenta_id) REFERENCES cuentas(id)
);

CREATE TABLE IF NOT EXISTS `ventas`
(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `tipo` VarChar(20) NOT NULL, /* Enum: 'presupuesto', 'remito', 'factura' */
    `numero` VarChar(20) NOT NULL,
    `cliente_id` varchar(20) NOT NULL,
    `status` VarChar(20) NOT NULL, /* Enum: 'pendiente', 'aceptado', 'rechazado', 'cobrado', '', */
    `facturatipo` VarChar(20) NOT NULL, /* Enum: 'A', 'B', 'C', 'M', 'E' */
    `categoria_id`  varchar(20) NOT NULL,
    `productos` VarChar(20) NOT NULL,
    `subtotal` float NOT NULL,  /*Suma de los productos */
    `descuento` float NOT NULL, /* Descuento del cliente */
    `subtotalcondesc` float NOT NULL, /* Subtotal con descuento */
    `iva` float NOT NULL, /* IVA del subtotal */
    `total` float NOT NULL, /* Total con impuestos */
    `formapago` varchar(30) NOT NULL, /* Enum: 'efectivo', 'tarjeta', 'cheque', 'cuenta', 'otros' */
    `plazo` varchar(30) NOT NULL, /* Enum: 'contado', '30 dias', '60 dias', '90 dias', 'otros' */
    `metodoenvio` varchar(30) NOT NULL, /* Enum: 'domicilio', 'local', 'otros' */
    `cuenta_id` varchar(20) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (cuenta_id) REFERENCES cuentas(id)

);

CREATE TABLE IF NOT EXISTS `detalleventa`
(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `venta_id` int(11) NOT NULL,
    `productos` int(11) NOT NULL,
    `cantidad` int(11) NOT NULL,
    `precio` float NOT NULL,
    `descuento` float NOT NULL,
    `subtotal` float NOT NULL,
    `iva` float NOT NULL,
    `total` float NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (venta_id) REFERENCES ventas(id)
);


CREATE TABLE IF NOT EXISTS `egresos`
(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `tipo` VarChar(20) NOT NULL, /* Enum: 'compras', 'gastos', 'otros egresos' */
    `proveedor_id` int(11) NOT NULL,
    `categoria_id` int(11) NOT NULL,
    `numero` VarChar(20) NOT NULL,
    `status` VarChar(20) NOT NULL, /* Enum: 'pendiente', 'pagado'*/
    `facturatipo` VarChar(20) NOT NULL, /* Enum: 'A', 'B', 'C', 'M', 'E' */
    `productos` VarChar(20) NOT NULL,
    `subtotal` float NOT NULL,  /*Suma de los productos */
    `descuento` float NOT NULL, /* Descuento del cliente */
    `iva` float NOT NULL, /* IVA del subtotal */
    `total` float NOT NULL, /* Total con impuestos */
    `formapago` varchar(30), /* Enum: 'efectivo', 'tarjeta', 'cheque', 'transferencia', 'otros' */
    `cuenta_id` varchar(20) NOT NULL,
    `notacliente` varchar(30),  
    `notainterna` varchar(30),  
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (cuenta_id) REFERENCES cuentas(id)

);

CREATE TABLE IF NOT EXISTS  `clientes`
(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `cliente` VarChar(20) NOT NULL, /* Enum: 'DNI ', 'Cuit', 'Cuil' */
    `nombre` VarChar(20) NOT NULL, /* DNI, CUIT, CUil */
    `apellido` VarChar(20) NOT NULL,
    `email` VarChar(20) NOT NULL,
    `telefono` VarChar(20) NOT NULL,
    `direccion` VarChar(20) NOT NULL,
    `localidad` VarChar(20) NOT NULL,
    `provincia` VarChar(20) NOT NULL,
    `dni` VarChar(20) NOT NULL,
    `cuit` VarChar(20) NOT NULL,
    `condicion` VarChar(20) NOT NULL, /* Enum: 'Monotributista', 'Consumidor Final', 'Responsable Inscripto', 'Exento' */
    `razonsocial` VarChar(20) NOT NULL,
    `domiciliofiscal` VarChar(20) NOT NULL,
    `localidadfiscal` VarChar(20) NOT NULL,
    `provinciafiscal` VarChar(20) NOT NULL,
    `codpostalfiscal` VarChar(20) NOT NULL,
    `usuariomeli` VarChar(20) NOT NULL,
    `pagweb` VarChar(20) NOT NULL,
    `saldoinicial` float NOT NULL, /* Saldo inicial del proveedor */
    `observaciones` VarChar(20) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS  `proveedores`
(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `nombre` VarChar(20) NOT NULL, /* DNI, CUIT, CUil */
    `apellido` VarChar(20) NOT NULL,
    `email` VarChar(20) NOT NULL,
    `telefono` VarChar(20) NOT NULL,
    `direccion` VarChar(20) NOT NULL,
    `localidad` VarChar(20) NOT NULL,
    `provincia` VarChar(20) NOT NULL,
    `dni` VarChar(20) NOT NULL,
    `cuit` VarChar(20) NOT NULL,
    `condicion` VarChar(20) NOT NULL, /* Enum: 'Monotributista', 'Consumidor Final', 'Responsable Inscripto', 'Exento' */
    `razonsocial` VarChar(20) NOT NULL,
    `domiciliofiscal` VarChar(20) NOT NULL,
    `localidadfiscal` VarChar(20) NOT NULL,
    `provinciafiscal` VarChar(20) NOT NULL,
    `codpostalfiscal` VarChar(20) NOT NULL,
    `usuariomeli` VarChar(20) NOT NULL,
    `pagweb` VarChar(20) NOT NULL,
    `saldoinicial` float NOT NULL, /* Saldo inicial del proveedor */
    `observaciones` VarChar(20) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

CREATE TABLE IF NOT EXISTS `productos`
(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `codigo` VarChar(20) NOT NULL,
    `nombre` VarChar(20) NOT NULL,
    `tipo` VarChar(20) NOT NULL,
    `tipo2` VarChar(20) NOT NULL, /* Enum: 'Servicio', 'Producto' */
    `proveedor_id` varchar(20) NOT NULL, /* Id del proveedor */
    `deposito` varchar(20) NOT NULL,
    `general` int(11) NOT NULL, 
    `stock` varchar(20) NOT NULL,
    `costo` float NOT NULL,
    `ivacompra` float NOT NULL,
    `precioventa` float NOT NULL,
    `ivaventa` float NOT NULL,
    `activo` boolean NOT NULL,
    `mostrarventa` boolean NOT NULL,
    `mostrarcompra` boolean NOT NULL,
    `imagen` varchar(50) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

CREATE TABLE IF NOT EXISTS `registros`
(
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `modulo` VarChar(20) NOT NULL, 
    `accion` VarChar(20) NOT NULL,
    `usuario_id` varchar(20) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS `facturas`
(
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `tipo` VarChar(20) NOT NULL, /* Enum: 'A', 'B', 'C', 'M', 'E' */
  `numero` VarChar(20) NOT NULL,
  `fecha` date NOT NULL,
  `cliente_id` varchar(20) NOT NULL,
  `productos` text NOT NULL,
  `subtotal` float NOT NULL,
  `iva` float NOT NULL,
  `total` float NOT NULL,
  `estado` VarChar(20) NOT NULL, /* Enum: 'Pendiente','Pagada','Anulada' */
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)

  );


/*Para crear la base de datos y crear las tablas en mysql debes importar este documento*/

