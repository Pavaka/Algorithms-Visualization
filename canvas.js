var canvas = document.getElementById("drawing-canvas");
var context = canvas.getContext("2d");
var RADIUS = 30;
context.lineWidth = 1;
var COST = 100;
var isForCostDrawing = true;
//Logical representation
// node index -> adjecency list - > i-th cost , i-th niegbour node
var graph = [
			[[COST, 1]], 
			[[COST, 0], [COST, 2]],
			[[COST, 1]]
			];
// The center of each node circle View representation
var nodesCenter = [
				[100, 100],
				[300,300],
				[100, 600]
				];

function drawLine(fromIndex, toIndex, cost){
	previousLineWidth = context.lineWidth;
	context.lineWidth = 2;
	context.beginPath();
	fromX = nodesCenter[fromIndex][0];
	fromY = nodesCenter[fromIndex][1];
	toX = nodesCenter[toIndex][0];
	toY = nodesCenter[toIndex][1];
	context.moveTo(fromX , fromY);
	context.lineTo(toX, toY);
	context.stroke();
	if (isForCostDrawing){

		context.lineWidth = 1;
		textX = (fromX + toX) / 2;
		textY = (fromY + toY) / 2;
		context.font = '20px Arial';
		/*context.strokeStyle = "yellow";*/
		context.strokeText(cost, textX, textY);
	}
	context.lineWidth = previousLineWidth;
}



function drawNodes(){
	previousLineWidth = context.lineWidth;
	context.lineWidth = 3;
	for(i=0; i<graph.length; ++i){
		centerX = nodesCenter[i][0];
		centerY = nodesCenter[i][1];
		context.beginPath();
		context.arc(centerX, centerY, RADIUS, 0, 2 * Math.PI, false);
		context.fillStyle = 'white';
		context.fill();
		context.stroke();
		context.font = '20px Arial';

		context.strokeText(i, centerX,centerY);
	}
	context.lineWidth = previousLineWidth;
}

function drawEdges(){
	for(i =0; i<graph.length; ++i){
		currentNodeIndex = i;
		currentNode = graph[i];
		currentNodeNeigboursCount = currentNode.length;
		for(j = 0; j < currentNodeNeigboursCount; ++j){
			costToNeighbour = currentNode[j][0];
			niegbourNodeIndex = currentNode[j][1];
			drawLine(currentNodeIndex, niegbourNodeIndex, costToNeighbour);
		}
	}
}
/*
context.beginPath();
context.moveTo(0,0);
context.lineTo(50,100);

context.stroke();
context.beginPath();*/
/*
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;



context.arc(centerX, centerY, RADIUS, 0, 2 * Math.PI, false);
context.fillStyle = 'red';
context.fill();
context.stroke();*/
isForCostDrawing = true;
drawNodes();
drawEdges();