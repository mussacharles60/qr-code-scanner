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
    else {
      $query_1 = "SELECT `first_name`, `last_name` FROM `qrcodes` WHERE `qrImage` = '$code'";
      $result_1 = mysqli_query($conn, $query_1);
      if (!$result) {
        echo '{"error":{"code":402,"message":"invalid query"}}';
      }
      else {
        $first_name = "";
        $last_name = "";
        $row = mysqli_fetch_assoc($result_1);
        $first_name = $row['first_name'];
        $last_name = $row['last_name'];
        if ($first_name == "" && $last_name == "") {
          echo '{"error":{"code":404,"message":"QR Code Not Found"}}';
        }
        else {
          //$message = "Hello $first_name $last_name, you have been successfully checked in.";
          echo '{"success":{"code":200,"message":"Data updated", "user":{"first_name":"'.$first_name.'","last_name": "'.$last_name.'"}}}';
        }
      }
    }
    mysqli_close($conn);
  }
  else {
    echo '{"error":{"code":"401","message":"Authentication Error"}}';
  }

?>