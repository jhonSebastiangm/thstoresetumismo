$(document).ready(function() {
  $('.aa-product2').hide();
  $('.aa-product3').hide();
  cargarMenu();
  function cargarMenu() {
    $.ajax({
      url: 'cargarMenu.php',
      type: 'GET',
      success: function(response) {
          
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
    
    $('#aa-slider').hide();
    $('#aa-product').hide();
    $('.aa-product3').hide();   
    $('.aa-product2').show();
    cargarproductos(id);
  });

  function cargarproductos(id) {
    $.ajax({
      data:{id:id},
      url: 'cargarproductosPrenda.php',
      type: 'POST',
      success: function(response) {
         
        const Productos = JSON.parse(response);
        let template = '';
        Productos.forEach(prod => 
      {
          let Estados =prod.cantidad;
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
          <li productoid='${prod.id}'><h3 class="tituloProductos">${prod.nombre}</h3>
          <figure>
            <a class="aa-product-img"><img src="${prod.ruta}" alt="polo shirt img"></a>
            <a class="aa-add-card-btn" href=""><span class="fa fa-shopping-cart"></span>Añadir Al Carrito</a>
              <figcaption>
              <span class="aa-product-price">$${prod.precio}</span><span class="aa-product-price"><del>$${prod.precioAntes}</del></span>
              <a href="https://wa.me/573006094480?text=Me%20gustaria%20comprar%20${prod.texto}" class="aa-shop-now-btn aa-secondary-btn">Comprar Ahora</a>
            </figcaption>
          </figure>                        
          <div class="aa-product-hvr-content">
            <a href="#" class="MeGustaMenu" data-toggle="tooltip" data-placement="top" title="Me Gusta"><span class="fa fa-heart-o"></span></a>
            <a href="#" data-toggle2="tooltip" class="VistaProductosPrenda" data-placement="top" title="Vista rápida" data-toggle="modal" data-target="#quick-view-modal"><span class="fa fa-search"></span></a>  
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
 

 


  cargarpromocion1();
  function cargarpromocion1() {
    $.ajax({
      url: 'cargarpromocion1.php',
      type: 'GET',
      success: function(response) {
         
        const Promociones1 = JSON.parse(response);
        let templatePromociones1 = '';
        Promociones1.forEach(promo1 => 
      {
          templatePromociones1 += `
          <li>
          <div class="seq-model">
            <img data-seq src="${promo1.ruta}" alt="Men slide img" />
          </div>
          <div class="seq-title">
           <span data-seq>Ahorre hasta un ${promo1.porcentaje}% de descuento</span>                
            <h2 data-seq>${promo1.nombre}</h2>                
            <p data-seq>${promo1.descripcion}</p>
            <a href="https://wa.me/573006094480?text=Me%20gustaria%20comprar%20${promo1.texto}" class="aa-shop-now-btn aa-secondary-btn">Comprar Ahora</a>
          </div>
        </li>      
          `
      });
      //$('#Promociones').addClass('product_grid');
      $('#NumeroPromocion1').html(templatePromociones1);
      }
    });
  }
  cargarpromocion2();
  function cargarpromocion2() {
    $.ajax({
      url: 'cargarpromocion2.php',
      type: 'GET',
      success: function(response) {
        const Promociones2 = JSON.parse(response);
        let templatePromociones2 = '';
        Promociones2.forEach(promo2 => 
      {
          templatePromociones2 += `
          
          <li>
          <div class="seq-model">
            <img data-seq src="${promo2.ruta}" alt="Men slide img" />
          </div>
          <div class="seq-title">
           <span data-seq>Ahorre hasta un ${promo2.porcentaje}% de descuento</span>                
            <h2 data-seq>${promo2.nombre}</h2>                
            <p data-seq>${promo2.descripcion}.</p>
            <a href="https://wa.me/573006094480?text=Me%20gustaria%20comprar%20${promo2.texto}" class="aa-shop-now-btn aa-secondary-btn">Comprar Ahora</a>
          </div>
        </li>      
      
          `
      });
      //$('#Promociones').addClass('product_grid');
        
        
      $('#NumeroPromocion2').html(templatePromociones2);
      }
    });
  }
  cargarpromocion3();
  function cargarpromocion3() {
    $.ajax({
      url: 'cargarpromocion3.php',
      type: 'GET',
      success: function(response) {
      
        const Promociones3 = JSON.parse(response);
        let templatePromociones3 = '';
        Promociones3.forEach(promo3 => 
      {
          templatePromociones3 += `
          
          <li>
          <div class="seq-model">
            <img data-seq src="${promo3.ruta}" alt="Men slide img" />
          </div>
          <div class="seq-title">
           <span data-seq>Ahorre hasta un ${promo3.porcentaje}% de descuento</span>                
            <h2 data-seq>${promo3.nombre}</h2>                
            <p data-seq>${promo3.descripcion}.</p>
            <a href="https://wa.me/573006094480?text=Me%20gustaria%20comprar%20${promo3.texto}" class="aa-shop-now-btn aa-secondary-btn">Comprar Ahora</a>
          </div>
        </li>      
      
          `
      });
      //$('#Promociones').addClass('product_grid');
        
        
      $('#NumeroPromocion3').html(templatePromociones3);
      }
    });
  }
  cargarpromocion4();
  function cargarpromocion4() {
    $.ajax({
      url: 'cargarpromocion4.php',
      type: 'GET',
      success: function(response) {
        const Promociones4 = JSON.parse(response);
        let templatePromociones4 = '';
        Promociones4.forEach(promo4 => 
      {
          templatePromociones4 += `
          
          <li>
          <div class="seq-model">
            <img data-seq src="${promo4.ruta}" alt="Men slide img" />
          </div>
          <div class="seq-title">
           <span data-seq>Ahorre hasta un ${promo4.porcentaje}% de descuento</span>                
            <h2 data-seq>${promo4.nombre}</h2>                
            <p data-seq>${promo4.descripcion}.</p>
            <a href="https://wa.me/573006094480?text=Me%20gustaria%20comprar%20${promo4.texto}" class="aa-shop-now-btn aa-secondary-btn">Comprar Ahora</a>
          </div>
        </li>      
      
          `
      });
      //$('#Promociones').addClass('product_grid');
        
        
      $('#NumeroPromocion4').html(templatePromociones4);
      }
    });
  }

  
    $('#buscar').keyup(function() {
    if($('#buscar').val()) {
      let buscar = $('#buscar').val();
      $.ajax({
        url: 'ProductosSearch.php',
        data: {buscar},
        type: 'POST',
        success: function (response) {
     
        const ProdsSerch = JSON.parse(response);
        let template = '';
        ProdsSerch.forEach(prodsearch => 
      {
          let Estados =prodsearch.cantidad;
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
          <li productoid='${prodsearch.id}'><h3 class="tituloProductos">${prodsearch.nombre}</h3>
          <figure>
            <a class="aa-product-img" href="#"><img src="${prodsearch.ruta}" alt="polo shirt img"></a>
            <a class="aa-add-card-btn"href="#"><span class="fa fa-shopping-cart"></span>Añadir Al Carrito</a>
              <figcaption>
              <span class="aa-product-price">$${prodsearch.precio}</span><span class="aa-product-price"><del>$${prodsearch.precioAntes}</del></span>
              <a href="https://wa.me/573006094480?text=Me%20gustaria%20comprar%20${prodsearch.texto}" class="aa-shop-now-btn aa-secondary-btn">Comprar Ahora</a>
            </figcaption>
          </figure>                        
          <div class="aa-product-hvr-content">
            <a href="#" class="MeGustaMenu" data-toggle="tooltip" data-placement="top" title="Me Gusta"><span class="fa fa-heart-o"></span></a>
            <a href="#" data-toggle2="tooltip" class="VistaBuscar" data-placement="top" title="Vista rápida" data-toggle="modal" data-target="#quick-view-modal"><span class="fa fa-search"></span></a>                    
          </div>
          <!-- product badge -->
          <span class="${ClaseEstados}" href="#">${ClaseEstadosTexto}!</span>

          
        </li>     
          `
      });
      //$('#Promociones').addClass('product_grid');
      $('#ProductosSearch').html(template);
      $('#aa-slider').hide();
      $('#aa-product').hide();
      $('.aa-product2').hide();
      $('.aa-product3').show();   
      } 
      })
    }
  });  

  $(document).on('click', '.MeGustaMenu', function()  {
    let  element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('productoid');
   
    $.post('AgregarMegusta.php', {id}, (response) => {
      
    });
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
         
       if(response =='[]') {
         alert("Usuario Invalido, Verifique Contraseña y/o Usuario, Si el error persiste contactar a soporte");
       }else{
        
       location.href ="administrador.html";
       }
      } 
    })
  });

  $(document).on('click', '.VistaProductosPrenda', function()  {
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


  $(document).on('click', '.VistaBuscar', function()  {
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


});