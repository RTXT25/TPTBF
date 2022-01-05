addLayer("A", {
    startData() { return {
        unlocked: true,
    }},
    name: "Achievements",
    symbol: "A",
    position: "side",
    color: "#d1d1d1",
    layerShown() {return true},
    achievements: {
        11: {
            name: "First Essence",
            done() {return player["e"].points >= 1},
            tooltip: "obtain 1 essence.",
        },
        12: {
            name: "Much Essence",
            done() {return player["e"].points >= Math.pow(10, 10)},
            tooltip: "obtain 1e10 essence.",
        },
        21: {
            name: "First Core",
            done() {return player["c"].points >= 1},
            tooltip: "obtain 1 core.",
        },
        22: {
            name: "Many Cores",
            done() {return player["c"].points >= Math.pow(10, 10)},
            tooltip: "obtain 1e10 cores.",
        },
        31: {
            name: "First Quark",
            done() {return player["q"].points >= 1},
            tooltip: "obtain 1 quark.",
        },
        32: {
            name: "Lots of Quarks",
            done() {return player["q"].points >= Math.pow(10, 10)},
            tooltip: "obtain 1e10 quarks.",
        },
        41: {
            name: "First Subatomic Particle",
            done() {return player["sp"].points >= 1},
            tooltip: "obtain 1 subatomic particle.",
        },
        41: {
            name: "First Hex",
            done() {return player["h"].points >= 1},
            tooltip: "obtain 1 hex.",
        },
    },
});

addLayer("e", {
    name: "Essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#4BDC13",
    branches: ["c", "q"],
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "essence", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('e', 13)) mult = mult.times(upgradeEffect('e', 13))
        if (hasUpgrade('e', 22)) mult = mult.times(upgradeEffect('e', 22))
            if (hasUpgrade('e', 41)) mult = mult.times(upgradeEffect('e', 41))
                if (hasUpgrade('e', 42)) mult = mult.times(upgradeEffect('e', 42))
        if (hasUpgrade('e', 61)) mult = mult.times(upgradeEffect('e', 61))
            if (hasUpgrade('e', 62)) mult = mult.times(upgradeEffect('e', 62))
        if (hasUpgrade('c', 11)) mult = mult.times(upgradeEffect('c', 11))
        if (hasUpgrade('q', 14)) mult = mult.times(upgradeEffect('q', 14))
            if (hasUpgrade('q', 15)) mult = mult.times(upgradeEffect('q', 15))
        if (hasUpgrade('q', 32)) mult = mult.times(upgradeEffect('q', 32))
        mult = mult.times((getBuyableAmount('e', 11) * 2.5) + 1)
        mult = mult.times(Math.pow(getBuyableAmount('e', 12), 0.25) + 1)
        mult = mult.times(2 ** getBuyableAmount('c', 12))
        mult = mult.times(5 ** getBuyableAmount('sp', 12))
        mult = mult.times(((getBuyableAmount('sp', 11) * 1) + 1) ** -1)
        EssenceMult = mult
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
            if (layers[resettingLayer].row > this.row) layerDataReset("e", [ceU, ceB, qeU, qeB, speU, speB, heU, heB])
        },
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
               return player[this.layer].points.add(1).pow(0.1)
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
               return player[this.layer].points.add(1).pow(0.01)
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
               return player[this.layer].points.add(1).pow(0.002)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("q", 0) && hasUpgrade("e", 33) },
        },
        42: {
            title: "Essences to Infinity",
            description: "boosts the effect of Essence Recursion based on the amount of essence you have",
            cost: new Decimal(9.99e99),
            effect() {
               return player[this.layer].points.add(1).pow(0.02)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("q", 0) && hasUpgrade("e", 41) },
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Purer Essence",
            canAfford() { return player[this.layer].points.gte(this.cost(Math.pow(12, getBuyableAmount('e', 11)) + 20))},
            purchaseLimit: new Decimal(14),
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(Math.pow(12, getBuyableAmount('e', 11)) + 20))
                setBuyableAmount('e', 11, getBuyableAmount('e', 11).add(1))
            },
            display() {
                return "multiplies essence gain based on the amount of this upgrade bought.\nCurrently: " + ((getBuyableAmount('e', 11) * 2.5) + 1) + "x\n\nCost: " + (Math.pow(12, getBuyableAmount('e', 11)) + 20) + "\n\nBought: " + getBuyableAmount('e', 11)
            },
        },
        12: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Radiant Essence",
            canAfford() { return player[this.layer].points.gte(this.cost(10 * (Math.pow(44, getBuyableAmount('e', 12))) + 85184))},
            purchaseLimit: new Decimal(99),
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(10 * (Math.pow(44, getBuyableAmount('e', 12))) + 85184))
                setBuyableAmount('e', 12, getBuyableAmount('e', 12).add(1))
            },
            display() {
                return "multiplies core gain (and essence gain at a reduced rate) based on the amount of this upgrade bought.\nCurrently: " + ((getBuyableAmount('e', 12) * 1) + 1) + "x\nand " + (Math.pow(getBuyableAmount('e', 12), 0.25) + 1) + "x\n\nCost: " + (10 * (Math.pow(44, getBuyableAmount('e', 12))) + 85184) + "\n\nBought: " + getBuyableAmount('e', 12)
            },
        },
    },
});

