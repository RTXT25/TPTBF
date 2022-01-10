addLayer("A", {
    name: "Achievements",
    symbol: "A",
    position: 0,
    startData() { return {
        unlocked: true,
    }},
    color: "#A5BCC2",
    row: "side",
    layerShown() {return true},
    tooltip() {return "Achievements"},
    tabFormat: [
        ["display-text",
            function() { if (!hasUpgrade("ds", 24)) return 'You have ' + player.A.achievements.length + ' achievements,<br>which are multiplying your point gain by ' + (Math.round(100 * (player.A.achievements.length * 0.1 + 1)) / 100) + 'x'},
            { "color": "white", "font-size": "16px", "font-family": "Lucida Console" }],
        ["display-text",
            function() { if (hasUpgrade("ds", 21) && !hasUpgrade("ds", 24)) return 'and also multiplying essence gain by ' + (Math.round(100 * (player.A.achievements.length * 0.2)) / 100) + 'x'},
            { "color": "white", "font-size": "16px", "font-family": "Lucida Console" }],
        ["display-text",
            function() { if (hasUpgrade('ds', 24)) return 'You have ' + player.A.achievements.length + ' achievements,<br>which are multiplying your point and essence gain by ' + (Math.round(100 * (player.A.achievements.length * 0.2)) / 100) + 'x'},
            { "color": "white", "font-size": "16px", "font-family": "Lucida Console" }],
        ["display-text",
            function() { if (hasUpgrade("ds", 23) && !hasUpgrade("ds", 24)) return 'addtionally, also multiplying core and quark gain by ' + (Math.round(100 * (player.A.achievements.length ** 2)) / 10000) + 'x'},
            { "color": "white", "font-size": "16px", "font-family": "Lucida Console" }],
        ["display-text",
            function() { if (hasUpgrade("ds", 23) && hasUpgrade("ds", 24)) return 'and also multiplying core and quark gain by ' + (Math.round(100 * (player.A.achievements.length ** 2)) / 10000) + 'x'},
            { "color": "white", "font-size": "16px", "font-family": "Lucida Console" }],
        ["display-text",
            function() { if (hasUpgrade('a', 51)) return 'additionally, also multiplying subatomic particle gain by ' + (Math.round(100 * (player.A.achievements.length ** 3)) / 10000) + 'x'},
            { "color": "white", "font-size": "16px", "font-family": "Lucida Console" }],
        "blank",
        "achievements",
    ],
    achievements: {
        11: {
            name: "The Point",
            done() {return player.points >= 1},
            tooltip: "obtain 1 point.",
        },
        12: {
            name: "Very Pointy",
            done() {return player.points >= (10 ** 10)},
            tooltip: "obtain 1e10 points.",
            unlocked() { if (hasAchievement("A", 11)) return true },
        },
        13: {
            name: "Now That's Really Pointy",
            done() {return player.points >= (10 ** 100)},
            tooltip: "obtain 1e100 points.",
            unlocked() { if (hasAchievement("A", 12)) return true },
        },
        14: {
            name: "The Sharpest Point",
            done() {return player.points >= (new Decimal(1e1000))},
            tooltip: "obtain 1e1,000 points.",
            unlocked() { if (hasAchievement("A", 13)) return true },
        },
        16: {
            name: "Dull Points",
            done() {return player["e"].points <= 0.1 && player.points >= (10 ** 10)},
            tooltip: "obtain 1e10 points with no essence.",
            unlocked() { if (hasAchievement("A", 12) && hasAchievement("A", 21)) return true },
        },
        21: {
            name: "Essence of Rat",
            done() {return player["e"].points >= 1},
            tooltip: "obtain 1 essence.",
            unlocked() { if (hasAchievement("A", 21)) return true },
        },
        22: {
            name: "Shining Essence",
            done() {return player["e"].points >= (10 ** 10)},
            tooltip: "obtain 1e10 essence.",
            unlocked() { if (hasAchievement("A", 21)) return true },
        },
        23: {
            name: "Gleaming, Golden Essence",
            done() {return player["e"].points >= (10 ** 100)},
            tooltip: "obtain 1e100 essence.",
            unlocked() { if (hasAchievement("A", 22)) return true },
        },
        24: {
            name: "The Essence of the Universe",
            done() {return player["e"].points >= (new Decimal(1e1000))},
            tooltip: "obtain 1e1,000 essence.",
            unlocked() { if (hasAchievement("A", 23)) return true },
        },
        26: {
            name: "A Pointless Mechanic?",
            done() {return getBuyableAmount("e", 11) <= 0.1 && getBuyableAmount("e", 12) <= 0.1 && player["e"].points >= (10 ** 10)},
            tooltip: "obtain 1e10 essence with no essence buyables.",
            unlocked() {if (hasAchievement("A", 22) && hasAchievement("A", 31)) return true },
        },
        31: {
            name: "Cracked Core",
            done() {return player["c"].points >= 1},
            tooltip: "obtain 1 core.",
            unlocked() { if (hasAchievement("A", 31)) return true },
        },
        32: {
            name: "Mountainous Core",
            done() {return player["c"].points >= (10 ** 10)},
            tooltip: "obtain 1e10 cores.",
            unlocked() { if (hasAchievement("A", 31)) return true },
        },
        33: {
            name: "Core of the Earth",
            done() {return player["c"].points >= (10 ** 100)},
            tooltip: "obtain 1e100 cores.",
            unlocked() { if (hasAchievement("A", 32)) return true },
        },
        34: {
            name: "Core of the Sun",
            done() {return player["c"].points >= (new Decimal(1e1000))},
            tooltip: "obtain 1e1,000 cores.",
            unlocked() { if (hasAchievement("A", 33)) return true },
        },
        36: {
            name: "The Pointless Core",
            done() {return getBuyableAmount("c", 11) <= 0.1 && getBuyableAmount("c", 12) <= 0.1 && player["q"].points <= 0.1 && player["c"].points >= (10 ** 10)},
            tooltip: "obtain 1e10 cores with no core buyables and quarks.",
            unlocked() { if (hasAchievement("A", 32) && hasAchievement("A", 41)) return true },
        },
        41: {
            name: "The Smallest Quark",
            done() {return player["q"].points >= 1},
            tooltip: "obtain 1 quark.",
            unlocked() { if (hasAchievement("A", 41)) return true },
        },
        42: {
            name: "Quark Field",
            done() {return player["q"].points >= (10 ** 10)},
            tooltip: "obtain 1e10 quarks.",
            unlocked() { if (hasAchievement("A", 41)) return true },
        },
        43: {
            name: "Oh, the Quark of it all",
            done() {return player["q"].points >= (10 ** 100)},
            tooltip: "obtain 1e100 quarks.",
            unlocked() { if (hasAchievement("A", 42)) return true },
        },
        44: {
            name: "Quirky Random Purpetuation",
            done() {return player["q"].points >= (new Decimal(1e1000))},
            tooltip: "obtain 1e1,000 quarks.",
            unlocked() { if (hasAchievement("A", 43)) return true },
        },
        46: {
            name: "The Outside",
            done() {return player["c"].points <= 0.1 && player["q"].points >= (10 ** 10)},
            tooltip: "obtain 1e10 quarks with no cores.",
            unlocked() { if (hasAchievement("A", 42) && hasAchievement("A", 51)) return true },
        },
        51: {
            name: "Submarine, Subatomic",
            done() {return player["sp"].points >= 1},
            tooltip: "obtain 1 subatomic particle.",
            unlocked() { if (hasAchievement("A", 51)) return true },
        },
        52: {
            name: "Variant Particles",
            done() {return player["sp"].points >= 10},
            tooltip: "obtain 10 subatomic particles.",
            unlocked() { if (hasAchievement("A", 51)) return true },
        },
        53: {
            name: "Periodic Particles",
            done() {return player["sp"].points >= 100},
            tooltip: "obtain 100 subatomic particles.",
            unlocked() { if (hasAchievement("A", 52)) return true },
        },
        54: {
            name: "That's no Particle no More",
            done() {return player["sp"].points >= 1000},
            tooltip: "obtain 1,000 subatomic particles.",
            unlocked() { if (hasAchievement("A", 53)) return true },
        },
        56: {
            name: "Hollow Particles",
            done() {return getBuyableAmount("sp", 11) <= 0.1 && getBuyableAmount("sp", 12) <= 0.1 && getBuyableAmount("sp", 21) <= 0.1 && player["h"].points <= 0.1 && player["sp"].points >= 10},
            tooltip: "obtain 10 subatomic particles with no subatomic particle buyables and hexes.",
            unlocked() { if (hasAchievement("A", 52) && hasAchievement("A", 61)) return true },
        },
        61: {
            name: "The Hex Game",
            done() {return player["h"].points >= 1},
            tooltip: "obtain 1 hex.",
            unlocked() { if (hasAchievement("A", 61)) return true },
        },
        62: {
            name: "Cursed into Oblivion",
            done() {return player["h"].points >= (10 ** 10)},
            tooltip: "obtain 1e10 hexes.",
            unlocked() { if (hasAchievement("A", 61)) return true },
        },
        63: {
            name: "The Prophecy of Doom",
            done() {return player["h"].points >= (10 ** 100)},
            tooltip: "obtain 1e100 hexes.",
            unlocked() { if (hasAchievement("A", 62)) return true },
        },
        64: {
            name: "The Advent (of the universe ending)",
            done() {return player["h"].points >= (new Decimal(1e1000))},
            tooltip: "obtain 1e1,000 hexes.",
            unlocked() { if (hasAchievement("A", 63)) return true },
        },
        66: {
            name: "Plain Old Curses",
            done() {return getBuyableAmount("c", 11) <= 0.1 && getBuyableAmount("c", 12) <= 0.1 && player["sp"].points <= 0.1 && player["h"].points >= (10 ** 10)},
            tooltip: "obtain 1e10 hexes with no subatomic particles and core buyables.",
            unlocked() { if (hasAchievement("A", 62) && hasAchievement("A", 71)) return true },
        },
        71: {
            name: "Demon Spirits",
            done() {return player["ds"].points >= 1},
            tooltip: "obtain 1 demon soul.",
            unlocked() { if (hasAchievement("A", 71)) return true },
        },
        72: {
            name: "Demonic Ruin",
            done() {return player["ds"].points >= (10 ** 10)},
            tooltip: "obtain 1e10 demon souls.",
            unlocked() { if (hasAchievement("A", 71)) return true },
        },
        73: {
            name: "Demonic Origin",
            done() {return player["ds"].points >= (10 ** 100)},
            tooltip: "obtain 1e100 demon souls.",
            unlocked() { if (hasAchievement("A", 72)) return true },
        },
        76: {
            name: "Occult Uprising",
            done() {return getBuyableAmount("ds", 11) <= 0.1 && player["ds"].points >= (10 ** 10)},
            tooltip: "obtain 1e10 demon souls with no demon soul buyables.",
            unlocked() { if (hasAchievement("A", 72) && hasAchievement("A", 81)) return true },
        },
        81: {
            name: "Atomic Mass",
            done() {return player["a"].points >= 1},
            tooltip: "obtain 1 atom.",
            unlocked() { if (hasAchievement("A", 81)) return true },
        },
        82: {
            name: "Atomic Movement",
            done() {return player["a"].points >= 10},
            tooltip: "obtain 10 atoms.",
            unlocked() { if (hasAchievement("A", 81)) return true },
        },
    },
});

