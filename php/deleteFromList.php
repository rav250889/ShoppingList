<?php

include "connection.php";

$login = $_POST['login'];

mysqli_query($link, "delete from list where login_id=(select id from login where name='$login')");

mysqli_close($link);

?>