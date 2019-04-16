-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.1.38-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para booktracker
CREATE DATABASE IF NOT EXISTS `booktracker` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `booktracker`;

-- Volcando estructura para tabla booktracker.book
CREATE TABLE IF NOT EXISTS `book` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla booktracker.book: ~1 rows (aproximadamente)
DELETE FROM `book`;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` (`id`, `title`) VALUES
	(1, 'test');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;

-- Volcando estructura para tabla booktracker.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla booktracker.user: ~1 rows (aproximadamente)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `email`, `username`, `password`, `token`) VALUES
	(1, '', 'test', 'test', '');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Volcando estructura para tabla booktracker.user_book_favorite
CREATE TABLE IF NOT EXISTS `user_book_favorite` (
  `id_user` int(11) unsigned DEFAULT NULL,
  `id_book` int(11) unsigned DEFAULT NULL,
  KEY `Índice 1` (`id_user`),
  KEY `Índice 2` (`id_book`),
  CONSTRAINT `user_book_favorite_ibfk_1` FOREIGN KEY (`id_book`) REFERENCES `book` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `user_book_favorite_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla booktracker.user_book_favorite: ~1 rows (aproximadamente)
DELETE FROM `user_book_favorite`;
/*!40000 ALTER TABLE `user_book_favorite` DISABLE KEYS */;
INSERT INTO `user_book_favorite` (`id_user`, `id_book`) VALUES
	(1, 1);
/*!40000 ALTER TABLE `user_book_favorite` ENABLE KEYS */;

-- Volcando estructura para tabla booktracker.user_book_pending
CREATE TABLE IF NOT EXISTS `user_book_pending` (
  `id_user` int(11) unsigned DEFAULT NULL,
  `id_book` int(11) unsigned DEFAULT NULL,
  KEY `Índice 1` (`id_user`),
  KEY `Índice 2` (`id_book`),
  CONSTRAINT `user_book_pending_ibfk_1` FOREIGN KEY (`id_book`) REFERENCES `book` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `user_book_pending_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla booktracker.user_book_pending: ~1 rows (aproximadamente)
DELETE FROM `user_book_pending`;
/*!40000 ALTER TABLE `user_book_pending` DISABLE KEYS */;
INSERT INTO `user_book_pending` (`id_user`, `id_book`) VALUES
	(1, 1);
/*!40000 ALTER TABLE `user_book_pending` ENABLE KEYS */;

-- Volcando estructura para tabla booktracker.user_book_read
CREATE TABLE IF NOT EXISTS `user_book_read` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) unsigned DEFAULT NULL,
  `id_book` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Índice 1` (`id_user`),
  KEY `Índice 2` (`id_book`),
  CONSTRAINT `FK_user_book_read_book` FOREIGN KEY (`id_book`) REFERENCES `book` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `FK_user_book_read_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla booktracker.user_book_read: ~1 rows (aproximadamente)
DELETE FROM `user_book_read`;
/*!40000 ALTER TABLE `user_book_read` DISABLE KEYS */;
INSERT INTO `user_book_read` (`id`, `id_user`, `id_book`) VALUES
	(1, 1, 1);
/*!40000 ALTER TABLE `user_book_read` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
