-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-08-2024 a las 23:56:25
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `torneo_react`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centros_formacion`
--

CREATE TABLE `centros_formacion` (
  `id` int(11) NOT NULL,
  `codigo_centro` int(11) NOT NULL,
  `idDepto` int(11) NOT NULL,
  `id_municipio` int(11) NOT NULL,
  `nombre_centro` varchar(120) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `centros_formacion`
--

INSERT INTO `centros_formacion` (`id`, `codigo_centro`, `idDepto`, `id_municipio`, `nombre_centro`, `createdat`, `updatedat`) VALUES
(1, 69000, 3, 3, 'agropeccuario', '2024-08-31 19:35:53', '2024-08-31 19:35:53'),
(2, 40122, 10, 10, 'sena de casanare', '2024-08-28 22:21:02', '2024-08-28 22:21:02'),
(3, 9877, 1, 1, 'nose', '2024-08-17 19:24:44', '2024-08-17 19:24:44'),
(4, 0, 0, 0, '', '2024-08-16 22:01:34', '2024-08-16 22:01:34'),
(5, 56212, 7, 7, 'sena de yopal sena', '2024-08-15 00:20:11', '2024-08-15 00:20:11'),
(6, 8723, 1, 1, 'sena', '2024-08-28 22:23:09', '2024-08-28 22:23:09'),
(7, 0, 0, 0, '', '2024-08-14 23:55:17', '2024-08-14 23:55:17'),
(8, 9887, 5, 5, 'prueba', '2024-08-14 22:40:51', '2024-08-14 22:40:51'),
(9, 0, 0, 0, '', '2024-08-15 00:24:22', '2024-08-15 00:24:22'),
(10, 2069044, 2, 2, 'sena 2024', '2024-08-15 00:14:54', '2024-08-15 00:14:54'),
(11, 2344, 6, 6, 'edd', '2024-08-15 00:10:07', '2024-08-15 00:10:07'),
(12, 1211, 2, 2, 'asww', '2024-08-15 00:04:18', '2024-08-15 00:04:18'),
(13, 3222, 1, 1, 'andres', '2024-08-15 00:10:55', '2024-08-15 00:10:55'),
(14, 21233, 1, 1, ' Centro de Formación Amazonas', '2024-08-15 00:20:24', '2024-08-15 00:20:24'),
(15, 345667, 3, 3, 'ARAUCA', '2024-08-15 00:22:35', '2024-08-15 00:22:35'),
(16, 2112, 8, 8, 'AAAAA', '2024-08-15 00:21:35', '2024-08-15 00:21:35'),
(17, 4568, 3, 3, 'TEST', '2024-08-28 23:20:13', '2024-08-28 23:20:13'),
(18, 456, 6, 6, 'sena de cartagena', '2024-08-16 21:45:59', '2024-08-16 21:45:59'),
(19, 121, 2, 2, 'aa', '2024-08-17 02:43:30', '2024-08-17 02:43:30'),
(20, 0, 0, 0, '', '2024-08-21 23:01:33', '2024-08-21 23:01:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE `departamentos` (
  `idDepartamento` int(11) NOT NULL,
  `DepNombre` varchar(20) NOT NULL,
  `CodigoRegional` int(11) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`idDepartamento`, `DepNombre`, `CodigoRegional`, `createdat`, `updatedat`) VALUES
(1, 'Amazonas', 942, '2024-06-24 17:35:35', '2024-06-24 16:58:12'),
(2, 'Antioquia', 943, '2024-06-24 17:35:52', '2024-06-24 16:58:12'),
(3, 'Arauca', 506, '2024-06-24 17:36:18', '2024-06-24 16:58:12'),
(4, 'Atlántico', 507, '2024-06-24 17:36:27', '2024-06-24 16:58:12'),
(5, 'Bogotá D.C.', 924, '2024-06-24 17:36:37', '2024-06-24 16:58:12'),
(6, 'Bolívar', 925, '2024-06-24 17:37:06', '2024-06-24 16:58:12'),
(7, 'Boyacá', 801, '2024-06-24 17:37:24', '2024-06-24 16:58:12'),
(8, 'Caldas', 802, '2024-06-24 17:37:34', '2024-06-24 16:58:12'),
(9, 'Caquetá', 1, '2024-06-24 17:37:38', '2024-06-24 16:58:12'),
(10, 'Casanare', 2, '2024-06-24 17:37:41', '2024-06-24 16:58:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipios`
--

