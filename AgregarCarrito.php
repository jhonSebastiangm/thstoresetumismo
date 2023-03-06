<?php  
  include('database.php');
 
  $id = $_POST['id'];
  $nombre ="";
  $descripcion="";
  $precio="";
  $ruta="";
  $categoria="";
  $idProducto="";
  function getRealIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
        return $_SERVER['HTTP_CLIENT_IP'];
       
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
   
    return $_SERVER['REMOTE_ADDR'];
  }
  $usuario = getRealIP();
  $querycarrito = "SELECT * from carrito WHERE idProducto='$id' AND usuario='$usuario'";
  $resultcarrito = mysqli_query($connection, $querycarrito);
  $datos= mysqli_fetch_array($resultcarrito);
  if(!$resultcarrito) {
    die('Query Failed'. mysqli_error($connection));
  }
  validar($datos);
  function validar ($resultados) {
		if ($resultados !=NULL) {  
      include('database.php');
      $id = $_POST['id'];
      $usuario = getRealIP();
      $querycarritoUpdate = "SELECT * from carrito WHERE idProducto='$id' AND usuario='$usuario'";
      $resultcarritoUpdate = mysqli_query($connection, $querycarritoUpdate);
      while($row = mysqli_fetch_array($resultcarritoUpdate)) {
        $total=0;
        $cantidad=0;
        $total = $row['total'];
        $precio = $row['precio'];
        $cantidad = $row['cantidad'];
        $idUpdate = $row['id'];
        $cantidad = $cantidad+1;
        $total = $cantidad*$precio;
        $queryUpdateCarrito = "UPDATE carrito SET total = '$total', cantidad = '$cantidad' WHERE id = '$idUpdate'";
        $resultUpateCarrito = mysqli_query($connection, $queryUpdateCarrito);
        if (!$resultUpateCarrito) {
          die('Query Failed.');
        }
        
      }
		}else
		{
      include('database.php');
      $id = $_POST['id'];
      $query = "SELECT * from productos WHERE id='$id'";
      $result = mysqli_query($connection, $query);
      while($row = mysqli_fetch_array($result)) {
        $nombre = $row['nombre'];
        $descripcion = $row['descripcion'];
        $precio = $row['precio'];
        $PrecioCompra = $row['PrecioCompra'];
        $ruta = $row['ruta'];
        $rutaCarrito = $row['rutaCarrito'];
        $estado = $row['estado'];
        $categoria = $row['categoria'];
        $idProducto = $row['id'];
        $usuario = getRealIP();
        $queryInsertCarrito = "INSERT INTO carrito(idProducto,nombre, descripcion,PrecioCompra, precio,total,cantidad, ruta,rutaCarrito, estado, categoria,usuario) VALUES ('$idProducto','$nombre', '$descripcion','$PrecioCompra','$precio','$precio',1,'$ruta','$rutaCarrito','$estado','$categoria','$usuario')";
        $resultInsertCarrito = mysqli_query($connection, $queryInsertCarrito);
        if (!$resultInsertCarrito) {
          die('Query Failed.');
        }
      }
		}
	}
?>
