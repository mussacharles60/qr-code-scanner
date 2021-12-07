<?php

    // https://vending.imperialinnovations.co.tz/api/insert.php?apikey=5555&action=crdbQuiz

	header('Content-Type: application/json');

	if (isset($_GET['apikey']) && $_GET['action']) {
		// Get values.
		$apikey = $_GET['apikey'];
        $actionToGet = $_GET['action'];

		$name = "";
		if (isset($_POST['name'])) {
			$name = $_POST['name'];
			$name = str_replace('%20', ' ', $name);
		}
        $email = "";
		if (isset($_POST['email'])) {
			$email = $_POST['email'];
			$email = str_replace('%20', ' ', $email);
		}
        $phone = "";
		if (isset($_POST['phone'])) {
			$phone = $_POST['phone'];
			$phone = str_replace('%20', ' ', $phone);
		}
        $results = "";
		if (isset($_POST['results'])) {
			$results = $_POST['results'];
			$results = str_replace('%20', ' ', $results);
		}
        $most_answer = "";
		if (isset($_POST['most_answer'])) {
			$most_answer = $_POST['most_answer'];
			$most_answer = str_replace('%20', ' ', $most_answer);
		}

		$passcode = "5555";
		
		if ($apikey == $passcode) {
			$servername = "localhost";
			$username = "imccotz_crdb_learn_user";
			$dbname = "imccotz_crdb_learn";
			$password = "#IMPERIALinnovations@2020";
			$CRLF = "\n\r";

			// Create connection.
			$conn = mysqli_connect($servername, $username, $password, $dbname);
			if (!$conn) {
				$error_messsage = '{"error":{"code":207,"message":"connection failed"}}';
				die(json_format($error_messsage));
			}

			$con_result = mysqli_select_db($conn, $dbname);

			if (!$con_result) {
				$error_messsage = '{"error":{"code":206,"message":"invalid connection"}}';
				die(json_format($error_messsage));
			}
			
			$sql = "";

			switch ($actionToGet) {
				case 'crdbQuiz':
						if ( $name != "" && $results != "") {
                            $milliseconds = round(microtime(true) * 1000);
                            $sql = "INSERT INTO `candidates`(`name`, `email`, `phone`, `results`, `most_answer`, `date_added`) VALUES (`$name`,`$email`,`$phone`,`$results`,`$most_answer`,`$milliseconds`)";
						}
						else $sql = "";
						break;
				default:
					$sql = "";
					break;
			}

			if ($sql == "") {
				$error_messsage = '{"error":{"code":203,"message":"invalid data input"}}';
				die(json_format($error_messsage));
			}
			else {
				$result = mysqli_query($conn, $sql);
			
				if (!$result) {
					$error_messsage = '{"error":{"code":204,"message":"invalid query"}}';
					die(json_format($error_messsage));
				}
				else {
					$response = '{"success":{"code":200,"message":"data updated"}}';
					echo json_format($response);
				}
			}
			
			mysqli_close($conn); // Close connection.
		}
		else {
			$error_messsage = '{"error":{"code":202,"message":"invalid authorization access"}}';
			echo json_format($error_messsage);
		}
	}
	else {
		$error_messsage = '{"error":{"code":201,"message":"missing required inputs"}}';
		echo json_format($error_messsage);
	}

	function json_format($json) {
		if (!is_string($json)) {
		  if (phpversion() && phpversion() >= 5.4) {
			return json_encode($json, JSON_PRETTY_PRINT);
		  }
		  $json = json_encode($json);
		}
		$result      = '';
		$pos         = 0;               // indentation level
		$strLen      = strlen($json);
		$indentStr   = "\t";
		$newLine     = "\n";
		$prevChar    = '';
		$outOfQuotes = true;
	  
		for ($i = 0; $i < $strLen; $i++) {
		  // Speedup: copy blocks of input which don't matter re string detection and formatting.
		  $copyLen = strcspn($json, $outOfQuotes ? " \t\r\n\",:[{}]" : "\\\"", $i);
		  if ($copyLen >= 1) {
			$copyStr = substr($json, $i, $copyLen);
			// Also reset the tracker for escapes: we won't be hitting any right now
			// and the next round is the first time an 'escape' character can be seen again at the input.
			$prevChar = '';
			$result .= $copyStr;
			$i += $copyLen - 1;      // correct for the for(;;) loop
			continue;
		  }
		  
		  // Grab the next character in the string
		  $char = substr($json, $i, 1);
		  
		  // Are we inside a quoted string encountering an escape sequence?
		  if (!$outOfQuotes && $prevChar === '\\') {
			// Add the escaped character to the result string and ignore it for the string enter/exit detection:
			$result .= $char;
			$prevChar = '';
			continue;
		  }
		  // Are we entering/exiting a quoted string?
		  if ($char === '"' && $prevChar !== '\\') {
			$outOfQuotes = !$outOfQuotes;
		  }
		  // If this character is the end of an element,
		  // output a new line and indent the next line
		  else if ($outOfQuotes && ($char === '}' || $char === ']')) {
			$result .= $newLine;
			$pos--;
			for ($j = 0; $j < $pos; $j++) {
			  $result .= $indentStr;
			}
		  }
		  // eat all non-essential whitespace in the input as we do our own here and it would only mess up our process
		  else if ($outOfQuotes && false !== strpos(" \t\r\n", $char)) {
			continue;
		  }
	  
		  // Add the character to the result string
		  $result .= $char;
		  // always add a space after a field colon:
		  if ($outOfQuotes && $char === ':') {
			$result .= ' ';
		  }
	  
		  // If the last character was the beginning of an element,
		  // output a new line and indent the next line
		  else if ($outOfQuotes && ($char === ',' || $char === '{' || $char === '[')) {
			$result .= $newLine;
			if ($char === '{' || $char === '[') {
			  $pos++;
			}
			for ($j = 0; $j < $pos; $j++) {
			  $result .= $indentStr;
			}
		  }
		  $prevChar = $char;
		}
	  
		return $result;
	  }
				
?>