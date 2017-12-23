<?php
header("Access-Control-Allow-Origin: *");
define('API_ACCESS_KEY', 'AAAA1WMADaA:APA91bHEJ8ynnH4tLeVwLQxrd1BhLQm3xAcVhowFxUq6vUDRFI9RIwk-w7r-bDbQpIxPHQd5U6Y3q9EmbdDIM53UHZryCVAyxrrGSl1ElVWJRROwZhP9uYfpDeNB3sA4uffcW0FMZi8Y');

function send_notif($name,$dept,$year){
	$msg = array(
    'title' => 'Notice',
    'body' => $name.' has sent a notice',
    'vibrate' => 1,
    'sound' => 1
);

$fields = array(
    'condition' => "'".$dept."' in topics && '".$year."' in topics",
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
}

?>
