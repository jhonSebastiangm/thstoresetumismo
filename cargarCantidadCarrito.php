<?php

  include('database.php');
  function getRealIP() {

    if (!empty($_SERVER['HTTP_CLIENT_IP']))
      return($_SERVER['HTTP_CLIENT_IP']);
         
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
      return($_SERVER['HTTP_X_FORWARDED_FOR']); 
     
    return($_SERVER['REMOTE_ADDR']); 
  }
  $usuario = getRealIP();
  $query = "SELECT COUNT(id) as cantidad FROM carrito WHERE usuario='$usuario'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'cantidad' => $row['cantidad']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
