<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

if(!isset($_SESSION)) session_start();

require_once(__DIR__."/../../controlers/config.php");
require_once("$dirModels/Compras.php");
require_once("$dirModels/Proveedores.php");
$compras = obtenerCompras()["datos"];
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="../assets/img/favicon.png">
  <title>
    <?=$config->nombre?>
  </title>
  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700" />
  <!-- Nucleo Icons -->
  <link href="<?=$dirViews?>/assets/css/nucleo-icons.css" rel="stylesheet" />
  <link href="<?=$dirViews?>/assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- Font Awesome Icons -->
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <!-- Material Icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
  <!-- CSS Files -->
  <link id="pagestyle" href="<?=$dirViews?>/assets/css/material-dashboard.css?v=3.0.2" rel="stylesheet" />
  <script type="module">
    import * as compras from "../assets/js/pages/ComprasScript.js";
    window.compras = compras;
  </script>
</head>

<body class="g-sidenav-show  bg-gray-200">
  <!-- barra lateral -->
  <?php include_once("$dirPages/BarraLateral.php"); ?>
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <!-- Encabezado -->
    <?php include_once("$dirPages/Encabezado.php"); ?>
    <div class="container-fluid py-4">
      <!-- Contenido -->
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 class="text-white text-capitalize ps-3">Compras</h6>
                <button type="button" class="btn bg-gradient-success btn-outline-success btn-sm mb-0" onclick="window.location.href='CompraForm.php'">Crear</button>
              </div>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Serie</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Numero</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fecha</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">NIT</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Proveedor</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Estado</th>
                      <th class="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php if(!is_array($compras)){ ?>
                      <tr>
                        <td>
                          <?=$compras?>
                    </td>
                    </tr>
                    <?php }else{ 
                    foreach($compras as $compra){
                    $estado = estado($compra["estado"]);
                    ?> 
                    <tr>
                      <td>
                        <p class="text-xs font-weight-bold mb-0"><?=$compra["compras_id"]?></p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0"><?=$compra["serie"]?></p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0"><?=$compra["numero"]?></p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0"><?=$compra["fecha"]?></p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0"><?=$compra["nit"]?></p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0"><?=$compra["proveedor"]?></p>
                      </td>
                      <td>
                        <p class="text-xs text-secondary mb-0"><?=$compra["total"]?></p>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-<?=$estado["color"]?>"><?=$estado["texto"]?></span>
                      </td>
                      <td class="align-middle">
                        <a href="<?=$dirViews?>/pages/CompraMod.php?id=<?=$compra["compras_id"]?>" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                          Editar
                        </a>
                        <a href="javascript:compras.eliminar(<?=$compra["compras_id"]?>);" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                          Eliminar
                        </a>
                      </td>
                    </tr>
                    <?php }
                    } ?>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Pie de Pagina -->
      <?php include_once("$dirPages/PiePagina.php"); ?>
    </div>
  </main>
  <!-- Configuracion -->
  <?php include_once("$dirPages/Configuracion.php"); ?>
  <!--   Core JS Files   -->
  <script src="<?=$dirViews?>/assets/js/core/popper.min.js"></script>
  <script src="<?=$dirViews?>/assets/js/core/bootstrap.min.js"></script>
  <script src="<?=$dirViews?>/assets/js/plugins/perfect-scrollbar.min.js"></script>
  <script src="<?=$dirViews?>/assets/js/plugins/smooth-scrollbar.min.js"></script>
  <script>
    var win = navigator.platform.indexOf('Win') > -1;
    if (win && document.querySelector('#sidenav-scrollbar')) {
      var options = {
        damping: '0.5'
      }
      Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
    }
  </script>
  <!-- Github buttons -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>
  <!-- Control Center for Material Dashboard: parallax effects, scripts for the example pages etc -->
  <script src="<?=$dirViews?>/assets/js/material-dashboard.min.js?v=3.0.2"></script>
</body>

</html>