<?php
	header("Access-Control-Allow-Origin: *");
	// include 'notif.php';
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

	date_default_timezone_set('Asia/Kolkata');

	$id = $_POST["id"];
	$subject = $_POST["subject"];
	$fac_name = $_POST["fac_name"];
	$message = $_POST["message"];
	$department = $_POST["department"];
	$year = $_POST["year"];
	$date = date('d/m/y');
	$time = date('h:i A');

	$insert = "INSERT INTO msg_data (id,date,time,fac_name,subject,message,department,year) VALUES('$id','$date','$time','$fac_name','$subject','$message','$department','$year')";

	// $get_name = "SELECT name FROM stud_data WHERE id='$id'";
	$result = $conn->query($insert);

	$res_type = "success";

	// if($conn->query($insert)){

	//     $result = $conn->query($get_name);

	// 	if($result-> num_rows > 0){
	// 		while($row = $result->fetch_assoc()){
    // 	    	$name = $row['name'];
    //     	}

    //     	send_notif($name,$department,$year);

	// 	}

	// 	$res_type =  "success";
	// }

	// else
	// 	$res_type = "failed";



	$get_msg_id = "SELECT * FROM msg_data WHERE id='$id' AND date='$date' AND time='$time'";
	$result = $conn->query($get_msg_id);
	$row = $result->fetch_assoc();
	$msg_id = $row['msg_id'];
	$to_send = '{"res_type":"'.$res_type.'","msg_id":"'.$msg_id.'","date":"'.$date.'","time":"'.$time.'"}';

	echo $to_send;

	$conn->close();

?>