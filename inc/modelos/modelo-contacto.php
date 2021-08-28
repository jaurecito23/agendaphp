<?php

$accionPost = $_POST["accion"] ?? NULL;
$accionGet = $_GET["accion"] ?? NULL;
if( $accionPost == "crear"){

    //Crear registro

    require_once("../funciones/db.php");
    //Validar las entradas

    $nombre = filter_var($_POST["nombre"], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST["empresa"], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST["telefono"], FILTER_SANITIZE_STRING);

    try{

        //Statement

        $stmt = $db->prepare("INSERT INTO contactos (nombre,empresa,telefono) VALUES(?,?,?)");
        $stmt->bind_param("sss",$nombre,$empresa,$telefono);
        $stmt->execute();

        if($stmt->affected_rows == 1){

            $repuesta = array(
                "respuesta"=>"Correcto",

                "datos"=>array(
                      "nombre"=>$nombre,
                      "empresa"=>$empresa,
                      "telefono"=>$telefono,
                      "idInsertado"=>$stmt->insert_id
                )
            );

        }



        $stmt->close();
        $db->close();

    }catch(Exception $e){
        $repuesta = array(

            'error' => $e->getMessage()

        );

    }


    echo json_encode($repuesta);

}

if($accionGet == "borrar"){
    require_once("../funciones/db.php");

    $id = filter_var($_GET["id"],FILTER_SANITIZE_NUMBER_INT);


        try {

            $stmt = $db->prepare("DELETE FROM contactos WHERE id= ?");
            $stmt->bind_param("i",$id);
            $stmt->execute();
            if($stmt->affected_rows == 1){

                $respuesta = array(

                    "respuesta"=>"correcto"

                );

            }

            $stmt->close();
            $db->close();

        } catch (Exception $e) {
            $respuesta = array(

                "error"=> $e->getMessage()

            );
        }


    echo json_encode($respuesta);


}



if ($accionPost == "editar") {

    //Crear registro

    require_once("../funciones/db.php");
    //Validar las entradas



     try{



    $nombre = filter_var($_POST["nombre"], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST["empresa"], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST["telefono"], FILTER_SANITIZE_STRING);
    $id = filter_var($_POST["id"],FILTER_SANITIZE_NUMBER_INT);

        $stmt = $db->prepare("UPDATE contactos SET nombre = ?, empresa = ? , telefono = ? WHERE id = ?;");
       $stmt->bind_param("sssi",$nombre,$empresa,$telefono,$id);
       $stmt->execute();



 if($stmt->affected_rows == 1){

     $respuesta = array(

          "respuesta"=>"correcto"

 );

 }else{

    $respuesta = array(
       "respuesta"=>"incorrecto"
   );

   }


$stmt->close();
$db->close();
}catch(Exception $e){

        $respuesta = array(

          "error"=>$e->getMessage()

    );

    }

    echo json_encode($respuesta);
}



?>