<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

	$id = $_POST["id"];
    $pass = $_POST["pass"];

    $sql = "SELECT name,id,pass FROM stud_data WHERE id='$id' AND pass='$pass'";

    $result = $conn->query($sql);

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
    	    echo json_encode($row);
        }
    }

    else
    	echo json_encode("failed");
?>