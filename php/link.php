<?php

header("Content-type: text/xml");

header("Cache-Control: no-cache");

include "../connection.php";

$login = $_POST['login'];

if($login == 'admin' && $login != "")
{
	$sql = "select * from link where id=1";
}

else if($login != "")
{
	$sql = "select * from link where id=2";
}

$result = mysqli_query($link, $sql) or die("Bad Query: $sql");

echo "<?xml version='1.0' ?>";

	echo "<DataBase>";

	while($row = mysqli_fetch_assoc($result))
	{
        echo "<workout>";
        
		echo "<type>".$row['link']."</type>";
               
        echo "</workout>";
       
	}
	
	echo "</DataBase>";

mysqli_close($link);

?>