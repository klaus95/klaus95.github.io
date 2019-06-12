var max_length = 0;
var chars = 0;
var lines = 0;
var code = 0;

var startupLen = 0;
var startupText = "root@klauscipi.com $ ";

var focused = false;
var fakeTextarea;

function focusOnTerminal(){

	if (!focused) {

		fakeTextarea = document.createElement("textarea");
		fakeTextarea.style.position = "fixed";
		fakeTextarea.style.left = "-250px";
		fakeTextarea.style.top = document.getElementById("row").getBoundingClientRect().top;
		fakeTextarea.style.whiteSpace = "pre";
		document.getElementById("terminal").appendChild(fakeTextarea);
		fakeTextarea.style.resize = "none";

		fakeTextarea.addEventListener("beforeinput", function (e) {

			var typed = e.data;
			
			if (typed != null) { //letters

				document.getElementById('const').innerHTML = document.getElementById('const').textContent + typed;
				chars++;
			
				if (chars == max_length) {
					document.getElementById('const').innerHTML = document.getElementById('const').textContent + "\n";
					chars = 0;
					lines++;
				}
			
				updateScroll();

			} else {
				if (code == 8) { //backspace

					var str = document.getElementById('const').textContent;
					if (str.charAt(str.length - 1) == '\n') {	
						document.getElementById('const').innerHTML = str.substring(0, str.length - 1);
						lines--;
						chars = max_length;
					}
					
					if (chars > ((lines > 0) ? 0 : startupLen)) {
						var str = document.getElementById('const').textContent;
						document.getElementById('const').innerHTML = str.substring(0, str.length - 1);
						chars--;
					}

				} else if (code == 13) { //enter

					var old_line = document.getElementById('const').textContent;
					var command = old_line.substring(startupLen, old_line.length).replace("\n", "");
					//use command here
				
					var history = document.getElementById('history');
					var newDiv = document.createElement("DIV");
					newDiv.style.whiteSpace = "pre-wrap";
					newDiv.innerHTML = old_line;
					history.append(newDiv);
					//add response here
				
					document.getElementById('const').innerHTML = old_line.substring(0, startupLen);
					fakeTextarea.value = "";
					chars = startupLen;
					lines = 0;
				
					updateScroll();

				}
			}

		})
	}

	document.getElementById("window").style.boxShadow = "15px 15px 40px #000000";
	fakeTextarea.focus();
	focused = true;
}

window.addEventListener("keydown", function (e) { code = e.keyCode || e.which; })

function updateScroll(){
    var element = document.getElementById("terminal");
    element.scrollTop = element.scrollHeight;
}