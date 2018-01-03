<?php
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

    if($conn->connect_error)
        die("Connection failed ".$conn->connect_error);

    $id = $_POST["id"];
    $token = $_POST["token"];

    $check_sid = "SELECT id FROM stud_data WHERE id='$id'";
    $check_fid = "SELECT id FROM fac_data WHERE id='$id'";

    $update_stk = "UPDATE stud_data SET token='$token' WHERE id='$id'";
    $update_ftk = "UPDATE fac_data SET token='$token' WHERE id='$id'";

    $s_res = $conn->query($check_sid);

    if($s_res->num_rows > 0){
        if($conn->query($update_stk)){
            $resp = '{"msg":"success"}';
        }

        else{
            $resp = '{"msg":"failed"}';
        }

        echo $resp;
    }

    else{
        $f_res = $conn->query($check_fid);

        if($f_res->num_rows > 0){
            if($conn->query($update_ftk)){
                $resp = '{"msg":"success"}';
            }
    
            else{
                $resp = '{"msg":"failed"}';
            }
        }

        echo $resp;
    }

?>