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

const DISPLAY_MODE_INDEX = [0, 1, 2, 3];

const COLOR_DISPLAYS = ["ON - NORMAL", "ON - ALWAYS DARK", "OFF"];

const COLOR_DISPLAY_INDEX = [0, 1, 2];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % 5];
};

function display_mode() {
	options.colorDisplayMode = DISPLAY_MODE_INDEX[(DISPLAY_MODE_INDEX.indexOf(options.colorDisplayMode) + 1) % 4];
};

function color_display() {
	options.colorDisplay = COLOR_DISPLAY_INDEX[(COLOR_DISPLAY_INDEX.indexOf(options.colorDisplay) + 1) % 3];
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
	colorvalue = [[false, false, false], "none"];
	switch (options.colorDisplayMode) {
		case 0:
			colorvalue[0] = [true, true, true];
		case 1:
			colorvalue[0] = [true, false, false];
		case 2:
			colorvalue[0] = [true, true, false];
		case 3:
			colorvalue[0] = [true, false, true];
	};
	switch (options.colorDisplay) {
		case 0:
			colorvalue[1] = "normal";
		case 1:
			colorvalue[1] = "dark";
		case 2:
			colorvalue[1] = "none";
	};
	return colorvalue;
};