addLayer("e", {
    name: "Essence",
    symbol: "E",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#4BDC13",
    branches: ["c", "q"],
    requires: new Decimal(5),
    resource: "essence",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade('e', 13)) mult = mult.times(upgradeEffect('e', 13))
        if (hasUpgrade('e', 22)) mult = mult.times(upgradeEffect('e', 22))
            if (hasUpgrade('e', 41)) mult = mult.times(upgradeEffect('e', 41))
                if (hasUpgrade('e', 42)) mult = mult.times(upgradeEffect('e', 42))
        if (hasUpgrade('c', 11)) mult = mult.times(upgradeEffect('c', 11))
        if (hasUpgrade('q', 14)) mult = mult.times(upgradeEffect('q', 14))
            if (hasUpgrade('q', 15)) mult = mult.times(upgradeEffect('q', 15))
        if (hasUpgrade('q', 32)) mult = mult.times(upgradeEffect('q', 32))
        if (hasUpgrade('a', 73)) mult = mult.times(upgradeEffect('a', 73))
        if (getBuyableAmount('e', 11) >= 0.1) mult = mult.times((getBuyableAmount('e', 11) * 2.5) + 1)
        if (getBuyableAmount('e', 12) >= 0.1) mult = mult.times((getBuyableAmount('e', 12) ** 0.25) + 1)
        if (getBuyableAmount('c', 12) >= 0.1) mult = mult.times(2 ** getBuyableAmount('c', 12))
        if (getBuyableAmount('sp', 12) >= 0.1) mult = mult.times(5 ** getBuyableAmount('sp', 12))
        if (hasUpgrade("sp", 12)) mult = mult.times(5 ** getBuyableAmount('sp', 12))
        if (getBuyableAmount('sp', 11) >= 0.1) mult = mult.times(((getBuyableAmount('sp', 11) * 1) + 1) ** -1)
        if (hasUpgrade("ds", 21)) mult = mult.times(Math.round(100 * (player.A.achievements.length * 0.2)) / 100)
        if (inChallenge('ds', 21)) mult = mult.times(0.00000000000000000001)
        if (inChallenge('ds', 22)) mult = mult.times(0.0000000000000000000000001)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for essence", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration() { 
        if (hasMilestone("c", 3) && hasUpgrade("h", 51) && hasUpgrade("h", 52) && hasUpgrade("h", 61) && hasUpgrade("h", 64)) return 1.5
        else
            if (hasMilestone("c", 3) && hasUpgrade("h", 51) && hasUpgrade("h", 54) && hasUpgrade("h", 61)) return 1.25
            else
                if (hasMilestone("c", 3) && hasUpgrade("h", 51) && hasUpgrade("h", 54)) return 1
                else
                    if (hasMilestone("c", 3) && hasUpgrade("h", 51)) return 0.75
                    else
                        if (hasMilestone("c", 3)) return 0.5
    },
    doReset(resettingLayer) {
        let keep = [];
            if (hasMilestone("c", 0) && resettingLayer=="c") ceU = "upgrades"
            else ceU = ""
            if (hasMilestone("c", 2) && resettingLayer=="c") ceB = "buyables"
            else ceB = ""
            if (hasMilestone("q", 1) && resettingLayer=="q") qeU = "upgrades"
            else qeU = ""
            if (hasMilestone("q", 2) && resettingLayer=="q") qeB = "buyables"
            else qeB = ""
            if (hasMilestone("sp", 1) && resettingLayer=="sp") speU = "upgrades"
            else speU = ""
            if (hasMilestone("sp", 4) && resettingLayer=="sp") speB = "buyables"
            else speB = ""
            if (hasMilestone("h", 0) && resettingLayer=="h") heU = "upgrades"
            else heU = ""
            if (hasMilestone("h", 1) && resettingLayer=="h") heB = "buyables"
            else heB = ""
            if (hasMilestone("ds", 3)) ALLeU = "upgrades"
            else ALLeU = ""
            if (hasMilestone("ds", 4)) ALLeB = "buyables"
            else ALLeB = ""
            if (layers[resettingLayer].row > this.row) layerDataReset("e", [ceU, ceB, qeU, qeB, speU, speB, heU, heB, ALLeU, ALLeB])
        },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        ["display-text",
            function() {return 'You have ' + formatWhole(player.e.best) + ' best essence'},
            {}],
        ["display-text",
            function() {return 'You have ' + formatWhole(player.e.total) + ' total essence'},
            {}],
        "blank",
        "blank",
        "buyables",
        "blank",
        "upgrades",
    ],
    upgrades: {
        11: {
            title: "Faster Points",
            description: "multiplies point gain by 1.5",
            cost: new Decimal(1),
        },
        12: {
            title: "Essence Influence",
            description: "multiplies point gain based on the amount of essence you have",
            cost: new Decimal(2),
            effect() {
               return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("e", 11) },
        },
        13: {
            title: "Influenced Essence",
            description: "multiplies essence gain based on the amount of points you have",
            cost: new Decimal(5),
            effect() { 
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("e", 12) },
        },
        21: {
            title: "Point Recursion",
            description: "multiplies point gain based on the amount of points you have",
            cost: new Decimal(500),
            effect() {
               return player.points.add(1).pow(0.075)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("e", 13) },
        },
        22: {
            title: "Essence of Essence",
            description: "multiplies essence gain based on the amount of essence you have",
            cost: new Decimal(1250),
            effect() {
               return player[this.layer].points.add(1).pow(0.11111111111)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("e", 21) },
        },
        23: {
            title: "Recurring Recursion",
            description: "boosts the effect of Point Recursion based on the amount of points you have",
            cost: new Decimal(3500),
            effect() {
               return player.points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("e", 22) },
        },
        31: {
            title: "Infinite Recursion",
            description: "boosts the effect of Recurring Recursion based on the amount of points you have",
            cost: new Decimal(1.11e11),
            effect() {
               return player.points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("q", 0) && hasUpgrade("e", 23) },
        },
        32: {
            title: "Brilliant Essence",
            description: "boosts the effect of Radiant Essence based on the amount of essence you have",
            cost: new Decimal(3.33e33),
            effect() {
               return player[this.layer].points.add(1).pow(0.001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("q", 0) && hasUpgrade("e", 31) },
        },
        33: {
            title: "Essence Network",
            description: "boosts the effect of Essence Influence based on the amount of essence you have",
            cost: new Decimal(5.55e55),
            effect() {
               return player[this.layer].points.add(1).pow(0.025)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("q", 0) && hasUpgrade("e", 32) },
        },
        41: {
            title: "Essence Recursion",
            description: "boosts the effect of Essence of Essence based on the amount of essence you have",
            cost: new Decimal(7.77e77),
            effect() {
               return player[this.layer].points.add(1).pow(0.001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("q", 0) && hasUpgrade("e", 33) },
        },
        42: {
            title: "Essences to Infinity",
            description: "boosts the effect of Essence Recursion based on the amount of essence you have",
            cost: new Decimal(9.99e99),
            effect() {
               return player[this.layer].points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("q", 0) && hasUpgrade("e", 41) },
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Purer Essence",
            canAfford() { return player[this.layer].points.gte(this.cost((12 ** getBuyableAmount('e', 11)) + 20))},
            purchaseLimit: new Decimal(14),
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost((12 ** getBuyableAmount('e', 11)) + 20))
                setBuyableAmount('e', 11, getBuyableAmount('e', 11).add(1))
            },
            display() {
                return "multiplies essence gain based on the amount of this upgrade bought.\nCurrently: " + ((getBuyableAmount('e', 11) * 2.5) + 1) + "x\n\nCost: " + ((12 ** getBuyableAmount('e', 11)) + 20) + "\n\nBought: " + getBuyableAmount('e', 11)
            },
        },
        12: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Radiant Essence",
            canAfford() { return player[this.layer].points.gte(this.cost(10 * (44 ** getBuyableAmount('e', 12)) + 85184))},
            purchaseLimit: new Decimal(99),
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(10 * (44 ** getBuyableAmount('e', 12)) + 85184))
                setBuyableAmount('e', 12, getBuyableAmount('e', 12).add(1))
            },
            display() {
                return "multiplies core gain (and essence gain at a reduced rate) based on the amount of this upgrade bought.\nCurrently: " + ((getBuyableAmount('e', 12) * 1) + 1) + "x\nand " + ((getBuyableAmount('e', 12) ** 0.25) + 1) + "x\n\nCost: " + (10 * (44 ** getBuyableAmount('e', 12)) + 85184) + "\n\nBought: " + getBuyableAmount('e', 12)
            },
        },
    },
});

