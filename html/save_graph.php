<?php 
	session_start();
	if ($_POST){

		// var_dump($_POST['graphValue']);
		$graph = $_POST["graphValue"];
		$host  = "localhost";
		$user = $_SESSION["username"];
		$pass = "";
		$database = "users";
		$conn = new PDO("mysql:host=$host;dbname=$database","root", "");

		$sql = "SELECT Id FROM users where Usernam='$user'";
		$query = $conn->query($sql) or die("failed!");
		$row = $query->fetch(PDO::FETCH_ASSOC);
		$userId = $row['Id'];
		$sql = "INSERT INTO graphs (userId, graphId, Graph) VALUES ('$userId', '', '$graph')";
		$conn->exec($sql) or die("failed!");


	header("Location: algorithms.php");
} 
 ?>
