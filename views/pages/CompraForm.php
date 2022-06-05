<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

if(!isset($_SESSION)) session_start();

include_once("../../controlers/Config.php");
require_once("$dirModels/Compras.php");
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
  <link id="pagestyle" href="<?=$dirViews?>/assets/css/styles.css?v=0.0.0" rel="stylesheet" />

  <script type="module">
    import * as compras from "../assets/js/pages/ComprasScript.js";
    window.compras = compras;

    window.i = 0;
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
      <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="d-flex flex-column ms-auto me-auto ms-lg-auto">
              <div class="card card-plain">
                <div class="card-header">
                  <h4 class="font-weight-bolder">Crear Compras</h4>
                  <p class="mb-0">Ingrese la informacion para crear la compra.</p>
                </div>
                <div class="card-body">
                  <form role="form">
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Serie</label>
                      <input type="text" class="form-control" id="serie">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Numero</label>
                      <input type="number" class="form-control" id="numero">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Fecha Emision</label>
                      <br>
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label"></label>
                      <input type="date" class="form-control" id="fecha">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">NIT</label>
                      <input type="text" class="form-control" id="nit">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Nombre</label>
                      <input type="text" class="form-control" id="nombre">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Direccion</label>
                      <input type="text" class="form-control" id="direccion">
                    </div>

                    <div class="card-body px-0 pb-2">
                      <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                        <div class="text-center">
                          <button type="button" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" onclick="compras.agregarFila(i+1)">Crear</button>
                        </div>
                          <thead>
                            <tr>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Cantidad</th>
                              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">SKU</th>
                              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Descripcion</th>
                              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Precio</th>
                              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total</th>
                              <th class="text-secondary opacity-7"></th>
                            </tr>
                          </thead>
                          <tbody id="detalle">
                            <tr id="filaNueva" hidden>
                              <td>
                                <div class="input-group input-group-outline mb-3">
                                  <label class="form-label">Detalle</label>
                                  <input type="text" class="form-control" id="detalle_id">
                                </div>
                              </td>
                              <td>
                                <div class="input-group input-group-outline mb-3">
                                  <label class="form-label">Cantidad</label>
                                  <input type="text" class="form-control" id="cantidad">
                                </div>
                              </td>
                              <td>
                                <div class="input-group input-group-outline mb-3">
                                  <label class="form-label">SKU</label>
                                  <input type="text" class="form-control" id="sku">
                                </div>
                              </td>
                              <td>
                                <div class="input-group input-group-outline mb-3">
                                  <label class="form-label">Descripcion</label>
                                  <input type="text" class="form-control" id="descripcion">
                                </div>
                              </td>
                              <td>
                                <div class="input-group input-group-outline mb-3">
                                  <label class="form-label">Precio</label>
                                  <input type="text" class="form-control" id="precio">
                                </div>
                              </td>
                              <td class="align-middle">
                              <div class="">
                                <button type="button" class="btn btn-lg bg-gradient-primary btn-sm w-50 mb-3" onclick="compras.eliminarFila(this)">Eliminar</button>
                                <button type="button" class="btn btn-lg bg-gradient-primary btn-sm w-50 mb-3" onclick="compras.agregarFila(i+1)">Agregar</button>
                              </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
              
                    <div class="text-center">
                      <button type="button" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" onclick="compras.crear()">Crear</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
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