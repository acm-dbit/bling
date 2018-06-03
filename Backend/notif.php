<?php
header("Access-Control-Allow-Origin: *");
define('API_ACCESS_KEY', 'AAAA1WMADaA:APA91bHEJ8ynnH4tLeVwLQxrd1BhLQm3xAcVhowFxUq6vUDRFI9RIwk-w7r-bDbQpIxPHQd5U6Y3q9EmbdDIM53UHZryCVAyxrrGSl1ElVWJRROwZhP9uYfpDeNB3sA4uffcW0FMZi8Y');

$conn = new mysqli("localhost","id4053307_blingdb","/blingdb/","id4053307_blingdb");

if($conn->connect_error)
    die("Connection failed ".$conn->connect_error);

function get_ids($name, $dept, $year){
    
    $get_id = "SELECT token FROM stud_data WHERE year='$year' AND department='$dept'";
    
    $result = $conn->query($get_id);
    
    if($result->num_rows > 0){
        
        while($row = $result->fetch_assoc()){
            
            send_notif($name, $row["token"]);
        }
    }
    
}

function send_notif($name,$id){
    $msg = array(
    'title' => 'Notice',
    'body' =>$name.' has sent a notice',
    'vibrate' => 1,
    'sound' => 1
);

$fields = array(
    'to' => $id,
    'notification' => $msg
);

$headers = array(
    'Authorization: key=' . API_ACCESS_KEY,
    'Content-Type:application/json'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

$result = curl_exec($ch);
//echo $result;
curl_close($ch);
}

?>

