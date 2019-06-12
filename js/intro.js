var animate = function() {
  var element = document.getElementById("txtcrs");
  var visible = element.style.opacity;
  if (visible == 0.5) {
    element.style.opacity = 0;
  } else {
    element.style.opacity = 0.5;
  }
  setTimeout(animate, 400);
}
animate();

function greetVisitor(time){
	if (time >= 5 && time < 12) {
		return "Good morning,"
	} else if (time >= 12 && time <= 5){
		return "Good afternoon,"
	} else {
		return "Good evening,"
	}
}