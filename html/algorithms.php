<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="../css/index.css">
	<link rel="stylesheet" type="text/css" href="../css/algorithms.css">
	
	<meta charset="UTF-8">	
	<title>Algorithms Visualization</title>
</head>
<body>
	<div id="container">
		<div>
			<div id="header-place">
				<?php include "header.php"; ?>
			</div>

			<section>
				<canvas id="drawing-canvas" width="960px" height="650px"></canvas>
				<aside>
					<select id="algorithmOptions" name="algorithmOptions" onchange="changeAlgorithm()">
						<option selected disabled  value="">Choose algorithm</option>
						<option value="DFS">DFS</option>
						<option value="BFS">BFS</option>
					</select>
					<div id="algorithm-specific-fields">
						

						
					</div>
				</aside>
			</section>
			
		</div>
	</div>
		<script src="../js/logic.js"></script>
</body>




</html>