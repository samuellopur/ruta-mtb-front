-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 12-09-2025 a las 20:13:53
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ruta_mtb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE IF NOT EXISTS `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(50) DEFAULT NULL,
  `descripcion_categoria` varchar(200) DEFAULT NULL,
  `texto_alt` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`, `descripcion_categoria`, `texto_alt`) VALUES
(1, 'Bicicletas', 'Bicicletas de montaña MTB', 'Categoría bicicletas'),
(2, 'Accesorios', 'Accesorios para ciclismo MTB', 'Categoría accesorios'),
(3, 'Cascos', 'Cascos de protección MTB', 'Categoría cascos'),
(4, 'Badanas', 'Pantalonetas y badanas para ciclistas', 'Categoría badanas'),
(5, 'Jersey', 'Camisetas y jerseys de ciclismo', 'Categoría jersey'),
(6, 'Zapatillas', 'Zapatillas especiales para ciclismo MTB', 'Categoría zapatillas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
CREATE TABLE IF NOT EXISTS `detalle_pedido` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `id_producto` int DEFAULT NULL,
  `id_pedido` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `id_producto` (`id_producto`),
  KEY `id_pedido` (`id_pedido`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`id_detalle`, `id_producto`, `id_pedido`, `cantidad`, `precio_unitario`, `subtotal`) VALUES
(1, 1, 1, 1, 7500.00, 7500.00),
(2, 2, 2, 1, 450.00, 450.00),
(3, 3, 3, 2, 300.00, 600.00),
(4, 4, 4, 1, 220.00, 220.00),
(5, 5, 5, 1, 600.00, 600.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen`
--

DROP TABLE IF EXISTS `imagen`;
CREATE TABLE IF NOT EXISTS `imagen` (
  `id_imagen` int NOT NULL AUTO_INCREMENT,
  `url` varchar(200) DEFAULT NULL,
  `descripcion_imagen` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_imagen`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `imagen`
--

INSERT INTO `imagen` (`id_imagen`, `url`, `descripcion_imagen`) VALUES
(1, '/img/bici_mtb1.png', 'Bicicleta MTB de carbono'),
(2, '/img/casco1.png', 'Casco aerodinámico MTB'),
(3, '/img/badana1.png', 'Badana acolchada para ciclista'),
(4, '/img/jersey1.png', 'Jersey transpirable MTB'),
(5, '/img/zapatilla1.png', 'Zapatilla con calas para MTB');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

DROP TABLE IF EXISTS `pago`;
CREATE TABLE IF NOT EXISTS `pago` (
  `id_pago` int NOT NULL AUTO_INCREMENT,
  `id_detalle` int DEFAULT NULL,
  `metodo_pago` varchar(20) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha_pago` date DEFAULT NULL,
  `estado_pago` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_pago`),
  KEY `id_detalle` (`id_detalle`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`id_pago`, `id_detalle`, `metodo_pago`, `monto`, `fecha_pago`, `estado_pago`) VALUES
(16, 1, 'Tarjeta de Crédito', 7500.00, '2025-02-10', 'Aprobado'),
(17, 2, 'PayPal', 450.00, '2025-02-11', 'Aprobado'),
(18, 3, 'Efectivo', 600.00, '2025-02-12', 'Pendiente'),
(19, 4, 'Transferencia', 220.00, '2025-02-13', 'Aprobado'),
(20, 5, 'Tarjeta Débito', 600.00, '2025-02-14', 'Aprobado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

DROP TABLE IF EXISTS `pedido`;
CREATE TABLE IF NOT EXISTS `pedido` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `fecha`, `id_usuario`, `estado`) VALUES
(1, '2025-02-10', 1, 'Pendiente'),
(2, '2025-02-11', 2, 'Pagado'),
(3, '2025-02-12', 3, 'Pendiente'),
(4, '2025-02-13', 4, 'Enviado'),
(5, '2025-02-14', 5, 'Pagado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(50) DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `descripcion_producto` varchar(200) DEFAULT NULL,
  `id_imagen` int DEFAULT NULL,
  `sexo` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_imagen` (`id_imagen`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre_producto`, `id_categoria`, `precio`, `stock`, `descripcion_producto`, `id_imagen`, `sexo`) VALUES
(1, 'Bicicleta MTB Carbon Pro', 1, 7500.00, 10, 'Bicicleta de montaña en carbono, suspensión delantera', 1, 'Unisex'),
(2, 'Casco Fox MTB', 3, 450.00, 25, 'Casco ligero con ventilación para MTB', 2, 'Unisex'),
(3, 'Badana Specialized Pro', 4, 300.00, 40, 'Badana acolchada de alta comodidad', 3, 'Hombre'),
(4, 'Jersey Scott MTB', 5, 220.00, 30, 'Jersey transpirable con tecnología DryFit', 4, 'Mujer'),
(5, 'Zapatillas Shimano MTB', 6, 600.00, 20, 'Zapatillas con calas para pedales automáticos', 5, 'Unisex');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(60) NOT NULL,
  `direccion` varchar(70) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `email`, `direccion`, `telefono`, `fecha_registro`) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@example.com', 'Calle 10 #45-23, Bogotá', '3001234567', '2025-01-15'),
(2, 'María', 'López', 'maria.lopez@example.com', 'Carrera 15 #78-12, Medellín', '3109876543', '2025-01-20'),
(3, 'Carlos', 'Gómez', 'carlos.gomez@example.com', 'Av. Siempre Viva 123, Cali', '3156549870', '2025-01-25'),
(4, 'Ana', 'Torres', 'ana.torres@example.com', 'Cra 7 #32-45, Barranquilla', '3012223344', '2025-02-01'),
(5, 'Pedro', 'Ruiz', 'pedro.ruiz@example.com', 'Cll 45 #12-09, Bucaramanga', '3125556677', '2025-02-05');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`id_detalle`) REFERENCES `detalle_pedido` (`id_detalle`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`id_imagen`) REFERENCES `imagen` (`id_imagen`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
