$(document).ready(function() {
  let edit = false;

  CargarAdministrador();
  $('#crearAdministrador').submit(e => {
    e.preventDefault();
    const postData = 
    {
      correo: $('#correo').val(),
      contra: $('#contra').val(),
      id: $('#idAdmin').val()
    };
    const url = edit === false ? 'crearAdministrador.php' : 'admin-edit.php';
    console.log(postData, url);
    $.post(url, postData, (response) => 
    {
      alert(response);
      $('#crearAdministrador').trigger('reset');
      CargarAdministrador();
    });
  });
      
  function CargarAdministrador() {
      $.ajax({
        url: 'cargarAdministrador.php',
        type: 'GET',
        success: function(response) 
        {
          console.log(response);
          const administradores = JSON.parse(response);
          let template = '';
          administradores.forEach(administrador => {
            if (administrador.estado==1) {
              $activo='checked="checked"';
              }else{$activo='';} 
          template += `
            <tr idAdmin="${administrador.id}">
            <td>${administrador.id}</td>
            <td>
            <a href="#" class="admin-item">
            ${administrador.correo} 
            </a>
            </td>
            <td>${administrador.contra}</td>
            <td><input class="check" type="checkbox" ${$activo} /></td>
            <td>
            <button class="activar-admin btn btn-success">
            activar
            </button>
            </td>
            <td>
            <button class="desactivar-admin btn btn-danger">
            desactivar
            </button>
            </td>
            </tr>
            `
          });
          $('#Administradores').html(template);
        }
      });
  }

  $(document).on('click', '.activar-admin',function() {
    if(confirm('quieres activar este admin?')) {
      let element = $(this)[0].parentElement.parentElement;
      let idAdmin = $(element).attr('idAdmin');
      console.log(idAdmin);
      $.post('activar-admin.php', {idAdmin}, (response) => {
       console.log(response);
       CargarAdministrador();
      });
    }else{
      CargarAdministrador();
    }
  });

  $(document).on('click', '.desactivar-admin',function() {
  if(confirm('quieres desactivar este admin?')) {
    let element = $(this)[0].parentElement.parentElement;
    let idAdmin = $(element).attr('idAdmin');
    
    $.post('desactivar-admin.php', {idAdmin}, (response) => {
    console.log(response);
    CargarAdministrador();
    });
  }else{
    CargarAdministrador();
  }
  });

  $(document).on('click', '.admin-item', function()  {
    let  element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('idAdmin');
    console.log(id);
    $.post('admin-single.php', {id}, (response) => {
      const task = JSON.parse(response);
      $('#correo').val(task.correo);
      $('#contra').val(task.contra);
      $('#idAdmin').val(task.id);
      edit = true;
    });
  });
   
  
});