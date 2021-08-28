<?php


// Credenciales de la base de datos


define("DB_USUARIO",'root');
define("DB_PASSWORD",'root');
define("DB_HOST",'localhost');
define("DB_NOMBRE",'agendaphp');
define("DB_PUERTO",'3306');




     $db = new mysqli(DB_HOST,DB_USUARIO,DB_PASSWORD,DB_NOMBRE);
 $db->ping();







?>