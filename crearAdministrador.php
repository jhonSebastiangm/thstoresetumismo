<?php

  include('database.php');

if(isset($_POST['correo'])) {
  # echo $_POST['name'] . ', ' . $_POST['description'];
  $correo = $_POST['correo'];
  $contra = $_POST['contra'];
  $query = "INSERT INTO administrador(correo, contra,estado) VALUES ('$correo', '$contra',0)";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }

  echo "administrador Added Successfully";  

}

?>
