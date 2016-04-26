<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="../css/index.css">
	<link rel="stylesheet" type="text/css" href="../css/login.css">
	<meta charset="UTF-8">	
	<title>Algorithms Visualization</title>
</head>
<body>
	<div id="container">

			<div id="header-place">
				<?php include "header.php"; ?>
			</div>	

			<div id="info">
				<form id="login-form" method="post" action="login.php">
					<input type="text" name="user" id="user" placeholder="Username">
					<input type="password" name="pass" id="pass" placeholder="Password">
					<input type="submit" value="Log In">
				</form>
			</div>		

	</div>
</body>
<?php 

if ($_POST){

$host  = "localhost";
$user = $_POST["user"];
$pass = $_POST["pass"];

$database = "users";
$conn = new PDO("mysql:host=$host;dbname=$database","root", "");

$sql = "SELECT * FROM users where Usernam='$user' and Password='$pass'";
$query = $conn->query($sql) or die("failed!");
$row = $query->fetch(PDO::FETCH_ASSOC);
if( $row['Usernam'] != ""){

	$_SESSION['username'] = $row['Usernam'];
	// var_dump($_SESSION['username']);
	header('Location: algorithms.php');
	exit();
}
else{
	echo "<script type='text/javascript'>alert('Error failed login try again');</script>";
	session_unset();
	header("Refresh:0");
	// header('Location: algorithms.php');

}
}

?>

</html>