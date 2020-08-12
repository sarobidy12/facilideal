<?php

/**
 * cici permet de charger automatique les classes en function de leur nom 
 */

 function myautoload($name){
 
     $name= str_replace("\\","/",$name);
     require $name.".php";
     
 }

 try{
    spl_autoload_register('myautoload');

 } catch (Exception $e) {
    echo 'Exception reçue : ',  $e->getMessage(), "\n";
}

?>