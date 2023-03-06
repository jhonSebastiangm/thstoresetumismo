$(document).ready(function() {


  $('.aa-product2').hide();
  cargarMenu();
  function cargarMenu() {
    $.ajax({
      url: 'cargarMenu.php',
      type: 'GET',
      success: function(response) {
          console.log(response);
        const menus = JSON.parse(response);
        let template = '';
        menus.forEach(menu => 
      {
          template += `

          <li menuId="${menu.id}" ><a data-toggle="dropdown" class="cargar" href="#">${menu.nombre} <span class="caret"></span></a>
            <ul id="CargaPrenda${menu.id}" class="dropdown-menu">                
            </ul>
          </li>
          `
      });
      template = template +=`
    <li><a href="index.html">Inicio</a></li>
      `
      //$('#Promociones').addClass('product_grid');
      $('#menuDinamico').html(template);
      }
    });
  }
  $(document).on('click', '.cargar', function()  {
    let  element = $(this)[0].parentElement;
    let id = $(element).attr('menuId');
    $.post('cargarPrenda.php', {id}, (response) => {
      const Prendas = JSON.parse(response);
      let templateCargaPrenda = '';
      Prendas.forEach(prenda => 
      {
          templateCargaPrenda += `
          <li prendaId="${prenda.id}"><a class="buscarPrenda" href="#">${prenda.nombre}</a></li>
          `
      });
      $("#CargaPrenda"+id).html(templateCargaPrenda);    
    });
  });

  $(document).on('click', '.buscarPrenda', function()  {
    let  element = $(this)[0].parentElement;
    let id = $(element).attr('prendaId');
    console.log(id);
    $('#aa-slider').hide();
    $('.aa-product2').show();
    cargarproductos(id);
  });

  function cargarproductos(id) {
    $.ajax({
      data:{id:id},
      url: 'cargarproductosPrenda.php',
      type: 'POST',
      success: function(response) {
          console.log(response);
        const Promociones1 = JSON.parse(response);
        let template = '';
        Promociones1.forEach(promo1 => 
      {
          let Estados =promo1.cantidad;
          let ClaseEstados='';
          let ClaseEstadosTexto='';
          if (Estados>=5) {
              ClaseEstados='aa-badge aa-sale';
              ClaseEstadosTexto='EN VENTA';
          }else if (Estados<=5) {
              ClaseEstados='aa-badge aa-hot';
              ClaseEstadosTexto='ULTIMOS';
          }
          else if (Estados==0) {
              ClaseEstados='aa-badge aa-sold-out';
              ClaseEstadosTexto='EN BODEGA';
          }
          console.log(Estados,ClaseEstados,ClaseEstadosTexto);
          template += `
          <li productoid='${promo1.id}'>
          <figure>
            <a class="aa-product-img" href="#"><img src="${promo1.ruta}" alt="polo shirt img"></a>
            <a class="aa-add-card-btn"href="#"><span class="fa fa-shopping-cart"></span>Añadir Al Carrito</a>
              <figcaption>
              <span class="aa-product-price">$${promo1.precio}</span><span class="aa-product-price"><del>$65.500</del></span>
              <a href="https://wa.me/573158890438?text=Me%20gustaria%20comprar%20${promo1.texto}" class="aa-shop-now-btn aa-secondary-btn">Comprar Ahora</a>
            </figcaption>
          </figure>                        
          <div class="aa-product-hvr-content">
            <a href="#" class="MeGustaMenu" data-toggle="tooltip" data-placement="top" title="Me Gusta"><span class="fa fa-heart-o"></span></a>
            <a href="#" class="vista" data-toggle2="tooltip" data-placement="top" title="Vista rápida" data-toggle="modal" data-target="#quick-view-modal"><span class="fa fa-search"></span></a>                          
          </div>
          <!-- product badge -->
          <span class="${ClaseEstados}" href="#">${ClaseEstadosTexto}!</span>

          
        </li>     
          `
      });
      //$('#Promociones').addClass('product_grid');
      $('#productosPrenda').html(template);
      }
    });
  }
 

  CargarTotal();
  function CargarTotal() {
    $.ajax({
      url: 'CargarTotal.php',
      type: 'GET',
      success: function(response) {
        console.log(response);
        const Totals = JSON.parse(response);
        let template = '';
        let suma =0;
        Totals.forEach(total => {
          suma = parseFloat(suma) + parseFloat(total.total);
        });
        template += `<span class="aa-cartbox-total-price">$${suma}</span>`
      $('#TotalCarroCompras').html(template);
      }
    });
  }


  cargarCarroCompras();
  function cargarCarroCompras() {
    $.ajax({
      url: 'cargarCarroCompras.php',
      type: 'GET',
      success: function(response) {
          console.log(response);
        const ProductosCarrito = JSON.parse(response);
        let template = '';
        ProductosCarrito.forEach(productoCarrito => 
      {
        template += `
          <li carritoId='${productoCarrito.id}'>
          <a class="aa-cartbox-img" href="#"><img src="${productoCarrito.ruta}" alt="img"></a>
          <div class="aa-cartbox-info">
            <h4><a href="#">${productoCarrito.nombre}</a></h4>
            <p>${productoCarrito.cantidad}x $${productoCarrito.precio}</p>
          </div>
          <a class="aa-remove-product" href="#"><span class="fa fa-times"></span></a>
          </li>
          `
      });
      //$('#Promociones').addClass('product_grid');
      $('#CarroCompras').html(template);
      }
    });
  }

  cargarCantidadCarrito();
  function cargarCantidadCarrito() {
    $.ajax({
      url: 'cargarCantidadCarrito.php',
      type: 'GET',
      success: function(response) {
          console.log(response);
        const cantidad = JSON.parse(response);
        let template = '';
        cantidad.forEach(can => 
      {
        template += `
        <span class="aa-cart-notify">${can.cantidad}</span>
          `
      });
      //$('#Promociones').addClass('product_grid');
      $('#CantidadCarrito').html(template);
      }
    });
  }

  CargarAnuncio();
  function CargarAnuncio() {
    $.ajax({
      url: 'cargarAnuncioMeGusta.php',
      type: 'GET',
      success: function(response) {
          console.log(response);
        const Promociones1 = JSON.parse(response);
        let templatePromociones1 = '';
        Promociones1.forEach(promo1 => 
      {
          templatePromociones1 += `
          <img src="${promo1.ruta}" alt="fashion img">
          <div class="aa-catg-head-banner-area">
           <div class="container">
            <div class="aa-catg-head-banner-content">
              <h2>Cuenta De La Pagina</h2>
              <ol class="breadcrumb">
                <li><a href="index.html">Inicio</a></li>                   
                <li class="active">Cuenta</li>
              </ol>
            </div>
           </div>
         </div>    
          `
      });
      //$('#Promociones').addClass('product_grid');
      $('#Anuncio').html(templatePromociones1);
      }
    });
  }
    CargarMeGustas();
    function CargarMeGustas() {
      $.ajax({
        url: 'CargarMeGustas.php',
        type: 'GET',
        success: function(response) {
          const meGustas = JSON.parse(response);
          let template = '';
          meGustas.forEach(megusta => 
        {
            let Estados =megusta.estado;
            let ClaseEstados='';
            let ClaseEstadosTexto='';
            if (Estados==0) {
                ClaseEstadosTexto='VENTA';
            }else if (Estados==2) {
                ClaseEstadosTexto='ULTIMO';
            }
            else if (Estados==3) {
                ClaseEstadosTexto='VENDIDO';
            }
            template += `
            <tr megustaId="${megusta.id}">
            <td><a class="remove" href="#"><fa class="fa fa-close"></fa></a></td>
            <td><a href="#"><img src="${megusta.ruta}" alt="img"></a></td>
            <td><a class="aa-cart-title" href="#">${megusta.nombre}</a></td>
            <td>$${megusta.precio}</td>
            <td>${ClaseEstadosTexto}</td>
            <td><a href="#" class="aa-add-to-cart-btn">Añadir al carrito</a></td>
          </tr>        
            `
        });
        $('#meGusta').html(template);
        }
      });
    }

    $(document).on('click', '.aa-add-to-card-btn', function()  {
      let  element = $(this)[0].parentElement;
      let id = $(element).attr('megustaId');
      console.log(id);
      $.post('AgregarCarrito.php', {id}, (response) => {
        console.log(response);
        CargarMeGustas();
      });
    });

    $(document).on('click', '.remove', function()  {
        if(confirm('Estas seguro que deseas eliminar el producto de la seccion me gusta?')) {
          let  element = $(this)[0].parentElement.parentElement;
          let id = $(element).attr('megustaId');
          console.log(id);
          $.post('megustas-delete.php', {id}, (response) => {
            CargarMeGustas();
          });
        }
      });


      $('#inicio').submit(e => {
        e.preventDefault();
        
        let correo= $('#correoIngreso').val();
        let contra = $('#passIngreso').val();
        
        $.ajax({
          url: 'consultaAdministrador.php',
          data: {correo:correo,contra:contra},
          type: 'POST',
          success: function (response) {
              console.log(response);
           if(response =='[]') {
             alert("Usuario Invalido, Verifique Contraseña y/o Usuario, Si el error persiste contactar a soporte");
           }else{
             console.log(response);
             location.href ="http://www.osmos.com.co/administrador.html";
           }
          } 
        })
      });
  
  });