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
    
            $a= new \PDO("mysql:host=localhost;dbname=c1317573c_facilodeal",'c1317573c_facilodeal','B;1[Ob0AIJ7S');
            $a->setAttribute(\PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION);
            return $a;
            
        }
   
 
}


?>