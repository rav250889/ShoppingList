<?php

include "connection.php";

$login = $_POST['user'];

mysqli_query($link, "insert into login (name) values ('$login')");

mysqli_close($link);

?>