$(document).ready(function() {
    $('#ModificarPromocion').hide();
      cargarAnuncio1();
      cargarAnuncio2();
      cargarAnuncio3();
      cargarAnuncio4();

  
    function cargarAnuncio1() {
      $.ajax({
        url: 'cargarAnuncio1.php',
        type: 'GET',
        success: function(response) 
        {
          console.log(response);
          const promociones1 = JSON.parse(response);
          let template = '';
          promociones1.forEach(promocion1 => {
            if (promocion1.estado==1) {
            $activo='checked="checked"';
            }else{$activo='';}   
          template += `
            <tr idpromocion="${promocion1.id}">
            <td>
            <a href="#" class="task-item">
            ${promocion1.nombre} 
            </a>
            </td>
            <td><input class="check" type="checkbox" ${$activo} /></td>
            <td>
            <button class="ver-promocion1 btn btn-success">
            ver promocion
            </button>
            </td>
            <td>
            <button class="activar-promocion1 btn btn-success">
            activar
            </button>
            </td>
            <td>
            <button class="desactivar-promocion btn btn-danger">
            desactivar
            </button>
            </td>
            </tr>
            `
          });
          $('#Promociones').html(template);
        }
      });
    }
    function cargarAnuncio2() {
      $.ajax({
        url: 'cargarAnuncio2.php',
        type: 'GET',
        success: function(response) 
        {
       
          const promociones2 = JSON.parse(response);
          let template = '';
          promociones2.forEach(promocion2 => {
            if (promocion2.estado==1) {
            $activo='checked="checked"';
            }else{$activo='';}   
          template += `
            <tr idpromocion="${promocion2.id}">
            <td>
            <a href="#" class="task-item">
            ${promocion2.nombre} 
            </a>
            </td>
            <td><input class="check2" type="checkbox" ${$activo} /></td>
            <td>
            <button class="ver-promocion1 btn btn-success">
            ver promocion
            </button>
            </td>
            <td>
            <button class="activar-promocion2 btn btn-success">
            activar
            </button>
            </td>
            <td>
            <button class="desactivar-promocion btn btn-danger">
            desactivar
            </button>
            </td>
            </tr>
            `
          });
          $('#Promociones2').html(template);
        }
      });
    }
        
  
    function cargarAnuncio3() {
      $.ajax({
        url: 'cargarAnuncio3.php',
        type: 'GET',
        success: function(response) 
        {
       
          const promociones3 = JSON.parse(response);
          let template = '';
          promociones3.forEach(promocion3 => {
            if (promocion3.estado==1) {
            $activo='checked="checked"';
            }else{$activo='';}   
          template += `
            <tr idpromocion="${promocion3.id}">
  
            <td>
            <a href="#" class="task-item">
            ${promocion3.nombre} 
            </a>
            </td>
            <td><input class="check3" type="checkbox" ${$activo} /></td>
            <td>
            <button class="ver-promocion1 btn btn-success">
            ver promocion
            </button>
            </td>
            <td>
            <button class="activar-promocion3 btn btn-success">
            activar
            </button>
            </td>
            <td>
            <button class="desactivar-promocion btn btn-danger">
            desactivar
            </button>
            </td>
            </tr>
            `
          });
          $('#Promociones3').html(template);
        }
      });
    }
    
      function cargarAnuncio4() {
        $.ajax({
          url: 'cargarAnuncio4.php',
          type: 'GET',
          success: function(response) 
          {
              console.log(response);
         
            const promociones1 = JSON.parse(response);
            let template = '';
            promociones1.forEach(promocion4 => {
              if (promocion4.estado==1) {
              $activo='checked="checked"';
              }else{$activo='';}   
            template += `
              <tr idpromocion="${promocion4.id}">
              <td>
              <a href="#" class="task-item">
              ${promocion4.nombre} 
              </a>
              </td>
              <td>${promocion4.precio}</td>
              <td>${promocion4.descripcion}</td>
              <td><input class="check4" type="checkbox" ${$activo} /></td>
              <td>
              <button class="ver-promocion1 btn btn-success">
              ver promocion
              </button>
              </td>
              <td>
              <button class="activar-promocion4 btn btn-success">
              activar
              </button>
              </td>
              <td>
              <button class="desactivar-promocion btn btn-danger">
              desactivar
              </button>
              </td>
              </tr>
              `
            });
            $('#Promociones4').html(template);
          }
        });
      }
  
      $('#ModificarPromocion').submit(e => {
        e.preventDefault();
        const postData = {
          nombreModificar: $('#nombreModificar').val(),
          idpromoModificar: $('#idpromoModificar').val()
        };
        const url = 'editarAnuncio.php';
        $.post(url, postData, (response) => {
          alert(response);
          $('#ModificarPromocion').hide();
          $('#subirAnuncio').show();
          cargarAnuncio1();
          cargarAnuncio2();
          cargarAnuncio3();
          cargarAnuncio4();
        });
      });
  
      $(document).on('click', '.task-item', function()  {
        let  element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('idpromocion');
        console.log(id);
        $.post('consulta-anuncio.php', {id}, (response) => {
          const producto = JSON.parse(response);
          $('#nombreModificar').val(producto.nombre);
          $('#precioModificar').val(producto.precio);
          $('#descripcionModificar').val(producto.descripcion);
          $('#idpromoModificar').val(producto.id);
        });
        $('#ModificarPromocion').show();
        $('#subirAnuncio').hide();
        
      });
      
  
      $(document).on('click', '.desactivar-promocion',function() {
        if(confirm('quieres desactivar este anuncio?')) {
          let element = $(this)[0].parentElement.parentElement;
          let id = $(element).attr('idpromocion');
          $.post('desactivar-anuncio.php', {id}, (response) => {
            alert(response);
            cargarAnuncio1();
            cargarAnuncio2();
            cargarAnuncio3();
            cargarAnuncio4();
          });
        }else{
          cargarAnuncio1();
          cargarAnuncio2();
          cargarAnuncio3();
          cargarAnuncio4();
        }
  });
    $(document).on('click', '.activar-promocion1',function() {
          if(confirm('quieres activar este anuncio?')) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('idpromocion');
            $.post('activar-anuncio1.php', {id}, (response) => {
              cargarAnuncio1();
            });
          }else{
            cargarAnuncio1();
            cargarAnuncio2();
            cargarAnuncio3();
            cargarAnuncio4();
          }
    });
    $(document).on('click', '.activar-promocion4',function() {
      if(confirm('quieres activar este anuncio?')) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('idpromocion');
        $.post('activar-anuncio4.php', {id}, (response) => {
          cargarAnuncio4();
        });
      }else{
        cargarAnuncio1();
        cargarAnuncio2();
        cargarAnuncio3();
        cargarAnuncio4();
      }
  });
  $(document).on('click', '.activar-promocion3',function() {
    if(confirm('quieres activar este anuncio?')) {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('idpromocion');
      $.post('activar-anuncio3.php', {id}, (response) => {
        cargarAnuncio3();
      });
    }else{
      cargarAnuncio1();
      cargarAnuncio2();
      cargarAnuncio3();
      cargarAnuncio4();
    }
  });
  $(document).on('click', '.activar-promocion2',function() {
    if(confirm('quieres activar este anuncio?')) {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('idpromocion');
      $.post('activar-anuncio2.php', {id}, (response) => {
        cargarAnuncio2();
      });
    }else{
      cargarAnuncio1();
      cargarAnuncio2();
      cargarAnuncio3();
      cargarAnuncio4();
    }
  });
    $(document).on('click', '.ver-promocion1',function() {
        if(confirm('quieres ver este anuncio?')) {
          let element = $(this)[0].parentElement.parentElement;
          let id = $(element).attr('idpromocion');
          location.href="ver-anuncio.php?id="+id;
        }else{
          cargarAnuncio1();
          cargarAnuncio2();
          cargarAnuncio3();
          cargarAnuncio4();
        }
    });
  
    $(document).on('click', '.check',function() {
          if(confirm('quieres activar este anuncio?')) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('idpromocion');
            $.post('activar-anuncio1.php', {id}, (response) => {
              cargarAnuncio1();
            });
          }else{
            cargarAnuncio1();
            cargarAnuncio2();
            cargarAnuncio3();
            cargarAnuncio4();
          }
    });
  
    $(document).on('click', '.check2',function() {
      if(confirm('quieres activar este anuncio?')) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('idpromocion');
        $.post('activar-anuncio2.php', {id}, (response) => {
          cargarAnuncio2();
        });
      }else{
        cargarAnuncio1();
        cargarAnuncio2();
        cargarAnuncio3();
        cargarAnuncio4();
      }
    });
    $(document).on('click', '.check3',function() {
      if(confirm('quieres activar este anuncio?')) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('idpromocion');
        $.post('activar-anuncio3.php', {id}, (response) => {
          cargarAnuncio3();
        });
      }else{
        cargarAnuncio1();
        cargarAnuncio2();
        cargarAnuncio3();
        cargarAnuncio4();
      }
    });
    $(document).on('click', '.check4',function() {
      if(confirm('quieres activar este anuncio?')) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('idpromocion');
        $.post('activar-anuncio4.php', {id}, (response) => {
          cargarAnuncio4();
        });
      }else{
        cargarAnuncio1();
        cargarAnuncio2();
        cargarAnuncio3();
        cargarAnuncio4();
      }
    });
    
  });