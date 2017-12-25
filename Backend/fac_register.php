<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

	$name = $_POST["name"];
	$id = $_POST["id"];
	$department = $_POST["department"];
	$pass = $_POST["pass"];
	$token = $_POST["token"];

	$insert = "INSERT INTO fac_data (name,id,department,pass,token) VALUES('$name','$id','$department','$pass','$token')";

	if($conn->query($insert))
		echo "success";

	else
		echo "failed";

	$conn->close();

?>