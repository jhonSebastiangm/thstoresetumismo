$(document).ready(function() {
  $('#tableCierre').hide();

    function CargarTotal(selectCierre) {
      suma=0;
        $.ajax({
          data : {selectCierre:selectCierre},
          url: 'CargarTotalCierre.php',
          type: 'POST',
          success: function(response) {
            console.log(response);
            const Totals = JSON.parse(response);
            let template = '';
            let suma=0;
            console.log(suma);
            Totals.forEach(total => {
              suma = parseFloat(suma) + (parseFloat(total.precio)*parseFloat(total.cantidad));
            });
            template += `
            <tr>
            <th>Subtotal</th>
            <td>$${suma}</td>
          </tr>
          <tr>
           <tr>
           </tr>
            <th>Total</th>
            <td>$${suma}</td>
          `
            $('#CargarTotal').html(template);
          }
        });
   }
  
    $("#selectCierre").change(function() { 
      let selectCierre = $("#selectCierre").val(); 
      CargarTotal(selectCierre);
      $.ajax({
          url: 'CargarCierre.php',
          type: 'POST',
          data:{selectCierre:selectCierre},
          success: function(response) { 
            console.log(response);
            const productos = JSON.parse(response);
             let template = '';
             productos.forEach(producto => {
            template += `
              <tr idproducto="${producto.id}">
              <td>${producto.cantidad}</td>
              <td>${producto.precio}</td>
              <td>${producto.descripcion}</td>
              <td>${producto.nombre}</td>
              <td>${producto.PrecioCompra}</td>
              <td>${producto.id}</td>
              <td>${producto.ganancia}</td>
              <td>${producto.fecha}</td>
              </tr>`
            });
            $('#Cierre').html(template);
          }
        });
    });
  
   
  });