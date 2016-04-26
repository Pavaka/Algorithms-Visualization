<?php session_start(); ?>
<link rel="stylesheet" type="text/css" href="../css/header.css">
<header id="page-header">
	<h1>Algorithms Visualizer</h1>
	<nav id="header-nav">
		<ul id="nav-list">
			<li class="nav-button"><a href="index.php">Home</a></li>
			<li class="nav-button"><a href="algorithms.php">Algorithms</a></li>
			<li class="nav-button"><a href="login.php">Login</a></li>
			<li>
			<?php 

				if(isset($_SESSION['username'])){
					echo "Logged in as ".$_SESSION['username'];
				}else{
					echo "No user logged in";
				}



			?>
			</li>
		</ul>
	</nav>
</header>	