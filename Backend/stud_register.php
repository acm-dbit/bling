<?php
	header("Access-Control-Allow-Origin: *");
	$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

	if($conn->connect_error)
		die("Connection failed ".$conn->connect_error);

	$name = $_POST["name"];
	$id = $_POST["id"];
	$department = $_POST["department"];
	$year = $_POST["year"];
	$pass = $_POST["pass"];
	$token = $_POST["token"];

	$insert = "INSERT INTO stud_data (name,id,department,year,pass,token) VALUES('$name','$id','$department','$year','$pass','$token')";

	if($conn->query($insert)){
	    
	    $target_dir = "icard/";
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
                $insert_file = "INSERT INTO icards (stud_id,file_name) VALUES('$id','$file_name')";
                
                if($conn->query($insert_file)){
                    $res_type = "success";
                }
            } else {
                //echo "Sorry, there was an error uploading your file.";
                	$res_type = "failed";
            }
            
        }
        
        echo $res_type;
	}

	else
		echo "failed";

	$conn->close();

?>