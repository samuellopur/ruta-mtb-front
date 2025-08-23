bicicletas: [
    {
      titulo: "MTB Pro",
      precio: "$1.200.000",
      imagen: "imagenes/bicicletamtb1.jpg",
    },
    {
      titulo: "MTB Trail",
      precio: "$980.000",
      imagen: "imagenes/bicicletamtb2.jpg",
    },
    {
      titulo: "MTB Enduro",
      precio: "$1.500.000",
      imagen: "imagenes/bicicletamtb3.jpg",
    },
    {
      titulo: "MTB XC",
      precio: "$1.100.000",
      imagen: "imagenes/bicicletamtb4.jpg",
    },
  ]

  <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">

    <!-- Slide 1: Imagen -->
    <div class="carousel-item active">
      <img src="img/banner1.jpg" class="d-block w-100" alt="Banner 1">
      <div class="carousel-caption d-flex flex-column justify-content-center align-items-center">
        <h2>WELCOME TO THE SITE</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <a href="#" class="btn btn-dark">BUY NOW</a>
      </div>
    </div>

    <!-- Slide 2: Video -->
    <div class="carousel-item">
      <video class="d-block w-100" autoplay muted loop>
        <source src="videos/video1.mp4" type="video/mp4">
        Tu navegador no soporta videos.
      </video>
      <div class="carousel-caption d-flex flex-column justify-content-center align-items-center">
        <h2>SECOND SLIDE</h2>
        <p>Promo con video de fondo.</p>
        <a href="#" class="btn btn-dark">BUY NOW</a>
      </div>
    </div>

  </div>

  <!-- Controles -->
  <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Siguiente</span>
  </button>
</div>
