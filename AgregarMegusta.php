<?php

  include('database.php');
  $id = $_POST['id'];
  $nombre ="";
  $descripcion="";
  $precio="";
  $ruta="";
  $categoria="";
  $idProducto="";
  $query = "SELECT * from productos WHERE id='$id'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }
  while($row = mysqli_fetch_array($result)) {
    $nombre = $row['nombre'];
    $descripcion = $row['descripcion'];
    $precio = $row['precio'];
    $ruta = $row['ruta'];
    $estado = $row['estado'];
    $categoria = $row['categoria'];
    $idProducto = $row['id'];
  }
  $queryInsertCarrito = "INSERT INTO megusta(nombre, descripcion, precio, ruta, estado, categoria) VALUES ('$nombre', '$descripcion','$precio','$ruta','$estado','$categoria')";
  $resultInsertCarrito = mysqli_query($connection, $queryInsertCarrito);

  if (!$resultInsertCarrito) {
    die('Query Failed.');
  }

  echo "carrito Added Successfully";

?>
