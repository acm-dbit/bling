<?php
	header("Access-Control-Allow-Origin: *");
	include 'notif.php';
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

	date_default_timezone_set('Asia/Kolkata');
	
	$res_type = "failed";
	
	$id = $_POST["id"];
	$subject = $_POST["subj"];
	$fac_name = $_POST["fac_name"];
	$message = $_POST["msg"];
	$department = $_POST["dept"];
	$year = $_POST["year"];
	$date = date('d/m/y');
	$time = date('h:i A');

	$insert = "INSERT INTO msg_data (id,fac_name,date,time,subject,message,department,year) VALUES('$id','$fac_name','$date','$time','$subject','$message','$department','$year')";

	if($conn->query($insert)){
	    $get_id = "SELECT max(msg_id) FROM msg_data";
	
    	$get_last_id = $conn->query($get_id);
    	
    	if($get_last_id->num_rows>0){
    	    while($row = $get_last_id->fetch_assoc()){
    	        $last_id = $row['max(msg_id)'];
    	        //echo $last_id;
    	    }
    	}
    	
    	$target_dir = "upload/";
    	$file_name = round(microtime(true)) ."-". basename($_FILES["fileToUpload"]["name"]);
        $target_file = $target_dir.$file_name;
        $uploadOk = 1;
        
        if (file_exists($target_file)) {
            //echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
        // Check file size
        if ($_FILES["fileToUpload"]["size"] > 500000) {
            //echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
        
        if ($uploadOk == 0) {
            //echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                //echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
                $insert_file = "INSERT INTO uploads (msg_id,file_name) VALUES('$last_id','$file_name')";
                
                if($conn->query($insert_file)){
                    $res_type = "success";
                }
            } else {
                //echo "Sorry, there was an error uploading your file.";
                	$res_type = "failed";
            }
        }
	};

	$to_send = '{"res_type":"'.$res_type.'","msg_id":"'.$last_id.'","date":"'.$date.'","time":"'.$time.'"}';

	send_notif($fac_name,$department,$year);

	echo $to_send;

	$conn->close();

?>