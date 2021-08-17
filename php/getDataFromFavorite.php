<?php

header("Content-type: text/xml");

header("Cache-Control: no-cache");

include "connection.php";

$login = $_POST['login'];

$sql = "select product, quantity from login INNER JOIN favorite on login.id=favorite.login_id where name='$login'";

$result = mysqli_query($link, $sql) or die("Bad Query: $sql");

echo "<?xml version='1.0' ?>";

	echo "<DataBase>";

	while($row = mysqli_fetch_assoc($result))
	{
        echo "<workout>";
        
		echo "<product>".$row['product']."</product>";
        
        echo "<quantity>".$row['quantity']."</quantity>";
                
        echo "</workout>";
       
	}
	
	echo "</DataBase>";

mysqli_close($link);

?>