<?php
$_POST = json_decode(file_get_contents('php://input'), true); // в php получить json 
echo var_dump($_POST);