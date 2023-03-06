<?php

include('database.php');

  $id = $_GET['id'];


  $queryBuscaProducto = "SELECT * FROM productos WHERE id='$id'"; 

  $resultqueryBuscaProducto = mysqli_query($connection, $queryBuscaProducto);
  
  if(!$resultqueryBuscaProducto) {
    die('resultqueryBuscaProducto Error' . mysqli_error($connection));
  }
  
  $json = array();
  while($row = mysqli_fetch_array($resultqueryBuscaProducto)) {
    $json[] = array(
      'nombreImagen' => $row['nombre'],
      'descripcionImagen' => $row['descripcion'],
      'precioImagen' => $row['precio'],
      'rutaImagen' => $row['ruta'],
      'rutaImagenExpand' => $row['rutaImagenExpand'],
      'id' => $row['id']
    );
  }

    
  $jsonstring = json_encode($json);
  echo $jsonstring;

    




?>
