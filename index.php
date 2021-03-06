<?php 
session_start();
if (!isset($_SESSION['token'])) {
    header("Location: login.php");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="icon" type="image/png" href="favicon.ico">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous">
  <meta name="description" content="Jonathan's portfolio site">
  <link rel="stylesheet" href="./css/style.css">
  <title>Admin - Dev</title>
</head>

<body id="home">
  <header class="hero">
    <div class="header-content">
      <nav class="main-menu">
        <a href="" onclick="event.preventDefault()" id="main-menu-toggle">
          <svg viewBox="0 0 100 80" width="40" height="40">
            <rect width="90" height="10" fill="#f7f7f7"></rect>
            <rect y="30" width="90" height="10" fill="#f7f7f7"></rect>
            <rect y="60" width="90" height="10" fill="#f7f7f7"></rect>
          </svg>
        </a>
        <ul id="menu-main-menu" class="menu">
          <li><a href="#edit-items" class="menu-link" onclick="fetchAndCreate(aboutUrl, createBio)">About</a></li>
          <li><a href="#edit-items" class="menu-link" onclick="fetchAndCreate(skillsUrl, createSkills)">Skills</a></li>
          <li><a href="#edit-items" class="menu-link" onclick="fetchAndCreate(workUrl, createWork)">Work</a></li>
          <li><a href="#edit-items" class="menu-link" onclick="fetchAndCreate(studiesUrl, createStudies)">Studies</a>
          </li>
          <li><a href="#edit-items" class="menu-link" onclick="fetchAndCreate(portfolioUrl, createPortfolio)">Portfolio</a></li>
          <li><a href="logout.php" id="logout-btn" class="menu-link">Log out</a></li>
        </ul>
      </nav>
    </div>

    <div class="hero-content">
      <h1 class="title">Welcome</h1>
      <p class="tagline">Choose Category to Edit from Menu</p>
    </div>
  </header>

  <main>

    <section id="edit-items" class="bg-light section-padding">
      <div id="edit-items_container" class="row">
        <h3>Choose Category From Menu</h3>
      </div>
    </section>

    <section id="edit" class="section-padding">
    </section>

    <div class="feedback" onclick="fadeOutElement(1000, 0, feedbackDiv)">
      <span id="feedback-message"></span>
    </div>

  </main>

  <footer class="bg-dark">

    <div class="social">
      <a href="https://github.com/jona-laa/" target="_blank" class="icon-link"><i class="fab fa-github fa-2x"></i></a>
      <a href="https://www.linkedin.com/in/jonathan-laasonen-974aa617a/" target="_blank" class="icon-link"><i class="fab fa-linkedin fa-2x"></i></a>
    </div>

    <small>&copy; 2020 Jona.Laa.Dev </small>

    <!-- To Top Button -->
    <a href="#home" id="goTop" class="btn-top">
      <svg class="arrow up" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="5 0 50 80" xml:space="preserve">
        <polyline fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" points="
		        0.375, 35.375 28.375, 0.375 58.67, 35.375 "/>
      </svg>
    </a>

  </footer>
  <script src="//code.jquery.com/jquery-latest.js"></script>
  <script>let seshToken = `<?php echo $_SESSION['token'] ?>`</script>
  <script src="./js/main.js"></script>
</body>

</html>