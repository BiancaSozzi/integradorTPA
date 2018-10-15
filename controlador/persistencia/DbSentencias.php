<?php

//MASCOTA
interface DbSentencias {
const LISTAR_MASCOTAS = "SELECT * FROM `mascota` ORDER BY id_mascota";
const INSERTAR_MASCOTA = "INSERT INTO `mascota`(`nombre`, `raza`, `edad`, `tipoEdad`, `sexo` ) VALUES (?,?,?,?,?)";
const BUSCAR_ULTIMAMASCOTA = "SELECT * FROM `mascota` WHERE `id_mascota` = (SELECT MAX(id_mascota) FROM `mascota`);"; 
const ELIMINAR_MASCOTA = "DELETE FROM `mascota` WHERE id_mascota = ?";           
const ACTUALIZAR_MASCOTA = "UPDATE `mascota` SET `nombre`= ?,`raza`= ?, `edad`= ?, `tipoEdad`= ?, `sexo`= ? WHERE id_mascota = ?";

}
