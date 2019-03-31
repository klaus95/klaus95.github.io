function Show(index) {
  document.getElementById("btn_" + index).setAttribute("onclick", "openWindow()");
}

function optimizeBarBtn2() {
  var windowW = window.innerWidth;
  var elements = document.getElementsByClassName("btns");

  if (windowW < 445) {
    for (var i = 0; i < elements.length; i++) {
      var currentW = elements.item(i).getBoundingClientRect().width + 2;
      elements.item(i).style.margin = "1px " + (windowW - 60 - currentW)/2 + "px";
    }
    document.getElementById("btnbar").style.height = "120px"
  } else {
    document.getElementById("btnbar").style.height = "45px";
    for (var i = 0; i < elements.length; i++) {
      elements.item(i).style.margin = "1px 1px";
    }

  }
}
//Not used
function optimizeBarBtn() {
  var divWidth = document.getElementById("bar-pos").getBoundingClientRect().width;
  
	sum = 1;
	for (var i = 0; i < 4; i++){
		sum += document.getElementsByClassName("btns").item(i).getBoundingClientRect().width + 12;
	}

	if (divWidth < sum){
		var newMargin = (parseInt(sum) - divWidth)/8;
		console.log(newMargin);
		for (var i = 0; i < 4; i++){
			sum += document.getElementsByClassName("btns").item(i).style.margin = "1px " + parseInt(6 - newMargin) + "px";
		}
	} 
}

function openWindow() {
  document.getElementById("window").style.opacity = "1";
  window.open("pages/demo.html", "_self")
}

var stop_animation = [false, false, false, false, false];

function start_blink(index) {
    stop_animation[index] = false;
    var time = 0;

    var animate = function() {
    time++;
    var element = document.getElementById("btn_crs_" + index);
    var visible = element.style.opacity;
    if (visible == 0.5) {
      element.style.opacity = 0;
    } else {
      element.style.opacity = 0.5;
    }
    if (!stop_animation[index]) {
      setTimeout(animate, 250);
    } else {
      document.getElementById("btn_crs_" + index).style.opacity = 0.5;
    }
  }
animate();
}

function stop_blink(index) {
    stop_animation[index] = true;
}

function Blink(index) {
  document.getElementById("btn_" + index).setAttribute("onmouseover", "start_blink("+ index +")");
  document.getElementById("btn_" + index).setAttribute("onmouseout", "stop_blink("+ index +")");
}

function TypeWriter(index) {
  var length = document.getElementById("btn_" + index + "_em").textContent.length;
  var time = -1;

  var animate = function() {
    time++;
    var element = document.getElementById("btn_" + index);
    var empty_element = document.getElementById("btn_" + index + "_em");
    var str_em = empty_element.textContent;
    var charAdded = str_em.substring(0, 1);
    empty_element.innerHTML = str_em.substring(1, str_em.length);
    var str = element.textContent;
    element.innerHTML = str + charAdded;
    if (time < length) { setTimeout(animate, 200); }
  }
  animate();
}

// Calling all animations
for (var i = 1; i < 5; i++) {
  TypeWriter(i);
  Blink(i);
  Show(i);
}