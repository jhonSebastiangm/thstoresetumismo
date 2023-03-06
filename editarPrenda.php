<?php

  include('database.php');

if(isset($_POST['idproductoModificar'])) {
  $nombre = $_POST['nombreModificar'];
  $categoria = $_POST['categoriasModificar'];
  $id = $_POST['idproductoModificar'];
  $query = "UPDATE prendas SET nombre = '$nombre', categorias='$categoria' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "prendas Update Successfully";  

}

?>
