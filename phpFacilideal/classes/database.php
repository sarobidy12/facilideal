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
    
            $a= new \PDO("mysql:host=sql101.epizy.com;dbname=epiz_26489089_facilideal",'epiz_26489089','9nwFMCjxusheaM');
            $a->setAttribute(\PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION);
            return $a;
            
        }
   
 
}


?>