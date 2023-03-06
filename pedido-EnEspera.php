<?php

  include('database.php');

if(isset($_POST['idPedido'])) {

  $id = $_POST['idPedido'];
  $query = "UPDATE pedidos SET estado = '1' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "product Update Successfully";  

}

?>