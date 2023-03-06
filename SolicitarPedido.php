<?php
  $Productos = array();
  $camino ="";
  include('database.php');

if(isset($_POST['nombrefac'])) {
  $nombrefac = $_POST['nombrefac'];
  $apellidofac = $_POST['apellidofac'];
  $companifac = $_POST['companifac'];
  $correofac = $_POST['correofac'];
  $telfac = $_POST['telfac'];
  $direccfac = $_POST['direccfac'];
  $paisfac = $_POST['paisfac'];
  $aparfac = $_POST['aparfac'];
  $ciudadfac = $_POST['ciudadfac'];
  $distritofac = $_POST['distritofac'];
  $codigofac = $_POST['codigofac'];
  $nombreenvi = $_POST['nombreenvi'];
  $apellidosenvi = $_POST['apellidosenvi'];
  $companienvi = $_POST['companienvi'];
  $correoenvi = $_POST['correoenvi'];
  $telenvi = $_POST['telenvi'];
  $direccenvi = $_POST['direccenvi'];
  $paisenvi = $_POST['paisenvi'];
  $aparenvi = $_POST['aparenvi'];
  $ciudadenvi = $_POST['ciudadenvi'];
  $distritoenvi = $_POST['distritoenvi'];
  $codigoenvi = $_POST['codigoenvi'];
  $notaenvio = $_POST['notaenvio'];
  $pago = $_POST['pago'];
  $Productos = $_POST['Productos'];
  $suma = $_POST['suma'];
  $sumaiva = $_POST['sumaiva'];

  $query = "INSERT INTO pedidos(nombrefac,apellidofac,companifac,correofac,telfac,direccfac,paisfac,aparfac,ciudadfac,distritofac,codigofac,nombreenvi,apellidosenvi,companienvi,correoenvi,telenvi,direccenvi,paisenvi,aparenvi,ciudadenvi,distritoenvi,codigoenvi,notaenvio, metodopago, suma, sumaiva) VALUES ('$nombrefac', '$apellidofac','$companifac','$correofac','$telfac','$direccfac','$paisfac','$aparfac','$ciudadfac','$distritofac','$codigofac','$nombreenvi','$apellidosenvi','$companienvi','$correoenvi','$telenvi','$direccenvi','$paisenvi','$aparenvi','$ciudadenvi','$distritoenvi','$codigoenvi','$notaenvio','$pago','$suma','$sumaiva')";
  $result = mysqli_query($connection, $query);
  if (!$result) {
    die('Query Failed.');
  }else
  {
    $queryIdPedido = "SELECT @@identity AS id";
    $resultIdPedido = mysqli_query($connection, $queryIdPedido);
    if (!$resultIdPedido) {
    die('queryIdPedido Failed.');
    }else
    {
      while($row = mysqli_fetch_array($resultIdPedido)) {
        $IdPedido =$row['id']; 
      }

      foreach ($Productos as $value) 
      {
        $nombreProducto=$value['nombre'];
        $precioProducto=$value['precio'];
        $PrecioCompraProducto=$value['PrecioCompra'];
        $descripcionProducto=$value['descripcion'];
        $estadoProducto=$value['estado'];
        $cantidad=$value['cantidad'];
        $idProducto=$value['idProducto'];
        $queryProductosPedidos = "INSERT INTO productospedidos(nombre, precio,PrecioCompra, descripcion, estado, IdPedido,idProducto,cantidad) VALUES ('$nombreProducto', '$precioProducto','$PrecioCompraProducto','$descripcionProducto','$estadoProducto','$IdPedido','$idProducto','$cantidad')";
        $resultProductosPedidos = mysqli_query($connection, $queryProductosPedidos);
        if (!$resultProductosPedidos) 
        {
          $camino="error";
          die('QueryresultProductosPedidos Failed.');
        }

        echo("Pedido exitoso");
      }
      if ($camino == "error") {
        echo("Pedido error");
      }else{
        echo("Pedido exitoso");
      }
    }
  }  
}
?>
