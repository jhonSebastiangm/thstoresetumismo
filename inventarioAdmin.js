$(document).ready(function() {
  let edit = false;
  $('#divIngeso').hide();
  $('#divSalida').hide();
  cargarTodosProductosAdminInventario();
  function cargarTodosProductosAdminInventario(){
    $.ajax({
      url: 'cargarTodosProductosAdminInventario.php',
      type: 'GET',
      success: function(response){
        console.log(response); 
        const productos = JSON.parse(response);
         let template = '';
         productos.forEach(producto => {
          if (producto.cantidad >0) {
            bloqueobotonYatienePrecioCompra = 'style="display: none;"';
          }else{
            bloqueobotonYatienePrecioCompra = "";
          }
          if (producto.cantidad <=0) {
            bloqueobotonNotieneCantidad = 'style="display: none;"';
          }else{
            bloqueobotonNotieneCantidad = "";
          }
        template += `
          <tr idproducto="${producto.id}">
          <td>${producto.id}</td>
          <td>${producto.nombre}</td>
          <td>${producto.descripcion}</td>
          <td>${producto.precio}</td>
          <td>${producto.PrecioCompra}</td>
           <td>${producto.cantidad}</td>
          <td>
          <button class="Ingreso-producto btn btn-success" ${bloqueobotonYatienePrecioCompra}>
          Ingreso
          </button>
          </td>
          <td>
          <button class="Salida-producto btn btn-danger" ${bloqueobotonNotieneCantidad}>
           Salida
          </button>
          </td>
          </tr>`
        });
        $('#Inventario').html(template);
      }
    });
  }

  cargarSelectCategorias();
  function cargarSelectCategorias(){
    $.ajax({
        type: "GET",
        url: 'cargarSelectCategorias.php', 
        dataType: "json",
        success: function(data){
          $.each(data,function(key, registro) {
            $("#categoria").append('<option value='+registro.id+'>'+registro.nombre+'</option>');
          });        
        },
        error: function(data) {
          alert('errorcategoria');
        }
    });
  }

  $("#categoria").change(function() {
    
      let cate = $("#categoria").val(); 
      $.ajax({
          type: "POST",
          data: {cate:cate},
          url: 'cargarSelectPrendas.php',     
          dataType: "json",
          success: function(response){
            console.log(response);
            $.each(response,function(key, registro) {
              $("#prenda").append('<option value='+registro.id+'>'+registro.nombre+'</option>');
            });        
          },
          error: function(response) {
            alert('errorprenda');
          }
      });
  });

  $("#prenda").change(function() {
    let prenda = $("#prenda").val(); 
    let cate = $("#categoria").val(); 
    $.ajax({
        url: 'cargarProductosAdminInventario.php',
        type: 'POST',
        data:{prenda:prenda,cate:cate},
        success: function(response) 
        { 
          const productos = JSON.parse(response);
           let template = '';
           productos.forEach(producto => {
          template += `
            <tr idproducto="${producto.id}">
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precio}</td>
            <td>${producto.PrecioCompra}</td>
             <td>${producto.cantidad}</td>
            <td>
            <button class="Ingreso-producto btn btn-success">
            Ingreso
            </button>
            </td>
            <td>
            <button class="Salida-producto btn btn-danger">
             Salida
            </button>
            </td>
            </tr>`
          });
          $('#Inventario').html(template);
        }
      });
  });

  $(document).on('click', '.Ingreso-producto', function()  {
    let  element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('idproducto');
    console.log(id);
    $.post('Buscar-producto.php', {id}, (response) => {
      const producto = JSON.parse(response);
      $('#nombreIngreso').val(producto.nombre);
      $('#descripcionIngreso').val(producto.descripcion);
      $('#categoriaIngreso').val(producto.categoria);
      $('#prendaIngreso').val(producto.prenda);
      $('#precioIngreso').val(producto.precio);
      $('#cantidadIngreso').val(producto.cantidad);
      $('#estadoIngreso').val(producto.estado);
      $('#idIngreso').val(producto.id);
      $('#divIngeso').show();
    });
  });


  $('#Ingreso').submit(e => {
    e.preventDefault();
    const postData = {
      PrecioCompra: $('#PrecioCompra').val(),
      cantidadIngreso: $('#cantidadIngreso').val(),
      NuevaCantidadIngreso: $('#NuevaCantidadIngreso').val(),
      id: $('#idIngreso').val()
    };
    const url = 'Ingreso-inventario.php';
    console.log(postData, url);
    $.post(url, postData, (response) => {
      console.log(response);
      alert(response);
      $('#divIngeso').hide();
      let prenda = $("#prenda").val(); 
      let cate = $("#categoria").val(); 
      $.ajax({
          url: 'cargarProductosAdminInventario.php',
          type: 'POST',
          data:{prenda:prenda,cate:cate},
          success: function(response) 
          { 
            const productos = JSON.parse(response);
             let template = '';
             productos.forEach(producto => {
            template += `
              <tr idproducto="${producto.id}">
              <td>${producto.id}</td>
              <td>${producto.nombre}</td>
              <td>${producto.descripcion}</td>
              <td>${producto.precio}</td>
              <td>${producto.PrecioCompra}</td>
               <td>${producto.cantidad}</td>
              <td>
              <button class="Ingreso-producto btn btn-success">
              Ingreso
              </button>
              </td>
              <td>
              <button class="Salida-producto btn btn-danger">
               Salida
              </button>
              </td>
              </tr>`
            });
            $('#Inventario').html(template);
          }
        });
    });
  });

  $(document).on('click', '.Salida-producto', function()  {
    let  element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('idproducto');
    console.log(id);
    $.post('Buscar-producto.php', {id}, (response) => {
      console.log(response);
      const producto = JSON.parse(response);
      $('#nombreSalida').val(producto.nombre);
      $('#descripcionSalida').val(producto.descripcion);
      $('#categoriaSalida').val(producto.categoria);
      $('#prendaSalida').val(producto.prenda);
      $('#precioSalida').val(producto.precio);
      $('#PrecioCompraSalida').val(producto.PrecioCompra);
      $('#cantidadSalida').val(producto.cantidad);
      $('#estadoSalida').val(producto.estado);
      $('#idSalida').val(producto.id);
      $('#divSalida').show();
    });
  });

  $('#Salida').submit(e => {
    e.preventDefault();
    const postData = {
      precioSalida: $('#precioSalida').val(),
      PrecioCompraSalida: $('#PrecioCompraSalida').val(),
      nombrefac: $('#nombrefac').val(),
      apellidofac: $('#apellidofac').val(),
      correofac: $('#correofac').val(),
      telfac: $('#telfac').val(),
      cantidadSalida: $('#cantidadSalida').val(),
      NuevaCantidadSalida: $('#NuevaCantidadSalida').val(),
      id: $('#idSalida').val()
    };
    const url = 'Salida-inventario.php';
    console.log(postData, url);
    $.post(url, postData, (response) => {
      console.log(response);
      alert(response);
      $('#divSalida').hide();
      let prenda = $("#prenda").val(); 
      let cate = $("#categoria").val(); 
      $.ajax({
          url: 'cargarProductosAdminInventario.php',
          type: 'POST',
          data:{prenda:prenda,cate:cate},
          success: function(response) 
          { 
            const productos = JSON.parse(response);
             let template = '';
             productos.forEach(producto => {
            template += `
              <tr idproducto="${producto.id}">
              <td>${producto.id}</td>
              <td>${producto.nombre}</td>
              <td>${producto.descripcion}</td>
              <td>${producto.precio}</td>
              <td>${producto.PrecioCompra}</td>
               <td>${producto.cantidad}</td>
              <td>
              <button class="Ingreso-producto btn btn-success">
              Ingreso
              </button>
              </td>
              <td>
              <button class="Salida-producto btn btn-danger">
               Salida
              </button>
              </td>
              </tr>`
            });
            $('#Inventario').html(template);
          }
        });

    });
  });

  
    
});