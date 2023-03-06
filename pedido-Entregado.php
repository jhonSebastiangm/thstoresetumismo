<?php

  include('database.php');

if(isset($_POST['idPedido'])) {

  $id = $_POST['idPedido'];
  $querypedidos = "SELECT id FROM pedidos where id='$id'";
  $resultpedidos = mysqli_query($connection, $querypedidos);
  
  if(!$resultpedidos) {
    die('Query Error' . mysqli_error($connection));
  }
  while($row = mysqli_fetch_array($resultpedidos)) {
    $IdProductos = $row['id'];
    $queryproductospedidos = "SELECT * FROM productospedidos where IdPedido='$IdProductos'";
    $resultproductospedidos = mysqli_query($connection, $queryproductospedidos);
    
    if(!$resultproductospedidos) {
      die('Query Error' . mysqli_error($connection));
    }
    while($pedido = mysqli_fetch_array($resultproductospedidos)) {
        $IdPedido = $pedido['IdPedido'];
        $idProducto = $pedido['idProducto'];
        $nombreProductosPedidos = $pedido['nombre'];
        $precioProductosPedidos = $pedido['precio'];
        $PrecioCompraProductosPedidos = $pedido['PrecioCompra'];
        $descripcionProductosPedidos = $pedido['descripcion'];
        $estadoProductosPedidos = $pedido['estado'];
        $cantidadProductosPedidos = $pedido['cantidad'];
        $ganancia= ($precioProductosPedidos*$cantidadProductosPedidos)-($PrecioCompraProductosPedidos*$cantidadProductosPedidos);
        $queryventas = "INSERT INTO ventas (nombre, precio, PrecioCompra,descripcion,estado,IdPedido,cantidad,ganancia,fecha) VALUES ('$nombreProductosPedidos', '$precioProductosPedidos','$PrecioCompraProductosPedidos','$descripcionProductosPedidos','$estadoProductosPedidos','$IdPedido','$cantidadProductosPedidos','$ganancia',now())";
        $resultventas = mysqli_query($connection, $queryventas);
      
        if (!$resultventas) {
          die('Fallo La Conexion Aqui');
        }
        $queryproductos = "SELECT * FROM productos where id='$idProducto'";
        $resultproductos= mysqli_query($connection, $queryproductos);
        
        if(!$resultproductos) {
          die('Query Error' . mysqli_error($connection));
        }
        while($productos = mysqli_fetch_array($resultproductos)) {
          $cantidadProductos = $productos['cantidad'];
          $cantidadProductosRestar = $cantidadProductos-$cantidadProductosPedidos;
          $query = "UPDATE productos SET cantidad = '$cantidadProductosRestar' WHERE id = '$idProducto'";
          $result = mysqli_query($connection, $query);
        
          if (!$result) {
            die('Query Failed.');
          }
          echo "Pedido Entregado Exitosamente";
        }
        
      }
      $query = "UPDATE pedidos SET estado = '2', fecha=now() WHERE id = '$id'";
      $result = mysqli_query($connection, $query);
    
      if (!$result) {
        die('Query Failed.');
      }

  

      
    }
   
}
?>