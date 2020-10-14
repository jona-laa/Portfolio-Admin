<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="favicon.ico">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
    integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
    crossorigin="anonymous" />
  <meta name="description" content="Jonathan's portfolio site">
  <link rel="stylesheet" href="./css/style.css">
  <title>Admin</title>
</head>



<?php 
include 'config.php';

$domain = DOMAIN;

if(!empty($_POST['username']) && !empty($_POST['password'])) {
  $username = $_POST['username'];
  $password = $_POST['password'];
  
  
  if($username == USERNAME && $password == PASSWORD) {
    session_start();
    $_SESSION['token'] = TOKEN;
    header("Location: $domain");
    }
}
?>




<body id="home">
  <header class="hero">
    <div class="hero-content">
      <h1 class="title">Welcome</h1>
      <p class="tagline">Please Log In</p>
      <a href="#login" class="arrow-link"><i class="fas fa-chevron-down fa-3x"></i></a>
    </div>
  </header>

  <main>
  <section id="login" class="section-padding">
  <h3>Log In</h3>
  <div class="divider"></div>
    <form action="login.php" method="post" id="login_form">
      <div>
        <label for="username">Username:</label><br />
        <input type="text" id="username" name="username" size="20" placeholder="Username" required /><br />
      </div>
      <div>
        <label for="password">Password:</label><br />
        <input type="password" id="password" name="password" size="20" placeholder="Password" required/><br />
      </div>
      <input type="submit" value="Log In" class="btn bg-light" id="loginBtn"/>
    </form>
  </section>
  </main>

  <footer class="bg-dark">
    <small>&copy; 2020 Jona.Laa.Dev </small>
  </footer>
</body>

</html>