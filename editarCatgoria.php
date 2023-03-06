<?php

  include('database.php');

if(isset($_POST['idproductoModificar'])) {
  $nombre = $_POST['nombreModificar'];
  $id = $_POST['idproductoModificar'];
  $query = "UPDATE categorias SET nombre = '$nombre' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "categorias Update Successfully";  

}

?>