addLayer("c", {
    name: "Cores",
    symbol: "C",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#C2C238",
    branches: ["h"],
    requires: new Decimal(10000),
    resource: "cores",
    baseResource: "essence",
    baseAmount() {return player['e'].points},
    type: "normal",
    exponent: 0.3,
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade('e', 32)) mult = mult.times(upgradeEffect('e', 32))
        if (hasUpgrade('c', 12)) mult = mult.times(upgradeEffect('c', 12))
        if (hasUpgrade('q', 21)) mult = mult.times(upgradeEffect('q', 21))
            if (hasUpgrade('q', 22)) mult = mult.times(upgradeEffect('q', 22))
        if (hasUpgrade('q', 33)) mult = mult.times(upgradeEffect('q', 33))
        if (hasUpgrade('h', 13)) mult = mult.times(upgradeEffect('h', 13))
            if (hasUpgrade('h', 23)) mult = mult.times(upgradeEffect('h', 23))
                if (hasUpgrade('h', 33)) mult = mult.times(upgradeEffect('h', 33))
        if (hasUpgrade('h', 24)) mult = mult.times(3)
        if (getBuyableAmount('e', 12) >= 0.1) mult = mult.times((getBuyableAmount('e', 12) * 1) + 1)
        if (hasUpgrade("ds", 23)) mult = mult.times(Math.round(100 * (player.A.achievements.length ** 2)) / 10000)
        if (inChallenge('ds', 11)) mult = mult.times(0.01)
        if (inChallenge('ds', 21)) mult = mult.times(0.000000000000001)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
    hotkeys: [
        {key: "c", description: "C: Reset for cores", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration() {
        if (hasUpgrade("h", 43) && hasUpgrade("h", 44) && hasUpgrade("h", 52) && hasUpgrade("c", 33)) return 0.5
        else
            if (hasUpgrade("h", 43) && hasUpgrade("h", 44) && hasUpgrade("h", 52)) return 0.25
            else
                if (hasUpgrade("h", 43) && hasUpgrade("h", 44)) return 0.1
                else
                    if (hasUpgrade("h", 43)) return 0.01
    },
    doReset(resettingLayer) {
        let keep = [];
            if (hasMilestone("h", 2) && resettingLayer=="h") hcU = "upgrades"
            else hcU = ""
            if (hasMilestone("h", 3) && resettingLayer=="h") hcB = "buyables"
            else hcB = ""
            if (hasMilestone("h", 4) && resettingLayer=="sp") spcU = "upgrades"
            else spcU = ""
            if (hasMilestone("h", 4) && resettingLayer=="sp") spcB = "buyables"
            else spcB = ""
            if (hasMilestone("h", 5) && resettingLayer=="h") hcM = "milestones"
            else hcM = ""
            if (hasMilestone("h", 5) && resettingLayer=="sp") spcM = "milestones"
            else spcM = ""
            if (hasMilestone("ds", 2) && resettingLayer=="ds") dscM = "milestones"
            else dscM = ""
            if (hasMilestone("ds", 5) && resettingLayer=="ds") dscU = "upgrades"
            else dscU = ""
            if (hasMilestone("ds", 6) && resettingLayer=="ds") dscB = "buyables"
            else dscB = ""
            if (hasMilestone("a", 1) && resettingLayer=="a") acB = "buyables"
            else acB = ""
            if (hasMilestone("a", 2) && resettingLayer=="a") acU = "upgrades"
            else acU = ""
            if (hasMilestone("a", 4) && resettingLayer=="a") acM = "milestones"
            else acM = ""
            if (layers[resettingLayer].row > this.row) layerDataReset("c", [hcU, hcB, spcU, spcB, hcM, spcM, dscM, dscU, dscB, acB, acU, acM])
        },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        ["display-text",
            function() {return 'You have ' + formatWhole(player.c.best) + ' best cores'},
            {}],
        ["display-text",
            function() {return 'You have ' + formatWhole(player.c.total) + ' total cores'},
            {}],
        "blank",
        "milestones",
        "buyables",
        "blank",
        "upgrades",
    ],
    milestones: {
        0: {
            requirementDescription: "10 cores",
            effectDescription: "keep essence upgrades on core resets",
            done() { return player[this.layer].points.gte(10) }
        },
        1: {
            requirementDescription: "25 cores",
            effectDescription: "unlock core upgrades",
            done() { return player[this.layer].points.gte(25) }
        },
        2: {
            requirementDescription: "500 cores",
            effectDescription: "keep essence buyables on core resets",
            done() { return player[this.layer].points.gte(500) }
        },
        3: {
            requirementDescription: "1e64 cores",
            effectDescription: "gain 50% of essence gain per second",
            done() { return player[this.layer].points.gte( new Decimal(1e64) ) }
        },
    },
    upgrades: {
        11: {
            title: "Heat Emission",
            description: "multiplies essence gain based on the amount of cores you have",
            cost: new Decimal(25),
            effect() {
               return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("c", 1) },
        },
        12: {
            title: "Core Countdown",
            description: "multiplies core gain based on the amount of points you have",
            cost: new Decimal(100),
            effect() {
               return player.points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("c", 11) },
        },
        13: {
            title: "The Quarks' Core",
            description: "multiplies quark gain based on the amount of cores you have",
            cost: new Decimal(750),
            effect() {
               return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("c", 12) },
        },
        21: {
            title: "Quarky Core",
            description: "multiplies the effect of The Quarks' Core based on the amount of cores you have",
            cost: new Decimal(1e69),
            effect() {
               return player[this.layer].points.add(1).pow(0.005)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("c", 13) },
        },
        22: {
            title: "Quirky Core",
            description: "multiplies the effect of Quarky Core based on the amount of cores you have",
            cost: new Decimal(1e71),
            effect() {
               return player[this.layer].points.add(1).pow(0.002)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("c", 21) },
        },
        23: {
            title: "Super Core",
            description: "multiplies core gain based on the amount of cores you have",
            cost: new Decimal(1e73),
            effect() {
               return player[this.layer].points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("c", 22) },
        },
        31: {
            title: "Ultra Core",
            description: "multiplies the effect of Super Core based on the amount of cores you have",
            cost: new Decimal(1e75),
            effect() {
               return player[this.layer].points.add(1).pow(0.0025)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("h", 53) && hasUpgrade("c", 23) },
        },
        32: {
            title: "Hexed Core",
            description: "multiplies the effect of Ultra Core based on the amount of hexes you have",
            cost: new Decimal(1e77),
            effect() {
               return player[this.layer].points.add(1).pow(0.001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("h", 53) && hasUpgrade("c", 31) },
        },
        33: {
            title: "Core Liberation",
            description: "if you own Core Production Line and all subsequent upgrades, gain +25% of your core gain per second",
            cost: new Decimal(1e80),
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("h", 53) && hasUpgrade("c", 32) },
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Empowered Points",
            canAfford() { return player[this.layer].points.gte(this.cost((getBuyableAmount('c', 11) * 2) + 1))},
            purchaseLimit: new Decimal(99),
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost((getBuyableAmount('c', 11) * 2) + 1))
                setBuyableAmount('c', 11, getBuyableAmount('c', 11).add(1))
            },
            display() {
                return "multiplies point gain based on the amount of this upgrade bought.\nCurrently: " + (5 * getBuyableAmount('c', 11) + 1) + "x\n\nCost: " + ((getBuyableAmount('c', 11) * 2) + 1) + "\n\nBought: " + getBuyableAmount('c', 11)
            },
        },
        12: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Empowered Essence",
            canAfford() { return player[this.layer].points.gte(this.cost(6 ** getBuyableAmount('c', 12)))},
            purchaseLimit: new Decimal(49),
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(6 ** getBuyableAmount('c', 12)))
                setBuyableAmount('c', 12, getBuyableAmount('c', 12).add(1))
            },
            display() {
                return "multiplies essence gain based on the amount of this upgrade bought.\nCurrently: " + (2 ** getBuyableAmount('c', 12)) + "x\n\nCost: " + (6 ** getBuyableAmount('c', 12)) + "\n\nBought: " + getBuyableAmount('c', 12)
            },
        },
    },
});

