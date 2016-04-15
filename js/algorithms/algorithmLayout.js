changeAlgorithm();
function changeAlgorithm(){
	console.log("hallo");
	context.clearRect(0, 0, canvas.width, canvas.height);
	algorithm = document.getElementById("algorithmOptions").value;
	console.log(algorithm);
	algorithmsStart[algorithm]();

}