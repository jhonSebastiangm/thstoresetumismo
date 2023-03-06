<!DOCTYPE html>
<html lang="en">
<head>
  <title>Factura Tienda HandyManMedellin</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
  <link href="css/factura.css" rel="stylesheet">
  <link rel="shortcut icon" href="img/logo.ico">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
</head>
<body>
    
 <div  class="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 padding">
     <div id="imprimir"  class="card">
         
         <div class="card-header p-4">
         
			<a class="pt-2 d-inline-block" href="index.html"><img src="img/logo.jpg" alt="" title=""style="width: 88%;" /></img></a>
            <div id="Nfac" class="float-right" style="padding-top: 4%;">
                 
                 <button><a href="javascript:pruebaDivAPdf()" class="button">Descargar PDF</a></button>
            </div>
            
         </div>
         <div class="card-body">
             <div class="row mb-4">
                 <div class="col-sm-6">
                     <h5 class="mb-3">De:</h5>
                     <h3 class="text-dark mb-1">Tienda Osmos</h3>
                     <div><a href="https://www.smartmoneysystemnow.com">www..com</a></div>
                     <div>Calle 52 # 18-39</div>
                     <div>Correo: contacto@smartmoneysystemnow.com</div>
                     <div>Telefono: +57 304 448 74 20</div>
                 </div>
                 <div id="datosFac" class="col-sm-6 ">
                 </div>
             </div>
             <div class="table-responsive-sm">
                 <table class="table table-striped">
                     <thead>
                         <tr>
                             <th class="center"># IdPedido</th>
                             <th>Nombre</th>
                             <th>Descripción</th>
                             <th>Cantidad</th>
                             <th class="right">Fecha</th>
                             <th class="right">Valor</th>
                         </tr>
                     </thead>
                     <tbody id="productos">
                     </tbody>
                 </table>
             </div>
             <div class="row">
                 <div class="col-lg-4 col-sm-5">
                 </div>
                 <div class="col-lg-4 col-sm-5 ml-auto">
                     <table class="table table-clear">
                         <tbody id="total">
  <!--==========================						 
                             <tr>
                                 <td class="left">
                                     <strong class="text-dark">Subtotal</strong>
                                 </td>
                                 <td class="right">$28,809,00</td>
                             </tr>
                             <tr>
                                 <td class="left">
                                     <strong class="text-dark">Discount (20%)</strong>
                                 </td>
                                 <td class="right">$5,761,00</td>
                             </tr>
                             ============================-->

                             
                         </tbody>
                     </table>
                     

                 </div>
             </div>
         </div>
         <div class="card-footer bg-white"> 
		  <div class="col-md-12">
          <div class="copyright">
            <strong>&copy;</strong> Copyright <strong>SmartMoneySystemNow Theme</strong>. All Rights Reserved
          </div>
          <div class="credits">
            Está página pertenece al grupo <strong>Easy Money System S.A.S</strong> con NIT 901362194-1 empresa legalmente constituida en Colombia de acuerdo con el artículo 91 de la Ley 633 de 2000 Sentecia C-1147 del 2001 para actividades comerciales web.
          </div>
		            <div class="credits">
            Contactanos: <a>+57 3044487420</a>
          </div>
        </div>
		 </div>
     </div>
 </div>
 <script>
    function pruebaDivAPdf() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        source = $('#imprimir')[0];

        specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            }
        };
        margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
        };

        pdf.fromHTML(
            source, 
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, 
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                pdf.save('Factura.pdf');
            }, margins
        );
    }
</script>
<script src="factura.js"></script>
 </body>
</html>