<?php

  include('database.php');

if(isset($_POST['id'])) {
  $id = $_POST['id'];
  $querySeleccionDePromociones = "SELECT * from anuncios WHERE Anuncio =2 AND estado =1";
  $resultSeleccionDePromociones = mysqli_query($connection, $querySeleccionDePromociones);
  if(!$resultSeleccionDePromociones) {
    die('querySeleccionDePromociones Failed'. mysqli_error($connection));
  }else {
    while($rowSeleccionDePromociones = mysqli_fetch_array($resultSeleccionDePromociones)) {
    $idSeleccionDePromociones = $rowSeleccionDePromociones['id'];
    }
    $queryPromocionAnteriorEditada = "UPDATE anuncios SET estado = 0 WHERE id = '$idSeleccionDePromociones'";
    $resultPromocionAnteriorEditada = mysqli_query($connection, $queryPromocionAnteriorEditada);
    if(!$resultPromocionAnteriorEditada) {
    die('queryPromocionAnteriorEditada Failed'. mysqli_error($connection));
    }else {
    $queryPromocionNueva = "UPDATE anuncios SET estado = 1 WHERE id = '$id'";
    $resultPromocionNueva = mysqli_query($connection, $queryPromocionNueva);
    if (!$resultPromocionNueva) {
    die('Query Failed.');
    }else {
    echo "anuncios Update Successfully $idSeleccionDePromociones";    
    }
       
    }
}
}else {
    echo"id vacio";
}


?>