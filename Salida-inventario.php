<?php

  include('database.php');

if(isset($_POST['id'])) {

  $id = $_POST['id'];
  $NuevaCantidadSalida = $_POST['NuevaCantidadSalida'];
  $cantidadSalida = $_POST['cantidadSalida'];
  $NuevaCantidadSalida = $cantidadSalida-$NuevaCantidadSalida;
  $query = "UPDATE productos SET cantidad = '$NuevaCantidadSalida' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }


  $nombrefac = $_POST['nombrefac'];
  $apellidofac = $_POST['apellidofac'];
  $correofac = $_POST['correofac'];
  $telfac = $_POST['telfac'];
  $precio = $_POST['precioSalida'];
  $PrecioCompraSalida = $_POST['PrecioCompraSalida'];
  $cantidadSalida = $_POST['NuevaCantidadSalida'];
  $metodopago="EN LOCAL";
  $suma=$precio*$cantidadSalida;
  $sumaiva=$suma+35000;
  $estado=2;
  $query = "INSERT INTO pedidos(nombrefac,apellidofac,correofac,telfac,metodopago,suma,sumaiva,estado,fecha) VALUES ('$nombrefac', '$apellidofac','$correofac','$telfac','$metodopago','$suma','$sumaiva','$estado',now())";
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
      $queryproductos = "SELECT * FROM productos where id='$id'";
      $resultproductos= mysqli_query($connection, $queryproductos);
      
      if(!$resultproductos) {
        die('Query Error' . mysqli_error($connection));
      }
      while($productos = mysqli_fetch_array($resultproductos)) {
        $nombreProducto=$productos['nombre'];
        $precioProducto=$productos['precio'];
        $PrecioCompraProducto=$productos['PrecioCompra'];
        $descripcionProducto=$productos['descripcion'];
        $estadoProducto=$productos['estado'];
        $cantidad=$_POST['NuevaCantidadSalida'];
        $idProducto=$productos['id'];
        $queryProductosPedidos = "INSERT INTO productospedidos(nombre, precio,PrecioCompra, descripcion, estado, IdPedido,idProducto,cantidad) VALUES ('$nombreProducto', '$precioProducto','$PrecioCompraProducto','$descripcionProducto','$estadoProducto','$IdPedido','$idProducto','$cantidad')";
        $resultProductosPedidos = mysqli_query($connection, $queryProductosPedidos);
        if (!$resultProductosPedidos) 
        {
          $camino="error";
          die('QueryresultProductosPedidos Failed.');
        }
        $nombreProducto=$productos['nombre'];
        $precioProducto=$productos['precio'];
        $PrecioCompraProducto=$productos['PrecioCompra'];
        $descripcionProducto=$productos['descripcion'];
        $estadoProducto=$productos['estado'];
        $cantidadSalidaVenta = $_POST['NuevaCantidadSalida'];
        $idProducto=$productos['id'];
        $ganancia= ($precio*$cantidadSalida)-($PrecioCompraSalida*$cantidadSalida);
        $queryventas = "INSERT INTO ventas (nombre, precio, PrecioCompra,descripcion,IdPedido,cantidad,ganancia,fecha) VALUES  ('$nombreProducto', '$precioProducto','$PrecioCompraProducto','$descripcionProducto','$IdPedido','$cantidadSalidaVenta','$ganancia',now())";
        $resultventas = mysqli_query($connection, $queryventas);
      
        if (!$resultventas) {
          die('Fallo La Conexion Aqui');
        }

        echo("Pedido exitoso");
 
      }
    }
  }  



  echo "El Producto Salio Satisfactoriamente";  

}

?>