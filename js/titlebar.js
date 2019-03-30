function Show(index) {
  document.getElementById("btn_" + index).setAttribute("onclick", "openWindow()");
}

function openWindow() {
  document.getElementById("window").style.opacity = "1";
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