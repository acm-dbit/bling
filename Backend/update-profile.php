<?php
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

    if($conn->connect_error)
        die("Connection failed ".$conn->connect_error);

    $id = $_POST["id"];
    $year = $_POST["year"];

    $update = "UPDATE stud_data SET year='$year' WHERE id='$id'";

    if($conn->query($update)){
        echo "success";
    }

    else{
        echo "failed";
    }

?>