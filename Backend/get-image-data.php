<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

    $get = "SELECT image FROM image-data WHERE stud_id=8888";

    $result = $conn->query($get);

    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            echo json_encode($row);
        }
    }

	$conn->close();
?>