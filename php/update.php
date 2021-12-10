<?php

  header('Access-Control-Allow-Origin: *'); 
  header('Content-Type: application/json');

  $_POST = json_decode(file_get_contents('php://input'), true);

  $code = isset($_POST['code']) ? $_POST['code'] : "";

  if ($code != "") {
    $servername = "localhost";
    $username = "imccotz_tpsf_user";
    $dbname = "imccotz_tpsf";
    $user_password = "imperial2021";
    $CRLF = "\n\r";

    // Create connection.
    $conn = mysqli_connect($servername, $username, $user_password, $dbname);
    if (!$conn) {
      $error_messsage = '{"error":{"code":"503","message":"Service Unavailable"}}';
			echo json_format($error_messsage);
      die;
    }

    $con_result = mysqli_select_db($conn, $dbname);

    if (!$con_result) {
      die('{"error":{"code":"503","message":"Service Unavailable"}}');
    }
    
    $query = "UPDATE `qrcodes` SET `attend` = 1 WHERE `qrImage` = '$code' AND `attend` = 0";
   
	$result = mysqli_query($conn, $query);
	if (!$result) {
		die('{"error":{"code":402,"message":"invalid query"}}');
	}

	echo '{"success":{"code":200,"message":"Data updated"}}';

    mysqli_close($conn);
  }
  else {
    echo '{"error":{"code":"401","message":"Authentication Error"}}';
  }

?>