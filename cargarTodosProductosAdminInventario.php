<?php

  include('database.php');
  $query = "SELECT * from productos";
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
      'ruta' => $row['ruta'],
      'descripcion' => $row['descripcion'],
      'estado' => $row['estado'],
      'cantidad' => $row['cantidad']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
