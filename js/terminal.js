const startupRoot = "root@klauscipi.com: ~/";
const windowHeight = 450;
var horizontal_step = 9;
const line_height = 20;
var max_length = 87;

var chars = 0;
var local_chars = 0;
var offset = 0;
var lines = 0;

var startupLen = 0;
var startupText = "";

var focused = false;
var fakeTextarea;

function setHeight() {
	horizontal_step = document.getElementById("cursor").getBoundingClientRect().width;
	max_length = parseInt(document.getElementById("terminal").clientWidth/horizontal_step, 10) - 1;
}

function closeWin() {
  document.getElementById("window").style.opacity = "0";
}

function startup() {
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
	focused = true;
	fakeTextarea = document.createElement("textarea");
	fakeTextarea.style.position = "absolute";
	fakeTextarea.style.left = "-200px";
	fakeTextarea.style.top = "0";
	document.getElementById("container").appendChild(fakeTextarea);
	fakeTextarea.focus();
}

function set_cursor_position() {
	var messageBody = document.getElementById('terminal');
	messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

	var element = document.getElementById("cursor");
	var row = document.getElementById("row").getBoundingClientRect();
	element.style.position = "fixed";
	element.style.top = row.top + (lines*line_height) + "px";
	element.style.left = (row.left + (local_chars+offset) * horizontal_step) + "px";
}

function parseCommand(str) {
  var newStr = str.substring(startupLen, str.length);
  newStr = newStr.replace("\n", "");
  return newStr;
}

var throttled = false;

window.addEventListener('resize', function() {
	// only run if we're not throttled
if (!throttled) {
	// actual callback action
	activateOnResize();
	// we're throttled!
	throttled = true;
	// set a timeout to un-throttle
	setTimeout(function() {
		throttled = false;
	}, 100);
}  
});

function activateOnResize() {
	setHeight();
	set_cursor_position();
	optimizeBarBtn2();
	optimizeFooter();
}

activateOnResize();

window.addEventListener("keydown", function (e) {

	if (focused) {
		console.log(fakeTextarea.value)
		if (e.key == "Backspace") {
	
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
	
			} else {
						console.log("outside");
			}
	
		} else if (e.key == "Enter") {
	
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
	
		} else if (e.key == "ArrowRight") {
	
			if (offset < 0) {
				offset++;
			}
	
		} else if (e.key == "ArrowLeft") {
			
			if (chars > 0 && Math.abs(offset) < chars) {
				offset--;
			}
			
		} else if (e.key == "ArrowDown") {
	
			offset = 0;
	
		} else {
	
			console.log("Else Keys not implemented");
	
		}
	}

  set_cursor_position();

  console.log("chars: " + chars);
  console.log("lchars: " + local_chars);
  console.log("offset: " + offset);
  console.log("lines: " + lines);
  console.log("max_length: " + max_length);
})