addLayer("q", {
    name: "Quarks",
    symbol: "Q",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#DB5196",
    branches: ["sp"],
    requires: new Decimal(1e9),
    resource: "quarks",
    baseResource: "essence",
    baseAmount() {return player['e'].points},
    type: "normal",
    exponent: 0.1,
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade('c', 13)) mult = mult.times(upgradeEffect('c', 13))
        if (hasUpgrade('q', 11)) mult = mult.times(upgradeEffect('q', 11))
        if (hasUpgrade('q', 21)) mult = mult.times(upgradeEffect('q', 21))
            if (hasUpgrade('q', 22)) mult = mult.times(upgradeEffect('q', 22))
        if (hasUpgrade('q', 23)) mult = mult.times(upgradeEffect('q', 23))
            if (hasUpgrade('q', 24)) mult = mult.times(upgradeEffect('q', 24))
                if (hasUpgrade('q', 25)) mult = mult.times(upgradeEffect('q', 25))
                    if (hasUpgrade('q', 31)) mult = mult.times(upgradeEffect('q', 31))
        if (hasUpgrade('q', 42)) mult = mult.times(upgradeEffect('q', 42))
            if (hasUpgrade('q', 44)) mult = mult.times(upgradeEffect('q', 44))
        if (hasUpgrade('q', 45)) mult = mult.times(upgradeEffect('q', 45))
        if (hasUpgrade('h', 34)) mult = mult.times(2)
        if (hasUpgrade('a', 41)) mult = mult.times(upgradeEffect('a', 41))
        if (getBuyableAmount('sp', 11) >= 0.1) mult = mult.times(5 ** getBuyableAmount('sp', 11))
        if (hasUpgrade("sp", 11)) mult = mult.times(5 ** getBuyableAmount('sp', 11))
        if (getBuyableAmount('sp', 21) >= 0.1) mult = mult.times(((getBuyableAmount('sp', 21) * 1) + 1) ** -1)
        if (hasUpgrade("ds", 23)) mult = mult.times(Math.round(100 * (player.A.achievements.length ** 2)) / 10000)
        if (inChallenge('ds', 11)) mult = mult.times(0.1)
        if (inChallenge('ds', 22)) mult = mult.times(0.00000000000000000000000000000000000000000000000001)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
    hotkeys: [
        {key: "q", description: "Q: Reset for quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.c.unlocked},
        doReset(resettingLayer) {
            let keep = [];
            if (hasMilestone("sp", 3) && resettingLayer=="sp") spqM1 = "milestones"
            else spqM1 = ""
            if (hasMilestone("sp", 5) && resettingLayer=="sp") spqU1 = "upgrades"
            else spqU1 = ""
            if (hasMilestone("h", 5) && resettingLayer=="h") hqM = "milestones"
            else hqM = ""
            if (hasMilestone("h", 5) && resettingLayer=="sp") spqM2 = "milestones"
            else spqM2 = ""
            if (hasMilestone("h", 6) && resettingLayer=="sp") spqU2 = "upgrades"
            else spqU2 = ""
            if (hasMilestone("h", 7) && resettingLayer=="h") hqU = "upgrades"
            else hqU = ""
            if (hasMilestone("ds", 2) && resettingLayer=="ds") dsqM = "milestones"
            else dsqM = ""
            if (hasMilestone('ds', 7) && resettingLayer=="ds") dsqU = "upgrades"
            else dsqU = ""
            if (hasMilestone("a", 0) && resettingLayer=="a") aqB = "buyables"
            else aqB = ""
            if (hasMilestone("a", 1) && resettingLayer=="a") aqU = "upgrades"
            else aqU = ""
            if (hasMilestone("a", 5) && resettingLayer=="a") aqM = "milestones"
            else aqM = ""
            if (layers[resettingLayer].row > this.row) layerDataReset("q", [spqM1, spqU1, hqM, spqM2, spqU2, hqU, dsqM, dsqU, aqB, aqU, aqM])
        },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        ["display-text",
            function() {return 'You have ' + formatWhole(player.q.best) + ' best quarks'},
            {}],
        ["display-text",
            function() {return 'You have ' + formatWhole(player.q.total) + ' total quarks'},
            {}],
        "blank",
        "milestones",
        "upgrades",
    ],
    milestones: {
        0: {
            requirementDescription: "5 quarks",
            effectDescription: "you can explore 5 further essence upgrades",
            done() { return player[this.layer].points.gte(5) }
        },
        1: {
            requirementDescription: "50,000 quarks",
            effectDescription: "keep essence upgrades on quark resets",
            done() { return player[this.layer].points.gte(50000) }
        },
        2: {
            requirementDescription: "250,000,000 quarks",
            effectDescription: "keep essence buyables on quark resets",
            done() { return player[this.layer].points.gte(250000000) }
        },
    },
    upgrades: {
        11: {
            title: "The Point of Quarks",
            description: "multiplies quark gain based on the amount of points you have",
            cost: new Decimal(1),
            effect() {
               return player.points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        12: {
            title: "Quark Power",
            description: "multiplies point gain based on the amount of quarks you have",
            cost: new Decimal(2),
            effect() {
               return player[this.layer].points.add(1).pow(0.09)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 11) },
        },
        13: {
            title: "Super Quarks",
            description: "multiplies the effect of Quark Power based on the amount of points you have",
            cost: new Decimal(25),
            effect() {
               return player.points.add(1).pow(0.0025)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 12) },
        },
        14: {
            title: "Essence of Quarks",
            description: "Quark Power also affects essence gain at a reduced rate (super quarks does not affect this)",
            cost: new Decimal(100),
            effect() {
               return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 13) },
        },
        15: {
            title: "Quark Fusion",
            description: "multiplies the effect of Essence of Quarks based on the amount of cores you have",
            cost: new Decimal(750),
            effect() {
               return player['c'].points.add(1).pow(0.02)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 14) },
        },
        21: {
            title: "Quirky Quarks",
            description: "multiplies core gain and quark gain based on the amount of quarks you have",
            cost: new Decimal(2500),
            effect() {
               return player[this.layer].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 15) },
        },
        22: {
            title: "Very Quirky",
            description: "multiplies the effect of Quirky Quarks based on the amount of points you have",
            cost: new Decimal(7500),
            effect() {
               return player.points.add(1).pow(0.02)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 21) },
        },
        23: {
            title: "Quark Extreme",
            description: "Quark Power also affects quark gain at a reduced rate (super quarks does not affect this)",
            cost: new Decimal(25000),
            effect() {
               return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 22) },
        },
        24: {
            title: "Recurring Quarks",
            description: "multiplies the effect of Quark Extreme based on the amount of quarks you have",
            cost: new Decimal(100000),
            effect() {
               return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 23) },
        },
        25: {
            title: "Recurring More",
            description: "multiplies the effect of Recurring Quarks based on the amount of quarks you have",
            cost: new Decimal(1500000),
            effect() {
               return player[this.layer].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 24) },
        },
        31: {
            title: "Infinite Recur",
            description: "multiplies the effect of Recurring More based on the amount of quarks you have",
            cost: new Decimal(50000000),
            effect() {
               return player[this.layer].points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 25) },
        },
        32: {
            title: "Compact Quarks",
            description: "multiplies essence gain based on the amount of quarks you have",
            cost: new Decimal(1e9),
            effect() {
               return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 31) },
        },
        33: {
            title: "Quark Fission",
            description: "multiplies core gain based on the amount of quarks you have",
            cost: new Decimal(1e10),
            effect() {
               return player[this.layer].points.add(1).pow(0.075)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 32) },
        },
        34: {
            title: "The Quark Count",
            description: "multiplies point gain based on the amount of quarks you have",
            cost: new Decimal(2.5e11),
            effect() {
               return player[this.layer].points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 33) },
        },
        35: {
            title: "Quark Counting",
            description: "multiplies the effect of The Quark Count based on the amount of quarks you have",
            cost: new Decimal(1e13),
            effect() {
               return player[this.layer].points.add(1).pow(0.015)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 34) },
        },
        41: {
            title: "Ticking Quarks",
            description: "multiplies the effect of Quark Counting based on the amount of quarks you have",
            cost: new Decimal(1e14),
            effect() {
               return player[this.layer].points.add(1).pow(0.005)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("sp", 2) && hasUpgrade("q", 35) },
        },
        42: {
            title: "Subatomic Quarks",
            description: "multiplies quark gain based on the amount of subatomic particles you have",
            cost: new Decimal(1e16),
            effect() {
               return player["sp"].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("sp", 2) && hasUpgrade("q", 41) },
        },
        43: {
            title: "Quirky Particles",
            description: "multiplies subatomic particle gain based on the amount of quarks you have",
            cost: new Decimal(1e18),
            effect() {
               return player[this.layer].points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("sp", 2) && hasUpgrade("q", 42) },
        },
        44: {
            title: "Particle Quarks",
            description: "multiplies the effect of Subatomic Quarks based on the amount of quarks you have",
            cost: new Decimal(1e20),
            effect() {
               return player[this.layer].points.add(1).pow(0.005)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("sp", 2) && hasUpgrade("q", 43) },
        },
        45: {
            title: "The Ultra Quark",
            description: "multiplies quark gain based on the amount of quarks you have",
            cost: new Decimal(1e22),
            effect() {
               return player[this.layer].points.add(1).pow(0.125)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("sp", 2) && hasUpgrade("q", 44) },
        },
    },
});

