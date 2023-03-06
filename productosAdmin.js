$(document).ready(function() {
    let edit = false;
    $('#ModificarProducto').hide();
    cargarProductos();
    function cargarProductos() {
      $.ajax({
        url: 'cargarProductosAdmin.php',
        type: 'GET',
        success: function(response) 
        {
       
          const productos = JSON.parse(response);
          let template = '';
          productos.forEach(producto => {
            if (producto.estado==0) {
            $activo='checked="checked"';
            }else{$activo='';}   
          template += `
            <tr idproducto="${producto.id}">
            <td>
            <a href="#" class="task-item">
            ${producto.nombre} 
            </a>
            </td>
            <td>${producto.precio}</td>
            <td>${producto.descripcion}</td>
            <td><input class="check" type="checkbox" ${$activo} /></td>
            <td>
            <button class="ver-productos btn btn-success">
            ver producto
            </button>
            </td>
            <td>
            <button class="activar-producto btn btn-success">
            activar
            </button>
            </td>
            <td>
            <button class="desactivar-producto btn btn-danger">
            desactivar
            </button>
            </td>
            </tr>
            `
          });
          $('#Productos').html(template);
        }
      });
    }
    cargarSelectCategoriasModificar();
    function cargarSelectCategoriasModificar(){
      $.ajax({
        type: "GET",
        url: 'cargarSelectCategorias.php', 
        dataType: "json",
        success: function(data){
          $.each(data,function(key, registro) {
            $("#categoriaModificar").append('<option value='+registro.id+'>'+registro.nombre+'</option>');
          });        
        },
        error: function(data) {
          alert('errorcategoria');
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
      $("#prenda").val();
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

  
    $(document).on('click', '.activar-producto',function() {
          if(confirm('quieres activar este producto?')) {
            let element = $(this)[0].parentElement.parentElement;
            let idproducto = $(element).attr('idproducto');
            
            $.post('activar-producto.php', {idproducto}, (response) => {
             console.log(response);
              cargarProductos();
            });
          }else{
            cargarProductos();
          }
    });
  
    $(document).on('click', '.desactivar-producto',function() {
      if(confirm('quieres desactivar este producto?')) {
        let element = $(this)[0].parentElement.parentElement;
        let idproducto = $(element).attr('idproducto');
        
        $.post('desactivar-producto.php', {idproducto}, (response) => {
         console.log(response);
          cargarProductos();
        });
      }else{
        cargarProductos();
      }
    });
  
  
    $(document).on('click', '.ver-productos',function() {
        if(confirm('quieres ver este productos?')) {
          let element = $(this)[0].parentElement.parentElement;
          let id = $(element).attr('idproducto');
          location.href="ver-producto.php?id="+id;
        }
    });
  
    $(document).on('click', '.check',function() {
          if(confirm('quieres activar estos productos?')) {
            let element = $(this)[0].parentElement.parentElement;
            let idproducto = $(element).attr('idproducto');
            $.post('activar-producto.php', {idproducto}, (response) => {
              
              cargarProductos();
            });
          }else{
            cargarProductos();
          }
    });
  
    $(document).on('click', '.task-item', function()  {
      let  element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('idproducto');
      console.log(id);
      $.post('consulta-producto.php', {id}, (response) => {
        const producto = JSON.parse(response);
        $('#nombreModificar').val(producto.nombre);
        $('#precioModificar').val(producto.precio);
        $('#precioAntesModificar').val(producto.precioAntes);
        $('#categoriaModificar').val(producto.categoria);
        $('#descripcionModificar').val(producto.descripcion);
        $('#idproductoModificar').val(producto.id);
      });
      $('#ModificarProducto').show();
      $('#subirProducto').hide();
      
    });
    $('#ModificarProducto').submit(e => {
      e.preventDefault();
      const postData = {
        nombreModificar: $('#nombreModificar').val(),
        precioModificar: $('#precioModificar').val(),
        precioAntesModificar: $('#precioAntesModificar').val(),
        descripcionModificar: $('#descripcionModificar').val(),
        categoriaModificar: $('#categoriaModificar').val(),
        idproductoModificar: $('#idproductoModificar').val()
      };
      const url = 'editarProducto.php';
      $.post(url, postData, (response) => {
        console.log(response);
        $('#ModificarProducto').hide();
        $('#subirProducto').show();
        cargarProductos();
      });
    });
    
  });