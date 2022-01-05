let modInfo = {
	name: "The Primoridial Tree",
	id: "Yrahcaz7-ModTree-NewGame",
	author: "Yrahcaz7",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "Variety Rules",
}

let changelog = `<h1>Changelog:</h1><br>
	<br><h3>v1.0: Variety Rules</h3><br>
		- Added one milestone to hexes.<br>
		- Added six upgrades to hexes.<br>
		- Added one milestone to subatomic particles.<br>
		- Added three upgrades to subatomic particles.<br>
		- Added one milestone to cores.<br>
		- Added six upgrades to cores.<br>
		- Balance changes.<br>
	<br><h3>v0.7: The Hex Game</h3><br>
		- Added hexes.<br>
		- Added eight milestones to hexes.<br>
		- Added twelve upgrades to hexes.<br>
		- Balance changes.<br>
	<br><h3>v0.6: Subatomic Layer</h3><br>
		- Added subatomic particles.<br>
		- Added three buyables to subatomic particles.<br>
		- Added five milestones to subatomic particles.<br>
		- Added five upgrades to quarks.<br>
		- Balance changes.<br>
	<br><h3>v0.5: How Many Miles</h3><br>
		- Added three milestones to cores.<br>
		- Added three milestones to quarks.<br>
		- Balance changes.<br>
	<br><h3>v0.4: To Infinity</h3><br>
		- Added five more upgrades to essence.<br>
		- Added another buyable to essence.<br>
		- Added twelve more upgrades to quarks.<br>
		- Balance changes.<br>
	<br><h3>v0.3: Quark Addition</h3><br>
		- Added quarks.<br>
		- Added three upgrades to cores.<br>
		- Added three upgrades to quarks.<br>
		- Balance changes.<br>
	<br><h3>v0.2: Core Update</h3><br>
		- Added cores.<br>
		- Added two buyables to cores.<br>
		- Balance changes.<br>
	<br><h3>v0.1: Game Launch</h3><br>
		- Game Launch.<br>
		- Changed layer 'e' exponent.<br>
		- Added six upgrades.<br>
		- Added a buyable.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('e', 11)) gain = gain.times(1.5)
	if (hasUpgrade('e', 12)) gain = gain.times(upgradeEffect('e', 12))
		if (hasUpgrade('e', 33)) gain = gain.times(upgradeEffect('e', 33))
	if (hasUpgrade('e', 21)) gain = gain.times(upgradeEffect('e', 21))
		if (hasUpgrade('e', 23)) gain = gain.times(upgradeEffect('e', 31))
			if (hasUpgrade('e', 31)) gain = gain.times(upgradeEffect('e', 23))
	if (hasUpgrade('e', 43)) mult = mult.times(upgradeEffect('e', 43))
	if (hasUpgrade('e', 51)) mult = mult.times(upgradeEffect('e', 51))
	if (hasUpgrade('e', 53)) mult = mult.times(upgradeEffect('e', 53))
	if (hasUpgrade('e', 61)) mult = mult.times(upgradeEffect('e', 61))
		if (hasUpgrade('e', 62)) mult = mult.times(upgradeEffect('e', 62))
	if (hasUpgrade('q', 12)) mult = mult.times(upgradeEffect('q', 12))
		if (hasUpgrade('q', 13)) mult = mult.times(upgradeEffect('q', 13))
	if (hasUpgrade('q', 34)) mult = mult.times(upgradeEffect('q', 34))
		if (hasUpgrade('q', 35)) mult = mult.times(upgradeEffect('q', 35))
			if (hasUpgrade('q', 41)) mult = mult.times(upgradeEffect('q', 41))
	if (hasUpgrade('h', 11)) mult = mult.times(upgradeEffect('h', 11))
		if (hasUpgrade('h', 21)) mult = mult.times(upgradeEffect('h', 21))
			if (hasUpgrade('h', 31)) mult = mult.times(upgradeEffect('h', 31))
				if (hasUpgrade('h', 41)) mult = mult.times(upgradeEffect('h', 41))
	gain = gain.times(2.5 * getBuyableAmount('c', 11) + 1)
	gain = gain.times(5 ** getBuyableAmount('sp', 21))
	if (hasUpgrade("sp", 13)) gain = gain.times(5 ** getBuyableAmount('sp', 21))
	gain = gain.times(((getBuyableAmount('sp', 12) * 1) + 1) ** -1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
