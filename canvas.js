var canvas = document.getElementById("drawing-canvas");
var context = canvas.getContext("2d");
var RADIUS = 30;
context.lineWidth = 1;
var COST = 100;
var isForCostDrawing = true;
var nodesColors = [];
const Color = {
	WHITE: "white",
	GRAY: "gray",
	BLACK: "black"
}
const CURRENT_NODE_COLOR_BORDER = "red";
const DEFAULT_NODE_COLOR_BORDER = "black";
class Stack{
	constructor(){
		this.stack = [];
		this.stackSize = 0;
	}

	push(element){
		this.stack.push(element);
		this.stackSize++;
	}

	pop(){
		if (this.stackSize == 0){
			return NO_ITEMS_ERROR;
		}
		var returnValue = this.stack[this.stackSize-1];
		this.stack.pop();
		this.stackSize--;
		return returnValue;
	}

	top(){
		if (this.stackSize == 0){
			return NO_ITEMS_ERROR;
		}
		return this.stack[this.stackSize-1];
	}
}
function drawCircleHole(nodeIndex, color){
		previousStrokeStyle = context.strokeStyle;
		centerX = nodesCenter[nodeIndex][0];
		centerY = nodesCenter[nodeIndex][1];
		context.beginPath();

		context.beginPath();
		context.arc(centerX, centerY, RADIUS, 0, 2* Math.PI, false);
		context.strokeStyle = color;
		context.lineWidth = 3;
		context.stroke();
		context.strokeStyle = previousStrokeStyle;
}
var NO_ITEMS_ERROR = "NO ITEMS ERROR"; 
//Logical representation
// node index -> adjecency list - > i-th cost , i-th niegbour node
var graph = [
			[[COST, 1], [COST, 3], [COST, 4]], 
			[[COST, 0], [COST, 2]],
			[[COST, 1]],
			[[COST, 0], [COST, 4]],
			[[COST, 0], [COST, 3]]
			];
// The center of each node circle View representation
var nodesCenter = [
				[100, 100],
				[300,300],
				[100, 600],
				[120, 300],
				[200, 400]
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
		//ADSDASDSADSDSA TUKA VIJ BUG IMA
		//context.strokeText(Color.BLACK, textX, textY);
	}
	context.lineWidth = previousLineWidth;
}


function drawNode(nodeIndex, colorForFill, makeBorder = false){
		previousStrokeStyle = context.strokeStyle;
		centerX = nodesCenter[nodeIndex][0];
		centerY = nodesCenter[nodeIndex][1];
		context.beginPath();
		context.arc(centerX, centerY, RADIUS, 0, 2 * Math.PI, false);
		context.fillStyle = colorForFill;
		context.fill();
		context.stroke();
		context.font = '20px Arial';
		context.strokeStyle = 'red';
		context.strokeText(nodeIndex, centerX,centerY);
		context.strokeStyle = previousStrokeStyle;
		if(makeBorder){
			drawCircleHole(nodeIndex, CURRENT_NODE_COLOR_BORDER);
		}


}

function drawNodes(){
	previousLineWidth = context.lineWidth;
	context.lineWidth = 3;
	for(i = 0; i < graph.length; ++i){
		drawNode(i, Color.WHITE);
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

isForCostDrawing = true;
drawNodes();
drawEdges();
/*depthFirstSearch();*/




function depthFirstSearch(){

	for(i = 0; i < graph.length; ++i){
		nodesColors.push(Color.WHITE);
	}

	for(i = 0; i < graph.length; ++i){

		if(nodesColors[i] == Color.WHITE){
			depthFirstSearch_Visit(i);

		}
	}
}


function depthFirstSearch_Visit(nodeIndex){
	nodesColors[nodeIndex] = Color.GRAY;
	drawNode(nodeIndex, Color.GRAY)


	for(i = 0; i < graph[nodeIndex].length; ++i){
		currentNeighbourIndex = graph[nodeIndex][i][1];
		if(nodesColors[currentNeighbourIndex] == Color.WHITE){
			depthFirstSearch_Visit(currentNeighbourIndex);
		}
	}

	nodesColors[nodeIndex] = Color.BLACK;
	drawNode(nodeIndex, Color.BLACK);
}

function startDFS(){

	for(i = 0; i < graph.length; ++i){
		nodesColors.push(Color.WHITE);
	}
	st = new Stack();
	dfsNodeIndex = 1;
	st.push(dfsNodeIndex);
	previousNodeIndex = -1;
	// nodesColors[dfsNodeIndex] = Color.GRAY;
	// drawNode(dfsNodeIndex, Color.WHITE);

	console.log(423);
}

startDFS();
console.log("st.top()");

function stepDFS(){

	var nodeIndex = st.top();
	if(nodeIndex == NO_ITEMS_ERROR){return;}



	if(previousNodeIndex != -1){		
		drawCircleHole(previousNodeIndex, DEFAULT_NODE_COLOR_BORDER);
	}
	
	console.log(nodesColors[nodeIndex]);
	console.log(nodeIndex, previousNodeIndex );

	console.log(st.stack);
	if(nodesColors[nodeIndex] == Color.GRAY){
		drawCircleHole(nodeIndex, CURRENT_NODE_COLOR_BORDER);
		previousNodeIndex = nodeIndex;
		for(var i =0; i< graph[nodeIndex].length; ++i){
			var neighIndex = graph[nodeIndex][i][1];
			if(nodesColors[neighIndex] == Color.WHITE){
				st.push(neighIndex);
				return;
			}
		}
		st.pop();
		nodesColors[nodeIndex] = Color.BLACK;
		drawNode(nodeIndex, Color.BLACK);	
		//BSBSBSBSBS
		drawCircleHole(nodeIndex, CURRENT_NODE_COLOR_BORDER);
		previousNodeIndex = nodeIndex;	
	}
	else if(nodesColors[nodeIndex] == Color.WHITE){
		nodesColors[nodeIndex] = Color.GRAY;
		drawNode(nodeIndex, Color.GRAY);
		//BSBSBSBSBS
		drawCircleHole(nodeIndex, CURRENT_NODE_COLOR_BORDER);
		previousNodeIndex = nodeIndex;
		for(var i =0; i< graph[nodeIndex].length; ++i){
			var neighIndex = graph[nodeIndex][i][1];
			if(nodesColors[neighIndex] == Color.WHITE){
				st.push(neighIndex);
				return;
			}
		}
		console.log("here");
		nodesColors[nodeIndex] = Color.BLACK;
		// st.pop();
	}
	else if(nodesColors[nodeIndex] == Color.BLACK){
		drawNode(nodeIndex, Color.BLACK);
		//BSBSBSBSBS
		drawCircleHole(nodeIndex, CURRENT_NODE_COLOR_BORDER);
		previousNodeIndex = nodeIndex;
		st.pop();
	}

	
}


/*var st = new Stack();

document.write(typeof(st));
for(i =0; i<10; ++i){
	st.push(i);
	document.write(i+"<br>");
	// document.write(st.top());
}

while (st.top() != NO_ITEMS_ERROR){
	document.write(st.pop() + "<br>");
}*/
      var x = canvas.width / 2;
      var y = canvas.height / 2;
      var radius = 75;
      var startAngle = 0;
      var endAngle = 2* Math.PI;
      var counterClockwise = false;

      context.beginPath();
      context.arc(x, y, radius, 0, 2* Math.PI, counterClockwise);
      context.lineWidth = 3;

      // line color
      
      context.stroke();


/*
drawCircleHole(0, "red");*/
