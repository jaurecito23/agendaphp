<?php

//Obtener todos los contactos

function obtenerContactos(){

include "db.php";

try{

 return  $db->query("SELECT id,nombre,empresa,telefono FROM contactos");

}catch (Exception $e){

    echo "Error----> ".$e->getMessage();
    return false;
}


}


//Obtener un solo contacto
function obtenerContacto($id){
    include "db.php";

    try{

     return  $db->query("SELECT id,nombre,empresa,telefono FROM contactos WHERE id=${id}");

    }catch (Exception $e){

        echo "Error----> ".$e->getMessage();
        return false;
    }



}



?>