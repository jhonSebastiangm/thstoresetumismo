<?php

  include('database.php');
  $id = $_POST['id'];
  $query = "SELECT * from promociones WHERE id='$id'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'nombre' => $row['nombre'],
      'precio' => $row['precio'],
      'descripcion' => $row['descripcion'],
      'ruta' => $row['ruta'],
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json[0]);
  echo $jsonstring;
?>
