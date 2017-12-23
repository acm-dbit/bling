<?php
	header("Access-Control-Allow-Origin: *");
	include 'notif.php';
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

	$id = $_POST["id"];
	$message = $_POST["message"];
	$department = $_POST["department"];
	$year = $_POST["year"];

	$insert = "INSERT INTO msg_data (id,message,department,year) VALUES('$id','$message','$department','$year')";

	$get_name = "SELECT name FROM stud_data WHERE id='$id'";

	if($conn->query($insert)){
	    
	    $result = $conn->query($get_name);
		
		if($result-> num_rows > 0){
			while($row = $result->fetch_assoc()){
    	    	$name = $row['name'];
        	}

        	send_notif($name,$department,$year);

		}

		echo "success";
	}

	else
		echo "failed";

	$conn->close();

?>