<?php

include "connection.php";

$login = $_POST['login'];

$product = $_POST['productValue'];

$quantityValue = $_POST['quantityValue'];

mysqli_query($link, "insert into list(login_id, product, quantity) values((select id from login where name='$login'), '$product', '$quantityValue')");

mysqli_close($link);

?>