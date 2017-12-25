<?php
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

    if($conn->connect_error)
        die("Connection failed ".$conn->connect_error);

    $id = $_POST["id"];
    $pass = $_POST["pass"];

    $s_chk = "SELECT name,id,pass FROM stud_data WHERE id='$id' AND pass='$pass'";
    $f_chk = "SELECT name,id,pass FROM fac_data WHERE id='$id' AND pass='$pass'";

    $s_result = $conn->query($s_chk);

    if($s_result->num_rows > 0){
        echo "student";
    }

    else{

        $f_result = $conn->query($f_chk);

        if($f_result->num_rows > 0){
            echo "faculty";
        }

        else
        echo "failed";

    }
        
    $conn->close();
?>