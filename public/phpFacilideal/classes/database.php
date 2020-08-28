<?php

namespace classes;

/**
 * 
 * ceci est la connection a la base de donne
 * qui permetere la transfer des informations 
 * 
*/ 


class database{
  
    /**
     * 
     * ceci est la connection a la base de donne
     * qui permetere la transfer des informations 
     * 
    */
     
        public static function bdd(){
    
            $a= new \PDO("mysql:host=localhost;dbname=facil",'root','');
            $a->setAttribute(\PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION);
            return $a;
            
        }
   
 
}


?>