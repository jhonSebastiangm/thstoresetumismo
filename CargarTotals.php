<?php

  include('database.php');
  $id= $_POST['id'];
  $cantidad= $_POST['cantidad'];

  $query = "SELECT precio FROM `carrito` WHERE id='$id'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  
  while($row = mysqli_fetch_array($result)) {
   $precio = $row['precio'];  
  }
  $total = $precio*$cantidad;
  $queryModificarPrecio = "UPDATE carrito SET total = '$total', cantidad='$cantidad'  WHERE id = '$id'";
  $resultModificarPrecio = mysqli_query($connection, $queryModificarPrecio);
  if (!$resultModificarPrecio) {
    die('QueryModificarPrecio Failed.');
  }
  
  $query = "SELECT total FROM `carrito` WHERE id='$id'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'total' => $row['total']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;



 
?>
