<?php
  include('database.php');
  $id = $_POST['id'];
  $query = "SELECT * from productos WHERE id='$id'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'nombre' => $row['nombre'],
      'descripcion' => $row['descripcion'],
      'categoria' => $row['categoria'],
      'prenda' => $row['prenda'],
      'precio' => $row['precio'],
      'PrecioCompra' => $row['PrecioCompra'],
      'cantidad' => $row['cantidad'],
      'estado' => $row['estado'],
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json[0]);
  echo $jsonstring;
?>
