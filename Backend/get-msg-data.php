<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);


    $type = $_POST["type"];
    $department = $_POST["department"];
    $year = $_POST["year"];

    $res_arr = array();

    if($type == "new"){
        $query = "SELECT * from msg_data WHERE department='$department' AND year='$year'";
        $result = $conn->query($query);
        while($row = $result->fetch_assoc()){
            array_push($res_arr, $row) ;
        }
    }
    else {
        $msg_id = $_POST["msg_id"];
        $query = "SELECT * from msg_data WHERE msg_id > '$msg_id' AND department='$department' AND year='$year'";
        $result = $conn->query($query);
        while($row = $result->fetch_assoc()){
            array_push($res_arr, $row) ;
        }
    }

    print_r(json_encode($res_arr));

	$conn->close();

?>