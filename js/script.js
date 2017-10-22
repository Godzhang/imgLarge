window.onload = function(){
	var imgbox = document.getElementById("imgbox"),
		zoombox = document.getElementById("zoombox"),
		bigImg = zoombox.getElementsByTagName('img')[0],
		shade = document.createElement("div");
	shade.id = "shade";

	var startX,
		startY;

	imgbox.onmouseenter = function(event){
		startX = event.pageX - imgbox.offsetLeft;
		startY = event.pageY - imgbox.offsetTop;
		showShade(startX, startY);
	}

	function showShade(x, y){
		imgbox.appendChild(shade);
		




	}







}