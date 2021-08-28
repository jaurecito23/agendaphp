<?php
include "inc/funciones/funciones.php";

 $id = filter_var($_GET['id'],FILTER_VALIDATE_INT) ?? NULL ;
$contacto = NULL;

 if($id){

   $contacto = obtenerContacto($id);
   $contacto = $contacto->fetch_assoc();

 }else{
  die("No es válido");
 }



?>
<?php include "inc/layout/header.php";?>


<div class="contenedor-barra">
    <div class="contenedor barra">
         <a href="index.php" class="btn btn-volver">Volver</a>
        <h1>Editar Contacto</h1>
    </div>
</div>


        <div class="bg-amarillo contenedor sombra">
          <form action="#" id="contacto">
          <legend> Edite el Contacto </legend>

          <?php include "inc/layout/formulario.php"?>

          </form>
        </div>


<?php include "inc/layout/footer.php";?>