<?php

// create db connection to the specific database
$mysqli = new mysqli("*", "*", "*", "*");
 
// if errors occur during connection
if ($mysqli->connect_errno) {
   printf("Connect failed: %s\n", $mysqli->connect_error);
   exit();
}

// Print host information
echo $mysqli->host_info . "\n";

// get the term inserted by the users
$terms = $_GET['terms']; 

//print_r($terms);
// SELECT * FROM `baseterms` WHERE termName LIKE '%Finger%'
// query to execute
$query = "SELECT * FROM baseterms WHERE termName LIKE ?";

// iterate all terms
foreach ($terms as $term){
   printf("term: %s\n", $term);
}

//printf("query: %s\n", $query);//debug query

$stmt = $mysqli->stmt_init();

// prepare the stmt with query
$stmt = $mysqli->prepare($query);
$stmt->bind_param("s", $terms);
$stmt->execute();
$result = $stmt->get_result();

// if no result print error
if (!$result) {
   die('Could not get data: ' . mysql_error());
}

// print the fetched results
while ($row = $result->fetch_row()) {
   printf ("%s (%s)\n", $row[0], $row[1]);
}

//free result set
$result->free();

// close connection
$mysqli->close();

?>