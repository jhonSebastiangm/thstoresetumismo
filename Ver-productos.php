<?php
  include('database.php');
  $IdPedido = $_POST['IdPedido'];
  $query = "SELECT * from ventas WHERE IdPedido='$IdPedido'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'nombre' => $row['nombre'],
      'descripcion' => $row['descripcion'],
      'precio' => $row['precio'],
      'cantidad' => $row['cantidad'],
      'fecha' => $row['fecha'],
      'IdPedido' => $row['IdPedido'],
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
