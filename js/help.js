let help_data = {
	e: {
		id: "e",
		title: "Essence",
		text: "Do resets, buy Essence Upgrades & Buyables, and let your Points grow. 
		There really isn't much to this phase of the game.",
		unlocked() { return true },
	},
	c: {
		id: "c",
		title: "Cores",
		text: "Once you unlock Cores, buy one of each buyable first. 
		Then, keep building up your essence and buying more Core buyables (the second one has a harsher cost scaling, but is better than the first one.) 
		Once you unlock Core upgrades, don't buy them right away. 
		Keep building up your Essence and Cores until you have over twice as much the cost. 
		Once you get enough Essence to unlock Quarks, don't get it right away. 
		Buy the third core upgrade first, as it increases Quark gain.",
		unlocked() { if (hasAchievement("A", 31)) return true },
	},
	q: {
		id: "q",
		title: "Quarks",
		text: "It is best to build up to gaining 5 Quarks before doing a quark reset, so you unlock the new essence upgrades. 
		This also allows you to buy Quark Power and subsequent upgrades, with 2 quarks remaining. 
		After that, just keep building up Essence and Cores, and unlock new Essence and Quark upgrades. 
		When you get close to getting a milestone, keep pushing a but more to get it, because their effects are extremely useful. 
		As soon as you unlock Subatomic Particles, you should perform a Subatomic Particle reset. 
		Grinding more Quarks is usless until you get to buy max Subatomic Particles.",
		unlocked() { if (hasAchievement("A", 41)) return true },
	},
},
