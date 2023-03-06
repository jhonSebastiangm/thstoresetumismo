<?php

  include('database.php');
  $query = "SELECT ruta from anuncios WHERE id ={$_REQUEST['id']}";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }


  while($row = mysqli_fetch_array($result)) {
    $ruta = $row['ruta'];
  }
  echo '<p><img src="'.$ruta.'"></p>';

?>