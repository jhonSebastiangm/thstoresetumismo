<?php

  include('database.php');
  $query = "SELECT * from pedidos WHERE estado =2";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['id'],
      'nombrefac' => $row['nombrefac'],
      'apellidofac' => $row['apellidofac'],
      'companifac' => $row['companifac'],
      'correofac' => $row['correofac'],
      'telfac' => $row['telfac'],
      'ciudadfac' => $row['ciudadfac'],
      'distritofac' => $row['distritofac']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
