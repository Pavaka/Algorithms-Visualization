//canvas setup
var canvas = document.getElementById("drawing-canvas");
var context = canvas.getContext("2d");
context.lineWidth = 1;

function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}


//GRAPH SETUP
COST = 100;
defaultGraph = [
			[[COST, 1], [COST, 3], [COST, 4]], 
			[[COST, 0], [COST, 2]],
			[[COST, 1]],
			[[COST, 0], [COST, 4]],
			[[COST, 0], [COST, 3]]
			];

defaultNodesCenter = [
				[100, 100],
				[300,300],
				[100, 600],
				[120, 300],
				[200, 400]
				];
nodesColors = [];
const CURRENT_NODE_COLOR_BORDER = "red";
const DEFAULT_NODE_COLOR_BORDER = "black";
const NO_PREVIOUS_NODE = -1;
const Color = {
	WHITE: "white",
	GRAY: "gray",
	BLACK: "black"
}
STARTING_VERTEX = 0;
RADIUS = 30;
const globalCircleForNodesPositionRadius = 200;
const globalCircleForNodesPositionX = 410;
const globalCircleForNodesPositionY = 300;
NO_ITEMS_ERROR = "NO ITEMS ERROR"; 
isForCostDrawing = false;


//Logical representation
// node index -> adjecency list - > i-th cost , i-th niegbour node
graph = defaultGraph;
// The center of each node circle View representation
nodesCenter = defaultNodesCenter;




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

		context.strokeText(cost, textX, textY);
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

function drawEdge(){

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

function drawGraph(){
	clearCanvas();
	drawNodes();
	drawEdges();
}


//DFS FUNCTIONS
function startDFS(){

	for(i = 0; i < graph.length; ++i){
		nodesColors[i] = Color.WHITE;
	}
	st = new Stack();
	// var dfsNodeIndex = 1;
	st.push(STARTING_VERTEX);
	previousNodeIndex = NO_PREVIOUS_NODE;
}
const NO_WIHTE_NODE = -1;
function findWhiteNode(){
	for(i=0; i<graph.length; ++i){
		if(nodesColors[i] == Color.WHITE){
			return i;
		}
	}
	return NO_WIHTE_NODE;
}
function stepDFS(){

	var nodeIndex = st.top();
	if(nodeIndex == NO_ITEMS_ERROR){
		if(findWhiteNode() != NO_WIHTE_NODE){
			st.push(findWhiteNode());
			nodeIndex = st.top();

		}else{

			return;
		}
	}

	if(previousNodeIndex != NO_PREVIOUS_NODE){		
		drawCircleHole(previousNodeIndex, DEFAULT_NODE_COLOR_BORDER);
	}
	
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
		drawNode(nodeIndex, Color.BLACK, true);	
	}
	else if(nodesColors[nodeIndex] == Color.WHITE){
		nodesColors[nodeIndex] = Color.GRAY;
		drawNode(nodeIndex, Color.GRAY, true);
		previousNodeIndex = nodeIndex;
		for(var i =0; i< graph[nodeIndex].length; ++i){
			var neighIndex = graph[nodeIndex][i][1];
			if(nodesColors[neighIndex] == Color.WHITE){
				st.push(neighIndex);
				return;
			}
		}
		nodesColors[nodeIndex] = Color.BLACK;
	}
	else if(nodesColors[nodeIndex] == Color.BLACK){
		drawNode(nodeIndex, Color.BLACK, true);
		previousNodeIndex = nodeIndex;
		st.pop();
	}
}
function DFSmain(){
	drawGraph();
	startDFS();
}


class Queue{
	constructor(){
		this.queue = [];
		this.queueSize = 0;

	}

	push(element){
		this.queue.push(element);
		this.queueSize++;
	}

	pop(){
		if (this.queueSize == 0){
			return NO_ITEMS_ERROR;
		}
		var returnValue = this.queue[0];
		this.queue.shift();
		this.queueSize--;
		return returnValue;
	}

	top(){
		if (this.queueSize == 0){
			return NO_ITEMS_ERROR;
		}
		return this.queue[0];
	}
	isInQueue(nodeIdx){
		for(i=0; i<this.queueSize; ++i){
			if(this.queue[i] == nodeIdx){
				return true;
			}
		}
	return false;
	}
}

function startBFS(){
	hasBeenInQ = [];
	for(i = 0; i < graph.length; ++i){
		nodesColors[i] = Color.WHITE;
		hasBeenInQ.push(false);
	}
	Q = new Queue();
	Q.push(STARTING_VERTEX);
	currentBFSnode = STARTING_VERTEX;
	previousNodeIndex = NO_PREVIOUS_NODE;
}


function findWhiteNeighbour(node){
	for(i=0; i<graph[node].length; ++i){
		currNeigh = graph[node][i][1];
		if(nodesColors[currNeigh] == Color.WHITE){
			return currNeigh;
		}
	}
	return NO_WIHTE_NODE;
}

