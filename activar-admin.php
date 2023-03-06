<?php

  include('database.php');

if(isset($_POST['idAdmin'])) {

  $id = $_POST['idAdmin'];
  $query = "UPDATE administrador SET estado = '1' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "administrador Update Successfully";  

}

?>