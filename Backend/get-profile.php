<?php
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

    if($conn->connect_error)
        die("Connection failed ".$conn->connect_error);

    $id = $_POST["id"];

    $select = "SELECT name,department,semester FROM stud_data WHERE id='$id'";

    $result = $conn->query($select);

    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            echo json_encode($row);
        }
    }

?>