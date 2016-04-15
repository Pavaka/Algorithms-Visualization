<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="/css/index.css">
	<link rel="stylesheet" type="text/css" href="/css/algorithms.css">
	<meta charset="UTF-8">	
	<title>Algorithms Visualization</title>
</head>
<body>
	<div id="container">
		<div>
			<div id="header-place">
				<?php include "header.html"; ?>
			</div>

			<section>
				<canvas id="drawing-canvas" width="960px" height="650px"></canvas>
				<aside>
					<select id="algorithmOptions" name="algorithmOptions" onchange="changeAlgorithm()">
						<option value="DFS">DFS</option>
						<option value="BFS">BFS</option>
					</select>
					<div id="algorithm-specific-fields">
						<input type="button" value="STEP" onclick="stepDFS()"></input>
						
					</div>
				</aside>
			</section>
			
		</div>
	</div>
		<?php include "scripts.html";?>
</body>




</html>