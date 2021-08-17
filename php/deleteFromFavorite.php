<?php

include "connection.php";

$login = $_POST['login'];

$product = $_POST['productValue'];

mysqli_query($link, "delete from favorite where login_id=(select id from login where name='$login') and product='$product'");

mysqli_close($link);

?>