<?php

  include('database.php');

if(isset($_POST['id'])) {
  $total = $_POST['total']; 
  $id = $_POST['id'];
  $query = "UPDATE carrito SET total = '$total' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "carrito Update Successfully";  

}

?>
