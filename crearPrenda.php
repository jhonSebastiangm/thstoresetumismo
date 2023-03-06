<?php

  include('database.php');

if(isset($_POST['nombre'])) {
  # echo $_POST['name'] . ', ' . $_POST['description'];
  $nombre = $_POST['nombre'];
  $categorias = $_POST['categorias'];
  $query = "INSERT INTO prendas(nombre, categorias, estado) VALUES ('$nombre', '$categorias','0')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Fallo La Conexion.');
  }

  echo "prendas OSMOS registrado correctamente";  

}

?>
