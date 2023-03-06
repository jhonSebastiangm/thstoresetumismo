<?php

  include('database.php');

if(isset($_POST['id'])) {
  $correo = $_POST['correo']; 
  $contra = $_POST['contra'];
  $id = $_POST['id'];
  $query = "UPDATE administrador SET correo = '$correo', contra = '$contra' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "administrador Editado Correctamente";  

}

?>
