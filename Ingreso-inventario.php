<?php

  include('database.php');

if(isset($_POST['id'])) {

  $id = $_POST['id'];
  $NuevaCantidadIngreso = $_POST['NuevaCantidadIngreso'];
  $cantidadIngreso = $_POST['cantidadIngreso'];
  $PrecioCompra = $_POST['PrecioCompra'];
  $NuevaCantidadIngreso = $NuevaCantidadIngreso+$cantidadIngreso;
  $query = "UPDATE productos SET cantidad = '$NuevaCantidadIngreso', PrecioCompra ='$PrecioCompra' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "El Producto Se Ingreso Satisfactoriamente";  

}

?>