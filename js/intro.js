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

function changeVars(item, length){
  counter = 0
  var colorPicker = function() {
    var element = document.getElementById(item);
    var r = Math.floor(Math.random() * 250) + 20;
    var g = Math.floor(Math.random() * 250) + 20;
    var b = Math.floor(Math.random() * 250) + 20;
    element.style.color = "rgb("+r+","+b+","+g+")";
    counter++;
    if (counter <= length) {setTimeout(colorPicker, 250);}
  }
  colorPicker()
}

for(var i = 1; i <= 5; i++) {
  var str = "link_" + i;
  var len = (i * 20) + 10;
  changeVars(str, len);
}

function goTo(url) {
  if (url === "linkedin") {
    window.open("https://www.linkedin.com/in/klauscipi/");
  } else if (url === "facebook") {
    window.open("https://www.facebook.com/thisisklauus");
  } else if (url === "github") {
    window.open("https://github.com/klaus95");
  } else if (url === "email") {
    window.open("mailto:klauscipi@gmail.com");
  } else {
    window.open("https://twitter.com/CipiKlaus");
  }
}