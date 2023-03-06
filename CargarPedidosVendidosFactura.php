<?php

  include('database.php');
  $IdPedido = $_POST['IdPedido'];
  $query = "SELECT * from pedidos WHERE id='$IdPedido'";
  $resultPedidos = mysqli_query($connection, $query);


  $json = array();
  while($row = mysqli_fetch_array($resultPedidos)) {
    $json[] = array(
      'id' => $row['id'],
      'nombrefac' => $row['nombrefac'],
      'apellidofac' => $row['apellidofac'],
      'correofac' => $row['correofac'],
      'direccfac' => $row['direccfac'],
      'sumaiva' => $row['sumaiva'],
      'fecha' => $row['fecha']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
