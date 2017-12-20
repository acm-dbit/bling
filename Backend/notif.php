<?php
header("Access-Control-Allow-Origin: *");
define('API_ACCESS_KEY', '');

// $registrationIds = array(
//     'DTV8WD2BIW0:APA91BE2ZEXKWGNAG0W9WQOIIUOAKBTEL_ZKWR8NZUMLWIQZ8RPYHRGDBH3X5KYPXJZG1ITWUTV5QM36O9PT49AMF4KLL0XAMON8XK97OMR5E2G22OXRYB_B1_OKAJCMD-T367KOHOCLP'
// );

// $registrationIds = array(
//     'dwFcSn7HCJ8:APA91bEWccn3v5NMk8dmqOVws9UwxslLJtUwwEIQsv2e9BjYeZAx7rPy6BMVmGP3vNp03X_D3wVITlcEMUVqRQwFcdmX0NBvCH13L0veqVgjqhkYQAI6EtXahKiQkmA1U2rlQICqMjR5'
// );

$registrationIds = $_POST['regid'];

$msg = array(
    'message' => 'Test msg',
    'title' => 'Test title',
    'subtitle' => 'Test subtitle',
    'vibrate' => 1,
    'sound' => 1
);

$fields = array(
    'registration_ids' => $registrationIds,
    'data' => $msg
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
