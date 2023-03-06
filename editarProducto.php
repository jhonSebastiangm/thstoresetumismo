<?php

  include('database.php');

if(isset($_POST['idproductoModificar'])) {
  $nombre = $_POST['nombreModificar'];
  $precio = $_POST['precioModificar']; 
  $precioAntesModificar = $_POST['precioAntesModificar']; 
  $descripcion = $_POST['descripcionModificar']; 
  $categoria = $_POST['categoriaModificar'];  
  $id = $_POST['idproductoModificar'];
  $query = "UPDATE productos SET nombre = '$nombre', precio = '$precio', precioAntes='$precioAntesModificar', descripcion='$descripcion', categoria='$categoria' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "productos Update Successfully";  

}

?>
