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

let changelog = `<h1>Changelog:</h1><br>
	<br><h3>v2.2: Advances in Science</h3><br>
		- Added molecules.<br>
		- Added fourteen milestones to molecules.<br>
		- Added eight upgrades to molecules.<br>
		- Added three milestones to sanctums.<br>
		- Added achievement colors.<br>
		- Added eight achievements.<br>
		- Added five achievement images.<br>
		- More things coming soon!<br>
	<br><h3>v2.1: Relics of Light</h3><br>
		- Added relics.<br>
		- Added one custom challenge to relics.<br>
		- Added so, so many milestones to sanctums.<br>
		- Added three custom buyables to sanctums.<br>
		- Added two milestones to atoms.<br>
		- Added four achievements.<br>
		- Added eight achievement images.<br>
		- Added nerd mode.<br>
	<br><h3>v2.0: Sanctums of Color</h3><br>
		- Added sanctums.<br>
		- Added ten milestones to sanctums.<br>
		- Added four upgrades to prayers.<br>
		- Added six researchable upgrades to prayers.<br>
		- Added four achievements.<br>
		- Added custom colored text. Vibing!<br>
		- Added two options.<br>
	<br><h3>v1.5: Creativity Rules</h3><br>
		- Added one milestone to atoms.<br>
		- Added six upgrades to prayers.<br>
		- Added two achievements.<br>
		- Added twenty-seven achievement images.<br>
		- Changed 'best' and 'total' format.<br>
		- Finally fixed the buyable format bug.<br>
	<br><h3>v1.4: Praise the Sky</h3><br>
		- Added prayers.<br>
		- Added three milestones to prayers.<br>
		- Added twelve upgrades to prayers.<br>
		- Added one milestone to atoms.<br>
		- Added four achievements.<br>
	<br><h3>v1.3: Atomic Measure</h3><br>
		- Added atoms.<br>
		- Added twelve milestones to atoms.<br>
		- Added fourteen upgrades to atoms.<br>
		- Added one challenge to demon souls.<br>
		- Added six achievements.<br>
	<br><h3>v1.2: Demon Gateway</h3><br>
		- Added demonic gateway.<br>
		- Added two milestones to demon souls.<br>
		- Added one upgrade to demon souls.<br>
		- Added three challenges to demon souls.<br>
		- Added twelve achievements.<br>
		- Reformatted all tabs.<br>
	<br><h3>v1.1: Demonic Faith</h3><br>
		- Added demon souls.<br>
		- Added seven milestones to demon souls.<br>
		- Added two upgrades to demon souls.<br>
		- Added one buyable to demon souls.<br>
		- Added four upgrades to hexes.<br>
		- Added seven achievements.<br>
		- Renamed most achievements.<br>
		- Achievements now boost point gain.<br>
	<br><h3>v1.0: Variety Rules</h3><br>
		- Added one milestone to hexes.<br>
		- Added eight upgrades to hexes.<br>
		- Added one milestone to subatomic particles.<br>
		- Added three upgrades to subatomic particles.<br>
		- Added one milestone to cores.<br>
		- Added six upgrades to cores.<br>
		- Added three achievements.<br>
	<br><h3>v0.7: The Hex Game</h3><br>
		- Added hexes.<br>
		- Added eight milestones to hexes.<br>
		- Added twelve upgrades to hexes.<br>
		- Added one achievement.<br>
	<br><h3>v0.6: Subatomic Layer</h3><br>
		- Added subatomic particles.<br>
		- Added five milestones to subatomic particles.<br>
		- Added three buyables to subatomic particles.<br>
		- Added five upgrades to quarks.<br>
		- Added two achievements.<br>
	<br><h3>v0.5: How Many Miles</h3><br>
		- Added three milestones to cores.<br>
		- Added three milestones to quarks.<br>
		- Added eight achievements.<br>
	<br><h3>v0.4: To Infinity</h3><br>
		- Added five more upgrades to essence.<br>
		- Added another buyable to essence.<br>
		- Added twelve more upgrades to quarks.<br>
	<br><h3>v0.3: Quark Addition</h3><br>
		- Added quarks.<br>
		- Added three upgrades to cores.<br>
		- Added three upgrades to quarks.<br>
	<br><h3>v0.2: Core Update</h3><br>
		- Added cores.<br>
		- Added two buyables to cores.<br>
	<br><h3>v0.1: Game Launch</h3><br>
		- Game Launch.<br>
		- Added six upgrades.<br>
		- Added a buyable.`;

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

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints);
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
