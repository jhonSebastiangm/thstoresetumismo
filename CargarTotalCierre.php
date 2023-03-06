<?php

  include('database.php');
  $selectCierre = $_POST['selectCierre'];
  if ($selectCierre == 1) {
    $horas=24;
  }
  if ($selectCierre == 8) {
  $horas=192;
  }
  if ($selectCierre == 15) {
  $horas=360;
  }
  if ($selectCierre == 30) {
  $horas=720;
  }
  $query = "SELECT precio,cantidad FROM `ventas` WHERE fecha > DATE_SUB(now(), INTERVAL '$horas' HOUR)";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'cantidad' => $row['cantidad'],
      'precio' => $row['precio']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
