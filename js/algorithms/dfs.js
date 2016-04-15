function startDFS(){

	for(i = 0; i < graph.length; ++i){
		nodesColors[i] = Color.WHITE;
	}
	st = new Stack();
	var dfsNodeIndex = 1;
	st.push(dfsNodeIndex);
	previousNodeIndex = NO_PREVIOUS_NODE;
}


function stepDFS(){

	var nodeIndex = st.top();
	if(nodeIndex == NO_ITEMS_ERROR){return;}

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
function DFS(){
console.log("tuka");
	drawNodes();
	drawEdges();
	startDFS();
console.log(st.stack);
}
