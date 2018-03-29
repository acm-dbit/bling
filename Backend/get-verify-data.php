<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
        die("Connection failed ".$conn->connect_error);
        
    $id = $_POST["id"];

    $get_id = "SELECT stud_id FROM icards";

    $result = $conn->query($get_data);

    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            echo $row["file_name"];
        }
    }

    else{
        echo "none";
    }

	$conn->close();
?>