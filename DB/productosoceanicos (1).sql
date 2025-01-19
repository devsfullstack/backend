-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2025 at 12:22 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `productosoceanicos`
--

-- --------------------------------------------------------

--
-- Table structure for table `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `compras`
--

INSERT INTO `compras` (`id`, `fecha`, `cantidad`, `total`) VALUES
(1, '2025-01-01', 10, '500.00'),
(2, '2025-01-02', 5, '300.00'),
(3, '2025-01-03', 3, '150.00'),
(4, '2025-01-05', 12, '600.00'),
(5, '2025-01-10', 8, '400.00'),
(6, '2025-01-15', 10, '500.00'),
(7, '2025-01-18', 5, '250.00');

-- --------------------------------------------------------

--
-- Table structure for table `gastos`
--

CREATE TABLE `gastos` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `monto` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gastos`
--

INSERT INTO `gastos` (`id`, `fecha`, `descripcion`, `monto`) VALUES
(1, '2025-01-01', 'Gasto en publicidad', '100.00'),
(2, '2025-01-02', 'Gasto en oficina', '150.00'),
(3, '2025-01-03', 'Gasto en transporte', '200.00'),
(4, '2025-01-05', 'Gasto en publicidad', '300.00'),
(5, '2025-01-10', 'Gasto en oficina', '150.00'),
(6, '2025-01-12', 'Gasto en transporte', '200.00'),
(7, '2025-01-15', 'Gasto en comida', '100.00');

-- --------------------------------------------------------

--
-- Table structure for table `resumen`
--

CREATE TABLE `resumen` (
  `id` int(11) NOT NULL,
  `ventas_totales` decimal(10,2) DEFAULT NULL,
  `ingresos_totales` decimal(10,2) DEFAULT NULL,
  `compras_totales` decimal(10,2) DEFAULT NULL,
  `gastos_totales` decimal(10,2) DEFAULT NULL,
  `porcentaje_crecimiento` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `resumen`
--

INSERT INTO `resumen` (`id`, `ventas_totales`, `ingresos_totales`, `compras_totales`, `gastos_totales`, `porcentaje_crecimiento`) VALUES
(1, '100000.00', '80000.00', '50000.00', '20000.00', '15.50');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `rol` enum('admin','empleado') NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `correo`, `contraseña`, `fecha_registro`, `apellido`, `email`, `cargo`, `rol`, `fecha_creacion`) VALUES
(1, 'admin_test', 'Admin', '', '$2b$10$KV8aOOTGgOf7e/L3cOxZwuTNCsaoaugEMHbwjsya9x8m6nSD6ME7W', '2024-12-04 00:10:27', 'Test', 'ejemplo@gmail.com', 'Administrador', 'admin', '2024-12-04 00:10:27');

-- --------------------------------------------------------

--
-- Table structure for table `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` varchar(20) DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ventas`
--

INSERT INTO `ventas` (`id`, `fecha`, `cantidad`, `total`, `estado`) VALUES
(1, '2025-01-14', 5, '1000.00', 'pendiente'),
(2, '2025-01-10', 10, '2000.00', 'pendiente'),
(3, '2025-01-15', 15, '3000.00', 'pendiente'),
(4, '2025-01-20', 7, '1400.00', 'pendiente'),
(5, '2025-01-25', 20, '4000.00', 'pendiente');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resumen`
--
ALTER TABLE `resumen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `gastos`
--
ALTER TABLE `gastos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `resumen`
--
ALTER TABLE `resumen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
