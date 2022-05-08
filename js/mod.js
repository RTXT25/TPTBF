let modInfo = {
	name: 'The Primordial Tree',
	id: 'Yrahcaz7-ModTree-ThePrimordialTree',
	author: 'Yrahcaz7',
	pointsName: 'points',
	modFiles: ['layers.js', 'tree.js'],
	initialStartPoints: new Decimal(0),
	offlineLimit: 1, // In hours
};

let VERSION = {
	num: '2.2',
	name: 'Advances in Science',
};

let winText = '<h3>You won the game!</h3><br>However, it isn\'t the end yet...<br>Wait for more updates for further content.';

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
function getdark(darkthis, type, special = false, research = false){
	if (darkthis.layer !== undefined) {
		if (colorvalue[1] == 'dark') return '-dark">';
		if (colorvalue[1] == 'none') return '-OFF">';
		if ((type == 'title' && colorvalue[0][1]) || (type == 'ref' && colorvalue[0][2])) {
			if (research) return '">';
			else {
				if (special) darkcanafford = darkthis.canAfford();
				else darkcanafford = player[darkthis.layer].points.gte(darkthis.cost);
				if (darkcanafford && !hasUpgrade(darkthis.layer, darkthis.id)) return '-dark">';
			};
		} else if (type == 'title-light' && colorvalue[0][1]) {
			if (special) darkcanafford = darkthis.canAfford();
			else darkcanafford = player[darkthis.layer].points.gte(darkthis.cost);
			if (darkcanafford && !hasUpgrade(darkthis.layer, darkthis.id)) return '-dark">';
			return '-light">';
		} else if (type == 'title-buyable' && colorvalue[0][1]) {
			darkcanafford = darkthis.canAfford();
			if (darkcanafford && getBuyableAmount(darkthis.layer, darkthis.id).lt(darkthis.purchaseLimit)) return '-dark">';
		} else return '-OFF">'
	};
	return '">';
};

// Determines if it should show points/sec
function canGenPoints(){
	return true;
};

// Calculate points/sec!
function getPointGen(forced = false) {
	let gain = new Decimal(1);
	if (hasUpgrade('e', 11)) gain = gain.mul(1.5);
	if (hasUpgrade('e', 12)) {
		gain = gain.mul(upgradeEffect('e', 12));
		if (hasUpgrade('e', 33)) gain = gain.mul(upgradeEffect('e', 33));
	};
	if (hasUpgrade('e', 21)) {
		gain = gain.mul(upgradeEffect('e', 21));
		if (hasUpgrade('e', 23)) {
			gain = gain.mul(upgradeEffect('e', 23));
			if (hasUpgrade('e', 31)) gain = gain.mul(upgradeEffect('e', 31));
	}};
	if (hasUpgrade('e', 32) && getBuyableAmount('e', 12).gt(0)) gain = gain.mul(upgradeEffect('e', 32));
	if (hasUpgrade('q', 12)) {
		gain = gain.mul(upgradeEffect('q', 12));
		if (hasUpgrade('q', 13)) gain = gain.mul(upgradeEffect('q', 13));
	};
	if (hasUpgrade('q', 34)) {
		gain = gain.mul(upgradeEffect('q', 34));
		if (hasUpgrade('q', 35)) {
			gain = gain.mul(upgradeEffect('q', 35));
			if (hasUpgrade('q', 41)) gain = gain.mul(upgradeEffect('q', 41));
	}};
	if (hasUpgrade('h', 11)) {
		gain = gain.mul(upgradeEffect('h', 11));
		if (hasUpgrade('h', 21)) {
			gain = gain.mul(upgradeEffect('h', 21));
			if (hasUpgrade('h', 31)) {
				gain = gain.mul(upgradeEffect('h', 31));
				if (hasUpgrade('h', 41)) gain = gain.mul(upgradeEffect('h', 41));
	}}};
	if (hasUpgrade('p', 72)) gain = gain.mul(upgradeEffect('p', 72));
	if (getBuyableAmount('c', 11).gt(0)) gain = gain.mul(getBuyableAmount('c', 11).mul(5).add(1));
	if (getBuyableAmount('sp', 21).gt(0)) {
		gain = gain.mul(new Decimal(5).pow(getBuyableAmount('sp', 21)));
		if (hasUpgrade('sp', 13)) gain = gain.mul(new Decimal(5).pow(getBuyableAmount('sp', 21)));
	};
	if (getBuyableAmount('sp', 12).gt(0)) gain = gain.mul(getBuyableAmount('sp', 12).add(1).pow(-1));
	if (player.p.divinity.gt(0)) gain = gain.mul(player.p.divinity.add(1).pow(0.1));
	if (challengeCompletions('r', 11) >= 2) gain = gain.mul(player.r.essencemult);
	if (hasUpgrade('ds', 21) && hasUpgrade('ds', 24)) gain = gain.mul(player.A.points.mul(0.2));
	else gain = gain.mul(player.A.points.mul(0.1).add(1));
	if (inChallenge('ds', 11)) gain = gain.mul(0.0001);
	if (inChallenge('ds', 12)) gain = gain.mul(0.000001);
	if (inChallenge('ds', 21)) gain = gain.mul(0.0000000001);
	if (inChallenge('ds', 22)) gain = gain.mul(0.0000000001);
	if (inChallenge('r', 11) && !forced) gain = new Decimal(0);
	return gain;
};

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	nerdMode: false,
}};

// Display extra things at the top of the page
var displayThings = [
];

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal('ee16'));
};

// Style for the background, can be a function
var backgroundStyle = {
};

function maxTickLength() {
	return 1; // In seconds
};

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
};
