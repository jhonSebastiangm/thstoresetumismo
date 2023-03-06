<?php

  include('database.php');

  $query = "SELECT * from pedidos WHERE estado='0'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'nombrefac' => $row['nombrefac'],
      'apellidofac' => $row['apellidofac'],
      'companifac' => $row['companifac'],
      'telfac' => $row['telfac'],
      'direccfac' => $row['direccfac'],
      'paisfac' => $row['paisfac'],
      'aparfac' => $row['aparfac'],
      'ciudadfac' => $row['ciudadfac'],
      'notaenvio' => $row['notaenvio'],
      'metodopago' => $row['metodopago'],
      'suma' => $row['suma'],
      'sumaiva' => $row['sumaiva'],
      'estado' => $row['estado'],
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
