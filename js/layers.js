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
        21: {
            name: "First Core",
            done() {return player["c"].points >= 1},
            tooltip: "obtain 1 core.",
        },
        31: {
            name: "First Quark",
            done() {return player["q"].points >= 1},
            tooltip: "obtain 1 quark.",
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
        mult = mult.times((getBuyableAmount('e', 12) * 0.1) + 1)
        mult = mult.times(2 ** getBuyableAmount('c', 12))
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
        doReset(resettingLayer) {
            let keep = [];
            if (hasMilestone("c", 0) && resettingLayer=="c") AA = "upgrades"
            else AA = ""
            if (hasMilestone("c", 2) && resettingLayer=="c") AB = "buyables"
            else AB = ""
            if (layers[resettingLayer].row > this.row) layerDataReset("e", [AA, AB])
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
            unlocked() { return hasMilestone("q", 0) },
        },
        32: {
            title: "Brilliant Essence",
            description: "boosts the effect of Radiant Essence based on the amount of essence you have",
            cost: new Decimal(3.33e33),
            effect() {
               return player[this.layer].points.add(1).pow(0.005)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("e", 31) },
        },
        33: {
            title: "Essence Network",
            description: "boosts the effect of Essence Influence based on the amount of essence you have",
            cost: new Decimal(5.55e55),
            effect() {
               return player[this.layer].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("e", 32) },
        },
        41: {
            title: "Essence Recursion",
            description: "boosts the effect of Essence of Essence based on the amount of essence you have",
            cost: new Decimal(7.77e77),
            effect() {
               return player[this.layer].points.add(1).pow(0.002)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("e", 33) },
        },
        42: {
            title: "Essences to Infinity",
            description: "boosts the effect of Essence Recursion based on the amount of essence you have",
            cost: new Decimal(9.99e99),
            effect() {
               return player[this.layer].points.add(1).pow(0.02)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("e", 41) },
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
                return "multiplies core gain (and essence gain at a reduced rate) based on the amount of this upgrade bought.\nCurrently: " + ((getBuyableAmount('e', 12) * 1) + 1) + "x\nand " + ((getBuyableAmount('e', 12) * 0.1) + 1) + "x\n\nCost: " + (10 * (Math.pow(44, getBuyableAmount('e', 12))) + 85184) + "\n\nBought: " + getBuyableAmount('e', 12)
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
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: Reset for quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    milestones: {
    0: {
        requirementDescription: "5 quarks",
        effectDescription: "you can explore further essence upgrades",
        done() { return player[this.layer].points.gte(5) }
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
        },
        13: {
            title: "Super Quarks",
            description: "multiplies the effect of Quark Power based on the amount of points you have",
            cost: new Decimal(10),
            effect() {
               return player.points.add(1).pow(0.025)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Essence of Quarks",
            description: "Quark Power also affects essence gain at a reduced rate (super quarks does not affect this)",
            cost: new Decimal(50),
            effect() {
               return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            title: "Quark Fusion",
            description: "multiplies the effect of Essence of Quarks based on the amount of cores you have",
            cost: new Decimal(2500),
            effect() {
               return player['c'].points.add(1).pow(0.02)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            title: "Quirky Quarks",
            description: "multiplies core gain and quark gain based on the amount of quarks you have",
            cost: new Decimal(125000),
            effect() {
               return player[this.layer].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        22: {
            title: "Very Quirky",
            description: "multiplies the effect of Quirky Quarks based on the amount of points you have",
            cost: new Decimal(6250000),
            effect() {
               return player.points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        23: {
            title: "Quark Extreme",
            description: "Quark Power also affects quark gain at a reduced rate (super quarks does not affect this)",
            cost: new Decimal(312500000),
            effect() {
               return player[this.layer].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        24: {
            title: "Recurring Quarks",
            description: "multiplies the effect of Quark Extreme based on the amount of quarks you have",
            cost: new Decimal(15625000000),
            effect() {
               return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        25: {
            title: "Recurring More",
            description: "multiplies the effect of Recurring Quarks based on the amount of quarks you have",
            cost: new Decimal(781250000000),
            effect() {
               return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        31: {
            title: "Infinite Recur",
            description: "multiplies the effect of Recurring More based on the amount of quarks you have",
            cost: new Decimal(39062500000000),
            effect() {
               return player[this.layer].points.add(1).pow(0.35)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        32: {
            title: "Compact Quarks",
            description: "multiplies essence gain based on the amount of quarks you have",
            cost: new Decimal(1.953125e15),
            effect() {
               return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        33: {
            title: "Quark Fission",
            description: "multiplies core gain based on the amount of quarks you have",
            cost: new Decimal(4.8828125e18),
            effect() {
               return player[this.layer].points.add(1).pow(0.075)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        34: {
            title: "The Quark Count",
            description: "multiplies point gain based on the amount of quarks you have",
            cost: new Decimal(1.220703125e22),
            effect() {
               return player[this.layer].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        35: {
            title: "Quark Counting",
            description: "multiplies the effect of The Quark Count based on the amount of quarks you have",
            cost: new Decimal(1.525878906e27),
            effect() {
               return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
});
