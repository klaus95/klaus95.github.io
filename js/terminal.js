const startupRoot = "root@klauscipi.com: ~/";
const windowHeight = 450;
const line_height = 20;
var horizontal_step = 9;
var max_length = 87;

var chars = 0;
var local_chars = 0;
var offset = 0;
var lines = 0;

var startupLen = 0;
var startupText = "";

var focused = false;
var fakeTextarea;

var browserDetector = "";

var code = 0;
var existingChars = "";

function setHeight() {
	horizontal_step = document.getElementById("cursor").getBoundingClientRect().width;
	max_length = parseInt(document.getElementById("terminal").clientWidth/horizontal_step, 10) - 1;
}

function closeWin() {
  document.getElementById("window").style.opacity = "0";
}

function startup() {
	browserDetector = window.navigator.userAgent;

	startupText = "root@klauscipi.com $ ";
	startupLen = startupText.length;
  	local_chars = startupLen;

	document.getElementById("const").innerHTML = startupText;
	document.getElementById("root").innerHTML = startupRoot;
	
	set_cursor_position();
	setHeight();
	optimizeBarBtn2();
	optimizeFooter();
}

function isAndroid() {
	var str = browserDetector.toLowerCase();
	if (str.indexOf("android") != -1) {
		return true;
	} else {
		return false;
	}
}

function scrollCursor(){
	var element = document.getElementById('terminal');
	var curs = document.getElementById('cursor');
	var delta = 8;
	
	if ( (element.scrollTop < delta + (element.scrollHeight - element.offsetHeight)) && ( element.scrollTop > (element.scrollHeight - element.offsetHeight) - delta)) {
		curs.style.opacity = 0.5;
	} else {
		curs.style.opacity = 0;
	}
}

function focusOnTerminal(){

	document.getElementById("window").style.boxShadow = "15px 15px 40px #000000";

	if (!focused) {

		fakeTextarea = document.createElement("textarea");
		fakeTextarea.style.position = "fixed";
		fakeTextarea.style.left = "-250px";
		fakeTextarea.style.top = document.getElementById("row").getBoundingClientRect().top;
		document.getElementById("terminal").appendChild(fakeTextarea);
		fakeTextarea.style.resize = "none";

		fakeTextarea.addEventListener("beforeinput", function (e) {
			
			if (isAndroid()) {
				var typed = e.data;
				if (typed != null) {
					if (existingChars.length > typed.length) {
						typed = null;
					}
				}
				if (typed != null) {
					var str = document.getElementById('const').textContent;
					document.getElementById('const').innerHTML = str + typed.slice(-1);
				} else {
					if (code != 13) {
						var str = document.getElementById('const').textContent;
						
						if (str.length > startupLen) {
							document.getElementById('const').innerHTML = str.substring(0, str.length - 1);
						}
					}
				}
				if (typed != null) {
					existingChars = typed;
				} else {
					existingChars = "";
				}
			}

		})
	}

	fakeTextarea.focus();
	focused = true;
}

function set_cursor_position() {

	var messageBody = document.getElementById('terminal');
	messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

	if (!isMobile()) {

		var element = document.getElementById("cursor");
		var row = document.getElementById("row").getBoundingClientRect();
		element.style.position = "fixed";
		element.style.top = row.top + (lines*line_height) + "px";
		element.style.left = (row.left + (local_chars+offset) * horizontal_step) + "px";

	} else {

		document.getElementById("cursor").style.position = "initial";

		if (isAndroid()) {
			document.getElementById("cursor").style.opacity = 1;
		}
	}

}

function parseCommand(str) {
  var newStr = str.substring(startupLen, str.length);
  newStr = newStr.replace("\n", "");
  return newStr;
}

window.addEventListener("keydown", function (e) {

	if (focused) {

		code = e.keyCode || e.which;
		
		if (code == 8) {
	
			if (chars > 0 && Math.abs(offset) < chars) {
	
				if (local_chars == 0) {
					var str = document.getElementById('const').textContent;
					document.getElementById('const').innerHTML = str.substring(0, str.length - 1);
					lines--;
					chars--;
					local_chars = max_length;
				}
	
				if (offset == 0) {
					var str = document.getElementById('const').textContent;
					document.getElementById('const').innerHTML = str.substring(0, str.length - 1);
				} else {
					var str = document.getElementById('const').textContent;
					var len = str.length;
					var begin = str.substring(0, len + offset - 1);
					var end = str.substring(len + offset, len);
					document.getElementById('const').innerHTML = begin + end;
				}
	
				chars--;
				local_chars--;
	
			}
	
		} else if (code == 13) {
			fakeTextarea.value = "";

			var old_line = document.getElementById('const').textContent;
			var history = document.getElementById('history');
			var newDiv = document.createElement("DIV");
			newDiv.style.whiteSpace = "pre-wrap";
			newDiv.innerHTML = old_line;
			history.append(newDiv);
	
			var command = parseCommand(old_line);
	
			document.getElementById('const').innerHTML = old_line.substring(0, startupLen);
			chars = 0;
			local_chars = startupLen;
			offset = 0;
			lines = 0;
	
		} else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 186 && e.keyCode <= 192) || (e.keyCode >= 219 && e.keyCode <= 222) || e.keyCode == 32) {
	
			if (offset == 0) {
	
				var str = document.getElementById('const').textContent;
				document.getElementById('const').innerHTML = str + e.key;
	
			} else {
	
				var str = document.getElementById('const').textContent;
				var len = str.length;
				var begin = str.substring(0, len + offset);
				var end = str.substring(len + offset, len);
				document.getElementById('const').innerHTML = begin + e.key + end;
			}
	
			chars++;
			local_chars++;
	
			if (local_chars == max_length) {
				var str = document.getElementById('const').textContent;
				document.getElementById('const').innerHTML = str + "\n";
				lines++;
				chars++;
				local_chars = 0;
			}
	
		} else if (code == 39) {
	
			if (offset < 0) {
				offset++;
			}
	
		} else if (code == 37) {
			
			if (chars > 0 && Math.abs(offset) < chars) {
				offset--;
			}
			
		} else if (code == 40) {
	
			offset = 0;
	
		}
	}
  set_cursor_position();
})