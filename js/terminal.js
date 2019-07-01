var max_length = 0;
var chars = 0;
var lines = 0;
var code = 0;

var startupLen = 0;
var startupText = "root@klauscipi.dev $ ";

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
			
			if (typed != null) { 
				letters(typed);
			} else {
				if (code == 13) { 
					enter();
				} else { 
					backspace();
				}
			}
		})
	}

	document.getElementById("window").style.boxShadow = "15px 15px 40px #000000";
	fakeTextarea.focus();
	focused = true;
}

window.addEventListener("keydown", function (e) { code = e.keyCode || e.which; })

function backspace() {
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
}

function enter() {
	var old_line = document.getElementById('const').textContent;
	var command = old_line.substring(startupLen, old_line.length).replace("\n", "");
	var response = analyzeCommand(command);

	var history = document.getElementById('history');
	var newDiv = document.createElement("DIV");
	newDiv.style.whiteSpace = "pre-wrap";
	newDiv.innerHTML = old_line + "\n" + response;
	history.append(newDiv);

	document.getElementById('const').innerHTML = old_line.substring(0, startupLen);
	fakeTextarea.value = "";
	chars = startupLen;
	lines = 0;

	updateScroll();
}

function letters(key) {
	document.getElementById('const').innerHTML = document.getElementById('const').textContent + key;
	chars++;

	if (chars == max_length) {
		document.getElementById('const').innerHTML = document.getElementById('const').textContent + "\n";
		chars = 0;
		lines++;
	}

	updateScroll();
}

function updateScroll(){
    var element = document.getElementById("terminal");
    element.scrollTop = element.scrollHeight;
}

function analyzeCommand(command) {
	if (command.length > 0) {
		var tokens = command.split(" ");
		var validation = argValidation(tokens);
		if (validation != "valid") { return validation; }

		switch (tokens[0]) {
			case "more":
				return more(tokens);
			case "list":
				return list(tokens);
			case "download":
				return download(tokens);
			case "play":
				return play(tokens);
			case "help":
				return help();
			case "man":
				return man(tokens);
			default:
				return error(command);
		}

	} else {
		return "";
	}
}

function more(tokens) {
	return "more: error: command not implemented! " + str.link("https://klauscipi.dev");
}
function list(tokens) {
	return "list: error: command not implemented!";
}
function download(tokens) {
	return "download: error: command not implemented!";
}
function play(tokens) {
	return "play: error: command not implemented!";
}
function help() {
	var response = "";
	for(key in commands) {
		response += man(["man", key]);
	}
	return response;
}
function man(tokens) {
	if (commands[tokens[1]] == undefined) { return "error: manual not available for \""+ tokens[1] + "\"."; }
	var response = tokens[1] + " :- " + commands[tokens[1]]["description"] + "\n"
					+ "Usage: ";
	var argList = commands[tokens[1]]["commands"]
	if (argList == undefined) { response += tokens[1] + "\n"; return response; }
	for (var i = 0; i < argList.length; i++) {
		response += "\t" + tokens[1] + " " + argList[i] + "\n";
	}
	return response;
}
function error(command) {
	return command + ": command not found!"
}

function argValidation(tokens) {
	if (commands[tokens[0]] == undefined) { return error(tokens[0]); }
	var min = commands[tokens[0]]["arg-min"];
	var max = commands[tokens[0]]["arg-max"];
	var args = tokens.length - 1;

	if (args >= min && args <= max) {
		return "valid";
	} else {
		var acceptedArgs = "";
		for(var i = min; i <= max; i++) {
			if (i != max) { acceptedArgs += i + " or "; } else { acceptedArgs += i; }
		}
		if (acceptedArgs.length > 1) { acceptedArgs += " arguments"; } else { acceptedArgs += " argument"; }

		return tokens[0] + ": error: expected " + acceptedArgs + ", given " + args;
	}
}