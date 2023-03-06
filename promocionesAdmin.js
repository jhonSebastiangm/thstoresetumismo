$(document).ready(function() {
    $('#ModificarPromocion').hide();
      cargarPromocion1();
      cargarPromocion2();
      cargarPromocion3();
      cargarPromocion4();
  
    function cargarPromocion1() {
      $.ajax({
        url: 'cargarpromocionTodasLasPromocionesSlider1.php',
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
            <td>${promocion1.precio}</td>
            <td>${promocion1.descripcion}</td>
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
    function cargarPromocion2() {
      $.ajax({
        url: 'cargarpromocionTodasLasPromocionesSlider2.php',
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
            <td>${promocion2.precio}</td>
            <td>${promocion2.descripcion}</td>
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
        
  
    function cargarPromocion3() {
      $.ajax({
        url: 'cargarpromocionTodasLasPromocionesSlider3.php',
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
            <td>${promocion3.precio}</td>
    
            <td>${promocion3.descripcion}</td>
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
    
      function cargarPromocion4() {
        $.ajax({
          url: 'cargarpromocionTodasLasPromocionesSlider4.php',
          type: 'GET',
          success: function(response) 
          {
         
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
          precioModificar: $('#precioModificar').val(),
          descripcionModificar: $('#descripcionModificar').val(),
          idpromoModificar: $('#idpromoModificar').val()
        };
        const url = 'editarPromo.php';
        $.post(url, postData, (response) => {
          alert(response);
          $('#ModificarPromocion').hide();
          $('#subirPromocion').show();
          cargarPromocion1();
          cargarPromocion2();
          cargarPromocion3();
          cargarPromocion4();
        });
      });
  
      $(document).on('click', '.task-item', function()  {
        let  element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('idpromocion');
        console.log(id);
        $.post('consulta-promocion.php', {id}, (response) => {
          const producto = JSON.parse(response);
          $('#nombreModificar').val(producto.nombre);
          $('#precioModificar').val(producto.precio);
          $('#descripcionModificar').val(producto.descripcion);
          $('#idpromoModificar').val(producto.id);
        });
        $('#ModificarPromocion').show();
        $('#subirPromocion').hide();
        
      });
      
  
      $(document).on('click', '.desactivar-promocion',function() {
        if(confirm('quieres activar esta promocion?')) {
          let element = $(this)[0].parentElement.parentElement;
          let id = $(element).attr('idpromocion');
          $.post('desactivar-promocion.php', {id}, (response) => {
            alert(response);
            cargarPromocion1();
            cargarPromocion2();
            cargarPromocion3();
            cargarPromocion4();
          });
        }else{
          cargarPromocion1();
          cargarPromocion2();
          cargarPromocion3();
          cargarPromocion4();
        }
  });
    $(document).on('click', '.activar-promocion1',function() {
          if(confirm('quieres activar esta promocion?')) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('idpromocion');
            $.post('activar-promocion1.php', {id}, (response) => {
              cargarPromocion1();
            });
          }else{
            cargarPromocion1();
            cargarPromocion2();
            cargarPromocion3();
            cargarPromocion4();
          }
    });
    $(document).on('click', '.activar-promocion4',function() {
      if(confirm('quieres activar esta promocion?')) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('idpromocion');
        $.post('activar-promocion4.php', {id}, (response) => {
          cargarPromocion4();
        });
      }else{
        cargarPromocion1();
        cargarPromocion2();
        cargarPromocion3();
        cargarPromocion4();
      }
  });
  $(document).on('click', '.activar-promocion3',function() {
    if(confirm('quieres activar esta promocion?')) {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('idpromocion');
      $.post('activar-promocion3.php', {id}, (response) => {
        cargarPromocion3();
      });
    }else{
      cargarPromocion1();
      cargarPromocion2();
      cargarPromocion3();
      cargarPromocion4();
    }
  });
  $(document).on('click', '.activar-promocion2',function() {
    if(confirm('quieres activar esta promocion?')) {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('idpromocion');
      $.post('activar-promocion2.php', {id}, (response) => {
        cargarPromocion2();
      });
    }else{
      cargarPromocion1();
      cargarPromocion2();
      cargarPromocion3();
      cargarPromocion4();
    }
  });
    $(document).on('click', '.ver-promocion1',function() {
        if(confirm('quieres ver esta promocion?')) {
          let element = $(this)[0].parentElement.parentElement;
          let id = $(element).attr('idpromocion');
          location.href="ver-promocion.php?id="+id;
        }else{
          cargarPromocion1();
          cargarPromocion2();
          cargarPromocion3();
          cargarPromocion4();
        }
    });
  
    $(document).on('click', '.check',function() {
          if(confirm('quieres activar esta promocion?')) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('idpromocion');
            $.post('activar-promocion1.php', {id}, (response) => {
              cargarPromocion1();
            });
          }else{
            cargarPromocion1();
            cargarPromocion2();
            cargarPromocion3();
            cargarPromocion4();
          }
    });
  
    $(document).on('click', '.check2',function() {
      if(confirm('quieres activar esta promocion?')) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('idpromocion');
        $.post('activar-promocion2.php', {id}, (response) => {
          cargarPromocion2();
        });
      }else{
        cargarPromocion1();
        cargarPromocion2();
        cargarPromocion3();
        cargarPromocion4();
      }
    });
    $(document).on('click', '.check3',function() {
      if(confirm('quieres activar esta promocion?')) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('idpromocion');
        $.post('activar-promocion3.php', {id}, (response) => {
          cargarPromocion3();
        });
      }else{
        cargarPromocion1();
        cargarPromocion2();
        cargarPromocion3();
        cargarPromocion4();
      }
    });
    $(document).on('click', '.check4',function() {
      if(confirm('quieres activar esta promocion?')) {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('idpromocion');
        $.post('activar-promocion4.php', {id}, (response) => {
          cargarPromocion4();
        });
      }else{
        cargarPromocion1();
        cargarPromocion2();
        cargarPromocion3();
        cargarPromocion4();
      }
    });
    
  });