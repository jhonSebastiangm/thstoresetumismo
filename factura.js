$(document).ready(function() {

    CargarPedidosVendidosFactura();
    function CargarPedidosVendidosFactura() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
         vars[key] = value;
         var IdPedido=vars[key];
        
        $.ajax({
            url: 'CargarPedidosVendidosFactura.php',
            type: 'POST',
            data:{IdPedido:IdPedido},
            success: function(response) { 
              console.log(response);
              const productos = JSON.parse(response);
               let template = '';
               productos.forEach(producto => {
              template += `
              <h5 class="mb-3">Para:</h5>
              <h3 class="text-dark mb-1">${producto.nombrefac}</h3>
              <div>Apellido:${producto.apellidofac}</div>
              <div>Correo::${producto.correofac}</div>
              <div>Telefono: ${producto.telfac}</div>
              <div>Direccion: ${producto.direccfac}</div>`
              });
              $('#datosFac').html(template);
            }
          });
        });
    }

    CargarVendidosFactura();
    function CargarVendidosFactura() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
         vars[key] = value;
         var IdPedido=vars[key];
        $.ajax({
            url: 'CargarPedidosVendidosFactura.php',
            type: 'POST',
            data:{IdPedido:IdPedido},
            success: function(response) { 
              console.log(response);
              const productos = JSON.parse(response);
               let template = '';
               productos.forEach(producto => {
              template += `
              <h3 class="mb-0">Pedido #NF: ${producto.id}</br>
              Fecha: ${producto.fecha}</br>
              Nit 901362194-1</h3>
              <button><a href="javascript:pruebaDivAPdf()" class="button">Descargar PDF</a></button>
              `
              });
              $('#Nfac').html(template);
            }
          });
        });
    }


    CargarProductosVendidosFactura();
    function CargarProductosVendidosFactura() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
         vars[key] = value;
         var IdPedido=vars[key];
        $.ajax({
            url: 'CargarProductosVendidosFactura.php',
            type: 'POST',
            data:{IdPedido:IdPedido},
            success: function(response) { 
              console.log(response);
              const productos = JSON.parse(response);
               let template = '';
               productos.forEach(producto => {
              template += `
              <tr>  
              <td class="center">${producto.IdPedido}</td>
              <td class="center">${producto.nombre}</td>
              <td class="left">${producto.descripcion}</td>
              <td class="left">${producto.cantidad}</td>
              <td class="right">${producto.fecha}</td>
              <td class="right">${producto.precio}</td>
              </tr>`
              });
              $('#productos').html(template);
            }
          });
        });
    }

    TotalFactura();
    function TotalFactura() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
         vars[key] = value;
         var IdPedido=vars[key];
        
        $.ajax({
            url: 'CargarPedidosVendidosFactura.php',
            type: 'POST',
            data:{IdPedido:IdPedido},
            success: function(response) { 
              console.log(response);
              const productos = JSON.parse(response);
               let template = '';
               productos.forEach(producto => {
              template += `

              <tr>
              <td class="left">
                  <strong class="text-dark">IVA</strong>
              </td>
              <td class="right">35000</td>
          </tr>
            
          <tr>
              <td class="left">
                  <strong class="text-dark">Total</strong> </td>
              <td class="right">
                  <strong class="text-dark">${producto.sumaiva}</strong>
              </td>
          </tr>`
              });
              $('#total').html(template);
            }
          });
        });
    }
});