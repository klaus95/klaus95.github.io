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

function optimizeFooter() {
    var windowW = window.innerWidth;
    var elements = document.getElementsByClassName("links");

    if (windowW < 730) {
        for (var i = 0; i < elements.length; i++) {
            var currentW = elements.item(i).getBoundingClientRect().width;
            elements.item(i).style.margin = "0 " + (windowW - 60 - currentW)/2 + "px";
        }
        elements.item(elements.length - 1).style.marginTop = "20px";
    } else {
        for (var i = 0; i < elements.length; i++) {
            elements.item(i).style.margin = "0 0 0 0";
        }
    }
}