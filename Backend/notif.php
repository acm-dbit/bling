<?php
header("Access-Control-Allow-Origin: *");
define('API_ACCESS_KEY', 'AAAA1WMADaA:APA91bHEJ8ynnH4tLeVwLQxrd1BhLQm3xAcVhowFxUq6vUDRFI9RIwk-w7r-bDbQpIxPHQd5U6Y3q9EmbdDIM53UHZryCVAyxrrGSl1ElVWJRROwZhP9uYfpDeNB3sA4uffcW0FMZi8Y');


// $registrationIds = array(
//     'dL0MzTCoAOE:APA91bGdH2BF6wb9EdYdlLNQ9oyeQgjejqFVangANyBfGfX7Alg9r0XqROSeZt7FAb9BEAYTkt0sm7dADHPhkoC8umcpgTR6I0ILViqr-SyQRdwjXsTBSUSc-2jWUNRkL4_O4jqDJyYT'
// );

//$registrationIds = $_POST['regid'];

$msg = array(
    'title' => 'Test title',
    'body' => 'Test msg',
    'vibrate' => 1,
    'sound' => 1
);

$fields = array(
    'to' => "/topics/Mechanical",
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
curl_close($ch);
echo $result;
