$(document).ready(function() {
    let edit = false;
    $('#ModificarProducto').hide();
    
    $('#CrearProducto').submit(e => {
      e.preventDefault();
      const postData = {
        nombre: $('#nombre').val(),
        categorias: $('#categoria').val()
      };
      const url ='crearPrenda.php';
      $.post(url, postData, (response) => {
        console.log(response);
        $('#CrearProducto').trigger('reset');
        cargarProductos();
      });
    });

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
          alert('error');
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
            $("#categoriasModificar").append('<option value='+registro.id+'>'+registro.nombre+'</option>');
          });        
        },
        error: function(data) {
          alert('error');
        }
      });
    }

    cargarProductos();
    function cargarProductos() {
      $.ajax({
        url: 'cargarPrendasAdmin.php',
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
            <td>${producto.categorias}</td>
            <td><input class="check" type="checkbox" ${$activo} /></td>
            <td>
            <button class="activar-prenda btn btn-success">
            activar
            </button>
            </td>
            <td>
            <button class="desactivar-prenda btn btn-danger">
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
  
    $(document).on('click', '.activar-prenda',function() {
          if(confirm('quieres activar este prenda?')) {
            let element = $(this)[0].parentElement.parentElement;
            let idproducto = $(element).attr('idproducto');
            
            $.post('activar-prenda.php', {idproducto}, (response) => {
             console.log(response);
              cargarProductos();
            });
          }else{
            cargarProductos();
          }
    });
  
    $(document).on('click', '.desactivar-prenda',function() {
      if(confirm('quieres desactivar este prenda?')) {
        let element = $(this)[0].parentElement.parentElement;
        let idproducto = $(element).attr('idproducto');
        
        $.post('desactivar-prenda.php', {idproducto}, (response) => {
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
          location.href="http://localhost/handyman/ver-producto.php?id="+id;
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
      $.post('consulta-prenda.php', {id}, (response) => {
        const producto = JSON.parse(response);
        $('#nombreModificar').val(producto.nombre);
        $('#categoriasModificar').val(producto.categorias);
        $('#idproductoModificar').val(producto.id);
        edit = true;
      });
      $('#ModificarProducto').show();
      $('#CrearProducto').hide();
      
    });
    $('#ModificarProducto').submit(e => {
      e.preventDefault();
      const postData = {
        nombreModificar: $('#nombreModificar').val(),
        categoriasModificar: $('#categoriasModificar').val(),
        idproductoModificar: $('#idproductoModificar').val()
      };
      const url = 'editarPrenda.php';
      $.post(url, postData, (response) => {
        alert(response);
        $('#ModificarProducto').hide();
        $('#CrearProducto').show();
        cargarProductos();
      });
    });
    
  });