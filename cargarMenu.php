<?php

  include('database.php');
  $query = "SELECT * from categorias WHERE estado='0'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['id'],
      'nombre' => $row['nombre'],
      'estado' => $row['estado']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