CREATE TABLE `municipios` (
  `id` int(11) NOT NULL,
  `McipioCodigo` int(11) NOT NULL,
  `mcipioNombre` varchar(200) NOT NULL,
  `idDepto` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `municipios`
--

INSERT INTO `municipios` (`id`, `McipioCodigo`, `mcipioNombre`, `idDepto`, `createdAt`, `updatedAt`) VALUES
(1, 91001, 'Leticia', 1, '2024-06-26 00:13:31', '2024-06-26 00:13:31'),
(2, 5001, 'Medellín', 2, '2024-06-26 00:13:32', '2024-06-26 00:13:32'),
(3, 81001, 'Arauca', 3, '2024-06-26 00:13:32', '2024-06-26 00:13:32'),
(4, 8001, 'Barranquilla', 4, '2024-06-26 00:13:32', '2024-06-26 00:13:32'),
(5, 11001, 'Bogotá', 5, '2024-06-26 00:13:32', '2024-06-26 00:13:32'),
(6, 13001, 'Cartagena', 6, '2024-06-26 00:13:32', '2024-06-26 00:13:32'),
(7, 15001, 'Tunja', 7, '2024-06-26 00:13:32', '2024-06-26 00:13:32'),
(8, 17001, 'Manizales', 8, '2024-06-26 00:13:32', '2024-06-26 00:13:32'),
(9, 18001, 'Florencia', 9, '2024-06-26 00:13:32', '2024-06-26 00:13:32'),
(10, 85001, 'Yopal', 10, '2024-06-26 00:13:32', '2024-06-26 00:13:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `documento` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `genero` enum('F','M','O') NOT NULL,
  `foto` varchar(200) DEFAULT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `players`
--

INSERT INTO `players` (`id`, `documento`, `nombres`, `apellidos`, `genero`, `foto`, `createdat`, `updatedat`) VALUES
(3, 22221, 'luis', 'Perez', 'F', NULL, '2024-06-24 22:20:25', '2024-08-16 22:02:15'),
(7, 983, 'María', 'Perez', 'F', '1720150764672.jpg', '2024-07-05 03:39:24', '2024-07-05 03:39:24'),
(8, 32223, 'Alejandra', 'López', 'F', '1720322860678.jpg', '2024-07-07 03:27:40', '2024-07-07 03:27:40'),
(10, 433, 'luis', 'López', 'M', NULL, '2024-08-17 02:29:20', '2024-08-17 02:29:20'),
(11, 987, 'pedro', 'López', 'M', '1724887247901.jpg', '2024-08-28 23:20:47', '2024-08-28 23:20:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `createdat` timestamp NULL DEFAULT NULL,
  `updatedat` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdat`, `updatedat`) VALUES
(1, 'andres', 'Andres5@gmail.com', '$2a$08$9eCzUAoqm67CqHx7xMcrlOHsqFoAQh61fS74Nd/vQbGYUVz13KrCK', '2024-07-07 02:02:15', '2024-07-07 02:02:15'),
(2, 'luis', 'alex1@gmail.com', '$2a$08$o.OIjSExY1jhYfTHC4dXau0VIREFKGABKTjCdDJvsjdoDHdgEzc9.', '2024-07-07 02:05:56', '2024-07-07 02:05:56'),
(3, 'Andres', 'andresossa@gmail.com', '$2a$08$hJ7Uf3Fj17PdJ/K828u3.eBHeO2QuZOsd6H.xSR4BIOkX4.3zhKy6', '2024-07-07 02:39:10', '2024-07-07 02:39:10'),
(4, 'PIMENTEL', 'PIMENTELossa@gmail.com', '$2a$08$2TmDWkcz.60X7mXBvnnTiu7ahIBDQ/t5nQwQcoKW1.sXJjr1I3te.', '2024-07-07 02:42:47', '2024-07-07 02:42:47'),
(5, 'LOPEZ', 'andreslopez@gmail.com', '$2a$08$yCb9IqkkUy2/FYCrnxrBt.dgxQNgAGVUUq8HV4TXoVyCsjTb924IO', '2024-07-07 02:44:39', '2024-07-07 02:44:39'),
(6, '', '', '$2a$08$N19SGkwOQem6dKc1imdLReSrQNAmK6supRa5aheVpUlTIggQOp5Ti', '2024-07-29 22:17:06', '2024-07-29 22:17:06'),
(7, 'pepito', 'pepito2024@gmail.com', '$2a$08$6N83Cqb8BzYSU5XpTWquHeKNUSseQPY7Kx0nL3jSnDAt7/qIlDNn2', '2024-08-06 22:09:14', '2024-08-06 22:09:14'),
(8, 'hola', 'andresossa65@gmail.com', '$2a$08$/VrffPxxrTHjiTePksLW0umdVj08dYX8Ux0vhnm5REagTuY0eweaO', '2024-08-16 22:57:55', '2024-08-16 22:57:55'),
(9, 'pedro', 'andresossa64@gmail.com', '$2a$08$.E3Wb3u1RYseUmOJ48YqBeAgl1sJDigimy9YPRq9qWB8EHfyXAzLy', '2024-08-16 22:59:10', '2024-08-16 22:59:10'),
(10, 'andres', 'andresossa018@gmail.com', '$2a$08$nob2CqcEpHkhi.xXAg93uuSLrlPhS5QwVOtDicSgIMYgImcLm/IgS', '2024-08-16 23:13:29', '2024-08-16 23:13:29'),
(11, 'jose', 'joselopez@gmail.com', '$2a$08$MAJCgL47DUUsABu/3VksweHmBHaI8Mpg.fv/.Iqk4o8HTREiNeuTi', '2024-08-16 23:15:30', '2024-08-16 23:15:30'),
(12, 'luis', 'luis@GMAIL.COM', '$2a$08$OMdLqO0hyqq54Ym.n.3l.e196..xam2hrDn2esyzysCCHPDi73sye', '2024-08-17 17:30:27', '2024-08-17 17:30:27'),
(13, 'luis', 'luisossa1@gmail.com', '$2a$08$R8H5fXkX/FJGSdsRi8AlUOBlF2nfT4du.lFtlcbtCcpuW9DdtnjLu', '2024-08-17 17:44:44', '2024-08-17 17:44:44'),
(14, 'jorgeelcurioso', 'jorgeelcurioso@gmail.com', '$2a$08$9nz78TjW025NzHNX2xGTBukFl95VqQoyujhMRuk6S3pacMMzipWHu', '2024-08-17 18:11:56', '2024-08-17 18:11:56'),
(15, 'pedro', 'pedrosanchez@gmail.com', '$2a$08$tULXZ0V/kPFWNHmzDuUHzOIcFoXGp/mrcsVPSgsZvISBjqDXTVtK6', '2024-08-17 19:18:06', '2024-08-17 19:18:06'),
(16, 'kiko', 'kico1@gmail.com', '$2a$08$SMKmea9gEKZuqciaVNQGKuYByJvHR9cZb6jNoncZJz8VHbIG/p4Ey', '2024-08-17 19:19:02', '2024-08-17 19:19:02'),
(17, 'laura', 'lauraa1@gmail.com', '$2a$08$FdG22R7lJUACXtX5Vq711.4xDeLgeOMmSXESMvLxnVlxonr9p237W', '2024-08-17 19:22:15', '2024-08-17 19:22:15'),
(18, 'lara', 'lara1@gmail.com', '$2a$08$HEOm40.6TbO2fKI0oP54nuHtEK401JF2wBSV2ZpKS.fLkrmZZOUku', '2024-08-17 19:23:17', '2024-08-17 19:23:17'),
(19, 'nene', 'nene@gmail.com', '$2a$08$4SKIOAZqmgdpCKOWjRByUuNUQkmlXtDDVWEy06wU31E5x7BGzvnry', '2024-08-17 20:15:57', '2024-08-17 20:15:57'),
(20, 'admin', 'andresossa078@gmail.com', '$2a$08$zMoxmLdAl7Z7Pn06XlvFiOz4Qx1rzB9YvH42.QxNp0shLgJ6mh/PC', '2024-08-17 20:52:34', '2024-08-17 20:52:34'),
(21, 'vaca', 'vaca078@gmail.com', '$2a$08$qol05T4aZ9zzzkxTDzuMBu239e3mAN.9xyTPI/u.8FYBjyRw5FkNe', '2024-08-17 21:41:02', '2024-08-17 21:41:02'),
(22, 'ANDRES', 'ANDRES@gmail.com', '$2a$08$qjHtKwRGkniXZdkPHM4w2.X5fciVHGb.yjQYTejdfLDvSqSj1BW9G', '2024-08-21 22:28:18', '2024-08-21 22:28:18'),
(23, '', 'andresossa07@gmail.com', '$2a$06$cF4HYQqFkDmdPIgzYmQtFOFLTnayIZ3ktXjFAVaJ/uARIGF3KwLFq', '2024-08-29 23:55:24', '2024-08-29 23:55:24'),
(24, 'JUAN', 'JUAN078@gmail.com', '$2a$06$0GOixle6ZtfuFWWB2lENBuE753M9Ts5DzHqIQvBgkrtJaRXG84vhy', '2024-08-31 19:38:42', '2024-08-31 19:38:42');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `centros_formacion`
--
ALTER TABLE `centros_formacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codigo_centro` (`codigo_centro`),
  ADD KEY `id_municipio` (`id_municipio`);

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`idDepartamento`);

--
-- Indices de la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `centros_formacion`
--
ALTER TABLE `centros_formacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `idDepartamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
