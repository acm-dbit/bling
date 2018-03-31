<?php
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

    if($conn->connect_error)
        die("Connection failed ".$conn->connect_error);

    $stud_id = $_POST["id"];
    $status = $_POST["status"];
    $file_name = $_POST["file_name"];
    
    if($status==1){
        $change = "UPDATE stud_data SET status=1 WHERE id='$stud_id'";

        if($conn->query($change)){

            if(delete()){
                echo "success";
            }

            else{
                echo "delete failed";
            }
        }

        else{
            echo "failed";
        }
    }

    else{
        $delete = "DELETE FROM stud_data WHERE id='$stud_id'";

        if($conn->query($delete)){

            if(delete()){
                echo "success";
            }

            else{
                echo "delete failed";
            }
        }

        else{
            echo "failed";
        }
    }

    function delete(){

        global $conn, $file_name;

        $delete_card = "DELETE FROM icards WHERE file_name='$file_name'";

        if($conn->query($delete_card)){

            $target_dir = "icard/";

            if(unlink($target_dir.$file_name))
                return 1;
        }

        else{
            return 0;
        }

    }
?>