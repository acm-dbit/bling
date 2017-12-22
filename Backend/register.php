<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

	$name = $_POST["name"];
	$id = $_POST["id"];
	$department = $_POST["department"];
	$semester = $_POST["semester"];
	$pass = $_POST["pass"];
	$token = $_POST["token"];

	$insert = "INSERT INTO stud_data (name,id,department,semester,pass,token) VALUES('$name','$id','$department','$semester','$pass','$token')";

	if($conn->query($insert))
		echo "success";

	else
		echo "failed";

	$conn->close();

?>