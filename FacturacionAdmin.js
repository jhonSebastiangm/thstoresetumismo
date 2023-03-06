$(document).ready(function() {
    $('#divProductos').hide();
    CargarPedidosVendidos();
      function CargarPedidosVendidos(selectCierre) {
        $.ajax({
            url: 'CargarPedidosVendidos.php',
            type: 'POST',
            success: function(response) { 
              console.log(response);
              const productos = JSON.parse(response);
               let template = '';
               productos.forEach(producto => {
              template += `
                <tr IdPedido="${producto.id}">
                <td>${producto.id}</td>
                <td>${producto.nombrefac}</td>
                <td>${producto.apellidofac}</td>
                <td>${producto.companifac}</td>
                <td>${producto.correofac}</td>
                <td>${producto.telfac}</td>
                <td>${producto.ciudadfac}</td>
                <td>${producto.distritofac}</td>
                <td>
                <button class="Ver-Factura btn btn-primary">
                Ver Factura
                </button>
                </td>
                <td>
                <button class="Ver-productos btn btn-secondary">
                Ver Producyos
                </button>
                </td>
                </tr>`
              });
              $('#Ventas').html(template);
            }
          });
    }

    $(document).on('click', '.Ver-Factura',function() {
        if(confirm('quieres ver esta promocion?')) {
          let element = $(this)[0].parentElement.parentElement;
          let IdPedido = $(element).attr('IdPedido');
          location.href="factura.php?IdPedido="+IdPedido;
        }else{
          cargarPromocion1();
          cargarPromocion2();
          cargarPromocion3();
          cargarPromocion4();
        }
    });
    
    
    $(document).on('click', '.Ver-productos', function()  {
        let  element = $(this)[0].parentElement.parentElement;
        let IdPedido = $(element).attr('IdPedido');
        $.post('Ver-productos.php', {IdPedido}, (response) => {
            console.log(response);
          const productos = JSON.parse(response);
           let template = '';
           productos.forEach(producto => {
          template += `
            <tr idproducto="${producto.id}">
            <td>${producto.IdPedido}</td>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.fecha}</td>
            </tr>`
          });
          $('#Productos').html(template);
          $('#divProductos').show();
        });
    });
});