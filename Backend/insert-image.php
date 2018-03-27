<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

    $stud_id = $_POST["id"];
    $image = $_POST["image"];

    $insert = "INSERT INTO image-data(stud_id,image) VALUES('$stud_id','$image')";

    if($conn->query($insert)){
        echo "success";
    }

    else{
        echo "failed";
    }

	$conn->close();
?>