<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

    $msg_id = $_POST["msg_id"];

    $get_data = "SELECT file_name FROM uploads WHERE msg_id='$msg_id'";

    $result = $conn->query($get_data);

    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            echo json_encode($row["file_name"]);
        }
    }

    else{
        echo "none";
    }

	$conn->close();
?>