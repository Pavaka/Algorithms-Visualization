//graph setup
const CURRENT_NODE_COLOR_BORDER = "red";
const DEFAULT_NODE_COLOR_BORDER = "black";
const NO_PREVIOUS_NODE = -1;
const Color = {
	WHITE: "white",
	GRAY: "gray",
	BLACK: "black"
}
var RADIUS = 30;
var COST = 100;
var NO_ITEMS_ERROR = "NO ITEMS ERROR"; 
var isForCostDrawing = false;
var nodesColors = [];

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

		context.strokeText(Color.BLACK, textX, textY);
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