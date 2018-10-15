/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.6.17 : Database - usobackend
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`usobackend` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `usobackend`;

/*Table structure for table `domicilio` */

DROP TABLE IF EXISTS `domicilio`;

CREATE TABLE `domicilio` (
  `id_domicilio` int(10) NOT NULL AUTO_INCREMENT,
  `calle` varchar(20) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_domicilio`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

/*Data for the table `domicilio` */

insert  into `domicilio`(`id_domicilio`,`calle`,`numero`) values (5,'9 de Julio','158'),(7,'FALSA','1234'),(11,'unaCalle','123'),(18,'Padre Arce','56');

/*Table structure for table `persona2` */

DROP TABLE IF EXISTS `persona2`;

CREATE TABLE `persona2` (
  `id_persona` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `legajo` int(5) DEFAULT NULL,
  `titulo` varchar(20) DEFAULT NULL,
  `estado` varchar(1) NOT NULL,
  `fk_domicilio` int(10) NOT NULL,
  PRIMARY KEY (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

/*Data for the table `persona2` */

insert  into `persona2`(`id_persona`,`nombre`,`apellido`,`legajo`,`titulo`,`estado`,`fk_domicilio`) values (15,'Alberto','Cortez',NULL,'Licenciado','P',5),(18,'Pepe','Grillo',99999,NULL,'A',7),(22,'Emma','Caceres',55555,NULL,'A',11),(29,'DAvid','Senese',NULL,'Tecnico Superior en ','P',18);

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(40) DEFAULT NULL,
  `clave_usuario` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `usuario` */

insert  into `usuario`(`id_usuario`,`nombre_usuario`,`clave_usuario`) values (1,'admin','202cb962ac59075b964b07152d234b70');

CREATE TABLE `mascota` (
  `id_mascota` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) DEFAULT NULL,
  `raza` varchar(40) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `tipoEdad` varchar(40) DEFAULT NULL,
  `sexo` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id_mascota`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `mascota` (
  `id_mascota` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) DEFAULT NULL,
  `raza` varchar(40) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `tipoEdad` varchar(40) DEFAULT NULL,
  `sexo` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id_mascota`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
