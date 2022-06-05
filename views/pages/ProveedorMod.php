<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

if(!isset($_SESSION)) session_start();

include_once("../../controlers/Config.php");
require_once("$dirModels/Proveedores.php");
require_once("$dirModels/Personas.php");
require_once("$dirModels/ProveedoresCategorias.php");
$proveedor = obtenerProveedoresConId($_GET["id"])["datos"];
$persona = obtenerConId($proveedor["personas_id"])["datos"];
$categorias = obtenerProveedoresCategorias()["datos"];
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
    import * as proveedores from "../assets/js/pages/ProveedoresScript.js";
    window.proveedores = proveedores;
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
            <div class="col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto">
              <div class="card card-plain">
                <div class="card-header">
                  <h4 class="font-weight-bolder">Modificar Proveedores</h4>
                  <p class="mb-0">Ingrese la informacion para modificar la proveedor.</p>
                </div>
                <div class="card-body">
                  <form role="form">
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">ID</label>
                      <input type="text" class="form-control" id="id" value="<?=$proveedor["proveedores_id"]?>">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">NIT</label>
                      <input type="text" class="form-control" id="nit" value="<?=$proveedor["nit"]?>">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Nombre</label>
                      <input type="text" class="form-control" id="nombre" value="<?=$proveedor["nombre"]?>">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Direccion</label>
                      <input type="text" class="form-control" id="direccion" value="<?=$proveedor["direccion"]?>">
                    </div>
                    <div class="form-check form-switch ps-0">
                      <input class="form-check-input ms-auto" type="checkbox" id="estado" <?=($proveedor["estado"] == 1?"checked":"")?>>
                      <label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="estado">Activo</label>
                    </div>
                    <input type="hidden" class="form-control" id="personas_id" value="<?=$persona["personas_id"]?>">
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Nombres</label>
                      <input type="text" class="form-control" id="nombres" value="<?=$persona["nombres"]?>">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Apellidos</label>
                      <input type="text" class="form-control" id="apellidos" value="<?=$persona["apellidos"]?>">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Fecha Nacimiento</label>
                      <br>
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label"></label>
                      <input type="date" class="form-control" id="fecha_nac" value="<?=$persona["fecha_nac_input"]?>">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Categorias</label>
                      <br>
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label"></label>
                      <select class="form-select" aria-label="Default select example" id="categorias_id">
                        <?php foreach($categorias as $categoria){ ?>
                        <option 
                          value="<?=$categoria["categorias_id"]?>" 
                          <?=($proveedor["categorias_id"] == $categoria["categorias_id"]?"selected":"")?>>
                          <?=$categoria["nombre"]?>
                        </option>
                        <?php } ?>
                      </select>
                    </div>
                    <div class="text-center">
                      <button type="button" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" onclick="proveedores.modificar()">Modificar</button>
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