<?php

  include('database.php');
  $id = $_POST['id'];
  $query = "SELECT * from productos WHERE categoria='$id' AND estado='0'";
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
      'precioAntes' => $row['precioAntes'],
      'ruta' => $row['ruta'],
      'descripcion' => $row['descripcion'],
      'cantidad' => $row['cantidad'],
      'texto' => $row['nombre']." ".$row['descripcion']." ".$row['precio'],
      'estado' => $row['estado']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
