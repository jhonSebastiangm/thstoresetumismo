<?php

  include('database.php');

if(isset($_POST['idpromoModificar'])) {
  $nombre = $_POST['nombreModificar'];
  $id = $_POST['idpromoModificar'];
  $query = "UPDATE anuncios SET nombre = '$nombre'  WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "promociones Update Successfully";  

}

?>
