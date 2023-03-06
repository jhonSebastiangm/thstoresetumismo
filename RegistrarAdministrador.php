<?php

  include('database.php');

if(isset($_POST['correo'])) {
  # echo $_POST['name'] . ', ' . $_POST['description'];
  $correo = $_POST['correo'];
  $contra = $_POST['contra'];
  $query = "INSERT INTO administrador(correo, contra) VALUES ('$correo', '$contra')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Fallo La Conexion.');
  }

  echo "Administrador OSMOS registrado correctamente";  

}

?>
