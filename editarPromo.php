<?php

  include('database.php');

if(isset($_POST['idpromoModificar'])) {
  $nombre = $_POST['nombreModificar'];
  $precio = $_POST['precioModificar']; 
  $descripcion = $_POST['descripcionModificar']; 
  $id = $_POST['idpromoModificar'];
  $query = "UPDATE promociones SET nombre = '$nombre', precio = '$precio', descripcion='$descripcion'  WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "promociones Update Successfully";  

}

?>
