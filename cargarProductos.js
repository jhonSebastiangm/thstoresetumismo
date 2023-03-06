window.onload = function () {

  let suma =0;


    $(document).on('click', '.MeGusta', function()  {
      let  element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('productoid');

      $.post('AgregarMegusta.php', {id}, (response) => {

      });
    });

    $(document).on('click', '.aa-add-card-btn', function()  {
      let  element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('productoid');

      $.post('AgregarCarrito.php', {id}, (response) => {
   
        cargarCarroCompras();
        CargarTotal();
        cargarCantidadCarrito();
      });
    });


    $(document).on('click', '.aa-add-to-cart-btn', function()  {
      let id = $('#idproductoid').val();
      $.post('AgregarCarrito.php', {id}, (response) => {
       
        cargarCarroCompras();
        CargarTotal();
        cargarCantidadCarrito();
      });
    });

    CargarTotal();
    function CargarTotal() {
      $.ajax({
        url: 'CargarTotal.php',
        type: 'GET',
        success: function(response) {
        
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

    $(document).on('click', '.aa-remove-product', function()  {
      if(confirm('Are you sure you want to delete it?')) {
        let  element = $(this)[0].parentElement;
        let id = $(element).attr('carritoId');
        $.post('carrito-delete.php', {id}, (response) => {
          cargarCarroCompras();
          cargarCantidadCarrito();
          CargarTotal();
        });
      }
    });
    $(document).on('click', '#cerrarSesion', function()  {
      
      $.ajax({
        url: 'BorrarSesion.php',
        type: 'GET',
        success: function(response) {
         
        }
      });
    });

    $(document).on('click', '.Vista', function()  {
      let  element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('productoid');
     
      let rutaImagenExpand="";
      let nombreImagen="";
      let descripcionImagen="";
      let precioImagen="";
      let rutaImagen="";
      $.ajax({
        url: 'CargarImagenVerMas.php',
        type: 'GET',
        data:{id},
        success: function(response) {
        
          const Imagen = JSON.parse(response);
      
          Imagen.forEach(img => {
            rutaImagenExpand= img.rutaImagenExpand;
            descripcionImagen= img.descripcionImagen;   
            nombreImagen= img.nombreImagen;  
            precioImagen= img.precioImagen;  
            rutaImagen= img.rutaImagen;         
          });
          $("#ImagenGrande").attr("data-lens-image",rutaImagenExpand);
          $("#nombreImagen").text(nombreImagen);
          $("#descripcionImagen").text(descripcionImagen);
          $("#precioImagen").text(precioImagen);
          $("#rutaImagen").attr("src",rutaImagen);
          $("#idproductoid").val(id);
        }
      });

    });

    $(document).on('click', '.VistaProductosTab', function()  {
      let  element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('productoid');
  
      let rutaImagenExpand="";
      let nombreImagen="";
      let descripcionImagen="";
      let precioImagen="";
      let rutaImagen="";
      $.ajax({
        url: 'CargarImagenVerMas.php',
        type: 'GET',
        data:{id},
        success: function(response) {
  
          const Imagen = JSON.parse(response);
    
          Imagen.forEach(img => {
            rutaImagenExpand= img.rutaImagenExpand;
            descripcionImagen= img.descripcionImagen;   
            nombreImagen= img.nombreImagen;  
            precioImagen= img.precioImagen;  
            rutaImagen= img.rutaImagen;         
          });
          $("#ImagenGrande").attr("data-lens-image",rutaImagenExpand);
          $("#nombreImagen").text(nombreImagen);
          $("#descripcionImagen").text(descripcionImagen);
          $("#precioImagen").text(precioImagen);
          $("#rutaImagen").attr("src",rutaImagen);
        }
      });

    });

    

    
    
  cargarMenuTab();
  function cargarMenuTab() {
    $.ajax({
      url: 'cargarMenuTab.php',
      type: 'GET',
      success: function(response) {

        const MenusTab = JSON.parse(response);
        let templateMenusTab = '';
        MenusTab.forEach(MenuTab => 
      {
        templateMenusTab += `
          <li idTab="${MenuTab.id}"><a class="ProductosTab" href="#${MenuTab.nombre}" data-toggle="tab">${MenuTab.nombre}</a></li>
          `
      });
      //$('#Promociones').addClass('product_grid');
        
        
      $('#menuTab').html(templateMenusTab);
      }
    });
  }

  $(document).on('click', '.ProductosTab', function()  {
    let  element = $(this)[0].parentElement;
    let id = $(element).attr('idTab');

    $.post('ProductosTab.php', {id}, (response) => {
 
      const productosMujer = JSON.parse(response);
      let template = '';
      productosMujer.forEach(proMujer => 
    {
        let Estados =proMujer.estado;
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

        template += `
        <li productoid='${proMujer.id}'><h3 class="tituloProductos">${proMujer.nombre}</h3>
        <figure>
          <a class="aa-product-img" href="#"><img src="${proMujer.ruta}" alt="polo shirt img"></a>
          <a class="aa-add-card-btn" href="#"><span class="fa fa-shopping-cart"></span>Añadir Al Carrito</a>
            <figcaption>
            <span class="aa-product-price">$${proMujer.precio}</span><span class="aa-product-price"><del>$${proMujer.precioAntes}</del></span>
            <a href="https://wa.me/573006094480?text=Me%20gustaria%20comprar%20${proMujer.texto}" class="aa-shop-now-btn aa-secondary-btn">Comprar Ahora</a>
          </figcaption>
        </figure>                        
        <div class="aa-product-hvr-content">
          <a class="MeGusta" href="#" data-toggle="tooltip" data-placement="top" title="Me Gusta"><span class="fa fa-heart-o"></span></a>
          <a href="#" data-toggle2="tooltip" data-placement="top" class="VistaProductosTab" title="Vista rápida" data-toggle="modal" data-target="#quick-view-modal"><span class="fa fa-search"></span></a>                       
        </div>
        <!-- product badge -->
        <span class="${ClaseEstados}" href="#">${ClaseEstadosTexto}!</span>

        
      </li>     
        `
    });
    //$('#Promociones').addClass('product_grid');
    $('#productosMenuTab').html(template);      
    });
  });

  cargarProductosMenuTab();
  function cargarProductosMenuTab() {
    let id = 1;

    $.post('ProductosTab.php', {id}, (response) => {
 
      const productosMujer = JSON.parse(response);
      let template = '';
      productosMujer.forEach(proMujer => 
    {
        let Estados =proMujer.estado;
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

        template += `
        <li productoid='${proMujer.id}'><h3 class="tituloProductos">${proMujer.nombre}</h3>
        <figure>
          <a class="aa-product-img" href="#"><img src="${proMujer.ruta}" alt="polo shirt img"></a>
          <a class="aa-add-card-btn"href="#"><span class="fa fa-shopping-cart"></span>Añadir Al Carrito</a>
            <figcaption>
            <span class="aa-product-price">$${proMujer.precio}</span><span class="aa-product-price"><del>$${proMujer.precioAntes}</del></span>
            
            <a href="https://wa.me/573006094480?text=Me%20gustaria%20comprar%20${proMujer.texto}" class="aa-shop-now-btn aa-secondary-btn">Comprar Ahora</a>
          </figcaption>
        </figure>                        
        <div class="aa-product-hvr-content">
          <a class="MeGusta" href="#" data-toggle="tooltip" data-placement="top" title="Me Gusta"><span class="fa fa-heart-o"></span></a>
          <a href="#" data-toggle2="tooltip" data-placement="top"  class="Vista" title="Vista rápida" data-toggle="modal" data-target="#quick-view-modal"><span class="fa fa-search"></span></a>                     
        </div>
        <!-- product badge -->
        <span class="${ClaseEstados}" href="#">${ClaseEstadosTexto}!</span>

        
      </li>     
        `
    });
    //$('#Promociones').addClass('product_grid');
    $('#productosMenuTab').html(template);      
    });
  }




} 