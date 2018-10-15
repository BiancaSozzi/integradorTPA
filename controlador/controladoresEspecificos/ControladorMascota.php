<?php
require_once 'ControladorGeneral.php';

class ControladorMascota extends ControladorGeneral{
    
    function _constructor($datos){
        parent::_construct();
    }
    
    public function agregar($datos) {
        try {
          
            $this->refControladorPersistencia->iniciarTransaccion();
            $tipoEdad = "";
            if ($datos['tipoEdad']=="Anos"){
                $tipoEdad = "años";
            }else{
                $tipoEdad = "meses";
            }
            $parametros = array("nombre" => $datos['nombre'], "raza" => $datos['raza'], "edad" => $datos['edad'], "tipoEdad" => $tipoEdad,"sexo" => $datos['sexo']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_MASCOTA, $parametros);
            $this->refControladorPersistencia->confirmarTransaccion();
           
            return $this->buscarUltimaMascota();
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }

    public function buscar($datos) {}
    
    private function buscarUltimaMascota() {//funcion para buscar la ultima mascota guardad
        try {
            $parametros = null;
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ULTIMAMASCOTA, $parametros);
            $fila = $resultado->fetch();
            return $fila;
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }

    public function eliminar($datos) {
        try {
            //echo "Inicio TRansaccion";
            $this->refControladorPersistencia->iniciarTransaccion();
            $parametros = array("id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ELIMINAR_MASCOTA, $parametros);

            $this->refControladorPersistencia->confirmarTransaccion();
            //echo "Confirme TRansaccion";
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }

    public function listar($datos) {
        try{
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_MASCOTAS);
            $arrayMascotas = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $arrayMascotas;
        } catch (Exception $ex) {
            echo "Failed: " . $e->getMessage();
        }
    }

    public function modificar($datos) {
        try {
            echo "Modificar Mascota";
            $this->refControladorPersistencia->iniciarTransaccion();
            $tipoEdad = "";
            if ($datos['tipoEdad']=="Anos"){
                $tipoEdad = "años";
            }else{
                $tipoEdad = "meses";
            }
            $parametros = array("nombre" => $datos['nombre'], "raza" => $datos['raza'], "edad" => $datos['edad'], "tipoEdad" => $tipoEdad,"sexo" => $datos['sexo'], "id_mascota" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ACTUALIZAR_MASCOTA, $parametros);
            $this->refControladorPersistencia->confirmarTransaccion();
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }

}
