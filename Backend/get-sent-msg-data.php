<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

    $fac_id = $_POST["fac_id"];

    $res_arr = array();

    $query = "SELECT * from msg_data WHERE id='$fac_id'";
    $result = $conn->query($query);
    while($row = $result->fetch_assoc()){
        array_push($res_arr, $row) ;
    }

    print_r(json_encode($res_arr));

	$conn->close();

?>