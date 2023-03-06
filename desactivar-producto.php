<?php

  include('database.php');

if(isset($_POST['idproducto'])) {

  $id = $_POST['idproducto'];
  $query = "UPDATE productos SET estado = '1' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "product Update Successfully";  

}

?>