var startupLen = 0;
var max_length = 0;
var chars = 0;
var lines = 0;
var code = 0;

var fakeTextarea = undefined;

function focusOnTerminal(){

	if (fakeTextarea == undefined) {
		
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
		var tokens = command.toLowerCase().split(" ");
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
			case "clear":
				return clear();
			default:
				return error(command);
		}

	} else {
		return "";
	}
}

//TODO :: Add games
function play(tokens) {
	return "play: error: command not implemented!";
}
function list(tokens) {
	if (tokens.length == 2) {

		switch(tokens[1]) {
			case "contacts":
				var response = "";
				for (key in resume["contacts"]) {
					if (key == "Email") {
						response += resume["contacts"][key].substring(7,resume["contacts"][key].length).link(resume["contacts"][key]) + "\n";
					} else if (key == "Phone Number") {
						response += resume["contacts"][key] + "\n";
					} else {
						response += resume["contacts"][key].link(resume["contacts"][key]) + "\n";
					}
				}
				return response;			
			case "skills":
				return "Programming languages: " + formatListHorizontal(resume["skills"]["languages"])
						+ "Concepts: " + formatListHorizontal(resume["skills"]["concepts"])
						+ "Tools: " + formatListHorizontal(resume["skills"]["tools"]);
			case "awards":
				var response = "";
				for(var i = 0; i < resume["awards"].length; i++) {
					if (i != 0) { response += "\n"; }
					response += "Award: " + resume["awards"][i]["name"] + "\n"
								+ "Academic Level: " + resume["awards"][i]["level"] + "\n"
								+ "Description: " + resume["awards"][i]["description"] + "\n"
								+ "Date Received: " + resume["awards"][i]["date"] + "\n"; 
				}
				return response;	
			case "experiences":
				var response = "";
				for (var i = 0; i < resume["experiences"].length; i++) {
					response +=  resume["experiences"][i]["reference"] + "\n";
				}
				return response;			
			case "projects":
				var response = "";
				for (var i = 0; i < resume["projects"].length; i++) {
					response +=  resume["projects"][i]["reference"] + "\n";
				}
				return response;		
			case "education":
				var response = "";
				for(var i = 0; i < resume["education"].length; i++) {
					if (i != 0) { response += "\n"; }
					response += "Institution: " + resume["education"][i]["name"] + "\n"
								+ "Academic Level: " + resume["education"][i]["level"] + "\n"
								+ "Location: " + resume["education"][i]["location"] + "\n"
								+ "Start Date: " + resume["education"][i]["start"] + "\n"
								+ "End Date: " + resume["education"][i]["end"] + "\n"
								+ "Overall Grade: " + resume["education"][i]["grade"] + "\n"
								+ "Degree: " + resume["education"][i]["degree"] + "\n"; 
				}
				return response;	
			case "courses":
				return formatListVertical(resume["courses"]);
			case "games":
				return formatListVertical(commands["play"]["commands"]);
			default:
				return error(tokens[0] + " " + tokens[1]);
		}

	} else {

		if (tokens[1] == "-a") {

			switch (tokens[2]) {
				case "projects":
					var response = "";
					for(var i = 0; i < resume["projects"].length; i++) {
						if (i != 0) { response += "\n"; }
						response += formatProjects(resume["projects"][i]);
					}
					return response;
				case "experiences":
					var response = "";
					for(var i = 0; i < resume["experiences"].length; i++) {
						if (i != 0) { response += "\n"; }
						response += formatExperiences(resume["experiences"][i]);
					}
					return response;
				default:
					return error(tokens[0] + " " + tokens[1] + " " + tokens[2]);
			}
		} else {
			var jsonObj = objExists(resume["projects"], tokens[1]);
			if (jsonObj == undefined) { return tokens[1] + ": error: project not found!"; }
	
			switch(tokens[2]) {
				case "files":
					var response = "";
					for (var i = 0; i < jsonObj["files"].length; i++) {
						response += jsonObj["files"][i].substring(jsonObj["files"][i].lastIndexOf("/") + 1, jsonObj["files"][i].length).link(jsonObj["files"][i]) + "\n";
					}
					return response;	
				case "technologies":
						return formatListVertical(jsonObj["tech"]);
				case "members":
					return formatListVertical(jsonObj["members"]);
				default:
					return error(tokens[0] + " " + tokens[1] + " " + tokens[2]);
			}
		}
	}
}
function more(tokens) {
	switch (tokens[1]) {
		case "-p":
			var jsonObj = objExists(resume["projects"], tokens[2]);
			if (jsonObj == undefined) { return tokens[2] + ": error: project not found!"; }
			return formatProjects(jsonObj);
		case "-e":
			var jsonObj = objExists(resume["experiences"], tokens[2]);
			if (jsonObj == undefined) { return tokens[2] + ": error: experience not found!"; }
			return formatExperiences(jsonObj);
		default:
			return error(tokens[0] + " " + tokens[1]);
	}
}
function download(tokens) {
	if (tokens[1] == "resume") {
		return "Download here".link("https://klauscipi.dev/docs/resume.pdf");
	} else {
		return error(tokens[0] + " " + tokens[1]);
	}
}
function clear(){
	document.getElementById('history').innerHTML = "";
	return "";
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
	return command + ": error: command not found!"
}

function formatProjects(obj) {
	var response =    "REFERENCE NAME: " + obj["reference"] + "\n"
					+ "Project Name: " + obj["name"] + "\n"
					+ "Ownership: " + obj["level"] + "\n"
					+ "Date: " + obj["date"] + "\n"
					+ "Duration: " + obj["duration"] + "\n"
					+ "Description: " + obj["description"] + "\n"
					+ "Tools: " + formatListHorizontal(obj["tech"])
					+ "Members: " + formatListHorizontal(obj["members"]);
	if (obj["files"].length > 0) {
		response += "Files: ";
		for (var i = 0; i < obj["files"].length; i++) {
			response += "\t" + obj["files"][i].substring(obj["files"][i].lastIndexOf("/") + 1, obj["files"][i].length).link(obj["files"][i]) + "\n";
		}
	}
	response += "URL: " + obj["url"].link(obj["url"]) + "\n"
			 + "Status: " + obj["status"] + "\n";
	return response;
}
function formatExperiences(obj) {
	var response =    "REFERENCE NAME: " + obj["reference"] + "\n"
					+ "Company: " + obj["company"] + "\n"
					+ "Title: " + obj["title"] + "\n"
					+ "Start date: " + obj["start"] + "\n"
					+ "End date: " + obj["end"] + "\n"
					+ "Duration: " + obj["duration"] + "\n"
					+ "Responsibilities: " + formatListVertical(obj["responsibilities"]);
	if (obj["files"].length > 0) {
		response += "Files: ";
		for (var i = 0; i < obj["files"].length; i++) {
			response += "\t" + obj["files"][i].substring(obj["files"][i].lastIndexOf("/") + 1, obj["files"][i].length).link(obj["files"][i]) + "\n";
		}
	}
	return response;
}
function formatListHorizontal(array) {
	var formatted = "";
	for (var i = 0; i < array.length; i++) {
		if (i == 0) {
			formatted += array[i];
		} else {
			formatted += ", " + array[i];
		}
	}
	return formatted + ".\n";
}

function formatListVertical(array) {
	var formatted = "";
	for (var i = 0; i < array.length; i++) {
		formatted += array[i] + "\n";
	}
	return formatted;
}

function objExists(obj, comp) {
	for (var i = 0; i < obj.length; i++) {
		if (obj[i]["reference"] == comp){
			return obj[i];
		}
	}
	return undefined;
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