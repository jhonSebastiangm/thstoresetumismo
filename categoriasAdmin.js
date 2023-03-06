$(document).ready(function() {
    let edit = false;
    $('#ModificarProducto').hide();

 

    cargarProductos();
    function cargarProductos() {
      $.ajax({
        url: 'cargarCategoriasAdmin.php',
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
            <td>
            ${producto.estado} 
            </td>
            <td>
            <button class="activar-categoria btn btn-success">
            activar
            </button>
            </td>
            <td>
            <button class="desactivar-categoria btn btn-danger">
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
  
    $(document).on('click', '.activar-categoria',function() {
          if(confirm('quieres activar esta categoria?')) {
            let element = $(this)[0].parentElement.parentElement;
            let idproducto = $(element).attr('idproducto');
            
            $.post('activar-categoria.php', {idproducto}, (response) => {
             console.log(response);
              cargarProductos();
            });
          }else{
            cargarProductos();
          }
    });
  
    $(document).on('click', '.desactivar-categoria',function() {
      if(confirm('quieres desactivar esta categoria?')) {
        let element = $(this)[0].parentElement.parentElement;
        let idproducto = $(element).attr('idproducto');
        
        $.post('desactivar-categoria.php', {idproducto}, (response) => {
         console.log(response);
          cargarProductos();
        });
      }else{
        cargarProductos();
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
      $.post('consulta-categoria.php', {id}, (response) => {
        const producto = JSON.parse(response);
        $('#nombreModificar').val(producto.nombre);
        $('#idproductoModificar').val(producto.id);
        edit = true;
      });
      $('#ModificarProducto').show();
      $('#CrearCategoria').hide();
      
    });

    $('#CrearCategoria').submit(e => {
        e.preventDefault();
        const postData = {
            nombre: $('#nombre').val()
        };
        const url = 'CrearCategoria.php';
        $.post(url, postData, (response) => {
          console.log(response);
          $('#CrearCategoria').trigger('reset');
          cargarProductos();
        });
      });

    $('#ModificarProducto').submit(e => {
      e.preventDefault();
      const postData = {
        nombreModificar: $('#nombreModificar').val(),
        idproductoModificar: $('#idproductoModificar').val()
      };
      const url = 'editarCatgoria.php';
      $.post(url, postData, (response) => {
        console.log(response);
        $('#ModificarProducto').hide();
        $('#CrearCategoria').show();
        cargarProductos();
      });
    });
    
  });