addLayer("sp", {
    name: "Subatomic Particles", 
    symbol: "SP",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#710CC4",
    branches: ["a"],
    requires: new Decimal(1e15),
    resource: "subatomic particles",
    baseResource: "quarks",
    baseAmount() {return player['q'].points},
    type: "static",
    exponent: 4.25,
    canBuyMax() {
        if (hasMilestone("sp", 0)) return true
        else return false
    },
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        gain = new Decimal(1)
        if (hasUpgrade('q', 43)) gain = gain.times(upgradeEffect('q', 43))
        if (hasUpgrade('h', 63)) gain = gain.times(upgradeEffect('h', 63))
        if (hasUpgrade('a', 22)) gain = gain.times(upgradeEffect('a', 22))
        if (hasUpgrade('a', 31)) gain = gain.times(upgradeEffect('a', 31))
        if (getBuyableAmount('ds',11) >= 0.1) gain = gain.times((getBuyableAmount('ds', 11) * 5) + 1)
        if (hasUpgrade('a', 51)) gain = gain.times(Math.round(100 * (player.A.achievements.length ** 3)) / 10000)
        if (hasChallenge('ds', 21)) gain = gain.times(player['ds'].points.add(1).pow(0.2))
        if (inChallenge('ds', 12)) gain = gain.times(player['q'].points ** -0.05)
        if (inChallenge('ds', 22)) gain = gain.times(0.00000000000000000000000000000000000000000000000001)
        return gain
    },
    row: 2,
    hotkeys: [
        {key: "s", description: "S: Reset for subatomic particles", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.q.unlocked},
    doReset(resettingLayer) {
        let keep = [];
            if (hasMilestone("ds", 0) && resettingLayer=="ds") dsspB = "buyables"
            else dsspB = ""
            if (hasMilestone("ds", 1) && resettingLayer=="ds") dsspU = "upgrades"
            else dsspU = ""
            if (hasMilestone("a", 0) && resettingLayer=="a") aspB = "buyables"
            else aspB = ""
            if (hasMilestone("a", 3) && resettingLayer=="a") aspU = "upgrades"
            else aspU = ""
            if (layers[resettingLayer].row > this.row) layerDataReset("sp", [dsspB, dsspU, aspB, aspU])
        },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        ["display-text",
            function() {return 'You have ' + formatWhole(player.sp.best) + ' best subatomic particles'},
            {}],
        ["display-text",
            function() {return 'You have ' + formatWhole(player.sp.total) + ' total subatomic particles'},
            {}],
        "blank",
        "milestones",
        "buyables",
        "blank",
        "upgrades",
    ],
    milestones: {
        0: {
            requirementDescription: "1 subatomic particle",
            effectDescription: "you can buy max subatomic particles",
            done() { return player[this.layer].points.gte(1) }
        },
        1: {
            requirementDescription: "2 subatomic particles",
            effectDescription: "keep essence upgrades on subatomic particle resets",
            done() { return player[this.layer].points.gte(2) }
        },
        2: {
            requirementDescription: "3 subatomic particles",
            effectDescription: "you can explore 5 further quark upgrades",
            done() { return player[this.layer].points.gte(3) }
        },
        3: {
            requirementDescription: "4 subatomic particles",
            effectDescription: "keep quark milestones on subatomic particle resets",
            done() { return player[this.layer].points.gte(4) }
        },
        4: {
            requirementDescription: "5 subatomic particles",
            effectDescription: "keep essence buyables on subatomic particle resets",
            done() { return player[this.layer].points.gte(5) }
        },
        5: {
            requirementDescription: "6 subatomic particles",
            effectDescription: "keep quark upgrades on subatomic particle resets",
            done() { return player[this.layer].points.gte(6) }
        },
    },
    upgrades: {
        11: {
            title: "Positrons",
            description: "multiplies the base buff effect of Protons by 2",
            cost: new Decimal(6),
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("h", 53) },
        },
        12: {
            title: "Beta Particles",
            description: "multiplies the base buff effect of Neutrons by 2",
            cost: new Decimal(6),
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("h", 53) },
        },
        13: {
            title: "Gamma Particles",
            description: "multiplies the base buff effect of Neutrons by 2",
            cost: new Decimal(6),
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("h", 53) },
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Protons",
            canAfford() { return player[this.layer].points.gte(this.cost((getBuyableAmount('sp', 11) * 1) + 1))},
            purchaseLimit: new Decimal(9),
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost((getBuyableAmount('sp', 11) * 1) + 1))
                setBuyableAmount('sp', 11, ((getBuyableAmount('sp', 11) * 1) + 1))
            },
            display() {
                return "multiplies quark gain (but also decreases essence gain at a reduced rate) based on the amount of this upgrade bought.\nCurrently: " + (5 ** getBuyableAmount('sp', 11)) + "x\nand " + (((getBuyableAmount('sp', 11) * 1) + 1) ** -1) + "x\n\nCost: " + ((getBuyableAmount('sp', 11) * 1) + 1) + "\n\nBought: " + getBuyableAmount('sp', 11)
            },
        },
        12: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Neutrons",
            canAfford() { return player[this.layer].points.gte(this.cost((getBuyableAmount('sp', 12) * 1) + 1))},
            purchaseLimit: new Decimal(9),
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost((getBuyableAmount('sp', 12) * 1) + 1))
                setBuyableAmount('sp', 12, ((getBuyableAmount('sp', 12) * 1) + 1))
            },
            display() {
                return "multiplies essence gain (but also decreases point gain at a reduced rate) based on the amount of this upgrade bought.\nCurrently: " + (5 ** getBuyableAmount('sp', 12)) + "x\nand " + (((getBuyableAmount('sp', 12) * 1) + 1) ** -1) + "x\n\nCost: " + ((getBuyableAmount('sp', 12) * 1) + 1) + "\n\nBought: " + getBuyableAmount('sp', 12)
            },
        },
        21: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Electrons",
            canAfford() { return player[this.layer].points.gte(this.cost((getBuyableAmount('sp', 21) * 1) + 1))},
            purchaseLimit: new Decimal(9),
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost((getBuyableAmount('sp', 21) * 1) + 1))
                setBuyableAmount('sp', 21, ((getBuyableAmount('sp', 21) * 1) + 1))
            },
            display() {
                return "multiplies point gain (but also decreases quark gain at a reduced rate) based on the amount of this upgrade bought.\nCurrently: " + (5 ** getBuyableAmount('sp', 21)) + "x\nand " + (((getBuyableAmount('sp', 21) * 1) + 1) ** -1) + "x\n\nCost: " + ((getBuyableAmount('sp', 21) * 1) + 1) + "\n\nBought: " + getBuyableAmount('sp', 21)
            },
        },
    },
});

