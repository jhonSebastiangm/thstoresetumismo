<?php
  function getRealIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
      return $_SERVER['HTTP_CLIENT_IP'];
        
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
      return $_SERVER['HTTP_X_FORWARDED_FOR'];
    
    return $_SERVER['REMOTE_ADDR'];
  }
  $usuario = getRealIP();
  include('database.php');
  $query = "SELECT * from carrito WHERE usuario='$usuario'";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['id'],
      'nombre' => $row['nombre'],
      'precio' => $row['precio'],
      'ruta' => $row['rutaCarrito'],
      'descripcion' => $row['descripcion'],
      'texto' => $row['nombre']." ".$row['descripcion']." ".$row['precio'],
      'estado' => $row['estado'],
      'cantidad' => $row['cantidad']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
