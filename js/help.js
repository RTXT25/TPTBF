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
		Then, keep building up your essence and buying more Core buyables. 
		(the second one has a harsher cost scaling, but it's effect multiplies itself.) 
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
	sp: {
		id: "sp",
		title: "Subatomic Particles",
		text: "Buy one of the buyable Neutrons, first. 
		Next, push your way back up, and then buy either a Proton or an Electron. 
		Then, either buy the other one, or keep pushing to get 2 Subatomic Particles. 
		After that, keep repeating the previous steps. 
		When you get 3 Subatomic Particles, make sure to buy the new quark upgrades when you can. 
		If you get all of the buyables up to when they cost 6, then you can either buy them again, or try to unlock Hexes. 
		Either option will need a bit of grinding (or leaving and coming back later) to get.",
		unlocked() { if (hasAchievement("A", 51)) return true },
	},
	h: {
		id: "h",
		title: "Hexes",
		text: "In this part, what you need to do for the most part is just grind and push to unlock milestones and new upgrades. 
		You should get at least the 5 Hexes from resetting the first time to unlock the first milestone. 
		When you unlock the last Hex milestone, be sure to go purchase the new Core upgrades when you can. 
		The first one should be easy to get. 
		After you get the Core Continuation upgrade and all of the new Core upgrades, you won't have to check Cores for a while. 
		Then it's back to grinding. 
		Also, once in a while you'll want to go back to Subatomic Particles to check if you can get some more of the buyables. 
		Once you get get the Sub Core Particle Fusion upgrade, you should go and buy all of the new upgrades when you can. 
		When you get 1e60 Hexes, either do a Demon Souls reset, or get the Hexed Subatomic Particle upgrade. 
		If you pick the latter, be sure to make use of the upgrade and get more Subatomic Particles when you can. 
		Then, you should try to unlock the highest milestone you can from the reset.",
		unlocked() { if (hasAchievement("A", 61)) return true },
	},
	ds: {
		id: "ds",
		title: "Demon Souls",
		text: "For Demon Souls, always buy upgrades and Demonic Energy when you can. 
		Gradually unlock more milestones, and keep more things when you reset. 
		When you purchase Mad Hexes or Hex Mania, make sure to buy the newly unlocked upgrades when you have enough. 
		They might not seem worth it, but the upgrades are very good, because they increase the automated essence gain. 
		This, it turn, boosts all of your production, on both branches of the tree. 
		Then, you keep grinding until you can buy the Demonic Key and unlock the Demon Gateway.
		When you unlock Demon Gateway, you probably can complete Blazing Curse in a reasonable amount of time. 
		Or, first you can max out Demonic Energy, if you haven't already done so. 
		After you complete the first challenge, try the next one. 
		Exit it and buy more upgrades if you can't complete it within a reasonable time frame.
		Continue with this process until you complete all the challenges.",
		unlocked() { if (hasAchievement("A", 71)) return true },
	},
},
