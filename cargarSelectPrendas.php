<?php

include('database.php');

  $cate = $_POST['cate'];
  $query = "SELECT id,nombre FROM prendas where estado=0 AND categorias='$cate'";
  $result = mysqli_query($connection, $query);
  
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['id'],
      'nombre' => $row['nombre']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;


?>
