<?php

  include('database.php');

if(isset($_POST['id'])) {

  $id = $_POST['id'];
  $query = "UPDATE anuncios SET estado = '0' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "product Update Successfully";  

}

?>