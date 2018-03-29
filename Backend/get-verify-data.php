<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
        die("Connection failed ".$conn->connect_error);
        
    $id = $_POST["id"];

    $get_id = "SELECT stud_id FROM icards WHERE id='$id'";

    $id_res = $conn->query($get_id);

    if($id_res->num_rows>0){
        while($row = $id_res->fetch_assoc()){
            $id = $row["stud_id"];

            $get_data = "SELECT * FROM stud_data WHERE id='$id'";

            $result = $conn->query($get_data);

            if($result->num_rows>0){
                while($row = $result->fetch_assoc()){
                    echo json_encode($row);
                }
            }
        }
    }

    else{
        echo "none";
    }

	$conn->close();
?>