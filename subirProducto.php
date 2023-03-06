<?php
include('database.php');
//Si se quiere subir una imagen
if (isset($_POST['subir'])) {
   $nombre=$_POST['nombre'];
   $precio=$_POST['precio'];
   $precioAntes=$_POST['precioAntes'];
   $descripcion=$_POST['descripcion'];
   $categoria =$_POST['categoria'];
   $prenda =$_POST['prenda'];
   //Recogemos el archivo enviado por el formulario
   $archivo = $_FILES['archivo']['name'];
   $archivoCarrito = $_FILES['archivoCarrito']['name'];
   $archivoGrande = $_FILES['archivoGrande']['name'];
   //Si el archivo contiene algo y es diferente de vacio
   if (isset($archivo) && $archivo != "" && isset($archivoCarrito) && $archivoCarrito != "" && isset($archivoGrande) && $archivoGrande != "") {
      //Obtenemos algunos datos necesarios sobre el archivo
      $tipo = $_FILES['archivo']['type'];
      $tamano = $_FILES['archivo']['size'];
      $temp = $_FILES['archivo']['tmp_name'];
      $tipoCarrito = $_FILES['archivoCarrito']['type'];
      $tamanoCarrito = $_FILES['archivoCarrito']['size'];
      $tempCarrito = $_FILES['archivoCarrito']['tmp_name'];
      $tipoGrande = $_FILES['archivoGrande']['type'];
      $tamanoGrande = $_FILES['archivoGrande']['size'];
      $tempGrande = $_FILES['archivoGrande']['tmp_name'];
      //Se comprueba si el archivo a cargar es correcto observando su extensión y tamaño
     if (!((strpos($tipo, "gif") || strpos($tipo, "jpeg") || strpos($tipo, "jpg") || strpos($tipo, "png")) && ($tamano < 2000000))) {
        echo '<div><b>Error. La extensión o el tamaño de los archivos no es correcta.<br/>
        - Se permiten archivos .gif, .jpg, .png. y de 200 kb como máximo.</b></div>';
     }
     else if (!((strpos($tipoCarrito, "gif") || strpos($tipoCarrito, "jpeg") || strpos($tipoCarrito, "jpg") || strpos($tipoCarrito, "png")) && ($tamanoCarrito < 2000000))) {
        echo '<div><b>Error. La extensión o el tamaño de los archivos no es correcta.<br/>
        - Se permiten archivos .gif, .jpg, .png. y de 200 kb como máximo.</b></div>';
     }
     else if (!((strpos($tipoGrande, "gif") || strpos($tipoGrande, "jpeg") || strpos($tipoGrande, "jpg") || strpos($tipoGrande, "png")) && ($tamanoGrande < 2000000))) {
      echo '<div><b>Error. La extensión o el tamaño de los archivos no es correcta.<br/>
      - Se permiten archivos .gif, .jpg, .png. y de 200 kb como máximo.</b></div>';
   }
     else {
        //Si la imagen es correcta en tamaño y tipo
        //Se intenta subir al servidor
        if (move_uploaded_file($temp, 'img/'.$archivo) && move_uploaded_file($tempCarrito, 'img/'.$archivoCarrito) && move_uploaded_file($tempGrande, 'img/'.$archivoGrande)) {
            //Cambiamos los permisos del archivo a 777 para poder modificarlo posteriormente
            chmod('img/'.$archivo, 0777);
            $ruta="img/$archivo";
            chmod('img/'.$archivoCarrito, 0777);
            $rutaCarrito="img/$archivoCarrito";
            chmod('img/'.$archivoGrande, 0777);
            $rutaGrande="img/$archivoGrande";
            $query = "INSERT INTO productos(nombre,descripcion,precio,precioAntes,ruta,rutaCarrito,rutaImagenExpand,categoria,prenda,estado) VALUES ('$nombre','$descripcion','$precio','$precioAntes','$ruta','$rutaCarrito','$rutaGrande','$categoria','$prenda','0')";
            $result = mysqli_query($connection, $query);
          
            if (!$result) {
              die('Fallo La Conexion.');
            }
            header("Location:productosAdmin.html");
            //Mostramos el mensaje de que se ha subido co éxito
            //echo '<div><b>Se ha subido correctamente la imagen.</b></div>';
            //Mostramos la imagen subida
            //echo '<p><img src="images/'.$archivo.'"></p>';
        }
        else {
           //Si no se ha podido subir la imagen, mostramos un mensaje de error
           echo '<div><b>Ocurrió algún error al subir el fichero. No pudo guardarse.</b></div>';
        }
      }
   }
}
?>