addLayer("c", {
    name: "Cores", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#C2C238",
    branches: ["h"],
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "cores", // Name of prestige currency
    baseResource: "essence", // Name of resource prestige is based on
    baseAmount() {return player['e'].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('e', 32)) mult = mult.times(upgradeEffect('e', 32))
        if (hasUpgrade('e', 43)) mult = mult.times(upgradeEffect('e', 43))
        if (hasUpgrade('e', 61)) mult = mult.times(upgradeEffect('e', 61))
            if (hasUpgrade('e', 62)) mult = mult.times(upgradeEffect('e', 62))
        if (hasUpgrade('c', 12)) mult = mult.times(upgradeEffect('c', 12))
        if (hasUpgrade('q', 21)) mult = mult.times(upgradeEffect('q', 21))
            if (hasUpgrade('q', 22)) mult = mult.times(upgradeEffect('q', 22))
        if (hasUpgrade('q', 33)) mult = mult.times(upgradeEffect('q', 33))
        if (hasUpgrade('h', 13)) mult = mult.times(upgradeEffect('h', 13))
            if (hasUpgrade('h', 23)) mult = mult.times(upgradeEffect('h', 23))
                if (hasUpgrade('h', 33)) mult = mult.times(upgradeEffect('h', 33))
        if (hasUpgrade('h', 24)) mult = mult.times(3)
        mult = mult.times((getBuyableAmount('e', 12) * 1) + 1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for cores", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
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
            if (layers[resettingLayer].row > this.row) layerDataReset("c", [hcU, hcB, spcU, spcB, hcM, spcM])
        },
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
            cost: new Decimal(1e100),
            effect() {
               return player[this.layer].points.add(1).pow(0.005)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("c", 13) },
        },
        22: {
            title: "Quirky Core",
            description: "multiplies the effect of Quarky Core based on the amount of cores you have",
            cost: new Decimal(1e150),
            effect() {
               return player[this.layer].points.add(1).pow(0.002)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("c", 21) },
        },
        23: {
            title: "Ultra Core",
            description: "multiplies core gain based on the amount of cores you have",
            cost: new Decimal(1e200),
            effect() {
               return player[this.layer].points.add(1).pow(0.001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("c", 22) },
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Empowered Points",
            canAfford() { return player[this.layer].points.gte(this.cost(getBuyableAmount('c', 11)).add(1))},
            purchaseLimit: new Decimal(199),
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(getBuyableAmount('c', 11)).add(1))
                setBuyableAmount('c', 11, getBuyableAmount('c', 11).add(1))
            },
            display() {
                return "multiplies point gain based on the amount of this upgrade bought.\nCurrently: " + (2.5 * getBuyableAmount('c', 11) + 1) + "x\n\nCost: " + getBuyableAmount('c', 11).add(1) + "\n\nBought: " + getBuyableAmount('c', 11)
            },
        },
        12: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Empowered Essence",
            canAfford() { return player[this.layer].points.gte(this.cost(Math.pow(6, getBuyableAmount('c', 12))))},
            purchaseLimit: new Decimal(49),
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(Math.pow(6, getBuyableAmount('c', 12))))
                setBuyableAmount('c', 12, getBuyableAmount('c', 12).add(1))
            },
            display() {
                return "multiplies essence gain based on the amount of this upgrade bought.\nCurrently: " + (2 ** getBuyableAmount('c', 12)) + "x\n\nCost: " + Math.pow(6, getBuyableAmount('c', 12)) + "\n\nBought: " + getBuyableAmount('c', 12)
            },
        },
    },
});

