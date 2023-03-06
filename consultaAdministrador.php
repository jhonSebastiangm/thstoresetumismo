<?php

session_start();

include('database.php');

$correo = $_POST['correo'];
$contra = $_POST['contra'];
if(!empty($correo)) {
  $query = "SELECT contra,correo FROM administrador WHERE correo='$correo' AND contra='$contra' AND estado='1'";
  $result = mysqli_query($connection, $query);
  
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'contra' => $row['contra'],
      'correo' => $row['correo']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}

?>
