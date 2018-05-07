<?php
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

    if($conn->connect_error)
        die("Connection failed ".$conn->connect_error);

    $id = $_POST["id"];
    $pass = $_POST["pass"];
    

    $s_chk = "SELECT name,id,pass,department,year FROM stud_data WHERE id='$id' AND pass='$pass' AND status=1";
    $f_chk = "SELECT name,id,pass FROM fac_data WHERE id='$id' AND pass='$pass'";
    $a_chk = "SELECT id,pass FROM admin_data WHERE id='$id' AND pass='$pass'";

    $s_result = $conn->query($s_chk);

    if($s_result->num_rows > 0){
        $row = $s_result->fetch_assoc();
        $department = $row['department'];
        $year = $row['year'];
        $res = '{"res_type":"student","department":"'.$department.'","year":"'.$year.'"}';
        echo $res;
    }

    else{

        $f_result = $conn->query($f_chk);

        if($f_result->num_rows > 0){
            $row = $f_result->fetch_assoc();
            $fac_name = $row['name'];
            $res = '{"res_type":"faculty","fac_name":"'.$fac_name.'"}';
            echo $res;
        }

        else{
            $a_result = $conn->query($a_chk);
            
            if($a_result->num_rows > 0){
                $res = '{"res_type":"admin"}';
                echo $res;
            }
            
            else{
                $res = '{"res_type":"failed"}';
                echo $res;   
            }
        }


    }

    $conn->close();
?>