addLayer("q", {
    name: "Quarks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Q", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#DB5196",
    branches: ["sp"],
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "quarks", // Name of prestige currency
    baseResource: "essence", // Name of resource prestige is based on
    baseAmount() {return player['e'].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('e', 51)) mult = mult.times(upgradeEffect('e', 51))
        if (hasUpgrade('e', 61)) mult = mult.times(upgradeEffect('e', 61))
            if (hasUpgrade('e', 62)) mult = mult.times(upgradeEffect('e', 62))
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
        mult = mult.times(5 ** getBuyableAmount('sp', 11))
        mult = mult.times(((getBuyableAmount('sp', 21) * 1) + 1) ** -1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
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
            if (layers[resettingLayer].row > this.row) layerDataReset("q", [spqM1, spqU1, hqM, spqM2, spqU2, hqU])
        },
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
               return player[this.layer].points.add(1).pow(0.9)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 11) },
        },
        13: {
            title: "Super Quarks",
            description: "multiplies the effect of Quark Power based on the amount of points you have",
            cost: new Decimal(25),
            effect() {
               return player.points.add(1).pow(0.025)
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
               return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 33) },
        },
        35: {
            title: "Quark Counting",
            description: "multiplies the effect of The Quark Count based on the amount of quarks you have",
            cost: new Decimal(1e13),
            effect() {
               return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("q", 34) },
        },
        41: {
            title: "Ticking Quarks",
            description: "multiplies the effect of Quark Counting based on the amount of quarks you have",
            cost: new Decimal(1e14),
            effect() {
               return player[this.layer].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasMilestone("sp", 2) && hasUpgrade("q", 35) },
        },
        42: {
            title: "Subatomic Quarks",
            description: "multiplies quark gain based on the amount of subatomic particles you have",
            cost: new Decimal(1e16),
            effect() {
               return player["sp"].points.add(1).pow(0.1)
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
    name: "Subatomic Particles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#710CC4",
    requires: new Decimal(5e13), // Can be a function that takes requirement increases into account
    resource: "subatomic particles", // Name of prestige currency
    baseResource: "quarks", // Name of resource prestige is based on
    baseAmount() {return player['q'].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 4.25, // Prestige currency exponent
    canBuyMax() {
        if (hasMilestone("sp", 0)) return true
        else return false
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        gain = new Decimal(1)
        if (hasUpgrade('q', 43)) gain = gain.times(upgradeEffect('q', 43))
        return gain
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for subatomic particles", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.q.unlocked},
    doReset(resettingLayer) {
        let keep = [];
            if (layers[resettingLayer].row > this.row) layerDataReset("sp", [])
        },
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
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Protons",
            canAfford() { return player[this.layer].points.gte(this.cost((getBuyableAmount('sp', 11) * 1) + 1))},
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
    name: "Hexes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#E36409",
    requires: new Decimal(1e60), // Can be a function that takes requirement increases into account
    resource: "hexes", // Name of prestige currency
    baseResource: "cores", // Name of resource prestige is based on
    baseAmount() {return player['c'].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('h', 12)) mult = mult.times(upgradeEffect('h', 12))
            if (hasUpgrade('h', 22)) mult = mult.times(upgradeEffect('h', 22))
                if (hasUpgrade('h', 32)) mult = mult.times(upgradeEffect('h', 32))
        if (hasUpgrade('h', 14)) mult = mult.times(4)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "H: Reset for hexes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.sp.unlocked},
    doReset(resettingLayer) {
        let keep = [];
            if (layers[resettingLayer].row > this.row) layerDataReset("h", [])
        },
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
            requirementDescription: "1,000 hexes",
            effectDescription: "keep core buyables on hex resets",
            done() { return player[this.layer].points.gte(1000) }
        },
        4: {
            requirementDescription: "25,000 hexes",
            effectDescription: "keep core upgrades and buyables on subatomic particle resets",
            done() { return player[this.layer].points.gte(25000) }
        },
        5: {
            requirementDescription: "750,000 hexes",
            effectDescription: "keep all row 2 milestones on row 3 resets",
            done() { return player[this.layer].points.gte(750000) }
        },
        6: {
            requirementDescription: "10,000,000 hexes",
            effectDescription: "keep quark upgrades on subatomic particle resets",
            done() { return player[this.layer].points.gte(10000000) }
        },
        7: {
            requirementDescription: "250,000,000 hexes",
            effectDescription: "keep quark upgrades on hex resets",
            done() { return player[this.layer].points.gte(250000000) }
        },
        8: {
            requirementDescription: "7.50e9 hexes",
            effectDescription: "you can explore 3 further core upgrades",
            done() { return player[this.layer].points.gte( new Decimal(7.5e9) ) }
        },
    },
    upgrades: {
        11: {
            title: "Hex Leak",
            description: "multiplies point gain based on the amount of hexes you have",
            cost: new Decimal(1),
            effect() {
               return player[this.layer].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        12: {
            title: "Stronger Hexes",
            description: "multiplies hex gain based on the amount of hexes you have",
            cost: new Decimal(5),
            effect() {
               return player[this.layer].points.add(1).pow(0.015)
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
               return player[this.layer].points.add(1).pow(0.02)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 11) && hasUpgrade("h", 12) && hasUpgrade("h", 13) && hasUpgrade("h", 14) },
        },
        22: {
            title: "Super Strong Hexes",
            description: "multiplies the effect of Stronger Hexes based on the amount of hexes you have",
            cost: new Decimal(5000),
            effect() {
               return player[this.layer].points.add(1).pow(0.075)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 11) && hasUpgrade("h", 12) && hasUpgrade("h", 13) && hasUpgrade("h", 14) },
        },
        23: {
            title: "Hex Fission",
            description: "multiplies the effect of Hex Fusion based on the amount of hexes you have",
            cost: new Decimal(10000),
            effect() {
               return player[this.layer].points.add(1).pow(0.125)
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
            cost: new Decimal(1000000),
            effect() {
               return player.points.add(1).pow(0.001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 21) && hasUpgrade("h", 22) && hasUpgrade("h", 23) && hasUpgrade("h", 24) },
        },
        32: {
            title: "Extreme Hexes",
            description: "multiplies the effect of Super Strong Hexes based on the amount of hexes you have",
            cost: new Decimal(5000000),
            effect() {
               return player[this.layer].points.add(1).pow(0.001)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 21) && hasUpgrade("h", 22) && hasUpgrade("h", 23) && hasUpgrade("h", 24) },
        },
        33: {
            title: "Core of Hexes",
            description: "multiplies the effect of Hex Fission based on the amount of cores you have",
            cost: new Decimal(10000000),
            effect() {
               return player[this.layer].points.add(1).pow(0.002)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("h", 21) && hasUpgrade("h", 22) && hasUpgrade("h", 23) && hasUpgrade("h", 24) },
        },
        34: {
            title: "Boost Quarks",
            description: "Quark gain is doubled",
            cost: new Decimal(25000000),
            unlocked() { return hasUpgrade("h", 21) && hasUpgrade("h", 22) && hasUpgrade("h", 23) && hasUpgrade("h", 24) },
        },
    },
});
