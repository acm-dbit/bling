<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

	$name = $_POST["name"];
	$id = $_POST["id"];
	$dob = $_POST["dob"];
	$department = $_POST["department"];
	$semester = $_POST["semester"];
	//$reg = $_POST["reg"];

	$insert = "INSERT INTO stud_data (name,id,dob,department,semester) VALUES('$name','$id','$dob','$department','$semester')";

	if($conn->query($insert))
		echo "success";

	else
		echo "failed";

	$conn->close();

?>