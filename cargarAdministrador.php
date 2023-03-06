<?php

  include('database.php');

  $query = "SELECT * from administrador";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'correo' => $row['correo'],
      'contra' => $row['contra'],
      'estado' => $row['estado'],
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
