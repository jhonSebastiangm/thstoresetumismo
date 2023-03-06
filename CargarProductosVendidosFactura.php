<?php

  include('database.php');

  include('database.php');
  $IdPedidoVentas = $_POST['IdPedido'];
  $queryProductos = "SELECT * from ventas WHERE IdPedido='$IdPedidoVentas'";
  $resultProductos = mysqli_query($connection, $queryProductos);
  $X='X ';

  $json = array();
  while($row = mysqli_fetch_array($resultProductos)) {
    $json[] = array(
      'id' => $row['id'],
      'IdPedido' => $row['IdPedido'],
      'nombre' => $row['nombre'],
      'descripcion' => $row['descripcion'],
      'cantidad' => $row['cantidad'],
      'precio' => $row['precio'],
      'fecha' => $row['fecha']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