addLayer("h", {
    name: "Hexes",
    symbol: "H",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#E36409",
    branches: ["ds"],
    requires: new Decimal(1e60),
    resource: "hexes",
    baseResource: "cores",
    baseAmount() {return player['c'].points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade('h', 12)) mult = mult.times(upgradeEffect('h', 12))
            if (hasUpgrade('h', 22)) mult = mult.times(upgradeEffect('h', 22))
                if (hasUpgrade('h', 32)) mult = mult.times(upgradeEffect('h', 32))
                    if (hasUpgrade('h', 42)) mult = mult.times(upgradeEffect('h', 42))
        if (hasUpgrade('h', 14)) mult = mult.times(4)
        if (hasUpgrade('h', 62)) mult = mult.times(upgradeEffect('h', 62))
        if (hasUpgrade('ds', 11)) mult = mult.times(upgradeEffect('h', 11))
            if (hasUpgrade('ds', 12)) mult = mult.times(upgradeEffect('h', 12))
        if (getBuyableAmount('ds',11) >= 0.1) mult = mult.times(2 ** getBuyableAmount('ds', 11))
        if (hasChallenge('ds', 11)) mult = mult.times(player['ds'].points.add(1).pow(0.25))
        if (inChallenge('ds', 11)) mult = mult.times(0.001)
        if (inChallenge('ds', 12)) mult = mult.times(0.0000000001)
        if (inChallenge('ds', 21)) mult = mult.times(0.00001)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 2,
    hotkeys: [
        {key: "h", description: "H: Reset for hexes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.sp.unlocked},
    doReset(resettingLayer) {
        let keep = [];
            if (hasMilestone("ds", 8) && resettingLayer=="ds") dshM = "milestones"
            else dshM = ""
            if (layers[resettingLayer].row > this.row) layerDataReset("h", [dshM])
        },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        ["display-text",
            function() {return 'You have ' + formatWhole(player.h.best) + ' best hexes'},
            {}],
        ["display-text",
            function() {return 'You have ' + formatWhole(player.h.total) + ' total hexes'},
            {}],
        "blank",
        "milestones",
        "upgrades",
    ],
    milestones: {
        0: {
            requirementDescription: "5 hexes",
            effectDescription: "keep essence upgrades on hex resets",
            done() { return player[this.layer].points.gte(5) }
        },
        1: {
            requirementDescription: "25 hexes",
            effectDescription: "keep essence buyables on hex resets",
            done() { return player[this.layer].points.gte(25) }
        },
        2: {
            requirementDescription: "125 hexes",
            effectDescription: "keep core upgrades on hex resets",
            done() { return player[this.layer].points.gte(125) }
        },
        3: {
            requirementDescription: "625 hexes",
            effectDescription: "keep core buyables on hex resets",
            done() { return player[this.layer].points.gte(625) }
        },
        4: {
            requirementDescription: "3,125 hexes",
            effectDescription: "keep core upgrades and buyables on subatomic particle resets",
            done() { return player[this.layer].points.gte(3125) }
        },
        5: {
            requirementDescription: "15,625 hexes",
            effectDescription: "keep all row 2 milestones on row 3 resets",
            done() { return player[this.layer].points.gte(15625) }
        },
        6: {
            requirementDescription: "78,125 hexes",
            effectDescription: "keep quark upgrades on subatomic particle resets",
            done() { return player[this.layer].points.gte(78125) }
        },
        7: {
            requirementDescription: "390,625 hexes",
            effectDescription: "keep quark upgrades on hex resets",
            done() { return player[this.layer].points.gte(390625) }
        },
        8: {
            requirementDescription: "1,953,125 hexes",
            effectDescription: "you can explore 3 further core upgrades",
            done() { return player[this.layer].points.gte(1953125) }
        },
    },
    upgrades: {
        11: {
            title: "Hex Leak",
            description: "multiplies point gain based on the amount of hexes you have",
            cost: new Decimal(1),
            effect() {
               return player[this.layer].points.add(1).pow(0.005)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        12: {
            title: "Stronger Hexes",
            description: "multiplies hex gain based on the amount of hexes you have",
            cost: new Decimal(5),
            effect() {
               return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "Hex Fusion",
            description: "multiplies core gain based on the amount of hexes you have",
            cost: new Decimal(10),
            effect() {
               return player[this.layer].points.add(1).pow(0.09)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Boost Hexes",
            description: "Hex gain is quadrupled",
            cost: new Decimal(25),
        },
        21: {
            title: "Numerical Hexes",
            description: "multiplies the effect of Hex Leak based on the amount of hexes you have",
            cost: new Decimal(1000),
            effect() {
               return player[this.layer].points.add(1).pow(0.025)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 11) && hasUpgrade("h", 12) && hasUpgrade("h", 13) && hasUpgrade("h", 14) },
        },
        22: {
            title: "Super Strong Hexes",
            description: "multiplies the effect of Stronger Hexes based on the amount of hexes you have",
            cost: new Decimal(5000),
            effect() {
               return player[this.layer].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 11) && hasUpgrade("h", 12) && hasUpgrade("h", 13) && hasUpgrade("h", 14) },
        },
        23: {
            title: "Hex Fission",
            description: "multiplies the effect of Hex Fusion based on the amount of hexes you have",
            cost: new Decimal(10000),
            effect() {
               return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 11) && hasUpgrade("h", 12) && hasUpgrade("h", 13) && hasUpgrade("h", 14) },
        },
        24: {
            title: "Boost Cores",
            description: "Core gain is tripled",
            cost: new Decimal(25000),
            unlocked() { return hasUpgrade("h", 11) && hasUpgrade("h", 12) && hasUpgrade("h", 13) && hasUpgrade("h", 14) },
        },
        31: {
            title: "Hex Numerals",
            description: "multiplies the effect of Numerical Hexes based on the amount of points you have",
            cost: new Decimal(100000),
            effect() {
               return player.points.add(1).pow(0.002)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 21) && hasUpgrade("h", 22) && hasUpgrade("h", 23) && hasUpgrade("h", 24) },
        },
        32: {
            title: "Extreme Hexes",
            description: "multiplies the effect of Super Strong Hexes based on the amount of hexes you have",
            cost: new Decimal(500000),
            effect() {
               return player[this.layer].points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 21) && hasUpgrade("h", 22) && hasUpgrade("h", 23) && hasUpgrade("h", 24) },
        },
        33: {
            title: "Core of Hexes",
            description: "multiplies the effect of Hex Fission based on the amount of cores you have",
            cost: new Decimal(1000000),
            effect() {
               return player[this.layer].points.add(1).pow(0.025)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 21) && hasUpgrade("h", 22) && hasUpgrade("h", 23) && hasUpgrade("h", 24) },
        },
        34: {
            title: "Boost Quarks",
            description: "Quark gain is doubled",
            cost: new Decimal(2500000),
            unlocked() { return hasUpgrade("h", 21) && hasUpgrade("h", 22) && hasUpgrade("h", 23) && hasUpgrade("h", 24) },
        },
        41: {
            title: "Numero Hex",
            description: "multiplies the effect of Hex Numerals based on the amount of hexes you have",
            cost: new Decimal(7500000),
            effect() {
               return player.points.add(1).pow(0.0001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 31) && hasUpgrade("h", 32) && hasUpgrade("h", 33) && hasUpgrade("h", 34) },
        },
        42: {
            title: "Ultra Hexes",
            description: "multiplies the effect of Extreme Hexes based on the amount of hexes you have",
            cost: new Decimal(15000000),
            effect() {
               return player[this.layer].points.add(1).pow(0.001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 31) && hasUpgrade("h", 32) && hasUpgrade("h", 33) && hasUpgrade("h", 34) },
        },
        43: {
            title: "Core Continuation",
            description: "Gain 1% of core gain per second",
            cost: new Decimal(45000000),
            unlocked() { return hasUpgrade("h", 31) && hasUpgrade("h", 32) && hasUpgrade("h", 33) && hasUpgrade("h", 34) },
        },
        44: {
            title: "Rapid Cores",
            description: "Increase the effect of Core Continuation by 9% (total: 10%)",
            cost: new Decimal(75000000),
            unlocked() { return hasUpgrade("h", 31) && hasUpgrade("h", 32) && hasUpgrade("h", 33) && hasUpgrade("h", 34) },
        },
        51: {
            title: "Faster Essence",
            description: "Increase essence gain per second by 25% (total: 75%)",
            cost: new Decimal(9e90),
            unlocked() { return hasUpgrade("ds", 11) && hasUpgrade("h", 41) && hasUpgrade("h", 42) && hasUpgrade("h", 43) && hasUpgrade("h", 44) },
        },
        52: {
            title: "Core Production Line",
            description: "Increase the effect of Rapid Cores by 15% (total: 25%)",
            cost: new Decimal(250000000),
            unlocked() { return hasUpgrade("h", 41) && hasUpgrade("h", 42) && hasUpgrade("h", 43) && hasUpgrade("h", 44) },
        },
        53: {
            title: "Sub Core Particle Fusion",
            description: "you can explore 3 new core upgrades and 3 new subatomic particle upgrades",
            cost: new Decimal(7.5e9),
            unlocked() { return hasUpgrade("h", 41) && hasUpgrade("h", 42) && hasUpgrade("h", 43) && hasUpgrade("h", 44) },
        },
        54: {
            title: "Fastest Essence",
            description: "Increase the effect of Faster Essence by 25% (total: 100%)",
            cost: new Decimal(9.5e95),
            unlocked() { return hasUpgrade("ds", 11) && hasUpgrade("h", 41) && hasUpgrade("h", 42) && hasUpgrade("h", 43) && hasUpgrade("h", 44) },
        },
        61: {
            title: "Essence Overdrive",
            description: "Increase the effect of Fastest Essence by 25% (total: 125%)",
            cost: new Decimal(1e100),
            unlocked() { return hasUpgrade("ds", 12) && hasUpgrade("h", 51) && hasUpgrade("h", 52) && hasUpgrade("h", 53) && hasUpgrade("h", 54) },
        },
        62: {
            title: "Sub Hex Particle",
            description: "multiply hex gain based on the amount of subatomic particles you have",
            cost: new Decimal(1e50),
            effect() {
               return player['sp'].points.add(1).pow(2.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 52) && hasUpgrade("h", 53) },
        },
        63: {
            title: "Hexed Subatomic Particle",
            description: "multiply subatomic particle gain based on the amount of hexes you have",
            cost: new Decimal(6.66e66),
            effect() {
               return player[this.layer].points.add(1).pow(0.02)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 52) && hasUpgrade("h", 53) },
        },
        64: {
            title: "Potential Essence Potential",
            description: "Increase the effect of Fastest Essence by 25% (total: 150%)",
            cost: new Decimal(1.11e111),
            unlocked() { return hasUpgrade("ds", 12) && hasUpgrade("h", 51) && hasUpgrade("h", 52) && hasUpgrade("h", 53) && hasUpgrade("h", 54) },
        },
    },
});