function stepBFS(){

	var nodeIndex = Q.pop();
	if(nodeIndex == NO_ITEMS_ERROR){
		for(i = 0 ; i<graph.length; ++i){
			if(nodesColors[i] == Color.WHITE){
				nodeIndex = i;
			}
		}
	}
	if(nodesColors[nodeIndex] == Color.GRAY){
	}
	else if(nodesColors[nodeIndex] == Color.WHITE){
		drawNode(nodeIndex, Color.BLACK, true);
		nodesColors[nodeIndex] =Color.BLACK;
		for(i=0; i< graph[nodeIndex].length; ++i){
			neighIndex = graph[nodeIndex][i][1];
			if(nodesColors[neighIndex] == Color.WHITE && !hasBeenInQ[neighIndex] ){
				Q.push(neighIndex);
				hasBeenInQ[neighIndex] = true;
			}

		}
	}
	else if(nodesColors[nodeIndex] == Color.BLACK){
	}
}

function BFSmain(){
	drawGraph();
	startBFS();
}

//Defining dictionary for name to starting function map
algorithmsStart = {
	"DFS": DFSmain,
	"BFS": BFSmain
}
function startAlgorithm(algorithm){
	algorithmsStart[algorithm]();
}

//ADDING NODES REDRAWING 
function recalculateNodePositions(){
	graphNodesCount = graph.length;
	nodesCenter = [];
	angle = 2 * Math.PI / graphNodesCount;
	for(i = 0; i < graphNodesCount; ++i){
		var radius = globalCircleForNodesPositionRadius;
		var X = globalCircleForNodesPositionX;
		var Y = globalCircleForNodesPositionY;
		var newNodeCenter = [X + radius*Math.cos(angle*i), Y +  radius*Math.sin(angle*i)];
		nodesCenter.push(newNodeCenter);
	}
}

function newNode(){
	graph.push([]);
	recalculateNodePositions();
	drawGraph();
	var algorithmName = document.getElementById("algorithmOptions").value;	
	startAlgorithm(algorithmName);

}
//Create an empty graph
function newGraph(){
	clearCanvas();
	graph = [];
	nodesCenter = [];
	nodesColors = [];
}

//given fronNode to Node say  on which (i-th) neigbour 
//the toNode is in the adjacency list
const NOT_A_NEIGHBOUR = -1;
function findNeighbourNumber(fromNode, toNode){
	for(i =0; i<graph[fromNode].length; ++i){
		var currentNigbour = graph[fromNode][i][1];
		if(currentNigbour == toNode){
			return i;
		}
		}
	return NOT_A_NEIGHBOUR;
}

function edgeExist(fromNode, toNode){
	if(findNeighbourNumber(fromNode, toNode) == NOT_A_NEIGHBOUR){
		return false;
	}
	return true;
}

function updateCostOfEdge(fromNode, toNode, cost){

	graph[fromNode][findNeighbourNumber(fromNode, toNode)][0] = cost;
	graph[toNode][findNeighbourNumber(toNode, fromNode)][0] = cost;
}
// valid argumens only passed
function addEdge(fromNode, toNode, cost){
	console.log(typeof(fromNode));

	if(edgeExist(fromNode, toNode)){
		updateCostOfEdge(fromNode, toNode, cost);
	}else{
		graph[fromNode].push([cost, toNode]);
		graph[toNode].push([cost, fromNode]);
	}
	drawGraph();
}
//handled from input
function addNewEdge(fromNode, toNode, cost){
	console.log(typeof(fromNode));
	var biggestNodeIndex = graph.length - 1;
	fromNode = parseInt(fromNode);
	console.log(typeof(fromNode));
	console.log(fromNode);
	toNode = parseInt(toNode);
	cost = parseInt(cost);
	if(fromNode < 0 || toNode <0 || 
		fromNode > biggestNodeIndex || toNode > biggestNodeIndex 
		|| fromNode ==toNode){
		alert("Invalid nodes number");
	return;
	}
	addEdge(fromNode, toNode, cost);
	document.getElementById('firstNodeFromNewEdge').value = "";
	document.getElementById('secondNodeFromNewEdge').value = "";
	document.getElementById('costOfEdge').value = "";
}

function changeIsCostVisible(){
	isForCostDrawing = !isForCostDrawing;
	drawGraph();
}


//
// Change algorithm from dropdown
function changeAlgorithm(){
	console.log("hallo");
	
	clearCanvas();
	var algorithmName = document.getElementById("algorithmOptions").value;
	console.log(algorithmName);
	changeAlgorithmSpecificFields(algorithmName);
	algorithmsStart[algorithmName]();

}

function changeAlgorithmSpecificFields(algorithmName){
	var xhr = new XMLHttpRequest();
	var url = "";
	if(algorithmName == "DFS"){
		url = "../html/graph_specific_input.html";
	}else if(algorithmName == "BFS"){
		url = "../html/graph_specific_input.html";
	}
	//MAGIC
	xhr.open('GET', url, true);
	xhr.responseType = 'text';
	xhr.onload = function () {
	    if (xhr.readyState === xhr.DONE) {
	        if (xhr.status === 200) {
	        	var str = xhr.responseText;
	        	str = str.replace("algorithmNameGoesHere", "step"+algorithmName);
            	document.getElementById("algorithm-specific-fields").innerHTML = str;
	        }
	    }
	};
	xhr.send(null);
}


