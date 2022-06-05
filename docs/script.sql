-- DROP SCHEMA proarca;
CREATE SCHEMA PROARCA;
USE PROARCA;
-- MySQL Script generated by MySQL Workbench
-- Wed Jun  1 20:10:06 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema proarca
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema proarca
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `proarca` DEFAULT CHARACTER SET utf8 ;
USE `proarca` ;

-- -----------------------------------------------------
-- Table `proarca`.`personas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`personas` (
  `personas_id` INT NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(100) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `fecha_nac` DATETIME NULL,
  `estado` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`personas_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proarca`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`usuarios` (
  `usuarios_id` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(100) NOT NULL,
  `contra` VARCHAR(256) NOT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  `personas_id` INT NOT NULL,
  PRIMARY KEY (`usuarios_id`),
  CONSTRAINT `fk_usuarios_personas1`
    FOREIGN KEY (`personas_id`)
    REFERENCES `proarca`.`personas` (`personas_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_usuarios_personas1_idx` ON `proarca`.`usuarios` (`personas_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`categorias_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`categorias_productos` (
  `categorias_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`categorias_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proarca`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`productos` (
  `productos_id` INT NOT NULL AUTO_INCREMENT,
  `SKU` VARCHAR(10) NOT NULL,
  `descripcion` VARCHAR(150) NOT NULL,
  `es_servicio` TINYINT NOT NULL DEFAULT 0,
  `precio_hora` DECIMAL(10,2) NULL,
  `precio_dia` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `estado` INT NOT NULL DEFAULT 0,
  `es_combo` TINYINT NOT NULL DEFAULT 0,
  `costo` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `categorias_id` INT NOT NULL,
  PRIMARY KEY (`productos_id`),
  CONSTRAINT `fk_productos_categorias_productos1`
    FOREIGN KEY (`categorias_id`)
    REFERENCES `proarca`.`categorias_productos` (`categorias_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_productos_categorias_productos1_idx` ON `proarca`.`productos` (`categorias_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`modulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`modulos` (
  `modulos_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`modulos_id`))
ENGINE = InnoDB;

ALTER TABLE `proarca`.`modulos`
ADD COLUMN `icon` VARCHAR(15) AFTER `nombre`;

ALTER TABLE `proarca`.`modulos`
ADD COLUMN `ruta` VARCHAR(50) AFTER `modulos_id`;

INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('1', 'Tablero.php', 'Tablero', 'dashboard', '1');
INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('2', 'Cotizacion.php', 'Cotizaciones', 'dashboard', '1');
INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('3', 'Renta.php', 'Rentas', 'dashboard', '1');
INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('4', 'RentaDev.php', 'Devoluciones Rentas', 'dashboard', '1');
INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('5', 'Compra.php', 'Compras', 'dashboard', '1');
INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('6', 'ClienteCat.php', 'Categoria Clientes', 'dashboard', '1');
INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('7', 'Cliente.php', 'Clientes', 'dashboard', '1');
INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('8', 'ProveedoresCat.php', 'Categoria Proveedores', 'dashboard', '1');
INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('9', 'Proveedore.php', 'Proveedores', 'dashboard', '1');
INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('10', 'ProductoCat.php', 'Categoria Productos', 'dashboard', '1');
INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('11', 'Producto.php', 'Productos', 'dashboard', '1');
INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('12', 'Mantenimiento.php', 'Mantenimiento Productos', 'dashboard', '1');
INSERT INTO `proarca`.`modulos` (`modulos_id`, `ruta`, `nombre`, `icon`, `estado`) VALUES ('13', 'Usuario.php', 'Usuarios', 'dashboard', '1');


-- -----------------------------------------------------
-- Table `proarca`.`permisos_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`permisos_usuarios` (
  `modulos_id` INT NOT NULL,
  `usuarios_id` INT NOT NULL,
  PRIMARY KEY (`modulos_id`, `usuarios_id`),
  CONSTRAINT `fk_permisos_usuarios_modulos`
    FOREIGN KEY (`modulos_id`)
    REFERENCES `proarca`.`modulos` (`modulos_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_permisos_usuarios_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `proarca`.`usuarios` (`usuarios_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_permisos_usuarios_modulos_idx` ON `proarca`.`permisos_usuarios` (`modulos_id` ASC) ;

CREATE INDEX `fk_permisos_usuarios_usuarios1_idx` ON `proarca`.`permisos_usuarios` (`usuarios_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`categorias_clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`categorias_clientes` (
  `categorias_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`categorias_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proarca`.`categorias_proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`categorias_proveedores` (
  `categorias_id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL DEFAULT 0,
  PRIMARY KEY (`categorias_id`))
ENGINE = InnoDB;

ALTER TABLE `proarca`.`categorias_proveedores`
ADD COLUMN `estado` INT AFTER `nombre`;

-- -----------------------------------------------------
-- Table `proarca`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`clientes` (
  `clientes_id` INT NOT NULL AUTO_INCREMENT,
  `nit` VARCHAR(11) NOT NULL DEFAULT 'CF',
  `nombre` VARCHAR(100) NOT NULL,
  `direccion` VARCHAR(150) NOT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  `personas_id` INT NOT NULL,
  `categorias_id` INT NOT NULL,
  PRIMARY KEY (`clientes_id`),
  CONSTRAINT `fk_clientes_personas1`
    FOREIGN KEY (`personas_id`)
    REFERENCES `proarca`.`personas` (`personas_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_clientes_categorias_clientes1`
    FOREIGN KEY (`categorias_id`)
    REFERENCES `proarca`.`categorias_clientes` (`categorias_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_clientes_personas1_idx` ON `proarca`.`clientes` (`personas_id` ASC) ;

CREATE INDEX `fk_clientes_categorias_clientes1_idx` ON `proarca`.`clientes` (`categorias_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`proveedores` (
  `proveedores_id` INT NOT NULL AUTO_INCREMENT,
  `nit` VARCHAR(11) NOT NULL DEFAULT 'CF',
  `nombre` VARCHAR(100) NOT NULL,
  `direccion` VARCHAR(150) NOT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  `personas_id` INT NOT NULL,
  `categorias_id` INT NOT NULL,
  PRIMARY KEY (`proveedores_id`),
  CONSTRAINT `fk_proveedores_personas1`
    FOREIGN KEY (`personas_id`)
    REFERENCES `proarca`.`personas` (`personas_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proveedores_categorias_proveedores1`
    FOREIGN KEY (`categorias_id`)
    REFERENCES `proarca`.`categorias_proveedores` (`categorias_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_proveedores_personas1_idx` ON `proarca`.`proveedores` (`personas_id` ASC) ;

CREATE INDEX `fk_proveedores_categorias_proveedores1_idx` ON `proarca`.`proveedores` (`categorias_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`cotizacion_cab`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`cotizacion_cab` (
  `cotizacion_id` INT NOT NULL AUTO_INCREMENT,
  `numero` INT(10) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  `usuarios_id` INT NOT NULL,
  `clientes_id` INT NOT NULL,
  `duracion` TIME NOT NULL,
  `fecha_evento` DATETIME NOT NULL,
  PRIMARY KEY (`cotizacion_id`),
  CONSTRAINT `fk_cotizacion_cab_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `proarca`.`usuarios` (`usuarios_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizacion_cab_clientes1`
    FOREIGN KEY (`clientes_id`)
    REFERENCES `proarca`.`clientes` (`clientes_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_cotizacion_cab_usuarios1_idx` ON `proarca`.`cotizacion_cab` (`usuarios_id` ASC) ;

CREATE INDEX `fk_cotizacion_cab_clientes1_idx` ON `proarca`.`cotizacion_cab` (`clientes_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`cotizacion_det`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`cotizacion_det` (
  `detalle_id` INT NOT NULL AUTO_INCREMENT,
  `cantidad` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `sku` VARCHAR(10) NOT NULL DEFAULT 'NA',
  `descripcion` VARCHAR(150) NOT NULL DEFAULT 'NA',
  `precio` VARCHAR(45) NOT NULL DEFAULT '0.00',
  `cotizacion_id` INT NOT NULL,
  `productos_id` INT NOT NULL,
  `duracion` TIME NOT NULL,
  PRIMARY KEY (`detalle_id`),
  CONSTRAINT `fk_cotizacion_det_cotizacion_cab1`
    FOREIGN KEY (`cotizacion_id`)
    REFERENCES `proarca`.`cotizacion_cab` (`cotizacion_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cotizacion_det_productos1`
    FOREIGN KEY (`productos_id`)
    REFERENCES `proarca`.`productos` (`productos_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_cotizacion_det_cotizacion_cab1_idx` ON `proarca`.`cotizacion_det` (`cotizacion_id` ASC) ;

CREATE INDEX `fk_cotizacion_det_productos1_idx` ON `proarca`.`cotizacion_det` (`productos_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`rentas_cab`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`rentas_cab` (
  `rentas_id` INT NOT NULL AUTO_INCREMENT,
  `numero` INT(10) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  `usuarios_id` INT NOT NULL,
  `clientes_id` INT NOT NULL,
  `duracion` TIME NOT NULL,
  `fecha_evento` DATETIME NOT NULL,
  PRIMARY KEY (`rentas_id`),
  CONSTRAINT `fk_rentas_cab_usuarios10`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `proarca`.`usuarios` (`usuarios_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rentas_cab_clientes10`
    FOREIGN KEY (`clientes_id`)
    REFERENCES `proarca`.`clientes` (`clientes_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_rentas_cab_usuarios1_idx` ON `proarca`.`rentas_cab` (`usuarios_id` ASC) ;

CREATE INDEX `fk_rentas_cab_clientes1_idx` ON `proarca`.`rentas_cab` (`clientes_id` ASC);


-- -----------------------------------------------------
-- Table `proarca`.`rentas_det`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`rentas_det` (
  `detalle_id` INT NOT NULL AUTO_INCREMENT,
  `cantidad` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `sku` VARCHAR(10) NOT NULL DEFAULT 'NA',
  `descripcion` VARCHAR(150) NOT NULL DEFAULT 'NA',
  `precio` VARCHAR(45) NOT NULL DEFAULT '0.00',
  `cotizacion_id` INT NOT NULL,
  `productos_id` INT NOT NULL,
  `duracion` TIME NOT NULL,
  PRIMARY KEY (`detalle_id`),
  CONSTRAINT `fk_rentas_det_rentas_cab10`
    FOREIGN KEY (`cotizacion_id`)
    REFERENCES `proarca`.`rentas_cab` (`rentas_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rentas_det_productos10`
    FOREIGN KEY (`productos_id`)
    REFERENCES `proarca`.`productos` (`productos_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_rentas_det_rentas_cab1_idx` ON `proarca`.`rentas_det` (`cotizacion_id` ASC) ;

CREATE INDEX `fk_rentas_det_productos1_idx` ON `proarca`.`rentas_det` (`productos_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`rentas_devoluciones_cab`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`rentas_devoluciones_cab` (
  `devoluciones_id` INT NOT NULL AUTO_INCREMENT,
  `numero` INT(10) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  `rentas_id` INT NOT NULL,
  PRIMARY KEY (`devoluciones_id`),
  CONSTRAINT `fk_rentas_devoluciones_rentas_cab1`
    FOREIGN KEY (`rentas_id`)
    REFERENCES `proarca`.`rentas_cab` (`rentas_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_rentas_devoluciones_rentas_cab1_idx` ON `proarca`.`rentas_devoluciones_cab` (`rentas_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`rentas_cotizacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`rentas_cotizacion` (
  `cotizacion_id` INT NOT NULL,
  `rentas_id` INT NOT NULL,
  PRIMARY KEY (`cotizacion_id`, `rentas_id`),
  CONSTRAINT `fk_rentas_cotizacion_cotizacion_cab1`
    FOREIGN KEY (`cotizacion_id`)
    REFERENCES `proarca`.`cotizacion_cab` (`cotizacion_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rentas_cotizacion_rentas_cab1`
    FOREIGN KEY (`rentas_id`)
    REFERENCES `proarca`.`rentas_cab` (`rentas_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_rentas_cotizacion_rentas_cab1_idx` ON `proarca`.`rentas_cotizacion` (`rentas_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`rentas_devoluciones_det`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`rentas_devoluciones_det` (
  `detalle_id` INT NOT NULL,
  `cantidad` VARCHAR(45) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `rentas_detalle_id` INT NOT NULL,
  `devoluciones_id` INT NOT NULL,
  PRIMARY KEY (`detalle_id`),
  CONSTRAINT `fk_rentas_devoluciones_det_rentas_det1`
    FOREIGN KEY (`rentas_detalle_id`)
    REFERENCES `proarca`.`rentas_det` (`detalle_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rentas_devoluciones_det_rentas_devoluciones_cab1`
    FOREIGN KEY (`devoluciones_id`)
    REFERENCES `proarca`.`rentas_devoluciones_cab` (`devoluciones_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_rentas_devoluciones_det_rentas_det1_idx` ON `proarca`.`rentas_devoluciones_det` (`rentas_detalle_id` ASC) ;

CREATE INDEX `fk_rentas_devoluciones_det_rentas_devoluciones_cab1_idx` ON `proarca`.`rentas_devoluciones_det` (`devoluciones_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`compras_cab`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`compras_cab` (
  `compras_id` INT NOT NULL AUTO_INCREMENT,
  `serie` VARCHAR(100) NOT NULL,
  `numero` INT(100) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  `proveedores_id` INT NOT NULL,
  `usuarios_id` INT NOT NULL,
  PRIMARY KEY (`compras_id`),
  CONSTRAINT `fk_compras_proveedores1`
    FOREIGN KEY (`proveedores_id`)
    REFERENCES `proarca`.`proveedores` (`proveedores_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compras_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `proarca`.`usuarios` (`usuarios_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_compras_proveedores1_idx` ON `proarca`.`compras_cab` (`proveedores_id` ASC) ;

CREATE INDEX `fk_compras_usuarios1_idx` ON `proarca`.`compras_cab` (`usuarios_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`compras_det`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`compras_det` (
  `detalle_id` INT NOT NULL AUTO_INCREMENT,
  `cantidad` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `sku` VARCHAR(10) NOT NULL DEFAULT 'NA',
  `descripcion` VARCHAR(150) NOT NULL DEFAULT 'NA',
  `precio` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `compras_id` INT NOT NULL,
  `productos_id` INT NOT NULL,
  PRIMARY KEY (`detalle_id`),
  CONSTRAINT `fk_compras_det_compras_cab1`
    FOREIGN KEY (`compras_id`)
    REFERENCES `proarca`.`compras_cab` (`compras_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compras_det_productos1`
    FOREIGN KEY (`productos_id`)
    REFERENCES `proarca`.`productos` (`productos_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_compras_det_compras_cab1_idx` ON `proarca`.`compras_det` (`compras_id` ASC) ;

CREATE INDEX `fk_compras_det_productos1_idx` ON `proarca`.`compras_det` (`productos_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`mantenimientos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`mantenimientos` (
  `mantenimientos_id` INT NOT NULL AUTO_INCREMENT,
  `numero` INT(10) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `fecha_programada` DATETIME NOT NULL,
  `usuarios_id` INT NOT NULL,
  `usuario_responsable` INT NOT NULL,
  `productos_id` INT NOT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`mantenimientos_id`),
  CONSTRAINT `fk_mantenimientos_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `proarca`.`usuarios` (`usuarios_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mantenimientos_usuarios2`
    FOREIGN KEY (`usuario_responsable`)
    REFERENCES `proarca`.`usuarios` (`usuarios_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mantenimientos_productos1`
    FOREIGN KEY (`productos_id`)
    REFERENCES `proarca`.`productos` (`productos_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_mantenimientos_usuarios1_idx` ON `proarca`.`mantenimientos` (`usuarios_id` ASC) ;

CREATE INDEX `fk_mantenimientos_usuarios2_idx` ON `proarca`.`mantenimientos` (`usuario_responsable` ASC) ;

CREATE INDEX `fk_mantenimientos_productos1_idx` ON `proarca`.`mantenimientos` (`productos_id` ASC) ;


-- -----------------------------------------------------
-- Table `proarca`.`mantenimientos_det`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proarca`.`mantenimientos_det` (
  `detalle_id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  `mantenimientos_id` INT NOT NULL,
  `usuarios_id` INT NOT NULL,
  PRIMARY KEY (`detalle_id`),
  CONSTRAINT `fk_mantenimientos_det_mantenimientos1`
    FOREIGN KEY (`mantenimientos_id`)
    REFERENCES `proarca`.`mantenimientos` (`mantenimientos_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mantenimientos_det_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `proarca`.`usuarios` (`usuarios_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_mantenimientos_det_mantenimientos1_idx` ON `proarca`.`mantenimientos_det` (`mantenimientos_id` ASC) ;

CREATE INDEX `fk_mantenimientos_det_usuarios1_idx` ON `proarca`.`mantenimientos_det` (`usuarios_id` ASC) ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
