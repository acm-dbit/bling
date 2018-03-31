<?php
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

    if($conn->connect_error)
        die("Connection failed ".$conn->connect_error);

    $stud_id = $_POST["id"];
    $status = $_POST["status"];

    if($status==1){
        $change = "UPDATE stud_data SET status=1 WHERE id='$stud_id'";

        if($conn->query($change)){
            echo "success";
        }

        else{
            echo "failed";
        }
    }

    else{
        $delete = "DELETE FROM stud_data WHERE id='$stud_id'";

        if($conn->query($delete)){
            echo "success";
        }

        else{
            echo "failed";
        }
    }
?>