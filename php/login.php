<?php

header("Content-type: text/xml");

header("Cache-Control: no-cache");

include "connection.php";

$login = $_POST['login'];

$sql = "SELECT name from login where name='$login'";

$result = mysqli_query($link, $sql) or die("Bad Query: $sql");

echo "<?xml version='1.0' ?>";

echo "<DataBase>";

while($row = mysqli_fetch_assoc($result))
{
	echo "<user>";

	echo "<login>".$row['name']."</login>";

	echo "</user>";
}

echo "</DataBase>";

mysqli_close($link);

?>