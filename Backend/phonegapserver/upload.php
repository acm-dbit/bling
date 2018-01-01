<?php 
// if (isset($_POST['submit'])) {
// 	$file = $_FILES['file'];
// 	print_r($file);
// 	$fileName = $file['name'];
// 	$fileTmpName = $file['tmp_name'];
// 	$fileSize = $file['size'];
// 	$fileError = $file['error'];
// 	$fileType = $file['type'];

// 	$fileExt = explode('.',$fileName);
// 	$fileActualExt = strtolower(end($fileExt)) ;

// 	$allowed = array('jpg','jpeg','png','pdf');

// 	if (in_array($fileActualExt,$allowed)) {
// 		if ($fileError===0) {
// 			if ($fileSize<5000000) {
// 				$fileNameNew=uniqid('',true).".".$fileActualExt;
// 				$fileDestintaion = 'http://localhost/phonegapserver/uploads/'.$fileNameNew;
// 				move_uploaded_file($fileTmpName, $fileDestintaion);
// 				header("Location: index.html?uploadSuccess");
// 			}
// 			else{
// 				echo "File Size too big";
// 			}
// 		}
// 		else{
// 			echo "There was an error uploading your file";
// 		}
		
// 	}
// 	else{
// 		echo "Wrong File type!";
// 	}
// }

	print_r($_FILES);
	move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/".$_FILES["file"]["name"]);

// if ($_FILES["file"]["error"] > 0) {
//   echo "Return Code: " . $_FILES["file"]["error"] . "";
// } else {
//   echo "Upload: " . $_FILES["file"]["name"] . "";
//   echo "Type: " . $_FILES["file"]["type"] . "";
//   echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb";
//   echo "Temp file: " . $_FILES["file"]["tmp_name"] . "";
//   if (file_exists("http://localhost/phonegapserver/uploads/" . $_FILES["file"]["name"])) {
//     echo $_FILES["file"]["name"] . " already exists. ";
//   } else {
//     move_uploaded_file($_FILES["file"]["tmp_name"], "http://localhost/phonegapserver/uploads/" . $_FILES["file"]["name"]); //Save location
//     echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
//   }
// }




?>