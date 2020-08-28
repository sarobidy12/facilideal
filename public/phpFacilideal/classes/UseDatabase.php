<?php 

namespace classes;
use classes\database;

/**
 * 
 * ceci est la connection a la base de donne
 * qui permetere la transfer des informations 
 * 
 * 
*/ 

class UseDatabase extends database{ 

        /**
         * 
         * Request prepare 
         * 
         */
        public static function prepare($tableName,$where=null){

            if(isset($where)){
                $a= "WHERE ".$where;
            }else{
                $a="";
            }

            $b = parent::bdd()->prepare("SELECT * FROM $tableName $a");
            $b->execute();
            return $b->fetchall(\PDO::FETCH_OBJ);

        }

        /**
         * 
         * Request prepare 
         * 
        */
        public static function ifNull($tableName,$where=null){

            if(isset($where)){
                $a= "WHERE ".$where;
            }else{
                $a="";
            }

            $b = parent::bdd()->query("SELECT * FROM $tableName $a +0");

            if($b->rowCount() > 0){
                return $b->fetchall(\PDO::FETCH_OBJ)[0];
            }else{
                return false;
            }
        }

        /**
         * 
         * Request query 
         * 
         */
        public static function query($tableName,$where=null){

            if(isset($where)){
                $a= "WHERE ".$where;
            }else{
                $a="";
            }

            $a = parent::bdd()->query("SELECT * FROM $tableName $a");
            return $a->fetchall(\PDO::FETCH_OBJ);

        }

    

    /**
     * 
     * Request query 
     * 
     */
    public static function query_limit($tableName,$limit){


        $a = parent::bdd()->query("SELECT * FROM $tableName $limit");
        return $a->fetchall(\PDO::FETCH_OBJ);

    }


    /**
     *  
     * insert into 
     * 
     * 
     */
   
    public static function insert($tableName,$value){

        try{
            
            $a = parent::bdd()->exec("INSERT INTO  $tableName $value");

        }catch(Exception $e) {
                            
            echo 'Exception -> ';	
            var_dump($e->getMessage());
        
        }
        
    }

    /**
     * 
     *  update  
     * 
     */

    public static function update($tableName,$element,$id){

        try{
            $a = parent::bdd()->exec("UPDATE $tableName SET $element WHERE id = $id");
        }catch(Exception $e) {
                            
            echo 'Exception -> ';	
            var_dump($e->getMessage());
        
        }
        
    }


      /**
     * 
     *  update  
     * 
     */

    public static function updateW($tableName,$element,$where){

        try{
            $a = parent::bdd()->exec("UPDATE $tableName SET $element WHERE $where");
        }catch(Exception $e) {
            echo 'Exception -> ';	
            var_dump($e->getMessage());
        }
        
    }

    /***
     * 
     * delete 
     * 
     * 
     */

    public static function delete($tableName,$id,$a= null){

        try{

            if(isset($a)){
                parent::bdd()->exec("DELETE FROM $tableName WHERE $a");
            }else{
                parent::bdd()->exec("DELETE FROM $tableName WHERE id = $id");
            }

        }catch(Exception $e) {
                            
            echo 'Exception -> ';	
            var_dump($e->getMessage());
        
        }
        
    }

     /***
     * 
     * delete  all
     * 
     * 
     */

    public static function deleteAll($tableName,$a= null){

        try{

            parent::bdd()->exec("DELETE FROM $tableName WHERE $a");

        }catch(Exception $e) {
                            
            echo 'Exception -> ';	
            var_dump($e->getMessage());
        
        }
        


    }

    /***
     * 
     * simple exec
     * 
     * 
     */

    public static function executeSimple($statement){

        try{

            parent::bdd()->exec($statement);

        }catch(Exception $e) {
                            
            echo 'Exception -> ';	
            var_dump($e->getMessage());
        
        }
        
    }
    
    /**
     * 
     * Request query 
     * 
     */
    public static function count($tableName,$where=null){

        if(isset($where)){
            $a= "WHERE ".$where;
        }else{
            $a="";
        }

        $a = parent::bdd()->query("SELECT COUNT(*) AS name FROM $tableName $a");
        return $a->fetchall(\PDO::FETCH_OBJ);

    }

    /**
     * 
     * VERIFIE IF NULL
     * 
     * 
     */

    public static function exist($tableName,$where=null){

        if(isset($where)){
            $a= "WHERE ".$where;
        }else{
            $a="";
        }

            $b = parent::bdd()->prepare("SELECT * FROM $tableName $a");
            $b->execute();

                if($b->rowCount() === 0){
                    return true;
                }else{
                    return false;
                }
    }

     /**
     * 
     * VERIFIE IF EXISTE
     * 
     * 
     */

    public static function Ifexist($tableName,$where=null){

        if(isset($where)){
            $a= "WHERE ".$where;
        }else{
            $a="";
        }

        $b = parent::bdd()->prepare("SELECT * FROM $tableName $a");
        $b->execute();

        if($b->rowCount() != 0){
            return true;
        }else{
            return false;
        }
    }
 
}


?>