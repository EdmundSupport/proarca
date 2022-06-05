<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

if(!isset($_SESSION)) session_start();

include_once("../../controlers/Config.php");
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
    import * as usuarios from "../assets/js/pages/UsuariosScript.js";
    window.usuarios = usuarios;
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
            <div class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
              <div class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center" style="background-image: url('../assets/img/illustrations/illustration-signup.jpg'); background-size: cover;">
              </div>
            </div>
            <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
              <div class="card card-plain">
                <div class="card-header">
                  <h4 class="font-weight-bolder">Registrarse</h4>
                  <p class="mb-0">Ingresa tu usuario y tu contrasena para registrarte</p>
                </div>
                <div class="card-body">
                  <form role="form">
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Nombres</label>
                      <input type="text" class="form-control" id="nombres">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Apellidos</label>
                      <input type="text" class="form-control" id="apellidos">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Usuario</label>
                      <input type="text" class="form-control" id="usuario">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Contrasena</label>
                      <input type="password" class="form-control" id="contra">
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label">Fecha Nacimiento</label>
                      <br>
                    </div>
                    <div class="input-group input-group-outline mb-3">
                      <label class="form-label"></label>
                      <input type="date" class="form-control" id="fecha_nac">
                    </div>
                    <!-- <div class="form-check form-check-info text-start ps-0">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked>
                      <label class="form-check-label" for="flexCheckDefault">
                        I agree the <a href="javascript:;" class="text-dark font-weight-bolder">Terms and Conditions</a>
                      </label>
                    </div> -->
                    <div class="text-center">
                      <button type="button" class="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" onclick="usuarios.registrarse()">Registrarse</button>
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center pt-0 px-lg-2 px-1">
                  <p class="mb-2 text-sm mx-auto">
                    Ya tiene una cuenta?
                    <a href="IniciarSesion.php" class="text-primary text-gradient font-weight-bold">Iniciar Sesion</a>
                  </p>
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