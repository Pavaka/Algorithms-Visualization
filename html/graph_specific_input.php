<?php session_start(); ?>
<link rel="stylesheet" type="text/css" href="../css/graph_specific_input.css">
<div id="graph-specific-input">
	<span>Nodes count: <span id="nodesCount"></span></span>
	<input type="button" value="STEP" onclick="algorithmNameGoesHere()">
	<input type="button" value="New Graph" onclick="newGraph()">
	<input type="button" value="New Node" onclick="newNode()">
	<input type="text" id="firstNodeFromNewEdge" placeholder="Node 1">
	<input type="text" id="secondNodeFromNewEdge" placeholder="Node 2">
	<input type="text" id="costOfEdge"placeholder="Cost">
	<input type="button" value="Add edge"
	 onclick="addNewEdge(
	 document.getElementById('firstNodeFromNewEdge').value, 
	 document.getElementById('secondNodeFromNewEdge').value,
	 document.getElementById('costOfEdge').value
	 )">
	 <label for="isForCostDrawing">Costs visible:</label>
	 <input type="checkbox" id="isForCostDrawing" onchange="changeIsCostVisible()"> 

	 <?php
	 if(isset($_SESSION['username'])){

		$host  = "localhost";
		$user = $_SESSION["username"];
		$pass = "";
		$database = "users";
		$conn = new PDO("mysql:host=$host;dbname=$database","root", "");

		$sql = "SELECT Id FROM users where Usernam='$user'";
		$query = $conn->query($sql) or die("failed!");
		$row = $query->fetch(PDO::FETCH_ASSOC);
		$userId = $row['Id'];

		$sql = "SELECT * FROM graphs where userId='$userId'";
		$query = $conn->query($sql) or die("failed!");
		$graphNum = 0;
		$graphs = [];

		?>
		<select id="graphList">
		<?php
		while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
			// var_dump($row);
			echo "<option id='$graphNum ' value=". $row['Graph'] .">Graph $graphNum</option>";
			$graphNum++;
		}
		?> 
		</select>
		<input type="button" onclick="changeGraph()" value="Load Graph">
		<?php


	 	// var_dump($_POST);
		// echo $_SESSION['username'];
					?>
					<form method="post" id="save-graph" action="save_graph.php">
						<input hidden type="hidden" name="graphValue" id="graph-in-text" value="" >
						<input type="submit" name="submit-button" value="Save Graph" onclick="graphInText()">
					</form>
					<?php
	 }else{
	 	// echo "5";
	 } 


	 ?>
</div>