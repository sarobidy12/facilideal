<?php

/***
 * 
 * connetc db
 */
$a= new \PDO("mysql:host=localhost;dbname=facilideal",'root','');
$a->setAttribute(\PDO::ATTR_ERRMODE,\PDO::ERRMODE_EXCEPTION);


?>