addLayer("ds", {
    name: "Demon Souls",
    symbol: "DS",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#BA0035",
    requires: new Decimal(1e60),
    resource: "demon souls",
    baseResource: "hexes",
    baseAmount() {return player['h'].points},
    type: "normal",
    exponent: 0.05,
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade('a', 11)) mult = mult.times(upgradeEffect('a', 11))
        if (hasUpgrade('a', 42)) mult = mult.times(upgradeEffect('a', 42))
        if (hasUpgrade('a', 71)) mult = mult.times(upgradeEffect('a', 71))
        if (hasChallenge('ds', 11)) mult = mult.times(player['ds'].points.add(1).pow(0.25))
        if (hasChallenge('ds', 12)) mult = mult.times(player['h'].points.add(1).pow(0.02))
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 3,
    hotkeys: [
        {key: "d", description: "D: Reset for demon souls", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.h.unlocked},
    doReset(resettingLayer) {
        let keep = [];
            if (layers[resettingLayer].row > this.row) layerDataReset("ds", [])
        },
    tabFormat: {
        "Demonic Curses": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text",
                    function() {return 'You have ' + formatWhole(player.ds.best) + ' best demon souls'},
                    {}],
                ["display-text",
                    function() {return 'You have ' + formatWhole(player.ds.total) + ' total demon souls'},
                    {}],
                "blank",
                "milestones",
                "buyables",
                "blank",
                "upgrades",
            ],
        },
        "Demon Gateway": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text",
                    function() {return 'You have ' + formatWhole(player.ds.best) + ' best demon souls'},
                    {}],
                ["display-text",
                    function() {return 'You have ' + formatWhole(player.ds.total) + ' total demon souls'},
                    {}],
                "blank",
                "blank",
                "challenges",
                "blank",
            ],
            unlocked() { if (hasUpgrade("ds", 22)) return true }
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 demon soul",
            effectDescription: "keep subatomic particle buyables on demon soul resets",
            done() { return player[this.layer].points.gte(1) }
        },
        1: {
            requirementDescription: "5 demon souls",
            effectDescription: "keep subatomic particle upgrades on demon soul resets",
            done() { return player[this.layer].points.gte(5) }
        },
        2: {
            requirementDescription: "15 demon souls",
            effectDescription: "keep row 2 milestones on demon soul resets",
            done() { return player[this.layer].points.gte(15) }
        },
        3: {
            requirementDescription: "50 demon souls",
            effectDescription: "keep essence upgrades on all resets",
            done() { return player[this.layer].points.gte(50) }
        },
        4: {
            requirementDescription: "125 demon souls",
            effectDescription: "keep essence buyables on all resets",
            done() { return player[this.layer].points.gte(125) }
        },
        5: {
            requirementDescription: "625 demon souls",
            effectDescription: "keep core upgrades on demon soul resets",
            done() { return player[this.layer].points.gte(625) }
        },
        6: {
            requirementDescription: "3,125 demon souls",
            effectDescription: "keep core buyables on demon soul resets",
            done() { return player[this.layer].points.gte(3125) }
        },
        7: {
            requirementDescription: "1e10 demon souls",
            effectDescription: "keep quark upgrades on demon soul resets",
            done() { return player[this.layer].points.gte(10 ** 10) }
        },
        8: {
            requirementDescription: "1e14 demon souls",
            effectDescription: "keep hex milestones on demon soul resets",
            done() { return player[this.layer].points.gte(10 ** 14) }
        },
    },
    upgrades: {
        11: {
            title: "Mad Hexes",
            description: "you can explore 2 further hex upgrades, and hex gain is multiplied based on the amount of demon souls you have",
            cost: new Decimal(10),
            effect() {
                return player["ds"].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        12: {
            title: "Hex Mania",
            description: "you can explore 2 further hex upgrades, and the effect of Mad Hexes is multiplied based on the amount of demon souls you have",
            cost: new Decimal(75),
            effect() {
                return player["ds"].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            title: "Hall of Fame",
            description: "achievements also multiply essence gain",
            cost: new Decimal(5000),
            unlocked() { return hasUpgrade("ds", 11) && hasUpgrade("ds", 12) }
        },
        22: {
            title: "Demonic Key",
            description: "unlocks the Demon Gateway",
            cost: new Decimal(100000),
            unlocked() { return hasUpgrade("ds", 11) && hasUpgrade("ds", 12) }
        },
        23: {
            title: "Trophy of Glory",
            description: "achievements also multiply core and quark gain",
            cost: new Decimal(2500000),
            unlocked() { return hasUpgrade("ds", 11) && hasUpgrade("ds", 12) && hasUpgrade("ds", 21) }
        },
        24: {
            title: "Buried History",
            description: "achievements boosting point gain uses a better formula",
            cost: new Decimal(1.11e11),
            unlocked() { return hasUpgrade("ds", 11) && hasUpgrade("ds", 12) && hasUpgrade("ds", 23) }
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Demonic Energy",
            canAfford() { 
                return player["ds"].points.gte(this.cost((2 ** getBuyableAmount('ds', 11)) + 1))
            },
            purchaseLimit: new Decimal(22),
            buy() {
                player["ds"].points = player["ds"].points.sub(this.cost((2 ** getBuyableAmount('ds', 11)) + 1))
                setBuyableAmount('ds', 11, ((getBuyableAmount('ds', 11) * 1) + 1))
            },
            display() {
                return "multiplies hex gain (and also subatomic particle gain at a reduced rate) based on the amount of this upgrade bought.\nCurrently: " + (2 ** getBuyableAmount('ds', 11)) + "x\nand " + ((getBuyableAmount('ds', 11) * 5) + 1) + "x\n\nCost: " + ((2 ** getBuyableAmount('ds', 11)) + 1) + "\n\nBought: " + getBuyableAmount('ds', 11)
            },
        },
    },
    challenges: {
        11: {
            name: "Blazing Curse",
            challengeDescription: " - Forces a Demon Soul reset<br> - Quark gain is divided by 100,000<br> - Point gain is divided by 10,000<br> - Hex gain is divided by 1,000<br> - Core gain is divided by 100<br> - Quark gain is divided by 10",
            goalDescription: "the most expensive hex upgrade",
            canComplete() {
                if (hasUpgrade('h', 64)) return true
                else return false
            },
            onEnter() {
                doReset(resettingLayer)
            },
            rewardDescription: "multiplies hex and demon soul gain by the amount of demon souls<br>you have",
            rewardDisplay() { return (Math.round(100 * player['ds'].points.add(1).pow(0.25)) / 100) + 'x' },
        },
        12: {
            name: "Hellfire",
            challengeDescription: " - Forces a Demon Soul reset<br> - Point gain is divided by 1,000,000<br> - Hex gain is divided by 1e10<br> - Subatomic Particle gain is divided by the number of Quarks you have",
            goalDescription: "the second to last hex upgrade",
            canComplete() {
                if (hasUpgrade('h', 63)) return true
                else return false
            },
            onEnter() {
                doReset(resettingLayer)
            },
            unlocked() {
                if (hasChallenge('ds', 11)) return true
                else return false
            },
            rewardDescription: "multiply demon soul gain by<br>the amount of hexes you have",
            rewardDisplay() { return (Math.round(100 * player['h'].points.add(1).pow(0.02)) / 100) + 'x' },
        },
        21: {
            name: "Opposite Polarity",
            challengeDescription: " - Forces a Demon Soul reset<br> - Hex gain is divided by 100,000<br> - Point gain is divided by 1e10<br> - Core gain is divided by 1e15<br> - Essence gain is divided by 1e20",
            goalDescription: "Sub Core Particle Fusion",
            canComplete() {
                if (hasUpgrade('h', 53)) return true
                else return false
            },
            onEnter() {
                doReset(resettingLayer)
            },
            unlocked() {
                if (hasChallenge('ds', 12)) return true
                else return false
            },
            rewardDescription: "multiply subatomic particle<br>gain by the amount of demon souls<br>you have",
            rewardDisplay() { return (Math.round(100 * player['ds'].points.add(1).pow(0.2)) / 100) + 'x' },
        },
        22: {
            name: "No Science Allowed",
            challengeDescription: " - Forces a Demon Soul reset<br> - Point gain is divided by 1e10<br> - Essence gain is divided by 1e15<br> - Quark and Subatomic Particle gain is divided by 1e50<br>",
            goalDescription: "the most expensive hex upgrade",
            canComplete() {
                if (hasUpgrade('h', 64)) return true
                else return false
            },
            onEnter() {
                doReset(resettingLayer)
            },
            unlocked() {
                if (hasMilestone('a', 6)) return true
                else return false
            },
            rewardDescription: "multiply atom<br>gain by the amount of demon souls<br>you have",
            rewardDisplay() { return (Math.round(100 * player['ds'].points.add(1).pow(0.01)) / 100) + 'x' },
        },
    },
});

addLayer("a", {
    name: "Atoms",
    symbol: "A",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#4D2FE0",
    requires: new Decimal(1000),
    resource: "atoms",
    baseResource: "subatomic particles",
    baseAmount() {return player['sp'].points},
    type: "static",
    exponent: 1,
    canBuyMax() { return true },
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        gain = new Decimal(1)
        if (hasUpgrade('a', 22)) gain = gain.times(upgradeEffect('a', 22))
        if (hasUpgrade('a', 32)) gain = gain.times(upgradeEffect('a', 32))
        if (hasUpgrade('a', 33)) gain = gain.times(upgradeEffect('a', 33))
        if (hasUpgrade('a', 61)) gain = gain.times(upgradeEffect('a', 61))
        if (hasUpgrade('a', 62)) gain = gain.times(upgradeEffect('a', 62))
        if (hasUpgrade('a', 72)) gain = gain.times(upgradeEffect('a', 72))
        if (hasChallenge('ds', 22)) mult = mult.times(player['ds'].points.add(1).pow(0.01))
        return gain
    },
    row: 3,
    hotkeys: [
        {key: "a", description: "A: Reset for atoms", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.ds.unlocked},
    doReset(resettingLayer) {
        let keep = [];
            if (layers[resettingLayer].row > this.row) layerDataReset("a", [])
        },
    tabFormat: {
        "Atomic Progress": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text",
                    function() {return 'You have ' + formatWhole(player.a.best) + ' best atoms'},
                    {}],
                ["display-text",
                    function() {return 'You have ' + formatWhole(player.a.total) + ' total atoms'},
                    {}],
                "blank",
                "milestones",
            ],
        },
        "Atomic Tree": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text",
                    function() {return 'You have ' + formatWhole(player.a.best) + ' best atoms'},
                    {}],
                ["display-text",
                    function() {return 'You have ' + formatWhole(player.a.total) + ' total atoms'},
                    {}],
                "blank",
                ["display-text",
                    function() {return 'When you buy one of these upgrades, you cannot<br>buy any upgrades that are not on its path.'},
                    {}],
                "blank",
                ["upgrades", [1]],
                "blank",
                ["upgrades", [2]],
                "blank",
                ["upgrades", [3]],
                "blank",
                ["upgrades", [4]],
                "blank",
                ["upgrades", [5]],
                "blank",
                ["upgrades", [6]],
                "blank",
                ["upgrades", [7]],
            ],
            unlocked() { if (hasUpgrade("ds", 22)) return true }
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 atom",
            effectDescription: "keep subatomic particle buyables on atom resets",
            done() { return player["a"].points.gte(1) }
        },
        1: {
            requirementDescription: "2 atoms",
            effectDescription: "keep core buyables on atom resets",
            done() { return player["a"].points.gte(2) }
        },
        2: {
            requirementDescription: "3 atoms",
            effectDescription: "keep core upgrades on atom resets",
            done() { return player["a"].points.gte(3) }
        },
        3: {
            requirementDescription: "4 atoms",
            effectDescription: "keep subatomic particle upgrades on atom resets",
            done() { return player["a"].points.gte(4) }
        },
        4: {
            requirementDescription: "5 atoms",
            effectDescription: "keep core milestones on atom resets",
            done() { return player["a"].points.gte(5) }
        },
        5: {
            requirementDescription: "6 atoms",
            effectDescription: "keep quark milestones on atom resets",
            done() { return player["a"].points.gte(6) }
        },
        6: {
            requirementDescription: "25 total atoms",
            effectDescription: "unlock a new demon soul challenge (coming soon)",
            done() { return player.a.total.gte(25) }
        },
    },
    upgrades: {
        11: {
            title: "The Demon of the Atom",
            description: "multiplies demon soul gain based on the amount of atoms you have",
            cost: new Decimal(1),
            effect() {
                return player["a"].points.add(1).pow(1.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            branches: [21, 22],
        },
        21: {
            title: "Decaying Atoms",
            description: "multiplies subatomic particle gain based on your best atoms",
            cost: new Decimal(2),
            effect() {
                return player.a.best.add(1).pow(2.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            branches: [31, 32],
            unlocked() {
                if (!hasUpgrade('a', 22)) return true
            },
        },
        22: {
            title: "Atom Construction",
            description: "multiplies atom gain based on the amount of subatomic particles you have",
            cost: new Decimal(2),
            effect() {
                return player["sp"].points.add(1).pow(0.02)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            branches: [32, 33],
            unlocked() {
                if (!hasUpgrade('a', 21)) return true
            },
        },
        31: {
            title: "Decayed Atoms",
            description: "multiplies subatomic particle gain based on your total atoms",
            cost: new Decimal(3),
            effect() {
                return player.a.total.add(1).pow(1.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            branches: [41],
            unlocked() {
                if (!hasUpgrade('a', 22) && !hasUpgrade('a', 32) && !hasUpgrade('a', 33)) return true
            },
        },
        32: {
            title: "Atomic Recursion",
            description: "multiplies atom gain based on your total atoms",
            cost: new Decimal(3),
            effect() {
                return player.a.total.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            branches: [41, 42],
            unlocked() {
                if (!hasUpgrade('a', 31) && !hasUpgrade('a', 33)) return true
            },
        },
        33: {
            title: "Atom Production",
            description: "multiplies atom gain based on the amount of subatomic particles you have",
            cost: new Decimal(3),
            effect() {
                return player["sp"].points.add(1).pow(0.025)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            branches: [42],
            unlocked() {
                if (!hasUpgrade('a', 21) && !hasUpgrade('a', 31) && !hasUpgrade('a', 33)) return true
            },
        },
        41: {
            title: "Atom Revenants",
            description: "multiplies quark gain based on your total atoms minus your current atoms",
            cost: new Decimal(4),
            effect() {
                return ((player.a.total - player["a"].points) ** 0.75)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            branches: [51],
            unlocked() {
                if (!hasUpgrade('a', 33) && !hasUpgrade('a', 42)) return true
            },
        },
        42: {
            title: "The Fallen",
            description: "multiplies demon soul gain based on your best atoms minus your current atoms",
            cost: new Decimal(4),
            effect() {
                return (((player.a.best * 1.5) - player["a"].points) ** 1.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            branches: [51],
            unlocked() {
                if (!hasUpgrade('a', 31) && !hasUpgrade('a', 41)) return true
            },
        },
        51: {
            title: "Famed Atoms' Donations",
            description: "multiplies subatomic particle gain based on your numeber of acievements",
            cost: new Decimal(5),
            branches: [61, 62],
            unlocked() { return true },
        },
        61: {
            title: "Unpeaked",
            description: "multiplies atom gain based on your total atoms minus your best atoms",
            cost: new Decimal(6),
            effect() {
                return ((player.a.total - player.a.best) ** 0.75)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            branches: [71, 72],
            unlocked() {
                if (!hasUpgrade('a', 62)) return true
            },
        },
        62: {
            title: "Higher Peak",
            description: "multiplies atom gain based on your total atoms times your current atoms",
            cost: new Decimal(6),
            effect() {
                return (((player.a.total / 1.5) * player["a"].points) ** 0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            branches: [72, 73],
            unlocked() {
                if (!hasUpgrade('a', 61)) return true
            },
        },
        71: {
            title: "Demons Inside",
            description: "multiplies demon soul gain based on your best atoms times your current atoms",
            cost: new Decimal(7),
            effect() {
                return ((player.a.best * player["a"].points * 2.5) ** 0.75)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {
                if (!hasUpgrade('a', 62) && !hasUpgrade('a', 72) && !hasUpgrade('a', 73)) return true
            },
        },
        72: {
            title: "Recurred, Recurring",
            description: "multiplies atom gain based on your total atoms",
            cost: new Decimal(7),
            effect() {
                return player.a.total.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {
                if (!hasUpgrade('a', 71) && !hasUpgrade('a', 73)) return true
            },
        },
        73: {
            title: "Atomic Essence",
            description: "multiplies essence gain based on the amount of atoms you have",
            cost: new Decimal(7),
            effect() {
                return player["a"].points.add(1).pow(1.75)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {
                if (!hasUpgrade('a', 61) && !hasUpgrade('a', 71) && !hasUpgrade('a', 72)) return true
            },
        },
    },
});
