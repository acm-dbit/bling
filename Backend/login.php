<?php
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

    if($conn->connect_error)
        die("Connection failed ".$conn->connect_error);

    $id = $_POST["id"];
    $pass = $_POST["pass"];

    $s_chk = "SELECT name,id,pass,department,semester FROM stud_data WHERE id='$id' AND pass='$pass'";
    $f_chk = "SELECT name,id,pass,name FROM fac_data WHERE id='$id' AND pass='$pass'";

    $s_result = $conn->query($s_chk);

    function getYear($semester) {
        if($semester == 1 || $semester == 2)
            return "FE";
        elseif($semester == 2 || $semester == 3)
            return "SE";
        elseif($semester == 4 || $semester == 5)
            return "TE";
        elseif($semester == 7 || $semester == 8)
            return "BE";
    }

    if($s_result->num_rows > 0){
        $row = $s_result->fetch_assoc();
        $department = $row['department'];
        $year = getYear($row['semester']);
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
            $res = '{"res_type":"failed"}';
            echo $res;
        }


    }

    $conn->close();
?>