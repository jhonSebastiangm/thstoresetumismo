$(document).ready(function() {
    CargarPedidos();
    CargarPedidosEntregado();
    CargarPedidosCancelado();
    CargarPedidosEnProceso();

    $('#task-result').hide();
    
   $('#crearAdministrador').submit(e => {
    e.preventDefault();
    const postData = {
    correo: $('#correo').val(),
    description: $('#description').val()
    };
    const url ='task-edit.php';
    console.log(postData, url);
    $.post(url, postData, (response) => {
    console.log(response);
    $('#crearAdministrador').trigger('reset');
    });
  });
      
  function CargarPedidos() {
      $.ajax({
        url: 'CargarPedidos.php',
        type: 'GET',
        success: function(response) 
        {
          console.log(response);
          const Pedidos = JSON.parse(response);
          let template = '';
          Pedidos.forEach(pedido => {
          template += `
            <tr idPedido="${pedido.id}">
            <td>${pedido.nombrefac}</td>
            <td>
            <a href="#" class="task-item">
            ${pedido.telfac} 
            </a>
            </td>
            <td>${pedido.direccfac}</td>
            <td>${pedido.suma}</td>
            <td>${pedido.sumaiva}</td>
            <td>${pedido.id}</td>
            <td>${pedido.metodopago}</td>
            <td>
            <button class="pedido-EnEspera btn btn-primary">
            En Proceso
            </button>
            </td>
            <td>
            <button class="pedido-Entregado btn btn-success">
            Entregado
            </button>
            </td>
            <td>
            <button class="pedido-Cancelado btn btn-danger">
            Cancelado
            </button>
            </td>
            </tr>
            `
          });
          $('#Pedidos').html(template);
        }
      });
  }
  $(document).on('click', '.pedido-EnEspera',function() {
    if(confirm('quieres poner En Espera este pedido?')) {
      let element = $(this)[0].parentElement.parentElement;
      let idPedido = $(element).attr('idPedido');
      
      $.post('pedido-EnEspera.php', {idPedido}, (response) => {
       console.log(response);
     
       CargarPedidos();
       CargarPedidosEntregado();
       CargarPedidosCancelado();
       CargarPedidosEnProceso();
      });
    }else{
      CargarPedidos();
      CargarPedidosEntregado();
      CargarPedidosCancelado();
      CargarPedidosEnProceso();
    }
  });

  $(document).on('click', '.pedido-Entregado',function() {
    if(confirm('quieres poner como entregado este pedido?')) {
      let element = $(this)[0].parentElement.parentElement;
      let idPedido = $(element).attr('idPedido');
      
      $.post('pedido-Entregado.php', {idPedido}, (response) => {
       console.log(response);

       CargarPedidos();
       CargarPedidosEntregado();
       CargarPedidosCancelado();
       CargarPedidosEnProceso();
      });
    }else{
      CargarPedidos();
      CargarPedidosEntregado();
      CargarPedidosCancelado();
      CargarPedidosEnProceso();;
    }
  });

  $(document).on('click', '.pedido-Cancelado',function() {
    if(confirm('quieres poner como cancelado este pedido?')) {
      let element = $(this)[0].parentElement.parentElement;
      let idPedido = $(element).attr('idPedido');
      
      $.post('pedido-Cancelado.php', {idPedido}, (response) => {
       console.log(response);

       CargarPedidos();
       CargarPedidosEntregado();
       CargarPedidosCancelado();
       CargarPedidosEnProceso();
      });
    }else{
      CargarPedidos();
      CargarPedidosEntregado();
      CargarPedidosCancelado();
      CargarPedidosEnProceso();
    }
  });


  function CargarPedidosEnProceso() {
    $.ajax({
      url: 'CargarPedidosEnProceso.php',
      type: 'GET',
      success: function(response) 
      {
        console.log(response);
        const Pedidos = JSON.parse(response);
        let template = '';
        Pedidos.forEach(pedido => {
        template += `
          <tr idPedido="${pedido.id}">
          <td>${pedido.nombrefac}</td>
          <td>
          <a href="#" class="task-item">
          ${pedido.telfac} 
          </a>
          </td>
          <td>${pedido.direccfac}</td>
          <td>${pedido.suma}</td>
          <td>${pedido.sumaiva}</td>
          <td>${pedido.id}</td>
          <td>${pedido.metodopago}</td>
          <td>
          <button class="pedido-EnEspera btn btn-primary">
          En Espera
          </button>
          </td>
          <td>
          <button class="pedido-Entregado btn btn-success">
          Entregado
          </button>
          </td>
          <td>
          <button class="pedido-Cancelado btn btn-danger">
          Cancelado
          </button>
          </td>
          </tr>
          `
        });
        $('#PedidosEnProceso').html(template);
      }
    });
  }

  function CargarPedidosEntregado() {
    $.ajax({
      url: 'CargarPedidosEntregado.php',
      type: 'GET',
      success: function(response) 
      {
        console.log(response);
        const Pedidos = JSON.parse(response);
        let template = '';
        Pedidos.forEach(pedido => {
        template += `
          <tr idPedido="${pedido.id}">
          <td>${pedido.nombrefac}</td>
          <td>
          <a href="#" class="task-item">
          ${pedido.telfac} 
          </a>
          </td>
          <td>${pedido.direccfac}</td>
          <td>${pedido.suma}</td>
          <td>${pedido.sumaiva}</td>
          <td>${pedido.id}</td>
          <td>${pedido.metodopago}</td>
          <td>
          <button class="pedido-EnEspera btn btn-primary">
          En Espera
          </button>
          </td>
          <td>
          <button class="pedido-Entregado btn btn-success">
          Entregado
          </button>
          </td>
          <td>
          <button class="pedido-Cancelado btn btn-danger">
          Cancelado
          </button>
          </td>
          </tr>
          `
        });
        $('#PedidosEntregados').html(template);
      }
    });
  }

  function CargarPedidosCancelado() {
    $.ajax({
      url: 'CargarPedidosCancelado.php',
      type: 'GET',
      success: function(response) 
      {
        console.log(response);
        const Pedidos = JSON.parse(response);
        let template = '';
        Pedidos.forEach(pedido => {
        template += `
          <tr idPedido="${pedido.id}">
          <td>${pedido.nombrefac}</td>
          <td>
          <a href="#" class="task-item">
          ${pedido.telfac} 
          </a>
          </td>
          <td>${pedido.direccfac}</td>
          <td>${pedido.suma}</td>
          <td>${pedido.sumaiva}</td>
          <td>${pedido.id}</td>
          <td>${pedido.metodopago}</td>
          <td>
          <button class="pedido-EnEspera btn btn-primary">
          En Espera
          </button>
          </td>
          <td>
          <button class="pedido-Entregado btn btn-success">
          Entregado
          </button>
          </td>
          <td>
          <button class="pedido-Cancelado btn btn-danger">
          Cancelado
          </button>
          </td>
          </tr>
          `
        });
        $('#PedidosCancelados').html(template);
      }
    });
  }





  $('#search').keyup(function() {
    if($('#search').val()) {
      let search = $('#search').val();
      $.ajax({
        url: 'PedidosSearch.php',
        data: {search},
        type: 'POST',
        success: function (response) {
          if(!response.error) {
            let ProductoPedidos = JSON.parse(response);
            let template = '';
            ProductoPedidos.forEach(pedidos => {
              template += `
                     <li><a href="#" class="task-item">${pedidos.nombre}:${pedidos.descripcion}x${pedidos.cantidad}</a></li>
                    ` 
            });
            $('#task-result').show();
            $('#container').html(template);
          }
        } 
      })
    }
  });
   
  
});