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
  $query = "SELECT * from ventas Where fecha > DATE_SUB(now(), INTERVAL '$horas' HOUR)";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['id'],
      'nombre' => $row['nombre'],
      'precio' => $row['precio'],
      'PrecioCompra' => $row['PrecioCompra'],
      'descripcion' => $row['descripcion'],
      'estado' => $row['estado'],
      'cantidad' => $row['cantidad'],
      'ganancia' => $row['ganancia'],
      'fecha' => $row['fecha']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
