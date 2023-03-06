<?php

  include('database.php');

if(isset($_POST['nombre'])) {
  # echo $_POST['name'] . ', ' . $_POST['description'];
  $nombre = $_POST['nombre'];
  $query = "INSERT INTO categorias (nombre,estado) VALUES ('$nombre', '0')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }

  echo "categorias Added Successfully";  

}

?>
