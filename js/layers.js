addLayer("A", {
    name: "Achievements",
    symbol: "A",
    position: "side",
    color: "#d1d1d1",
    achievements: {
        11: {
            name: "First Essence",
            done() {return player["e"].points >= 1},
            tooltip: "obtain 1 essence.",
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
    branches: "c",
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
        mult = mult.times((getBuyableAmount('e', 11) * 2.5) + 1)
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
    upgrades: {
        11: {
            title: "Faster Points",
            description: "multiplies point gain by 1.5",
            cost: new Decimal(1),
        },
        12: {
            title: "Essence Influence",
            description: "multiplies point gain by the amount of essence you have",
            cost: new Decimal(2),
            effect() {
               return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "Influenced Essence",
            description: "multiplies essence gain by the amount of points you have",
            cost: new Decimal(5),
            effect() { 
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            title: "Point Recursion",
            description: "multiplies point gain by the amount of points you have",
            cost: new Decimal(750),
            effect() {
               return player.points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        22: {
            title: "Essence of Essence",
            description: "multiplies essence gain by the amount of essence you have",
            cost: new Decimal(2000),
            effect() {
               return player[this.layer].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        23: {
            title: "Recurring Recursion",
            description: "boosts the effect of Point Recursion by the amount of points you have",
            cost: new Decimal(4000),
            effect() {
               return player.points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
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
                return "multiplies essence gain by the amount of this upgrade bought.\nCurrently: " + ((getBuyableAmount('e', 11) * 2.5) + 1) + "x\n\nCost: " + (Math.pow(12, getBuyableAmount('e', 11)) + 20) + "\n\nBought: " + getBuyableAmount('e', 11)
            },
        },
    },
});

addLayer("c", {
    name: "Cores", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#C2C238",
    requires: new Decimal(15000), // Can be a function that takes requirement increases into account
    resource: "cores", // Name of prestige currency
    baseResource: "essence", // Name of resource prestige is based on
    baseAmount() {return player['e'].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
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
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Empowered Points",
            canAfford() { return player[this.layer].points.gte(this.cost(getBuyableAmount('c', 11)).add(1))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(getBuyableAmount('c', 11)).add(1))
                setBuyableAmount('c', 11, getBuyableAmount('c', 11).add(1))
            },
            display() {
                return "multiplies point gain by the amount of this upgrade bought.\nCurrently: " + (2 ** getBuyableAmount('c', 11)) + "x\n\nCost: " + getBuyableAmount('c', 11).add(1) + "\n\nBought: " + getBuyableAmount('c', 11)
            },
        },
        12: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Empowered Essence",
            canAfford() { return player[this.layer].points.gte(this.cost(getBuyableAmount('c', 12)).add(2))},
            purchaseLimit: new Decimal(3),
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(getBuyableAmount('c', 12)).add(2))
                setBuyableAmount('c', 12, getBuyableAmount('c', 12).add(2))
            },
            display() {
                return "multiplies essence gain by the amount of this upgrade bought.\nCurrently: " + (2 ** getBuyableAmount('c', 12)) + "x\n\nCost: " + getBuyableAmount('c', 12).add(2) + "\n\nBought: " + getBuyableAmount('c', 12)
            },
        },
    },
});
