let options = {};

function getStartOptions() {
	return {
		autosave: true,
		msDisplay: "always",
		theme: "default",
		hqTree: false,
		offlineProd: true,
		hideChallenges: false,
		showStory: true,
		forceOneTab: false,
		oldStyle: false,
		tooltipForcing: true,
		colorDisplayMode: 0,
		colorDisplay: 0,
	};
};

function toggleOpt(name) {
	if (name == "oldStyle" && styleCooldown > 0)
		return;
	options[name] = !options[name];
	if (name == "hqTree")
		changeTreeQuality();
	if (name == "oldStyle")
		updateStyle();
};

var styleCooldown = 0;

function updateStyle() {
	styleCooldown = 1;
	let css = document.getElementById("styleStuff");
	css.href = options.oldStyle ? "oldStyle.css" : "style.css";
	needCanvasUpdate = true;
};

function changeTreeQuality() {
	var on = options.hqTree;
	document.body.style.setProperty('--hqProperty1', on ? "2px solid" : "4px solid");
	document.body.style.setProperty('--hqProperty2a', on ? "-4px -4px 4px rgba(0, 0, 0, 0.25) inset" : "-4px -4px 4px rgba(0, 0, 0, 0) inset");
	document.body.style.setProperty('--hqProperty2b', on ? "0px 0px 20px var(--background)" : "");
	document.body.style.setProperty('--hqProperty3', on ? "2px 2px 4px rgba(0, 0, 0, 0.25)" : "none");
};

function toggleAuto(toggle) {
	Vue.set(player[toggle[0]], [toggle[1]], !player[toggle[0]][toggle[1]]);
	needCanvasUpdate = true;
};

const MS_DISPLAYS = ["ALL", "LAST, AUTO, INCOMPLETE", "AUTOMATION, INCOMPLETE", "INCOMPLETE", "NONE"];

const MS_SETTINGS = ["always", "last", "automation", "incomplete", "never"];

const DISPLAY_MODES = ["ALL", "ONLY SPECIAL", "SPECIAL AND TITLES", "SPECIAL AND REFRENCES"];

const COLOR_DISPLAYS = ["ON - NORMAL", "ON - ALWAYS DARK", "OFF"];

var colorvalue = [[true, true, true], "normal"];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % 5];
};

function display_mode() {
	console.log(colorvalue[0] + " [" + colorvalue[1] + "]");
	options.colorDisplayMode += 1;
	if (options.colorDisplayMode >= 4) options.colorDisplayMode = 0;
};

function color_display() {
	console.log(colorvalue[0] + " [" + colorvalue[1] + "]");
	options.colorDisplay += 1;
	if (options.colorDisplay >= 3) options.colorDisplay = 0;
};

function milestoneShown(layer, id) {
	complete = player[layer].milestones.includes(id);
	auto = layers[layer].milestones[id].toggles;
	switch (options.msDisplay) {
		case "always":
			return true;
		case "last":
			return (auto) || !complete || player[layer].lastMilestone === id;
		case "automation":
			return (auto) || !complete;
		case "incomplete":
			return !complete;
		case "never":
			return false;
	};
	return false;
};

function fullcolordisplay() {
	console.log(colorvalue[0] + " [" + colorvalue[1] + "]");
	switch (options.colorDisplayMode) {
		case 0:
			console.log(0);
			colorvalue[0] = [true, true, true];
			break;
		case 1:
			console.log(1);
			colorvalue[0] = [true, false, false];
			break;
		case 2:
			console.log(2);
			colorvalue[0] = [true, true, false];
			break;
		case 3:
			console.log(3);
			colorvalue[0] = [true, false, true];
			break;
	};
	switch (options.colorDisplay) {
		case 0:
			console.log(4);
			colorvalue[1] = "normal";
			break;
		case 1:
			console.log(5);
			colorvalue[1] = "dark";
			break;
		case 2:
			console.log(6);
			colorvalue[1] = "none";
			break;
	};
};
