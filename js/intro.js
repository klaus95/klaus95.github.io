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