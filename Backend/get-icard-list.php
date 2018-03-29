<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

    $get_data = "SELECT * FROM icards";

    $result = $conn->query($get_data);

    $cards = array();

    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            array_push($cards,$row);
        }

        echo json_encode($cards);
    }

    else{
        echo "none";
    }

	$conn->close();
?>