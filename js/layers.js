addLayer("A", {
    name: "Achievements",
    symbol: "A",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#A5BCC2",
    resource: "achievements",
    row: "side",
    layerShown() {return true},
    tooltip() {return "Achievements"},
    effectDescription() {
        text = ["<br>", "", ""];
        if (colorvalue[1] == "none") {
            if (hasUpgrade("ds", 21)) {
                if (hasUpgrade('ds', 24)) text[0] += 'which are multiplying your point and essence gain by ' + format(player.A.points.mul(0.2)) + 'x';
                else text[1] += 'and also multiplying essence gain by ' + format(player.A.points.mul(0.2)) + 'x';
                if (hasUpgrade("ds", 23) && !hasUpgrade("ds", 24) && !hasUpgrade("p", 31)) text[2] += 'addtionally, also multiplying core and quark gain by ' + format(player.A.points.pow(2).div(100)) + 'x';
                if (hasUpgrade("ds", 23) && hasUpgrade("ds", 24) && !hasUpgrade("p", 31)) text[1] += 'and also multiplying core and quark gain by ' + format(player.A.points.pow(2).div(100)) + 'x';
                if (hasUpgrade("ds", 23) && hasUpgrade("ds", 24) && hasUpgrade("p", 31)) text[1] += 'and also multiplying core, prayer, and quark gain by ' + format(player.A.points.pow(2).div(100)) + 'x';
            } else text[0] += 'which are multiplying your point gain by ' + format(player.A.points.mul(0.1).add(1)) + 'x';
            if (hasUpgrade('a', 51)) text[2] += 'additionally, also multiplying subatomic particle gain by ' + format(player.A.points.pow(1.25)) + 'x';
        } else {
            if (hasUpgrade("ds", 21)) {
                if (hasUpgrade('ds', 24)) text[0] += 'which are multiplying your point and essence gain by <h2 class="layer-A">' + format(player.A.points.mul(0.2)) + '</h2>x';
                else text[1] += 'and also multiplying essence gain by <h2 class="layer-A">' + format(player.A.points.mul(0.2)) + '</h2>x';
                if (hasUpgrade("ds", 23) && !hasUpgrade("ds", 24) && !hasUpgrade("p", 31)) text[2] += 'addtionally, also multiplying core and quark gain by <h2 class="layer-A">' + format(player.A.points.pow(2).div(100)) + '</h2>x';
                if (hasUpgrade("ds", 23) && hasUpgrade("ds", 24) && !hasUpgrade("p", 31)) text[1] += 'and also multiplying core and quark gain by <h2 class="layer-A">' + format(player.A.points.pow(2).div(100)) + '</h2>x';
                if (hasUpgrade("ds", 23) && hasUpgrade("ds", 24) && hasUpgrade("p", 31)) text[1] += 'and also multiplying core, prayer, and quark gain by <h2 class="layer-A">' + format(player.A.points.pow(2).div(100)) + '</h2>x';
            } else text[0] += 'which are multiplying your point gain by <h2 class="layer-A">' + format(player.A.points.mul(0.1).add(1)) + '</h2>x';
            if (hasUpgrade('a', 51))text[2] += 'additionally, also multiplying subatomic particle gain by <h2 class="layer-A">' + format(player.A.points.pow(1.25)) + '</h2>x';
        };
        if (player.nerdMode) {
            if (hasUpgrade("ds", 21)) {
                if (hasUpgrade('ds', 24)) text[0] += ' (formula: x*0.2)';
                else text[1] += ' (formula: x*0.2)';
                if (hasUpgrade("ds", 23) && !hasUpgrade("ds", 24) && !hasUpgrade("p", 31)) text[2] += ' (formula: x^2/100)';
                if (hasUpgrade("ds", 23) && hasUpgrade("ds", 24)) text[1] += ' (formula: x^2/100)';
            } else text[0] += ' (formula: x*0.1+1)';
            if (hasUpgrade('a', 51)) text[2] += ' (formula: x^1.25)';
        };
        fintext = text[0];
        if (text[1]) fintext += "<br>";
        fintext += text[1];
        if (text[2]) fintext += "<br>";
        fintext += text[2];
        return fintext;
    },
    update(diff) {
        player.A.points = new Decimal(player.A.achievements.length);
    },
    tabFormat: [
        "main-display",
        "achievements",
    ],
    achievements: {
        11: {
            name: "The Point",
            done() {return player.points.gte(1)},
            tooltip: "obtain 1 point.",
            image() { if (hasAchievement("A", 11)) return "images/achievements/11.png" },
        },
        12: {
            name: "Very Pointy",
            done() {return player.points.gte(1e10)},
            tooltip: "obtain 1e10 points.",
            unlocked() { if (hasAchievement("A", 11)) return true },
            image() { if (hasAchievement("A", 12)) return "images/achievements/12.png" },
        },
        13: {
            name: "Now That's Really Pointy",
            done() {return player.points.gte(1e100)},
            tooltip: "obtain 1e100 points.",
            unlocked() { if (hasAchievement("A", 12)) return true },
            image() { if (hasAchievement("A", 13)) return "images/achievements/13.png" },
        },
        14: {
            name: "Cosmic Point",
            done() {return player.points.gte("1e1000")},
            tooltip: "obtain 1e1,000 points.",
            unlocked() { if (hasAchievement("A", 13)) return true },
            image() { if (hasAchievement("A", 14)) return "images/achievements/14.png" },
        },
        15: {
            name: "The Point of Everything",
            done() {return player.points.gte("1e10000")},
            tooltip: "obtain 1e10,000 points.",
            unlocked() { if (hasAchievement("A", 14)) return true },
        },
        16: {
            name: "Dull Points",
            done() {return player.e.points.eq(0) && player.points.gte(1e10)},
            tooltip: "obtain 1e10 points with no essence.",
            unlocked() { if (hasAchievement("A", 12) && hasAchievement("A", 21)) return true },
            image() { if (hasAchievement("A", 16)) return "images/achievements/16.png" },
        },
        21: {
            name: "Essence of Rat",
            done() {return player.e.points.gte(1)},
            tooltip: "obtain 1 essence.",
            unlocked() { if (hasAchievement("A", 21)) return true },
            image() { if (hasAchievement("A", 21)) return "images/achievements/21.png" },
        },
        22: {
            name: "Essence Cluster",
            done() {return player.e.points.gte(1e10)},
            tooltip: "obtain 1e10 essence.",
            unlocked() { if (hasAchievement("A", 21)) return true },
            image() { if (hasAchievement("A", 22)) return "images/achievements/22.png" },
        },
        23: {
            name: "Gleaming, Golden Essence",
            done() {return player.e.points.gte(1e100)},
            tooltip: "obtain 1e100 essence.",
            unlocked() { if (hasAchievement("A", 22)) return true },
            image() { if (hasAchievement("A", 23)) return "images/achievements/23.png" },
        },
        24: {
            name: "Essence of the Universe",
            done() {return player.e.points.gte("1e1000")},
            tooltip: "obtain 1e1,000 essence.",
            unlocked() { if (hasAchievement("A", 23)) return true },
            image() { if (hasAchievement("A", 24)) return "images/achievements/24.png" },
        },
        25: {
            name: "Essence of all Essence",
            done() {return player.e.points.gte("1e10000")},
            tooltip: "obtain 1e10,000 essence.",
            unlocked() { if (hasAchievement("A", 24)) return true },
        },
        26: {
            name: "Empty Soul",
            done() {return getBuyableAmount("e", 11).eq(0) && getBuyableAmount("e", 12).eq(0) && player.e.points .gte(1e10)},
            tooltip: "obtain 1e10 essence with no essence buyables.",
            unlocked() {if (hasAchievement("A", 22) && hasAchievement("A", 31)) return true },
            image() { if (hasAchievement("A", 26)) return "images/achievements/26.png" },
        },
        31: {
            name: "Cracked Core",
            done() {return player.c.points.gte(1)},
            tooltip: "obtain 1 core.",
            unlocked() { if (hasAchievement("A", 31)) return true },
            image() { if (hasAchievement("A", 31)) return "images/achievements/31.png" },
        },
        32: {
            name: "Mountainous Core",
            done() {return player.c.points.gte(1e10)},
            tooltip: "obtain 1e10 cores.",
            unlocked() { if (hasAchievement("A", 31)) return true },
            image() { if (hasAchievement("A", 32)) return "images/achievements/32.png" },
        },
        33: {
            name: "Core of the Earth",
            done() {return player.c.points.gte(1e100)},
            tooltip: "obtain 1e100 cores.",
            unlocked() { if (hasAchievement("A", 32)) return true },
            image() { if (hasAchievement("A", 33)) return "images/achievements/33.png" },
        },
        34: {
            name: "Core of the Sun",
            done() {return player.c.points.gte("1e1000")},
            tooltip: "obtain 1e1,000 cores.",
            unlocked() { if (hasAchievement("A", 33)) return true },
            image() { if (hasAchievement("A", 34)) return "images/achievements/34.png" },
        },
        35: {
            name: "Core of Truth",
            done() {return player.c.points.gte("1e10000")},
            tooltip: "obtain 1e10,000 cores.",
            unlocked() { if (hasAchievement("A", 34)) return true },
        },
        36: {
            name: "Pointless Core",
            done() {return getBuyableAmount("c", 11).eq(0) && getBuyableAmount("c", 12).eq(0) && player.q.points.eq(0) && player.c.points.gte(1e10)},
            tooltip: "obtain 1e10 cores with no core buyables and quarks.",
            unlocked() { if (hasAchievement("A", 32) && hasAchievement("A", 41)) return true },
            image() { if (hasAchievement("A", 36)) return "images/achievements/36.png" },
        },
        41: {
            name: "The Smallest Quark",
            done() {return player.q.points.gte(1)},
            tooltip: "obtain 1 quark.",
            unlocked() { if (hasAchievement("A", 41)) return true },
            image() { if (hasAchievement("A", 41)) return "images/achievements/41.png" },
        },
        42: {
            name: "Quark Field",
            done() {return player.q.points .gte(1e10)},
            tooltip: "obtain 1e10 quarks.",
            unlocked() { if (hasAchievement("A", 41)) return true },
            image() { if (hasAchievement("A", 42)) return "images/achievements/42.png" },
        },
        43: {
            name: "Oh, the Quark of it all",
            done() {return player.q.points.gte(1e100)},
            tooltip: "obtain 1e100 quarks.",
            unlocked() { if (hasAchievement("A", 42)) return true },
            image() { if (hasAchievement("A", 43)) return "images/achievements/43.png" },
        },
        44: {
            name: "Quirky Quarks",
            done() {return player.q.points.gte("1e1000")},
            tooltip: "obtain 1e1,000 quarks.",
            unlocked() { if (hasAchievement("A", 43)) return true },
            image() { if (hasAchievement("A", 44)) return "images/achievements/44.png" },
        },
        45: {
            name: "Impossible Quarks",
            done() {return player.q.points.gte("1e10000")},
            tooltip: "obtain 1e10,000 quarks.",
            unlocked() { if (hasAchievement("A", 44)) return true },
        },
        46: {
            name: "The Outside",
            done() {return player.c.points.eq(0) && player.q.points.gte(1e10)},
            tooltip: "obtain 1e10 quarks with no cores.",
            unlocked() { if (hasAchievement("A", 42) && hasAchievement("A", 51)) return true },
            image() { if (hasAchievement("A", 46)) return "images/achievements/46.png" },
        },
        51: {
            name: "Submarine, Subatomic",
            done() {return player.sp.points.gte(1)},
            tooltip: "obtain 1 subatomic particle.",
            unlocked() { if (hasAchievement("A", 51)) return true },
            image() { if (hasAchievement("A", 51)) return "images/achievements/51.png" },
        },
        52: {
            name: "Variant Particles",
            done() {return player.sp.points.gte(100)},
            tooltip: "obtain 100 subatomic particles.",
            unlocked() { if (hasAchievement("A", 51)) return true },
            image() { if (hasAchievement("A", 52)) return "images/achievements/52.png" },
        },
        53: {
            name: "Periodic Particles",
            done() {return player.sp.points.gte(10000)},
            tooltip: "obtain 10,000 subatomic particles.",
            unlocked() { if (hasAchievement("A", 52)) return true },
            image() { if (hasAchievement("A", 53)) return "images/achievements/53.png" },
        },
        54: {
            name: "That's no Particle no More",
            done() {return player.sp.points.gte(1000000)},
            tooltip: "obtain 1,000,000 subatomic particles.",
            unlocked() { if (hasAchievement("A", 53)) return true },
            image() { if (hasAchievement("A", 54)) return "images/achievements/54.png" },
        },
        55: {
            name: "Anti Dark Matter",
            done() {return player.sp.points.gte(1e10)},
            tooltip: "obtain 1e10 subatomic particles.",
            unlocked() { if (hasAchievement("A", 54)) return true },
            image() { if (hasAchievement("A", 55)) return "images/achievements/55.png" },
        },
        56: {
            name: "Hollow Particles",
            done() {return getBuyableAmount("sp", 11).eq(0) && getBuyableAmount("sp", 12).eq(0) && getBuyableAmount("sp", 21).eq(0) && player.h.points.eq(0) && player.sp.points.gte(10)},
            tooltip: "obtain 10 subatomic particles with no subatomic particle buyables and hexes.",
            unlocked() { if (hasAchievement("A", 52) && hasAchievement("A", 61)) return true },
            image() { if (hasAchievement("A", 56)) return "images/achievements/56.png" },
        },
        61: {
            name: "The Hex Game",
            done() {return player.h.points.gte(1)},
            tooltip: "obtain 1 hex.",
            unlocked() { if (hasAchievement("A", 61)) return true },
            image() { if (hasAchievement("A", 61)) return "images/achievements/61.png" },
        },
        62: {
            name: "Cursed into Oblivion",
            done() {return player.h.points.gte(1e10)},
            tooltip: "obtain 1e10 hexes.",
            unlocked() { if (hasAchievement("A", 61)) return true },
            image() { if (hasAchievement("A", 62)) return "images/achievements/62.png" },
        },
        63: {
            name: "The Prophecy of Doom",
            done() {return player.h.points.gte(1e100)},
            tooltip: "obtain 1e100 hexes.",
            unlocked() { if (hasAchievement("A", 62)) return true },
            image() { if (hasAchievement("A", 63)) return "images/achievements/63.png" },
        },
        64: {
            name: "The Advent of the End",
            done() {return player.h.points.gte("1e1000")},
            tooltip: "obtain 1e1,000 hexes.",
            unlocked() { if (hasAchievement("A", 63)) return true },
            image() { if (hasAchievement("A", 64)) return "images/achievements/64.png" },
        },
        65: {
            name: "Nihilism: Nothing is There",
            done() {return player.h.points.gte("1e10000")},
            tooltip: "obtain 1e10,000 hexes.",
            unlocked() { if (hasAchievement("A", 64)) return true },
        },
        66: {
            name: "Same Old Tricks",
            done() {return getBuyableAmount("c", 11).eq(0) && getBuyableAmount("c", 12).eq(0) && player.sp.points.eq(0) && player.h.points.gte(1e10)},
            tooltip: "obtain 1e10 hexes with no subatomic particles and core buyables.",
            unlocked() { if (hasAchievement("A", 62) && hasAchievement("A", 71)) return true },
        },
        71: {
            name: "Demon Spirits",
            done() {return player.ds.points.gte(1)},
            tooltip: "obtain 1 demon soul.",
            unlocked() { if (hasAchievement("A", 71)) return true },
            image() { if (hasAchievement("A", 71)) return "images/achievements/71.png" },
        },
        72: {
            name: "Demonic Ruin",
            done() {return player.ds.points.gte(1e9)},
            tooltip: "obtain 1e9 demon souls.",
            unlocked() { if (hasAchievement("A", 71)) return true },
            image() { if (hasAchievement("A", 72)) return "images/achievements/72.png" },
        },
        73: {
            name: "Demonic Origin",
            done() {return player.ds.points.gte(1e80)},
            tooltip: "obtain 1e80 demon souls.",
            unlocked() { if (hasAchievement("A", 72)) return true },
        },
        74: {
            name: "Demon Dimension",
            done() {return player.ds.points.gte("1e700")},
            tooltip: "obtain 1e700 demon souls.",
            unlocked() { if (hasAchievement("A", 73)) return true },
        },
        76: {
            name: "Occult Uprising",
            done() {return getBuyableAmount("ds", 11).eq(0) && player.a.points.eq(0) && player.ds.points.gte(1e10)},
            tooltip: "obtain 1e10 demon souls with no demon soul buyables and atoms.",
            unlocked() { if (hasAchievement("A", 72) && hasAchievement("A", 81)) return true },
        },
        81: {
            name: "Atomic Mass",
            done() {return player.a.points.gte(1)},
            tooltip: "obtain 1 atom.",
            unlocked() { if (hasAchievement("A", 81)) return true },
            image() { if (hasAchievement("A", 81)) return "images/achievements/81.png" },
        },
        82: {
            name: "Atomic Movement",
            done() {return player.a.points.gte(10)},
            tooltip: "obtain 10 atoms.",
            unlocked() { if (hasAchievement("A", 81)) return true },
            image() { if (hasAchievement("A", 82)) return "images/achievements/82.png" },
        },
        83: {
            name: "Masses of Atoms",
            done() {return player.a.points.gte(1000)},
            tooltip: "obtain 1,000 atoms.",
            unlocked() { if (hasAchievement("A", 82)) return true },
            image() { if (hasAchievement("A", 83)) return "images/achievements/83.png" },
        },
        84: {
            name: "Atom Grams (as seen on TV!)",
            done() {return player.a.points.gte(10000)},
            tooltip: "obtain 10,000 atoms.",
            unlocked() { if (hasAchievement("A", 83)) return true },
        },
        85: {
            name: "Atoms Made of Atoms",
            done() {return player.a.points.gte(1000000)},
            tooltip: "obtain 1,000,000 atoms.",
            unlocked() { if (hasAchievement("A", 84)) return true },
        },
        86: {
            name: "For Science!",
            done() {return player.ds.points.eq(0) && player.a.points.gte(10)},
            tooltip: "obtain 10 atoms with no demon souls.",
            unlocked() { if (hasAchievement("A", 82) && hasAchievement("A", 91)) return true },
        },
        91: {
            name: "Praise the Lord",
            done() {return player.p.points.gte(1)},
            tooltip: "obtain 1 prayer.",
            unlocked() { if (hasAchievement("A", 91)) return true },
        },
        92: {
            name: "Church Prayer Circle",
            done() {return player.p.points.gte(1e10)},
            tooltip: "obtain 1e10 prayers.",
            unlocked() { if (hasAchievement("A", 91)) return true },
        },
        93: {
            name: "Prayers all around",
            done() {return player.p.points.gte(1e100)},
            tooltip: "obtain 1e100 prayers.",
            unlocked() { if (hasAchievement("A", 92)) return true },
        },
        94: {
            name: "Global Prayers",
            done() {return player.p.points.gte("1e1000")},
            tooltip: "obtain 1e1,000 prayers.",
            unlocked() { if (hasAchievement("A", 93)) return true },
        },
        96: {
            name: "Persistence",
            done() {return player.p.points.gte(1e10) && player.h.points.eq(0) && player.sp.points.eq(0) && player.s.points.eq(0)},
            tooltip: "obtain 1e10 prayers with no hexes, subatomic particles, and sanctums.",
            unlocked() { if (hasAchievement("A", 92) && hasAchievement("A", 101)) return true },
        },
        101: {
            name: "Church Sanctum",
            done() {return player.s.points.gte(1)},
            tooltip: "obtain 1 sanctum.",
            unlocked() { if (hasAchievement("A", 101)) return true },
        },
        102: {
            name: "Shrine Blessings",
            done() {return player.s.points.gte(10)},
            tooltip: "obtain 10 sanctums.",
            unlocked() { if (hasAchievement("A", 101)) return true },
        },
        103: {
            name: "Greatest Sanctum",
            done() {return player.s.points.gte(100)},
            tooltip: "obtain 100 sanctums.",
            unlocked() { if (hasAchievement("A", 102)) return true },
        },
        111: {
            name: "Ancient Relic",
            done() {return player.r.points.gte(1)},
            tooltip: "obtain 1 relic.",
            unlocked() { if (hasAchievement("A", 111)) return true },
        },
        112: {
            name: "Relic Stash",
            done() {return player.r.points.gte(10)},
            tooltip: "obtain 10 relics.",
            unlocked() { if (hasAchievement("A", 111)) return true },
        },
    },
});

addLayer("ghost0", {
    position: 1,
    row: "side",
    layerShown() {return "ghost"},
});

addLayer("SC", {
    name: "Softcaps",
    symbol: "SC",
    position: 2,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        softcaps: [],
    }},
    color: "#DFDFDF",
    resource: "discovered softcaps",
    row: "side",
    layerShown() {return player.SC.points > 0},
    tooltip() {return "Softcaps"},
    effectDescription() {
        core = 0;
        quark = 0;
        hex = 0;
        divine = 0;
        text = ["of which "];
        textfin = "";
        textvalue = 0;
        if (player.SC.softcaps.includes("c1")) {
            core += 1;
        };
        if (player.SC.softcaps.includes("q1")) {
            quark += 1;
        };
        if (player.SC.softcaps.includes("h1")) {
            hex += 1;
        };
        if (player.SC.softcaps.includes("p-d1")) {
            divine += 1;
        };
        if (colorvalue[1] == "none") {
            if (core > 0) {
                text.push(core + ' is core</h2>');
            };
            if (quark > 0) {
                text.push(quark + ' is quark</h2>');
            };
            if (hex > 0) {
                text.push(hex + ' is hexed</h2>');
            };
            if (divine > 0) {
                text.push(divine + ' is divine</h2>');
            };
        } else {
            if (core > 0) {
                text.push('<h2 class="layer-c">' + core + '</h2> is <h2 class="layer-c">core</h2>');
            };
            if (quark > 0) {
                text.push('<h2 class="layer-q">' + quark + '</h2> is <h2 class="layer-q">quirky</h2>');
            };
            if (hex > 0) {
                text.push('<h2 class="layer-h">' + hex + '</h2> is <h2 class="layer-h">hexed</h2>');
            };
            if (divine > 0) {
                text.push('<h2 class="layer-p">' + divine + '</h2> is <h2 class="layer-p">divine</h2>');
            };
        };
        textfin = text[0];
        if (text.length > 1) {
            textfin += text[1];
        };
        if (text.length > 2) {
            if (text.length == 3) textfin += " and ";
            else textfin += ", ";
            textfin += text[2];
        };
        if (text.length > 3) {
            if (text.length == 4) textfin += ", and ";
            else textfin += ", ";
            textfin += text[3];
        };
        if (text.length > 4) {
            if (text.length == 5) textfin += ", and ";
            else textfin += ", ";
            textfin += text[4];
        };
        return textfin;
    },
    update(diff) {
        if (player.c.points.gte(layers.c.softcap) && !player.SC.softcaps.includes("c1")) {
            player.SC.softcaps.push("c1");
        };
        if (player.q.points.gte(layers.q.softcap) && !player.SC.softcaps.includes("q1")) {
            player.SC.softcaps.push("q1");
        };
        if (player.h.points.gte(layers.h.softcap) && !player.SC.softcaps.includes("h1")) {
            player.SC.softcaps.push("h1");
        };
        if (player.p.divinity.gte(player.p.divinitysoftcap_start[0]) && !player.SC.softcaps.includes("p-d1")) {
            player.SC.softcaps.push("p-d1");
        };
        player.SC.points = new Decimal(player.SC.softcaps.length);
    },
    tabFormat: [
        "main-display",
        ["display-text",
            function() {
                text = '';
                if (player.SC.softcaps.includes("c1")) text += '<br><h2 class="layer-c">Core Gain Softcap</h2><br>starts at ' + format(layers.c.softcap) + ', gain to ^' + layers.c.softcapPower + '<br>';
                if (player.SC.softcaps.includes("q1")) text += '<br><h2 class="layer-q">Quark Gain Softcap</h2><br>starts at ' + format(layers.q.softcap) + ', gain to ^' + layers.q.softcapPower + '<br>';
                if (player.SC.softcaps.includes("h1")) text += '<br><h2 class="layer-h">Hex Gain Softcap</h2><br>starts at ' + format(layers.h.softcap) + ', gain to ^' + layers.h.softcapPower + '<br>';
                if (player.SC.softcaps.includes("p-d1")) text += '<br><h2 class="layer-p">Divinity Gain Softcap</h2><br>starts at ' + format(player.p.divinitysoftcap_start[0]) + ', gain to ^' + player.p.divinitysoftcap_power[0] + '<br>';
                return text;
            }],
    ],
});

addLayer("e", {
    name: "Essence",
    symbol: "E",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#4CED13",
    branches: ["c", "q", "p"],
    requires: new Decimal(5),
    resource: "essence",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1);
        if (hasUpgrade('e', 13)) mult = mult.mul(upgradeEffect('e', 13));
        if (hasUpgrade('e', 22)) {
            mult = mult.mul(upgradeEffect('e', 22));
            if (hasUpgrade('e', 41)) {
                mult = mult.mul(upgradeEffect('e', 41));
                if (hasUpgrade('e', 42)) mult = mult.mul(upgradeEffect('e', 42));
        }};
        if (hasUpgrade('c', 11)) mult = mult.mul(upgradeEffect('c', 11));
        if (hasUpgrade('q', 12) && hasUpgrade('q', 14)) {
            mult = mult.mul(upgradeEffect('q', 14));
            if (hasUpgrade('q', 15)) mult = mult.mul(upgradeEffect('q', 15));
        };
        if (hasUpgrade('q', 32)) mult = mult.mul(upgradeEffect('q', 32));
        if (hasUpgrade('a', 73)) mult = mult.mul(upgradeEffect('a', 73));
        if (hasUpgrade('p', 11)) mult = mult.mul(upgradeEffect('p', 11));
        if (getBuyableAmount('e', 11).gt(0)) mult = mult.mul(getBuyableAmount('e', 11).mul(2.5).add(1));
        if (getBuyableAmount('e', 12).gt(0)) mult = mult.mul(getBuyableAmount('e', 12).mul(0.25).add(1));
        if (getBuyableAmount('c', 12).gt(0)) mult = mult.mul(new Decimal(2).pow(getBuyableAmount('c', 12)));
        if (getBuyableAmount('sp', 12).gt(0)) {
            mult = mult.mul(new Decimal(5).pow(getBuyableAmount('sp', 12)));
            if (hasUpgrade('sp', 12)) mult = mult.mul(new Decimal(5).pow(getBuyableAmount('sp', 12)));
        };
        if (getBuyableAmount('sp', 11).gt(0)) mult = mult.mul(getBuyableAmount('sp', 11).add(1).pow(-1));
        if (hasUpgrade('p', 22)) mult = mult.mul(player.p.holiness.add(1).pow(0.055));
        if (player.s.points.gt(0)) mult = mult.mul(tmp.s.effect);
        if (player.r.points.gt(0)) mult = mult.mul(player.r.essencemult);
        if (hasUpgrade('ds', 21)) mult = mult.mul(player.A.points.mul(0.2));
        if (inChallenge('ds', 21)) mult = mult.mul(0.00000000000000000001);
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    row: 0,
    hotkeys: [
        {key: "e", description: "E: Reset for essence", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration() {
        let gen = 0;
        if (hasMilestone("c", 3)) {
            gen += 0.5;
            if (hasUpgrade("h", 51)) {
                gen += 0.25;
                if (hasUpgrade("h", 54)) {
                    gen += 0.25;
                    if (hasUpgrade("h", 61)) {
                        gen += 0.25;
                        if (hasUpgrade("h", 64)) {
                            gen += 0.25;
        }}}}};
        return gen;
    },
    doReset(resettingLayer) {
        let keep = [];
            if (hasMilestone("c", 0) && resettingLayer == "c") keep.push("upgrades");
            if (hasMilestone("c", 2) && resettingLayer == "c") keep.push("buyables");
            if (hasMilestone("q", 1) && resettingLayer == "q") keep.push("upgrades");
            if (hasMilestone("q", 2) && resettingLayer == "q") keep.push("buyables");
            if (hasMilestone("sp", 1) && resettingLayer == "sp") keep.push("upgrades");
            if (hasMilestone("sp", 4) && resettingLayer == "sp") keep.push("buyables");
            if (hasMilestone("h", 0) && resettingLayer == "h") keep.push("upgrades");
            if (hasMilestone("h", 1) && resettingLayer == "h") keep.push("buyables");
            if (hasMilestone("ds", 3)) keep.push("upgrades");
            if (hasMilestone("ds", 4)) keep.push("buyables");
            if (layers[resettingLayer].row > this.row) layerDataReset("e", keep);
        },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        "blank",
        "buyables",
        "blank",
        "upgrades",
    ],
    upgrades: {
        11: {
            title() {
                return '<b class="layer-e' + getdark(this, "title") + 'Faster Points';
            },
            description() {
                return 'multiplies point gain by 1.5';
            },
            cost: 1,
        },
        12: {
            title() {
                return '<b class="layer-e' + getdark(this, "title") + 'Essence Influence';
            },
            description() {
                return 'multiplies point gain based on your essence';
            },
            cost: 2,
            effect() {
                eff = player.e.points.add(1).pow(0.5);
                hardcap = new Decimal("1e1750").mul(tmp.r.effect);
                if (tmp.r.effect.gt(1)) hardcap = hardcap.mul(tmp.r.effect)
                if (eff.gt(hardcap)) return hardcap;
                return eff;
            },
            effectDisplay() {
                if (this.effect().gte(new Decimal("1e1750").mul(tmp.r.effect))) text = format(this.effect()) + "x<br>.(hardcapped)";
                else text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.5';
                return text;
            },
            unlocked() { return hasUpgrade("e", 11) },
        },
        13: {
            title() {
                return '<b class="layer-e' + getdark(this, "title") + 'Influenced Essence';
            },
            description() {
                return 'multiplies essence gain based on your points';
            },
            cost: 5,
            effect() {
                return player.points.add(1).pow(0.15);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.15';
                return text;
            },
            unlocked() { return hasUpgrade("e", 12) },
        },
        21: {
            title() {
                return '<b class="layer-e' + getdark(this, "title") + 'Point Recursion';
            },
            description() {
                return 'multiplies point gain based on your points';
            },
            cost: 500,
            effect() {
                return player.points.add(1).pow(0.075);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.075';
                return text;
            },
            unlocked() { return hasUpgrade("e", 13) },
        },
        22: {
            title() {
                return '<b class="layer-e' + getdark(this, "title") + 'Essence of Essence';
            },
            description() {
                return 'multiplies essence gain based on your essence';
            },
            cost: 1250,
            effect() {
                return player.e.points.add(1).pow(0.11111111111);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.11111111111';
                return text;
            },
            unlocked() { return hasUpgrade("e", 21) },
        },
        23: {
            title() {
                return '<b class="layer-e' + getdark(this, "title") + 'Recurring Recursion';
            },
            description() {
                return 'boosts the effect of <b class="layer-e' + getdark(this, "ref") + 'Point Recursion</b> based on your points';
            },
            cost: 3500,
            effect() {
                return player.points.add(1).pow(0.25);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.25';
                return text;
            },
            unlocked() { return hasUpgrade("e", 22) },
        },
        31: {
            title() {
                return '<b class="layer-e' + getdark(this, "title") + 'Infinite Recursion';
            },
            description() {
                return 'boosts the effect of <b class="layer-e' + getdark(this, "ref") + 'Recurring Recursion</b> based on your points';
            },
            cost: 1.11e11,
            effect() {
                return player.points.add(1).pow(0.01);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.01';
                return text;
            },
            unlocked() { return hasMilestone("q", 0) && hasUpgrade("e", 23) },
        },
        32: {
            title() {
                return '<b class="layer-e' + getdark(this, "title") + 'Brilliance';
            },
            description() {
                return 'some of the effect of <b class="layer-e' + getdark(this, "ref") + 'Radiant Essence</b> is applied to point gain (based on essence)';
            },
            cost: 3.33e33,
            effect() {
                return player.e.points.add(1).pow(0.001);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.001';
                return text;
            },
            unlocked() { return hasMilestone("q", 0) && hasUpgrade("e", 31) },
        },
        33: {
            title() {
                return '<b class="layer-e' + getdark(this, "title") + 'Essence Network';
            },
            description() {
                return 'boosts the effect of <b class="layer-e' + getdark(this, "ref") + 'Essence Influence</b> based on your essence';
            },
            cost: 5.55e55,
            effect() {
                return player.e.points.add(1).pow(0.025);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.025';
                return text;
            },
            unlocked() { return hasMilestone("q", 0) && hasUpgrade("e", 32) },
        },
        41: {
            title() {
                return '<b class="layer-e' + getdark(this, "title") + 'Essence Recursion';
            },
            description() {
                return 'boosts the effect of <b class="layer-e' + getdark(this, "ref") + 'Essence of Essence</b> based on your essence';
            },
            cost: 7.77e77,
            effect() {
                return player.e.points.add(1).pow(0.001);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.001';
                return text;
            },
            unlocked() { return hasMilestone("q", 0) && hasUpgrade("e", 33) },
        },
        42: {
            title() {
                return '<b class="layer-e' + getdark(this, "title") + 'Essences to Infinity';
            },
            description() {
                return 'boosts the effect of <b class="layer-e' + getdark(this, "ref") + 'Essence Recursion</b> based on your essence';
            },
            cost: 9.99e99,
            effect() {
                return player.e.points.add(1).pow(0.01);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.01';
                return text;
            },
            unlocked() { return hasMilestone("q", 0) && hasUpgrade("e", 41) },
        },
    },
    buyables: {
        11: {
            cost(x = 0) { return new Decimal(12).pow(getBuyableAmount('e', 11)).add(x).add(20) },
            title() {
                return '<b class="layer-e' + getdark(this, "title-buyable") + 'Purer Essence';
            },
            canAfford() { return player.e.points.gte(this.cost()) },
            purchaseLimit: 14,
            buy() {
                player.e.points = player.e.points.sub(this.cost());
                setBuyableAmount('e', 11, getBuyableAmount('e', 11).add(1));
            },
            display() {
                if (player.nerdMode) return 'multiplies essence gain based on the amount of this upgrade bought.<br>Currently: ' + format(getBuyableAmount('e', 11).mul(2.5).add(1)) + 'x<br>formula: x*2.5+1<br><br>Cost: ' + formatWhole(this.cost()) + ' essence<br><br>Bought: ' + formatWhole(getBuyableAmount('e', 11));
                return 'multiplies essence gain based on the amount of this upgrade bought.<br>Currently: ' + format(getBuyableAmount('e', 11).mul(2.5).add(1)) + 'x<br><br>Cost: ' + formatWhole(this.cost()) + ' essence<br><br>Bought: ' + formatWhole(getBuyableAmount('e', 11));
            },
        },
        12: {
            cost(x = 0) { return new Decimal(44).pow(getBuyableAmount('e', 12)).add(x).mul(10).add(85184) },
            title() {
                return '<b class="layer-e' + getdark(this, "title-buyable") + 'Radiant Essence';
            },
            canAfford() { return player.e.points.gte(this.cost()) },
            purchaseLimit: 99,
            buy() {
                player.e.points = player.e.points.sub(this.cost());
                setBuyableAmount('e', 12, getBuyableAmount('e', 12).add(1));
            },
            display() {
                if (player.nerdMode) return 'multiplies core gain (and essence gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: ' + format(getBuyableAmount('e', 12).add(1)) + 'x<br>and ' + format(getBuyableAmount('e', 12).pow(0.25).add(1)) + 'x<br>formulas: x+1 and x^0.25+1<br><br>Cost: ' + formatWhole(this.cost()) + ' essence<br><br>Bought: ' + formatWhole(getBuyableAmount('e', 12));
                return 'multiplies core gain (and essence gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: ' + format(getBuyableAmount('e', 12).add(1)) + 'x<br>and ' + format(getBuyableAmount('e', 12).pow(0.25).add(1)) + 'x<br><br>Cost: ' + formatWhole(this.cost()) + ' essence<br><br>Bought: ' + formatWhole(getBuyableAmount('e', 12));
            },
            unlocked() { if (player.e.total.gte(85194) || getBuyableAmount('e', 12).gt(0)) return true },
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
        best: new Decimal(0),
        total: new Decimal(0),
        auto_upgrades: false,
        auto_buyables: false,
    }},
    color() {
        if (player.e.points.gte(10000) || player.c.unlocked) return "#D2D237";
        return "#666666";
    },
    branches: ["h"],
    requires: 10000,
    resource: "cores",
    baseResource: "essence",
    baseAmount() {return player.e.points},
    type: "normal",
    exponent: 0.3,
    gainMult() {
        mult = new Decimal(1);
        if (hasUpgrade('e', 32)) mult = mult.mul(upgradeEffect('e', 32));
        if (hasUpgrade('c', 12)) mult = mult.mul(upgradeEffect('c', 12));
        if (hasUpgrade('q', 21)) {
            mult = mult.mul(upgradeEffect('q', 21));
            if (hasUpgrade('q', 22)) mult = mult.mul(upgradeEffect('q', 22));
        };
        if (hasUpgrade('q', 33)) mult = mult.mul(upgradeEffect('q', 33));
        if (hasUpgrade('h', 13)) {
            mult = mult.mul(upgradeEffect('h', 13));
            if (hasUpgrade('h', 23)) {
                mult = mult.mul(upgradeEffect('h', 23));
                if (hasUpgrade('h', 33)) mult = mult.mul(upgradeEffect('h', 33));
        }};
        if (hasUpgrade('h', 24)) mult = mult.mul(3);
        if (getBuyableAmount('e', 12).gt(0)) mult = mult.mul(getBuyableAmount('e', 12).add(1));
        if (hasUpgrade('ds', 21) && hasUpgrade('ds', 23)) mult = mult.mul(player.A.points.pow(2).div(100));
        if (inChallenge('ds', 11)) mult = mult.mul(0.01);
        if (inChallenge('ds', 21)) mult = mult.mul(0.000000000000001);
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    softcap: new Decimal("1e1250"),
    softcapPower: 0.7,
    row: 1,
    hotkeys: [
        {key: "c", description: "C: Reset for cores", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration() {
        let gen = 0;
        if (hasUpgrade("h", 43)) {
            gen += 0.01;
            if (hasUpgrade("h", 44)) {
                gen += 0.09;
                if (hasUpgrade("h", 52)) {
                    gen += 0.15;
                    if (hasUpgrade("c", 33)) {
                        gen += 0.25;
        }}}};
        return gen;
    },
    automate() {
        if (player.c.auto_upgrades) {
            if (hasMilestone("c", 1)) buyUpgrade('c', 11);
            if (hasMilestone("c", 1) && hasUpgrade("c", 11)) buyUpgrade('c', 12);
            if (hasMilestone("c", 1) && hasUpgrade("c", 12)) buyUpgrade('c', 13);
            if (hasMilestone("h", 8) && hasUpgrade("c", 13)) buyUpgrade('c', 21);
            if (hasMilestone("h", 8) && hasUpgrade("c", 21)) buyUpgrade('c', 22);
            if (hasMilestone("h", 8) && hasUpgrade("c", 22)) buyUpgrade('c', 23);
            if (hasUpgrade("h", 53) && hasUpgrade("c", 23)) buyUpgrade('c', 31);
            if (hasUpgrade("h", 53) && hasUpgrade("c", 31)) buyUpgrade('c', 32);
            if (hasUpgrade("h", 53) && hasUpgrade("c", 32)) buyUpgrade('c', 33);
        };
        if (player.c.auto_buyables) {
            if (getBuyableAmount('c', 11).lt(99) && player.c.points.gte(getBuyableAmount('c', 11).mul(2).add(1))) {
                player.c.points = player.c.points.sub(getBuyableAmount('c', 11).mul(2).add(1));
                setBuyableAmount('c', 11, getBuyableAmount('c', 11).add(1));
            };
            if (getBuyableAmount('c', 12).lt(49) && player.c.points.gte(new Decimal(6).pow(getBuyableAmount('c', 12)))) {
                player.c.points = player.c.points.sub(new Decimal(6).pow(getBuyableAmount('c', 12)));
                setBuyableAmount('c', 12, getBuyableAmount('c', 12).add(1));
            };
        };
    },
    doReset(resettingLayer) {
        let keep = [];
            if (hasMilestone("h", 2) && resettingLayer == "h") keep.push("upgrades");
            if (hasMilestone("h", 3) && resettingLayer == "h") keep.push("buyables");
            if (hasMilestone("h", 4) && resettingLayer == "sp") keep.push("upgrades");
            if (hasMilestone("h", 4) && resettingLayer == "sp") keep.push("buyables");
            if (hasMilestone("h", 5) && resettingLayer == "h") keep.push("milestones");
            if (hasMilestone("h", 5) && resettingLayer == "sp") keep.push("milestones");
            if (hasMilestone("ds", 2) && resettingLayer == "ds") keep.push("milestones");
            if (hasMilestone("ds", 5) && resettingLayer == "ds") keep.push("upgrades");
            if (hasMilestone("ds", 6) && resettingLayer == "ds") keep.push("buyables");
            if (hasMilestone("a", 1) && resettingLayer == "a") keep.push("buyables");
            if (hasMilestone("a", 2) && resettingLayer == "a") keep.push("upgrades");
            if (hasMilestone("a", 4) && resettingLayer == "a") keep.push("milestones");
            if (hasMilestone('s', 1)) keep.push("auto_upgrades");
            if (hasMilestone('s', 2)) keep.push("auto_buyables");
            if (layers[resettingLayer].row > this.row) layerDataReset("c", keep);
        },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
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
            done() { return player.c.points.gte(10) },
        },
        1: {
            requirementDescription: "25 cores",
            effectDescription: "unlock core upgrades",
            done() { return player.c.points.gte(25) },
        },
        2: {
            requirementDescription: "500 cores",
            effectDescription: "keep essence buyables on core resets",
            done() { return player.c.points.gte(500) },
        },
        3: {
            requirementDescription: "1e64 cores",
            effectDescription: "gain 50% of essence gain per second",
            done() { return player.c.points.gte(1e64) },
            unlocked() { if (player.c.points.gte(1e60)) return true },
        },
    },
    upgrades: {
        11: {
            title() {
                return '<b class="layer-c' + getdark(this, "title") + 'Heat Emission';
            },
            description() {
                return 'multiplies essence gain based on your cores';
            },
            cost: 25,
            effect() {
                return player.c.points.add(1).pow(0.2);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.2';
                return text;
            },
            unlocked() { return hasMilestone("c", 1) },
        },
        12: {
            title() {
                return '<b class="layer-c' + getdark(this, "title") + 'Core Countdown';
            },
            description() {
                return 'multiplies core gain based on your points';
            },
            cost: 100,
            effect() {
                return player.points.add(1).pow(0.01);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.01';
                return text;
            },
            unlocked() { return hasUpgrade("c", 11) },
        },
        13: {
            title() {
                return '<b class="layer-c' + getdark(this, "title") + 'The Quarks\' Core';
            },
            description() {
                return 'multiplies quark gain based on your cores';
            },
            cost: 750,
            effect() {
                return player.c.points.add(1).pow(0.1);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.1';
                return text;
            },
            unlocked() { return hasUpgrade("c", 12) },
        },
        21: {
            title() {
                return '<b class="layer-c' + getdark(this, "title") + 'Quarky Core';
            },
            description() {
                return 'multiplies the effect of <b class="layer-c' + getdark(this, "ref") + 'The Quarks\' Core</b> based on your cores';
            },
            cost: 1e69,
            effect() {
                return player.c.points.add(1).pow(0.005);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.005';
                return text;
            },
            unlocked() { return hasMilestone("h", 8) && hasUpgrade("c", 13) },
        },
        22: {
            title() {
                return '<b class="layer-c' + getdark(this, "title") + 'Quirky Core';
            },
            description() {
                return 'multiplies the effect of <b class="layer-c' + getdark(this, "ref") + 'Quarky Core</b> based on your cores';
            },
            cost: 1e71,
            effect() {
                return player.c.points.add(1).pow(0.002);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.002';
                return text;
            },
            unlocked() { return hasMilestone("h", 8) && hasUpgrade("c", 21) },
        },
        23: {
            title() {
                return '<b class="layer-c' + getdark(this, "title") + 'Super Core';
            },
            description() {
                return 'multiplies core gain based on your cores';
            },
            cost: 1e73,
            effect() {
                return player.c.points.add(1).pow(0.01);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.01';
                return text;
            },
            unlocked() { return hasMilestone("h", 8) && hasUpgrade("c", 22) },
        },
        31: {
            title() {
                return '<b class="layer-c' + getdark(this, "title") + 'Ultra Core';
            },
            description() {
                return 'multiplies the effect of <b class="layer-c' + getdark(this, "ref") + 'Super Core</b> based on your cores';
            },
            cost: 1e75,
            effect() {
                return player.c.points.add(1).pow(0.0025);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.0025';
                return text;
            },
            unlocked() { return hasUpgrade("h", 53) && hasUpgrade("c", 23) },
        },
        32: {
            title() {
                return '<b class="layer-c' + getdark(this, "title") + 'Hexed Core';
            },
            description() {
                return 'multiplies the effect of <b class="layer-c' + getdark(this, "ref") + 'Ultra Core</b> based on your hexes';
            },
            cost: 1e77,
            effect() {
                return player.c.points.add(1).pow(0.001);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.001';
                return text;
            },
            unlocked() { return hasUpgrade("h", 53) && hasUpgrade("c", 31) },
        },
        33: {
            title() {
                return '<b class="layer-c' + getdark(this, "title") + 'Core Liberation';
            },
            description() {
                return 'if you own <b class="layer-h' + getdark(this, "ref") + 'Core Production Line</b> and all subsequent upgrades, gain +25% of your core gain per second';
            },
            cost: 1e80,
            unlocked() { return hasUpgrade("h", 53) && hasUpgrade("c", 32) },
        },
    },
    buyables: {
        11: {
            cost(x = 0) { return getBuyableAmount('c', 11).add(x).mul(2).add(1) },
            title() {
                return '<b class="layer-c' + getdark(this, "title-buyable") + 'Empowered Points';
            },
            canAfford() { return player.c.points.gte(this.cost()) },
            purchaseLimit: 99,
            buy() {
                player.c.points = player.c.points.sub(this.cost());
                setBuyableAmount('c', 11, getBuyableAmount('c', 11).add(1));
            },
            display() {
                text = '';
                if (player.nerdMode) text += '<br>formula: x*5+1';
                if (getBuyableAmount('c', 11).eq(0)) return 'multiplies point gain based on the amount of this upgrade bought.<br>Currently: 1.00x' + text + '<br><br>Cost: 1 core<br><br>Bought: 0';
                else return 'multiplies point gain based on the amount of this upgrade bought.<br>Currently: ' + format(getBuyableAmount('c', 11).mul(5).add(1)) + 'x' + text + '<br><br>Cost: ' + formatWhole(this.cost()) + ' cores<br><br>Bought: ' + formatWhole(getBuyableAmount('c', 11));
            },
        },
        12: {
            cost(x = 0) { return new Decimal(6).pow(getBuyableAmount('c', 12).add(x)) },
            title() {
                return '<b class="layer-c' + getdark(this, "title-buyable") + 'Empowered Essence';
            },
            canAfford() { return player.c.points.gte(this.cost()) },
            purchaseLimit: 49,
            buy() {
                player.c.points = player.c.points.sub(this.cost());
                setBuyableAmount('c', 12, getBuyableAmount('c', 12).add(1));
            },
            display() {
                text = '';
                if (player.nerdMode) text += '<br>formula: 2^x';
                if (getBuyableAmount('c', 12).eq(0)) return 'multiplies essence gain based on the amount of this upgrade bought.<br>Currently: 1.00x' + text + '<br><br>Cost: 1 core<br><br>Bought: 0';
                else return 'multiplies essence gain based on the amount of this upgrade bought.<br>Currently: ' + format(new Decimal(2).pow(getBuyableAmount('c', 12))) + 'x' + text + '<br><br>Cost: ' + formatWhole(this.cost()) + ' cores<br><br>Bought: ' + formatWhole(getBuyableAmount('c', 12));
            },
        },
    },
});

addLayer("q", {
    name: "Quarks",
    symbol: "Q",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        auto_upgrades: false,
    }},
    color() {
        if (player.e.points.gte(1e9) || player.q.unlocked) return "#DB5196";
        return "#666666";
    },
    branches: ["sp"],
    requires: 1e9,
    resource: "quarks",
    baseResource: "essence",
    baseAmount() {return player.e.points},
    type: "normal",
    exponent: 0.1,
    gainMult() {
        mult = new Decimal(1);
        if (hasUpgrade('c', 13)) mult = mult.mul(upgradeEffect('c', 13));
        if (hasUpgrade('q', 11)) mult = mult.mul(upgradeEffect('q', 11));
        if (hasUpgrade('q', 21)) mult = mult.mul(upgradeEffect('q', 21));
            if (hasUpgrade('q', 22)) mult = mult.mul(upgradeEffect('q', 22));
        if (hasUpgrade('q', 12) && hasUpgrade('q', 23)) {
            mult = mult.mul(upgradeEffect('q', 23));
            if (hasUpgrade('q', 24)) {
                mult = mult.mul(upgradeEffect('q', 24));
                if (hasUpgrade('q', 25)) {
                    mult = mult.mul(upgradeEffect('q', 25));
                    if (hasUpgrade('q', 31)) mult = mult.mul(upgradeEffect('q', 31));
        }}};
        if (hasUpgrade('q', 42)) {
            mult = mult.mul(upgradeEffect('q', 42));
            if (hasUpgrade('q', 44)) mult = mult.mul(upgradeEffect('q', 44));
        };
        if (hasUpgrade('q', 45)) mult = mult.mul(upgradeEffect('q', 45));
        if (hasUpgrade('h', 34)) mult = mult.mul(2);
        if (hasUpgrade('a', 41)) mult = mult.mul(upgradeEffect('a', 41));
        if (getBuyableAmount('sp', 11).gt(0)) {
            mult = mult.mul(new Decimal(5).pow(getBuyableAmount('sp', 11)));
            if (hasUpgrade('sp', 11)) mult = mult.mul(new Decimal(5).pow(getBuyableAmount('sp', 11)));
        };
        if (getBuyableAmount('sp', 21).gt(0)) mult = mult.mul(getBuyableAmount('sp', 21).add(1).pow(-1));
        if (hasUpgrade('ds', 21) && hasUpgrade('ds', 23)) mult = mult.mul(player.A.points.pow(2).div(100));
        if (inChallenge('ds', 11)) mult = mult.mul(0.1);
        if (inChallenge('ds', 22)) mult = mult.mul(0.0000000000000000000000000000000000000001);
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    softcap: new Decimal("1e1250"),
    softcapPower: 0.6,
    row: 1,
    hotkeys: [
        {key: "q", description: "Q: Reset for quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.c.unlocked},
    passiveGeneration() {
        gen = 0;
        if (hasMilestone("a", 8)) {
            gen += 0.01;
            if (hasMilestone("a", 9)) {
                gen += 0.09;
        }};
        return gen;
    },
    automate() {
        if (player.q.auto_upgrades) {
            buyUpgrade('q', 11);
            if (hasUpgrade("q", 11)) buyUpgrade('q', 12);
            if (hasUpgrade("q", 12)) buyUpgrade('q', 13);
            if (hasUpgrade("q", 13)) buyUpgrade('q', 14);
            if (hasUpgrade("q", 14)) buyUpgrade('q', 15);
            if (hasUpgrade("q", 15)) buyUpgrade('q', 21);
            if (hasUpgrade("q", 21)) buyUpgrade('q', 22);
            if (hasUpgrade("q", 22)) buyUpgrade('q', 23);
            if (hasUpgrade("q", 23)) buyUpgrade('q', 24);
            if (hasUpgrade("q", 24)) buyUpgrade('q', 25);
            if (hasUpgrade("q", 25)) buyUpgrade('q', 31);
            if (hasUpgrade("q", 31)) buyUpgrade('q', 32);
            if (hasUpgrade("q", 32)) buyUpgrade('q', 33);
            if (hasUpgrade("q", 33)) buyUpgrade('q', 34);
            if (hasUpgrade("q", 34)) buyUpgrade('q', 35);
            if (hasMilestone("sp", 2) && hasUpgrade("q", 35)) buyUpgrade('q', 41);
            if (hasMilestone("sp", 2) && hasUpgrade("q", 41)) buyUpgrade('q', 42);
            if (hasMilestone("sp", 2) && hasUpgrade("q", 42)) buyUpgrade('q', 43);
            if (hasMilestone("sp", 2) && hasUpgrade("q", 43)) buyUpgrade('q', 44);
            if (hasMilestone("sp", 2) && hasUpgrade("q", 44)) buyUpgrade('q', 45);
        };
    },
    doReset(resettingLayer) {
        let keep = [];
            if (hasMilestone("sp", 3) && resettingLayer == "sp") keep.push("milestones");
            if (hasMilestone("sp", 5) && resettingLayer == "sp") keep.push("upgrades");
            if (hasMilestone("h", 5) && resettingLayer == "h") keep.push("milestones");
            if (hasMilestone("h", 5) && resettingLayer == "sp") keep.push("milestones");
            if (hasMilestone("h", 6) && resettingLayer == "sp") keep.push("upgrades");
            if (hasMilestone("h", 7) && resettingLayer == "h") keep.push("upgrades");
            if (hasMilestone("ds", 2) && resettingLayer == "ds") keep.push("milestones");
            if (hasMilestone('ds', 7) && resettingLayer == "ds") keep.push("upgrades");
            if (hasMilestone("a", 0) && resettingLayer == "a") keep.push("buyables");
            if (hasMilestone("a", 1) && resettingLayer == "a") keep.push("upgrades");
            if (hasMilestone("a", 5) && resettingLayer == "a") keep.push("milestones");
            if (hasMilestone('s', 4)) keep.push("auto_upgrades");
            if (layers[resettingLayer].row > this.row) layerDataReset("q", keep);
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        "milestones",
        "upgrades",
    ],
    milestones: {
        0: {
            requirementDescription: "5 quarks",
            effectDescription: "you can explore 5 further essence upgrades",
            done() { return player.q.points.gte(5) }
        },
        1: {
            requirementDescription: "50,000 quarks",
            effectDescription: "keep essence upgrades on quark resets",
            done() { return player.q.points.gte(50000) }
        },
        2: {
            requirementDescription: "250,000,000 quarks",
            effectDescription: "keep essence buyables on quark resets",
            done() { return player.q.points.gte(250000000) }
        },
    },
    upgrades: {
        11: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'The Point of Quarks';
            },
            description() {
                return 'multiplies quark gain based on your points';
            },
            cost: 1,
            effect() {
               return player.points.add(1).pow(0.01);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.01';
                return text;
            },
        },
        12: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Quark Power';
            },
            description() {
                return 'multiplies point gain based on your quarks';
            },
            cost: 2,
            effect() {
               return player.q.points.add(1).pow(0.09);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.09';
                return text;
            },
            unlocked() { return hasUpgrade("q", 11) },
        },
        13: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Super Quarks';
            },
            description() {
                return 'multiplies the effect of <b class="layer-q' + getdark(this, "ref") + 'Quark Power</b> based on your points';
            },
            cost: 25,
            effect() {
               return player.points.add(1).pow(0.0025);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.0025';
                return text;
            },
            unlocked() { return hasUpgrade("q", 12) },
        },
        14: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Essence of Quarks';
            },
            description() {
                return '<b class="layer-q' + getdark(this, "ref") + 'Quark Power</b> also affects essence gain at a reduced rate (<b class="layer-q' + getdark(this, "ref") + 'Super Quarks</b> does not affect this)';
            },
            cost: 100,
            effect() {
               return player.q.points.add(1).pow(0.2);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.2';
                return text;
            },
            unlocked() { return hasUpgrade("q", 13) },
        },
        15: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Quark Fusion';
            },
            description() {
                return 'multiplies the effect of <b class="layer-q' + getdark(this, "ref") + 'Essence of Quarks</b> based on your cores';
            },
            cost: 750,
            effect() {
               return player.c.points.add(1).pow(0.02);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.02';
                return text;
            },
            unlocked() { return hasUpgrade("q", 14) },
        },
        21: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Quirky Quarks';
            },
            description() {
                return 'multiplies core gain and quark gain based on your quarks';
            },
            cost: 2500,
            effect() {
               return player.q.points.add(1).pow(0.05);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.05';
                return text;
            },
            unlocked() { return hasUpgrade("q", 15) },
        },
        22: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Very Quirky';
            },
            description() {
                return 'multiplies the effect of <b class="layer-q' + getdark(this, "ref") + 'Quirky Quarks</b> based on your points';
            },
            cost: 7500,
            effect() {
               return player.points.add(1).pow(0.02);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.02';
                return text;
            },
            unlocked() { return hasUpgrade("q", 21) },
        },
        23: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Quark Extreme';
            },
            description() {
                return '<b class="layer-q' + getdark(this, "ref") + 'Quark Power</b> also affects quark gain at a reduced rate (<b class="layer-q' + getdark(this, "ref") + 'Super Quarks</b> does not affect this)';
            },
            cost: 25000,
            effect() {
               return player.q.points.add(1).pow(0.1);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.1';
                return text;
            },
            unlocked() { return hasUpgrade("q", 22) },
        },
        24: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Recurring Quarks';
            },
            description() {
                return 'multiplies the effect of <b class="layer-q' + getdark(this, "ref") + 'Quark Extreme</b> based on your quarks';
            },
            cost: 100000,
            effect() {
               return player.q.points.add(1).pow(0.2);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.2';
                return text;
            },
            unlocked() { return hasUpgrade("q", 23) },
        },
        25: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Recurring More';
            },
            description() {
                return 'multiplies the effect of <b class="layer-q' + getdark(this, "ref") + 'Recurring Quarks</b> based on your quarks';
            },
            cost: 1500000,
            effect() {
               return player.q.points.add(1).pow(0.05);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.05';
                return text;
            },
            unlocked() { return hasUpgrade("q", 24) },
        },
        31: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Infinite Recur';
            },
            description() {
                return 'multiplies the effect of <b class="layer-q' + getdark(this, "ref") + 'Recurring More</b> based on your quarks';
            },
            cost: 50000000,
            effect() {
               return player.q.points.add(1).pow(0.01);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.01';
                return text;
            },
            unlocked() { return hasUpgrade("q", 25) },
        },
        32: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Compact Quarks';
            },
            description() {
                return 'multiplies essence gain based on your quarks';
            },
            cost: 1e9,
            effect() {
               return player.q.points.add(1).pow(0.15);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.15';
                return text;
            },
            unlocked() { return hasUpgrade("q", 31) },
        },
        33: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Quark Fission';
            },
            description() {
                return 'multiplies core gain based on your quarks';
            },
            cost: 1e10,
            effect() {
               return player.q.points.add(1).pow(0.075);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.075';
                return text;
            },
            unlocked() { return hasUpgrade("q", 32) },
        },
        34: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'The Quark Count';
            },
            description() {
                return 'multiplies point gain based on your quarks';
            },
            cost: 2.5e11,
            effect() {
               return player.q.points.add(1).pow(0.01);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.01';
                return text;
            },
            unlocked() { return hasUpgrade("q", 33) },
        },
        35: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Quark Counting';
            },
            description() {
                return 'multiplies the effect of <b class="layer-q' + getdark(this, "ref") + 'The Quark Count</b> based on your quarks';
            },
            cost: 1e13,
            effect() {
               return player.q.points.add(1).pow(0.015);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.015';
                return text;
            },
            unlocked() { return hasUpgrade("q", 34) },
        },
        41: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Ticking Quarks';
            },
            description() {
                return 'multiplies the effect of <b class="layer-q' + getdark(this, "ref") + 'Quark Counting</b> based on your quarks';
            },
            cost: 1e14,
            effect() {
               return player.q.points.add(1).pow(0.005);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.005';
                return text;
            },
            unlocked() { return hasMilestone("sp", 2) && hasUpgrade("q", 35) },
        },
        42: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Subatomic Quarks';
            },
            description() {
                return 'multiplies quark gain based on your subatomic particles';
            },
            cost: 1e16,
            effect() {
               return player.sp.points.add(1).pow(0.5);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.5';
                return text;
            },
            unlocked() { return hasMilestone("sp", 2) && hasUpgrade("q", 41) },
        },
        43: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Quirky Particles';
            },
            description() {
                return 'multiplies subatomic particle gain based on your quarks';
            },
            cost: 1e18,
            effect() {
               return player.q.points.add(1).pow(0.01);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.01';
                return text;
            },
            unlocked() { return hasMilestone("sp", 2) && hasUpgrade("q", 42) },
        },
        44: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'Particle Quarks';
            },
            description() {
                return 'multiplies the effect of <b class="layer-q' + getdark(this, "ref") + 'Subatomic Quarks</b> based on your quarks';
            },
            cost: 1e20,
            effect() {
               return player.q.points.add(1).pow(0.005);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.005';
                return text;
            },
            unlocked() { return hasMilestone("sp", 2) && hasUpgrade("q", 43) },
        },
        45: {
            title() {
                return '<b class="layer-q' + getdark(this, "title") + 'The Ultra Quark';
            },
            description() {
                return 'multiplies quark gain based on your quarks';
            },
            cost: 1e22,
            effect() {
               return player.q.points.add(1).pow(0.125);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.125';
                return text;
            },
            unlocked() { return hasMilestone("sp", 2) && hasUpgrade("q", 44) },
        },
    },
});

addLayer("sp", {
    name: "Subatomic Particles", 
    symbol: "SP",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color() {
        if (player.q.points.gte(1e15) || player.sp.unlocked) return "#710CC4";
        return "#666666";
    },
    branches: ["a"],
    requires: 1e15,
    resource: "subatomic particles",
    baseResource: "quarks",
    baseAmount() {return player.q.points},
    type: "static",
    exponent: 4.25,
    canBuyMax() {
        if (hasMilestone("sp", 0)) return true;
        return false;
    },
    gainMult() {
        mult = new Decimal(1);
        return mult;
    },
    gainExp() {
        gain = new Decimal(1);
        if (hasUpgrade('q', 43)) gain = gain.mul(upgradeEffect('q', 43));
        if (hasUpgrade('h', 63)) gain = gain.mul(upgradeEffect('h', 63));
        if (hasUpgrade('a', 22)) gain = gain.mul(upgradeEffect('a', 22));
        if (hasUpgrade('a', 31)) gain = gain.mul(upgradeEffect('a', 31));
        if (getBuyableAmount('ds', 11).gt(0)) gain = gain.mul(getBuyableAmount('ds', 11).mul(5).add(1));
        if (hasUpgrade('a', 51)) gain = gain.mul(player.A.points.pow(2.5).div(100));
        if (hasChallenge('ds', 21)) gain = gain.mul(player.ds.points.add(1).pow(0.2));
        if (inChallenge('ds', 12)) gain = gain.mul(player.q.points.pow(-0.05));
        if (inChallenge('ds', 22)) gain = gain.mul(0.0000000000000000000000000000000000000001);
        return gain;
    },
    autoPrestige() {
        if (hasMilestone('s', 11)) return true;
        return false;
    },
    row: 2,
    hotkeys: [
        {key: "S", description: "Shift-S: Reset for subatomic particles", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.q.unlocked},
    doReset(resettingLayer) {
        let keep = [];
            if (hasMilestone("ds", 0) && resettingLayer == "ds") keep.push("buyables");
            if (hasMilestone("ds", 1) && resettingLayer == "ds") keep.push("upgrades");
            if (hasMilestone("a", 0) && resettingLayer == "a") keep.push("buyables");
            if (hasMilestone("a", 3) && resettingLayer == "a") keep.push("upgrades");
            if (hasMilestone("a", 13) && resettingLayer == "a") keep.push("milestones");
            if (layers[resettingLayer].row > this.row) layerDataReset("sp", keep);
        },
    resetsNothing() {
        if (hasMilestone('s', 11)) return true;
        return false;
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
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
            done() { return player.sp.points.gte(1) }
        },
        1: {
            requirementDescription: "2 subatomic particles",
            effectDescription: "keep essence upgrades on subatomic particle resets",
            done() { return player.sp.points.gte(2) }
        },
        2: {
            requirementDescription: "3 subatomic particles",
            effectDescription: "you can explore 5 further quark upgrades",
            done() { return player.sp.points.gte(3) }
        },
        3: {
            requirementDescription: "4 subatomic particles",
            effectDescription: "keep quark milestones on subatomic particle resets",
            done() { return player.sp.points.gte(4) }
        },
        4: {
            requirementDescription: "5 subatomic particles",
            effectDescription: "keep essence buyables on subatomic particle resets",
            done() { return player.sp.points.gte(5) }
        },
        5: {
            requirementDescription: "6 subatomic particles",
            effectDescription: "keep quark upgrades on subatomic particle resets",
            done() { return player.sp.points.gte(6) }
        },
    },
    upgrades: {
        11: {
            title() {
                return '<b class="layer-sp' + getdark(this, "title") + 'Positrons';
            },
            description() {
                return 'squares the positive effect of <b class="layer-sp' + getdark(this, "ref") + 'Protons';
            },
            cost: 6,
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("h", 53) },
        },
        12: {
            title() {
                return '<b class="layer-sp' + getdark(this, "title") + 'Beta Particles';
            },
            description() {
                return 'squares the positive effect of <b class="layer-sp' + getdark(this, "ref") + 'Neutrons';
            },
            cost: 6,
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("h", 53) },
        },
        13: {
            title() {
                return '<b class="layer-sp' + getdark(this, "title") + 'Gamma Particles';
            },
            description() {
                return 'squares the positive effect of <b class="layer-sp' + getdark(this, "ref") + 'Electrons';
            },
            cost: 6,
            unlocked() { return (hasMilestone("h", 8)) && hasUpgrade("h", 53) },
        },
    },
    buyables: {
        11: {
            cost(x = 0) { return getBuyableAmount('sp', 11).add(1) },
            title() {
                return '<b class="layer-sp' + getdark(this, "title-buyable") + 'Protons';
            },
            canAfford() { return player.sp.points.gte(this.cost()) },
            purchaseLimit: 9,
            buy() {
                player.sp.points = player.sp.points.sub(this.cost());
                setBuyableAmount('sp', 11, getBuyableAmount('sp', 11).add(1));
            },
            display() {
                text = '';
                if (player.nerdMode) {
                    if (hasUpgrade('sp', 11)) text += '<br>formulas: 5^x^2 and (x+1)^-1';
                    else text += '<br>formulas: 5^x and (x+1)^-1';
                };
                if (getBuyableAmount('sp', 11).eq(0)) return 'multiplies quark gain (but also decreases essence gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: 1.00x<br>and 1.00x' + text + '<br><br>Cost: 1 subatomic particle<br><br>Bought: 0';
                else if (hasUpgrade('sp', 11)) return 'multiplies quark gain (but also decreases essence gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: ' + format(new Decimal(5).pow(getBuyableAmount('sp', 11)).pow(2)) + 'x<br>and ' + format(getBuyableAmount('sp', 11).add(1) ** -1) + 'x' + text + '<br><br>Cost: ' + formatWhole(this.cost()) + ' subatomic particles<br><br>Bought: ' + formatWhole(getBuyableAmount('sp', 11));
                else return 'multiplies quark gain (but also decreases essence gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: ' + format(new Decimal(5).pow(getBuyableAmount('sp', 11))) + 'x<br>and ' + format(getBuyableAmount('sp', 11).add(1) ** -1) + 'x' + text + '<br><br>Cost: ' + formatWhole(this.cost()) + ' subatomic particles<br><br>Bought: ' + formatWhole(getBuyableAmount('sp', 11));
            },
        },
        12: {
            cost(x = 0) { return getBuyableAmount('sp', 12).add(1) },
            title() {
                return '<b class="layer-sp' + getdark(this, "title-buyable") + 'Neutrons';
            },
            canAfford() { return player.sp.points.gte(this.cost()) },
            purchaseLimit: 9,
            buy() {
                player.sp.points = player.sp.points.sub(this.cost());
                setBuyableAmount('sp', 12, getBuyableAmount('sp', 12).add(1));
            },
            display() {
                text = '';
                if (player.nerdMode) {
                    if (hasUpgrade('sp', 12)) text += '<br>formulas: 5^x^2 and (x+1)^-1';
                    else text += '<br>formulas: 5^x and (x+1)^-1';
                };
                if (getBuyableAmount('sp', 12).eq(0)) return 'multiplies essence gain (but also decreases point gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: 1.00x<br>and 1.00x' + text + '<br><br>Cost: 1 subatomic particle<br><br>Bought: 0';
                else if (hasUpgrade('sp', 12)) return 'multiplies essence gain (but also decreases point gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: ' + format(new Decimal(5).pow(getBuyableAmount('sp', 12)).pow(2)) + 'x<br>and ' + format(getBuyableAmount('sp', 12).add(1) ** -1) + 'x' + text + '<br><br>Cost: ' + formatWhole(this.cost()) + ' subatomic particles<br><br>Bought: ' + formatWhole(getBuyableAmount('sp', 12));
                else return 'multiplies essence gain (but also decreases point gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: ' + format(new Decimal(5).pow(getBuyableAmount('sp', 12))) + 'x<br>and ' + format(getBuyableAmount('sp', 12).add(1) ** -1) + 'x' + text + '<br><br>Cost: ' + formatWhole(this.cost()) + ' subatomic particles<br><br>Bought: ' + formatWhole(getBuyableAmount('sp', 12));
            },
        },
        21: {
            cost(x = 0) { return getBuyableAmount('sp', 21).add(1) },
            title() {
                return '<b class="layer-sp' + getdark(this, "title-buyable") + 'Electrons';
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            purchaseLimit: 9,
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                setBuyableAmount('sp', 21, getBuyableAmount('sp', 21).add(1));
            },
            display() {
                text = '';
                if (player.nerdMode) {
                    if (hasUpgrade('sp', 13)) text += '<br>formulas: 5^x^2 and (x+1)^-1';
                    else text += '<br>formulas: 5^x and (x+1)^-1';
                };
                if (getBuyableAmount('sp', 21).eq(0)) return 'multiplies point gain (but also decreases quark gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: 1.00x<br>and 1.00x' + text + '<br><br>Cost: 1 subatomic particle<br><br>Bought: 0';
                else if (hasUpgrade('sp', 13)) return 'multiplies point gain (but also decreases quark gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: ' + format(new Decimal(5).pow(getBuyableAmount('sp', 21)).pow(2)) + 'x<br>and ' + format(getBuyableAmount('sp', 21).add(1) ** -1) + 'x' + text + '<br><br>Cost: ' + formatWhole(this.cost()) + ' subatomic particles<br><br>Bought: ' + formatWhole(getBuyableAmount('sp', 21));
                else return 'multiplies point gain (but also decreases quark gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: ' + format(new Decimal(5).pow(getBuyableAmount('sp', 21))) + 'x<br>and ' + format(getBuyableAmount('sp', 21).add(1) ** -1) + 'x' + text + '<br><br>Cost: ' + formatWhole(this.cost()) + ' subatomic particles<br><br>Bought: ' + formatWhole(getBuyableAmount('sp', 21));
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
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color() {
        if (player.c.points.gte(1e60) || player.h.unlocked) return "#E36409";
        return "#666666";
    },
    branches: ["ds"],
    requires: 1e60,
    resource: "hexes",
    baseResource: "cores",
    baseAmount() {return player.c.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1);
        if (hasUpgrade('h', 12)) {
            mult = mult.mul(upgradeEffect('h', 12));
            if (hasUpgrade('h', 22)) {
                mult = mult.mul(upgradeEffect('h', 22));
                if (hasUpgrade('h', 32)) {
                    mult = mult.mul(upgradeEffect('h', 32));
                    if (hasUpgrade('h', 42)) mult = mult.mul(upgradeEffect('h', 42));
        }}};
        if (hasUpgrade('h', 14)) mult = mult.mul(4);
        if (hasUpgrade('h', 62)) mult = mult.mul(upgradeEffect('h', 62));
        if (hasUpgrade('h', 11) && hasUpgrade('ds', 11)) mult = mult.mul(upgradeEffect('h', 11));
        if (hasUpgrade('p', 12)) mult = mult.mul(1.02);
        if (getBuyableAmount('ds', 11).gt(0)) mult = mult.mul(new Decimal(2).pow(getBuyableAmount('ds', 11)));
        if (hasChallenge('ds', 11)) mult = mult.mul(player.ds.points.add(1).pow(0.25));
        if (inChallenge('ds', 11)) mult = mult.mul(0.001);
        if (inChallenge('ds', 12)) mult = mult.mul(0.0000000001);
        if (inChallenge('ds', 21)) mult = mult.mul(0.00001);
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    softcap: new Decimal("1e1000"),
    softcapPower: 0.5,
    row: 2,
    hotkeys: [
        {key: "h", description: "H: Reset for hexes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.sp.unlocked},
    passiveGeneration() {
        let gen = 0;
        if (hasMilestone("s", 9)) {
            gen += 0.001;
        };
        return gen;
    },
    doReset(resettingLayer) {
        let keep = [];
            if (hasMilestone("ds", 8) && resettingLayer == "ds") keep.push("milestones");
            if (hasMilestone("a", 6) && resettingLayer == "a") keep.push("milestones");
            if (hasMilestone("a", 11) && (resettingLayer == "a" || resettingLayer == "ds")) keep.push("upgrades");
            if (layers[resettingLayer].row > this.row) layerDataReset("h", keep);
        },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        "milestones",
        "upgrades",
    ],
    milestones: {
        0: {
            requirementDescription: "5 hexes",
            effectDescription: "keep essence upgrades on hex resets",
            done() { return player.h.points.gte(5) }
        },
        1: {
            requirementDescription: "25 hexes",
            effectDescription: "keep essence buyables on hex resets",
            done() { return player.h.points.gte(25) }
        },
        2: {
            requirementDescription: "125 hexes",
            effectDescription: "keep core upgrades on hex resets",
            done() { return player.h.points.gte(125) }
        },
        3: {
            requirementDescription: "625 hexes",
            effectDescription: "keep core buyables on hex resets",
            done() { return player.h.points.gte(625) }
        },
        4: {
            requirementDescription: "3,125 hexes",
            effectDescription: "keep core upgrades and buyables on subatomic particle resets",
            done() { return player.h.points.gte(3125) }
        },
        5: {
            requirementDescription: "15,625 hexes",
            effectDescription: "keep all row 2 milestones on row 3 resets",
            done() { return player.h.points.gte(15625) }
        },
        6: {
            requirementDescription: "78,125 hexes",
            effectDescription: "keep quark upgrades on subatomic particle resets",
            done() { return player.h.points.gte(78125) }
        },
        7: {
            requirementDescription: "390,625 hexes",
            effectDescription: "keep quark upgrades on hex resets",
            done() { return player.h.points.gte(390625) }
        },
        8: {
            requirementDescription: "1,953,125 hexes",
            effectDescription: "you can explore 3 further core upgrades",
            done() { return player.h.points.gte(1953125) }
        },
    },
    upgrades: {
        11: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Hex Leak';
            },
            description() {
                if (hasUpgrade('ds', 11)) return 'multiplies point and hex gain based on your hexes';
                return 'multiplies point gain based on your hexes';            
            },
            cost: 1,
            effect() {
               return player.h.points.add(1).pow(0.005);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (hasUpgrade('ds', 11)) text += '<br>and ' + format(this.effect()) + 'x';
                if (player.nerdMode) {
                    if (hasUpgrade('ds', 11)) text += ' <br>formula (for both): (x+1)^0.005';
                    else text += ' <br>formula: (x+1)^0.005';
                };
                return text;
            },
        },
        12: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Stronger Hexes';
            },
            description() {
                return 'multiplies hex gain based on your hexes';
            },
            cost: 5,
            effect() {
                if (hasUpgrade('ds', 12)) return player.h.points.add(1).pow(0.1).pow(2);
                else return player.h.points.add(1).pow(0.1);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) {
                    if (hasUpgrade('ds', 12)) text += ' <br>formula: (x+1)^0.1^2';
                    else text += ' <br>formula: (x+1)^0.1';
                };
                return text;
            },
        },
        13: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Hex Fusion';
            },
            description() {
                return 'multiplies core gain based on your hexes';
            },
            cost: 10,
            effect() {
                return player.h.points.add(1).pow(0.09);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.09';
                return text;
            },
        },
        14: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Boost Hexes';
            },
            description() {
                return 'Hex gain is quadrupled';
            },
            cost: 25,
        },
        21: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Numerical Hexes';
            },
            description() {
                if (hasUpgrade('ds', 11)) return 'multiplies the first effect of <b class="layer-h' + getdark(this, "ref") + 'Hex Leak</b> based on your hexes';
                return 'multiplies the effect of <b class="layer-h' + getdark(this, "ref") + 'Hex Leak</b> based on your hexes';            
            },
            cost: 1000,
            effect() {
                return player.h.points.add(1).pow(0.025);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.025';
                return text;
            },
            unlocked() { return hasUpgrade("h", 11) && hasUpgrade("h", 12) && hasUpgrade("h", 13) && hasUpgrade("h", 14) },
        },
        22: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Super Strong Hexes';
            },
            description() {
                return 'multiplies the effect of <b class="layer-h' + getdark(this, "ref") + 'Stronger Hexes</b> based on your hexes';            
            },
            cost: 5000,
            effect() {
                return player.h.points.add(1).pow(0.05);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.05';
                return text;
            },
            unlocked() { return hasUpgrade("h", 11) && hasUpgrade("h", 12) && hasUpgrade("h", 13) && hasUpgrade("h", 14) },
        },
        23: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Hex Fission';
            },
            description() {
                return 'multiplies the effect of <b class="layer-h' + getdark(this, "ref") + 'Hex Fusion</b> based on your hexes'            
            },
            cost: 10000,
            effect() {
                return player.h.points.add(1).pow(0.15);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.15';
                return text;
            },
            unlocked() { return hasUpgrade("h", 11) && hasUpgrade("h", 12) && hasUpgrade("h", 13) && hasUpgrade("h", 14) },
        },
        24: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Boost Cores';
            },
            description() {
                return 'Core gain is tripled';
            },
            cost: 25000,
            unlocked() { return hasUpgrade("h", 11) && hasUpgrade("h", 12) && hasUpgrade("h", 13) && hasUpgrade("h", 14) },
        },
        31: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Hex Numerals';
            },
            description() {
                return 'multiplies the effect of <b class="layer-h' + getdark(this, "ref") + 'Numerical Hexes</b> based on your points'            
            },
            cost: 100000,
            effect() {
                return player.points.add(1).pow(0.002);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.002';
                return text;
            },
            unlocked() { return hasUpgrade("h", 21) && hasUpgrade("h", 22) && hasUpgrade("h", 23) && hasUpgrade("h", 24) },
        },
        32: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Extreme Hexes';
            },
            description() {
                return 'multiplies the effect of <b class="layer-h' + getdark(this, "ref") + 'Super Strong Hexes</b> based on your hexes'            
            },
            cost: 500000,
            effect() {
                return player.h.points.add(1).pow(0.01);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.01';
                return text;
            },
            unlocked() { return hasUpgrade("h", 21) && hasUpgrade("h", 22) && hasUpgrade("h", 23) && hasUpgrade("h", 24) },
        },
        33: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Core of Hexes';
            },
            description() {
                return 'multiplies the effect of <b class="layer-h' + getdark(this, "ref") + 'Hex Fission</b> based on your cores';
            },
            cost: 1000000,
            effect() {
                return player.h.points.add(1).pow(0.025);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.025';
                return text;
            },
            unlocked() { return hasUpgrade("h", 21) && hasUpgrade("h", 22) && hasUpgrade("h", 23) && hasUpgrade("h", 24) },
        },
        34: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Boost Quarks';
            },
            description() {
                return 'Quark gain is doubled';
            },
            cost: 2500000,
            unlocked() { return hasUpgrade("h", 21) && hasUpgrade("h", 22) && hasUpgrade("h", 23) && hasUpgrade("h", 24) },
        },
        41: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Numero Hex';
            },
            description() {
                return 'multiplies the effect of <b class="layer-h' + getdark(this, "ref") + 'Hex Numerals</b> based on your hexes';
            },
            cost: 7500000,
            effect() {
                return player.points.add(1).pow(0.0001);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.0001';
                return text;
            },
            unlocked() { return hasUpgrade("h", 31) && hasUpgrade("h", 32) && hasUpgrade("h", 33) && hasUpgrade("h", 34) },
        },
        42: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Ultra Hexes';
            },
            description() {
                return 'multiplies the effect of <b class="layer-h' + getdark(this, "ref") + 'Extreme Hexes</b> based on your hexes';
            },
            cost: 15000000,
            effect() {
                return player.h.points.add(1).pow(0.001);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.001';
                return text;
            },
            unlocked() { return hasUpgrade("h", 31) && hasUpgrade("h", 32) && hasUpgrade("h", 33) && hasUpgrade("h", 34) },
        },
        43: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Core Continuation';
            },
            description() {
                return 'Gain 1% of core gain per second';
            },
            cost: 45000000,
            unlocked() { return hasUpgrade("h", 31) && hasUpgrade("h", 32) && hasUpgrade("h", 33) && hasUpgrade("h", 34) },
        },
        44: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Rapid Cores';
            },
            description() {
                return 'Increase the effect of <b class="layer-h' + getdark(this, "ref") + 'Core Continuation</b> by 9% (total: 10%)';
            },
            cost: 75000000,
            unlocked() { return hasUpgrade("h", 31) && hasUpgrade("h", 32) && hasUpgrade("h", 33) && hasUpgrade("h", 34) },
        },
        51: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Faster Essence';
            },
            description() {
                return 'Increase essence gain per second by 25% if you have the <b class="layer-c' + getdark(this, "ref") + '4th core milestone</b> (total: 75%)';
            },
            cost: 9e90,
            unlocked() { return hasUpgrade("ds", 11) && hasUpgrade("h", 41) && hasUpgrade("h", 42) && hasUpgrade("h", 43) && hasUpgrade("h", 44) },
        },
        52: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Core Production Line';
            },
            description() {
                return 'Increase the effect of <b class="layer-h' + getdark(this, "ref") + 'Rapid Cores</b> by 15% (total: 25%)';
            },
            cost: 250000000,
            unlocked() { return hasUpgrade("h", 41) && hasUpgrade("h", 42) && hasUpgrade("h", 43) && hasUpgrade("h", 44) },
        },
        53: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Sub Core Particle Fusion';
            },
            description() {
                return 'you can explore 3 new core upgrades and 3 new subatomic particle upgrades';
            },
            cost: 7.5e9,
            unlocked() { return hasUpgrade("h", 41) && hasUpgrade("h", 42) && hasUpgrade("h", 43) && hasUpgrade("h", 44) },
        },
        54: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Fastest Essence';
            },
            description() {
                return 'Increase the effect of <b class="layer-h' + getdark(this, "ref") + 'Faster Essence</b> by 25% (total: 100%)';
            },
            cost: 9.5e95,
            unlocked() { return hasUpgrade("ds", 11) && hasUpgrade("h", 41) && hasUpgrade("h", 42) && hasUpgrade("h", 43) && hasUpgrade("h", 44) },
        },
        61: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Essence Overdrive';
            },
            description() {
                return 'Increase the effect of <b class="layer-h' + getdark(this, "ref") + 'Fastest Essence</b> by 25% (total: 125%)';
            },
            cost: 1e100,
            unlocked() { return hasUpgrade("ds", 12) && hasUpgrade("h", 51) && hasUpgrade("h", 52) && hasUpgrade("h", 53) && hasUpgrade("h", 54) },
        },
        62: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Sub Hex Particle';
            },
            description() {
                return 'multiply hex gain based on your subatomic particles';
            },
            cost: 1e50,
            effect() {
                return player.sp.points.add(1).pow(2.5);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^2.5';
                return text;
            },
            unlocked() { return hasUpgrade("h", 52) && hasUpgrade("h", 53) },
        },
        63: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Hexed Subatomic Particle';
            },
            description() {
                return 'multiply subatomic particle gain based on your hexes';
            },
            cost: 6.66e66,
            effect() {
                return player.h.points.add(1).pow(0.02);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.02';
                return text;
            },
            unlocked() { return hasUpgrade("h", 52) && hasUpgrade("h", 53) },
        },
        64: {
            title() {
                return '<b class="layer-h' + getdark(this, "title") + 'Potential Essence Potential';
            },
            description() {
                return 'Increase the effect of <b class="layer-h' + getdark(this, "ref") + 'Essence Overdrive</b> by 25% (total: 150%)';
            },
            cost: 1.11e111,
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
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color() {
        if (player.h.points.gte(1e60) || player.ds.unlocked) return "#BA0035";
        return "#666666";
    },
    requires: 1e60,
    resource: "demon souls",
    baseResource: "hexes",
    baseAmount() {return player.h.points},
    type: "normal",
    exponent: 0.05,
    gainMult() {
        mult = new Decimal(1);
        if (hasUpgrade('a', 11)) mult = mult.mul(upgradeEffect('a', 11));
        if (hasUpgrade('a', 42)) mult = mult.mul(upgradeEffect('a', 42));
        if (hasUpgrade('a', 71)) mult = mult.mul(upgradeEffect('a', 71));
        if (hasChallenge('ds', 11)) mult = mult.mul(player.ds.points.add(1).pow(0.25));
        if (hasChallenge('ds', 12)) mult = mult.mul(player.h.points.add(1).pow(0.02));
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    row: 3,
    hotkeys: [
        {key: "d", description: "D: Reset for demon souls", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.h.unlocked},
    passiveGeneration() {
        let gen = 0;
        if (hasMilestone("s", 10)) {
            gen += 0.00001;
        };
        return gen;
    },
    doReset(resettingLayer) {
        let keep = [];
            if (layers[resettingLayer].row > this.row) layerDataReset("ds", keep);
        },
    tabFormat: {
        "Demonic Curses": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
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
                "blank",
                "blank",
                "challenges",
                "blank",
            ],
            unlocked() {
                if (hasUpgrade("ds", 22)) return true;
                return false;
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 demon soul",
            effectDescription: "keep subatomic particle buyables on demon soul resets",
            done() { return player.ds.points.gte(1) }
        },
        1: {
            requirementDescription: "5 demon souls",
            effectDescription: "keep subatomic particle upgrades on demon soul resets",
            done() { return player.ds.points.gte(5) }
        },
        2: {
            requirementDescription: "15 demon souls",
            effectDescription: "keep row 2 milestones on demon soul resets",
            done() { return player.ds.points.gte(15) }
        },
        3: {
            requirementDescription: "50 demon souls",
            effectDescription: "keep essence upgrades on all resets",
            done() { return player.ds.points.gte(50) }
        },
        4: {
            requirementDescription: "125 demon souls",
            effectDescription: "keep essence buyables on all resets",
            done() { return player.ds.points.gte(125) }
        },
        5: {
            requirementDescription: "625 demon souls",
            effectDescription: "keep core upgrades on demon soul resets",
            done() { return player.ds.points.gte(625) }
        },
        6: {
            requirementDescription: "3,125 demon souls",
            effectDescription: "keep core buyables on demon soul resets",
            done() { return player.ds.points.gte(3125) }
        },
        7: {
            requirementDescription: "1e10 demon souls",
            effectDescription: "keep quark upgrades on demon soul resets",
            done() { return player.ds.points.gte(1e10) }
        },
        8: {
            requirementDescription: "1e14 demon souls",
            effectDescription: "keep hex milestones on demon soul resets",
            done() { return player.ds.points.gte(1e14) }
        },
    },
    upgrades: {
        11: {
            title() {
                return '<b class="layer-ds' + getdark(this, "title") + 'Mad Hexes';
            },
            description() {
                return 'you can explore 2 further hex upgrades, and <b class="layer-h' + getdark(this, "ref") + 'Hex Leak</b> also applies to hex gain (and not any other upgrades in the chain)';
            },
            cost: 10,
        },
        12: {
            title() {
                return '<b class="layer-ds' + getdark(this, "title") + 'Hex Mania';
            },
            description() {
                return 'you can explore 2 further hex upgrades, and <b class="layer-h' + getdark(this, "ref") + 'Stronger Hexes</b>\' effect is squared';
            },
            cost: 75,
        },
        21: {
            title() {
                return '<b class="layer-ds' + getdark(this, "title") + 'Hall of Fame';
            },
            description() {
                text = 'achievements also multiply essence gain';
                if (player.nerdMode) text += ' <br>formula: x*0.2';
                return text;
            },
            cost: 5000,
            unlocked() { return hasUpgrade("ds", 11) && hasUpgrade("ds", 12) }
        },
        22: {
            title() {
                return '<b class="layer-ds' + getdark(this, "title") + 'Demonic Key';
            },
            description() {
                return 'unlocks the <b class="layer-ds' + getdark(this, "ref") + 'Demon Gateway</b>';
            },
            cost: 100000,
            unlocked() { return hasUpgrade("ds", 11) && hasUpgrade("ds", 12) }
        },
        23: {
            title() {
                return '<b class="layer-ds' + getdark(this, "title") + 'Trophy of Glory';
            },
            description() {
                text = 'achievements also multiply core and quark gain if you own <b class="layer-ds' + getdark(this, "ref") + 'Hall of Fame';
                if (player.nerdMode) text += '</b> <br>formula: x^2/100';
                return text;
            },
            cost: 2500000,
            unlocked() { return hasUpgrade("ds", 11) && hasUpgrade("ds", 12) && hasUpgrade("ds", 21) }
        },
        24: {
            title() {
                return '<b class="layer-ds' + getdark(this, "title") + 'Buried History';
            },
            description() {
                text = 'achievements boosting point gain uses a better formula if you own <b class="layer-ds' + getdark(this, "ref") + 'Hall of Fame';
                if (player.nerdMode) text += '</b> <br>formula: x*0.2';
                return text;
            },
            cost: 1.11e11,
            unlocked() { return hasUpgrade("ds", 11) && hasUpgrade("ds", 12) && hasUpgrade("ds", 23) }
        },
    },
    buyables: {
        11: {
            cost(x = 0) { return new Decimal(2).pow(getBuyableAmount('ds', 11).add(x)).add(1) },
            title() {
                return '<h3 class="layer-ds' + getdark(this, "title-buyable") + 'Demonic Energy';
            },
            canAfford() {
                return player.ds.points.gte(this.cost());
            },
            purchaseLimit: 22,
            buy() {
                player.ds.points = player.ds.points.sub(this.cost());
                setBuyableAmount('ds', 11, getBuyableAmount('ds', 11).add(1));
            },
            display() {
                text = '';
                if (player.nerdMode) text = '<br>formulas: 2^x and x*5+1';
                if (getBuyableAmount('ds', 11).eq(0)) return 'multiplies hex gain (and also subatomic particle gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: 1.00x<br>and 1.00x' + text + '<br><br>Cost: 1 demon soul<br><br>Bought: 0';
                else return 'multiplies hex gain (and also subatomic particle gain at a reduced rate) based on the amount of this upgrade bought.<br>Currently: ' + format(new Decimal(2).pow(getBuyableAmount('ds', 11))) + 'x<br>and ' + format(getBuyableAmount('ds', 11).mul(5).add(1)) + 'x' + text + '<br><br>Cost: ' + formatWhole(this.cost()) + ' demon souls<br><br>Bought: ' + formatWhole(getBuyableAmount('ds', 11));
            },
        },
    },
    challenges: {
        11: {
            name() {
                if (colorvalue[0][1] && colorvalue[1] != "none") return '<h3 class="layer-ds">Blazing Curse';
                return '<h3>Blazing Curse';
            },
            challengeDescription: " - Forces a Demon Soul reset<br> - Quark gain is divided by 100,000<br> - Point gain is divided by 10,000<br> - Hex gain is divided by 1,000<br> - Core gain is divided by 100<br> - Quark gain is divided by 10",
            goalDescription() {
                if (colorvalue[0][2] && colorvalue[1] != "none") return '<b class="layer-h">Potential Essence Potential';
                return '<b>Potential Essence Potential';
            },
            canComplete() {
                if (hasUpgrade('h', 64)) return true;
                return false;
            },
            onEnter() {
                doReset("ds");
            },
            rewardDescription: "multiplies hex and demon soul gain based on your demon souls",
            rewardDisplay() {
                text = format(player.ds.points.add(1).pow(0.25)) + 'x';
                if (player.nerdMode) text += '<br>formula: (x+1)^0.25';
                return text;
            },
        },
        12: {
            name() {
                if (colorvalue[0][1] && colorvalue[1] != "none") return '<h3 class="layer-ds">Hellfire';
                return '<h3>Hellfire';
            },
            challengeDescription: " - Forces a Demon Soul reset<br> - Point gain is divided by 1,000,000<br> - Hex gain is divided by 1e10<br> - Subatomic Particle gain is divided by the number of Quarks",
            goalDescription() {
                if (colorvalue[0][2] && colorvalue[1] != "none") return '<b class="layer-h">Sub Core Particle Fusion';
                return '<b>Sub Core Particle Fusion';
            },
            canComplete() {
                if (hasUpgrade('h', 63)) return true;
                return false;
            },
            onEnter() {
                doReset("ds");
            },
            unlocked() {
                if (hasChallenge('ds', 11)) return true;
                return false;
            },
            rewardDescription: "multiply demon soul gain based on your hexes",
            rewardDisplay() {
                text = format(player.h.points.add(1).pow(0.02)) + 'x';
                if (player.nerdMode) text += '<br>formula: (x+1)^0.02';
                return text;
            },
        },
        21: {
            name() {
                if (colorvalue[0][1] && colorvalue[1] != "none") return '<h3 class="layer-ds">Opposite Polarity';
                return '<h3>Opposite Polarity';
            },
            challengeDescription: " - Forces a Demon Soul reset<br> - Hex gain is divided by 100,000<br> - Point gain is divided by 1e10<br> - Core gain is divided by 1e15<br> - Essence gain is divided by 1e20",
            goalDescription() {
                if (colorvalue[0][2] && colorvalue[1] != "none") return '<b class="layer-h">Sub Core Particle Fusion';
                return '<b>Sub Core Particle Fusion';
            },
            canComplete() {
                if (hasUpgrade('h', 53)) return true;
                return false;
            },
            onEnter() {
                doReset("ds");
            },
            unlocked() {
                if (hasChallenge('ds', 12)) return true;
                return false;
            },
            rewardDescription: "multiply subatomic particle<br>gain based on your demon souls",
            rewardDisplay() {
                text = format(player.ds.points.add(1).pow(0.2)) + 'x';
                if (player.nerdMode) text += '<br>formula: (x+1)^0.2';
                return text;
            },
        },
        22: {
            name() {
                if (colorvalue[0][1] && colorvalue[1] != "none") return '<h3 class="layer-ds">Dreaded Science';
                return '<h3>Dreaded Science';
            },
            challengeDescription: " - Forces a Demon Soul reset<br> - Point gain is divided by 1e10<br> - Quark and Subatomic Particle gain is divided by 1e40",
            goalDescription() {
                if (colorvalue[0][2] && colorvalue[1] != "none") return '<b class="layer-a">Famed Atom\'s Donations';
                return '<b>Famed Atom\'s Donations';
            },
            canComplete() {
                if (hasUpgrade('a', 51)) return true;
                return false;
            },
            onEnter() {
                doReset("ds");
            },
            unlocked() {
                if (hasMilestone('a', 7)) return true;
                return false;
            },
            rewardDescription: "multiply atom gain by 1.5",
        },
    },
});

addLayer("a", {
    name: "Atoms",
    symbol: "A",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color() {
        if (player.sp.points.gte(10000) || player.a.unlocked) return "#4D2FE0";
        return "#666666";
    },
    requires: 1000,
    resource: "atoms",
    baseResource: "subatomic particles",
    baseAmount() {return player.sp.points},
    type: "static",
    exponent: 1,
    canBuyMax() { return true },
    gainMult() {
        mult = new Decimal(1);
        return mult;
    },
    gainExp() {
        gain = new Decimal(1);
        if (hasUpgrade('a', 22)) gain = gain.mul(upgradeEffect('a', 22));
        if (hasUpgrade('a', 32)) gain = gain.mul(upgradeEffect('a', 32));
        if (hasUpgrade('a', 33)) gain = gain.mul(upgradeEffect('a', 33));
        if (hasUpgrade('a', 61)) gain = gain.mul(upgradeEffect('a', 61));
        if (hasUpgrade('a', 62)) gain = gain.mul(upgradeEffect('a', 62));
        if (hasUpgrade('a', 72)) gain = gain.mul(upgradeEffect('a', 72));
        if (hasChallenge('ds', 22)) gain = gain.mul(1.5);
        return gain;
    },
    row: 3,
    hotkeys: [
        {key: "a", description: "A: Reset for atoms", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.ds.unlocked},
    doReset(resettingLayer) {
        let keep = [];
            if (layers[resettingLayer].row == this.row) {
                keep.push("milestones", "points", "best", "total");
                if (hasMilestone('a', 12)) keep.push("upgrades");
            };
            if (layers[resettingLayer].row > this.row) layerDataReset("a", keep);
        },
    resetsNothing() {
        if (hasMilestone('a', 14)) return true;
        return false;
    },
    tabFormat: {
        "Atomic Progress": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "blank",
                "milestones",
            ],
        },
        "Atomic Tree": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "blank",
                ["display-text",
                    function() {
                        text = 'When you buy one of these upgrades, you cannot buy<br>any upgrades that are not on its path. When you<br>do a row 4 reset, all atom upgrades will be reset.';
                        if (hasMilestone('a', 10)) {
                            if (!colorvalue[0][2] || colorvalue[1] == "none") text += '<br><br>From the effect of the 11th atom milestone:<br>you can buy all atom upgrades.';
                            else text += '<br><br>From the effect of the <b class="layer-a' + getdark(this, "ref", true, true) + '11th atom milestone</b>:<br>you can buy all atom upgrades.';
                        };
                        if (hasMilestone('a', 12)) {
                            if (!colorvalue[0][2] || colorvalue[1] == "none") text += '<br><br>From the effect of the 13th atom milestone:<br>row 4 resets do not reset atom upgrades.';
                            else text += '<br><br>From the effect of the <b class="layer-a' + getdark(this, "ref", true, true) + '13th atom milestone:</b><br>row 4 resets do not reset atom upgrades.';
                        };
                        return text;
                    }],
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
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 atom",
            effectDescription: "keep subatomic particle buyables on atom resets",
            done() { return player.a.points.gte(1) }
        },
        1: {
            requirementDescription: "2 atoms",
            effectDescription: "keep core buyables on atom resets",
            done() { return player.a.points.gte(2) }
        },
        2: {
            requirementDescription: "3 atoms",
            effectDescription: "keep core upgrades on atom resets",
            done() { return player.a.points.gte(3) }
        },
        3: {
            requirementDescription: "4 atoms",
            effectDescription: "keep subatomic particle upgrades on atom resets",
            done() { return player.a.points.gte(4) }
        },
        4: {
            requirementDescription: "5 atoms",
            effectDescription: "keep core milestones on atom resets",
            done() { return player.a.points.gte(5) }
        },
        5: {
            requirementDescription: "6 atoms",
            effectDescription: "keep quark milestones on atom resets",
            done() { return player.a.points.gte(6) }
        },
        6: {
            requirementDescription: "7 atoms",
            effectDescription: "keep hex milestones on atom resets",
            done() { return player.a.points.gte(7) }
        },
        7: {
            requirementDescription: "8 atoms & 45 total atoms",
            effectDescription: "unlock a new demon soul challenge",
            done() { return player.a.points.gte(8) && player.a.total.gte(45) }
        },
        8: {
            requirementDescription: "10 atoms &  75 total atoms",
            effectDescription: "gain 1% of quark gain per second",
            done() { return player.a.points.gte(10) && player.a.total.gte(75) }
        },
        9: {
            requirementDescription: "25 atoms &  125 total atoms",
            effectDescription: "gain +9% of quark gain per second (total: 10%)",
            done() { return player.a.points.gte(25) && player.a.total.gte(125) }
        },
        10: {
            requirementDescription: "40 atoms & 175 total atoms",
            effectDescription: "you can buy upgrades that are not on the other's paths",
            done() { return player.a.points.gte(40) && player.a.total.gte(175) }
        },
        11: {
            requirementDescription: "200 atoms & 500 total atoms",
            effectDescription: "keep hex upgrades on row 4 resets",
            done() { return player.a.points.gte(200) && player.a.total.gte(500) }
        },
        12: {
            requirementDescription: "750 atoms and 1,000 total atoms",
            effectDescription: "keep atom upgrades on row 4 resets",
            done() { return player.a.points.gte(750) && player.a.total.gte(1000) }
        },
        13: {
            requirementDescription: "1,000 atoms and 1,500 total atoms",
            effectDescription: "keep subatomic particle milestones on atom resets",
            done() { return player.a.points.gte(1000) && player.a.total.gte(1500) }
        },
        14: {
            requirementDescription: "10,000 atoms and 1e600 prayers",
            effectDescription: "atoms reset nothing",
            done() { return player.a.points.gte(10000) && player.p.points.gte("1e600") },
            unlocked() { return hasMilestone('a', 13) && player.r.points.gt(0) }
        },
    },
    upgrades: {
        11: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'The Demon of the Atom';
            },
            description() {
                return 'multiplies demon soul gain based on your atoms';
            },
            cost: 1,
            effect() {
                return player.a.points.add(1).pow(0.5);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.5';
                return text;
            },
            branches: [21, 22],
        },
        21: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'Decaying Atoms';
            },
            description() {
                return 'multiplies subatomic particle gain based on your best atoms';
            },
            cost: 1,
            effect() {
                return player.a.best.add(1).pow(1.25);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^1.25';
                return text;
            },
            branches: [31, 32],
            unlocked() {
                if (!hasUpgrade('a', 22) && !hasUpgrade('a', 33) || hasMilestone('a', 10)) return true;
            },
        },
        22: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'Atom Construction';
            },
            description() {
                return 'multiplies atom gain based on your subatomic particles';
            },
            cost: 1,
            effect() {
                return player.sp.points.add(1).pow(0.02);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.02';
                return text;
            },
            branches: [32, 33],
            unlocked() {
                if (!hasUpgrade('a', 21) && !hasUpgrade('a', 31) || hasMilestone('a', 10)) return true;
            },
        },
        31: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'Decayed Atoms';
            },
            description() {
                return 'multiplies subatomic particle gain based on your total atoms';
            },
            cost: 2,
            effect() {
                return player.a.total.add(1).pow(1.05);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^1.05';
                return text;
            },
            branches: [41],
            unlocked() {
                if (!hasUpgrade('a', 22) && !hasUpgrade('a', 32) && !hasUpgrade('a', 33) && !hasUpgrade('a', 42) || hasMilestone('a', 10)) return true;
            },
        },
        32: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'Atomic Recursion';
            },
            description() {
                return 'multiplies atom gain based on your total atoms';
            },
            cost: 2,
            effect() {
                return player.a.total.add(1).pow(0.05);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.05';
                return text;
            },
            branches: [41, 42],
            unlocked() {
                if (!hasUpgrade('a', 31) && !hasUpgrade('a', 33) || hasMilestone('a', 10)) return true;
            },
        },
        33: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'Atom Production';
            },
            description() {
                return 'multiplies atom gain based on your subatomic particles';
            },
            cost: 2,
            effect() {
                return player.sp.points.add(1).pow(0.025);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.025';
                return text;
            },
            branches: [42],
            unlocked() {
                if (!hasUpgrade('a', 21) && !hasUpgrade('a', 31) && !hasUpgrade('a', 32) && !hasUpgrade('a', 41) || hasMilestone('a', 10)) return true;
            },
        },
        41: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'Atom Revenants';
            },
            description() {
                return 'multiplies quark gain based on your total atoms minus your current atoms';
            },
            cost: 2,
            effect() {
                return player.a.total.sub(player.a.points).pow(0.75);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x-y)^0.75';
                return text;
            },
            branches: [51],
            unlocked() {
                if (!hasUpgrade('a', 33) && !hasUpgrade('a', 42) || hasMilestone('a', 10)) return true;
            },
        },
        42: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'The Fallen';
            },
            description() {
                return 'multiplies demon soul gain based on your best atoms minus your current atoms';
            },
            cost: 2,
            effect() {
                return player.a.best.mul(1.5).sub(player.a.points).pow(1.05);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula:<br>(x*1.5-y)^1.05';
                return text;
            },
            branches: [51],
            unlocked() {
                if (!hasUpgrade('a', 31) && !hasUpgrade('a', 41) || hasMilestone('a', 10)) return true;
            },
        },
        51: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'Famed Atoms\' Donations';
            },
            description() {
                text = 'multiplies subatomic particle gain based on your number of achievements';
                if (player.nerdMode) text += ' <br>formula: x^1.25';
                return text;
            },
            cost: 3,
            branches: [61, 62],
            unlocked() { return true },
        },
        61: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'Unpeaked';
            },
            description() {
                return 'multiplies atom gain based on your total atoms minus your best atoms';
            },
            cost: 3,
            effect() {
                return player.a.total.sub(player.a.best).pow(0.2);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x-y)^0.2';
                return text;
            },
            branches: [71, 72],
            unlocked() {
                if (!hasUpgrade('a', 62) && !hasUpgrade('a', 73) || hasMilestone('a', 10)) return true;
            },
        },
        62: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'Higher Peak';
            },
            description() {
                return 'multiplies atom gain based on your total atoms times your current atoms';
            },
            cost: 3,
            effect() {
                return player.a.total.mul(player.a.points).pow(0.05).add(1);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x*y)^0.05+1';
                return text;
            },
            branches: [72, 73],
            unlocked() {
                if (!hasUpgrade('a', 61) && !hasUpgrade('a', 71) || hasMilestone('a', 10)) return true;
            },
        },
        71: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'Demons Inside';
            },
            description() {
                return 'multiplies demon soul gain based on your best atoms times your current atoms';
            },
            cost: 4,
            effect() {
                return player.a.best.mul(player.a.points).mul(2.5).pow(0.15);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x*y*2.5)^0.15';
                return text;
            },
            unlocked() {
                if (!hasUpgrade('a', 62) && !hasUpgrade('a', 72) && !hasUpgrade('a', 73) || hasMilestone('a', 10)) return true;
            },
        },
        72: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'Recurred, Recurring';
            },
            description() {
                return 'multiplies atom gain based on your total atoms';
            },
            cost: 4,
            effect() {
                return player.a.total.add(1).pow(0.1);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.1';
                return text;
            },
            unlocked() {
                if (!hasUpgrade('a', 71) && !hasUpgrade('a', 73) || hasMilestone('a', 10)) return true;
            },
        },
        73: {
            title() {
                return '<b class="layer-a' + getdark(this, "title") + 'Atomic Essence';
            },
            description() {
                return 'multiplies essence gain based on your atoms';
            },
            cost: 4,
            effect() {
                return player.a.points.add(1).pow(1.75);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^1.75';
                return text;
            },
            unlocked() {
                if (!hasUpgrade('a', 61) && !hasUpgrade('a', 71) && !hasUpgrade('a', 72) || hasMilestone('a', 10)) return true;
            },
        },
    },
});

addLayer("p", {
    name: "Prayers",
    symbol: "P",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        divinity: new Decimal(0),
        divinitysoftcap_start: [1e150],
        divinitysoftcap_power: [0.95],
        holiness: new Decimal(0),
        hymn: new Decimal(0),
        hymnEff: new Decimal(0),
        auto_upgrades: false,
        smart_auto_upgrades: false,
    }},
    color() {
        if (player.e.points.gte(new Decimal("1e1000")) || player.p.unlocked) return "#FDBBFF";
        return "#666666";
    },
    branches: ["s"],
    requires: new Decimal("1e1000"),
    resource: "prayers",
    baseResource: "essence",
    baseAmount() {return player.e.points},
    type: "normal",
    exponent: 0.012,
    gainMult() {
        mult = new Decimal(1);
        if (hasUpgrade('p', 15)) mult = mult.mul(upgradeEffect('p', 15));
        if (hasUpgrade('p', 21)) mult = mult.mul(upgradeEffect('p', 21));
        if (hasUpgrade('ds', 21) && hasUpgrade('ds', 23) && hasUpgrade('ds', 24) && hasUpgrade('p', 31)) mult = mult.mul(player.A.points.pow(2).div(100));
        if (hasUpgrade('p', 41)) mult = mult.mul(player.p.hymnEff);
        if (hasUpgrade('p', 62)) {
            mult = mult.mul(upgradeEffect('p', 62));
            if (hasUpgrade('p', 63)) mult = mult.mul(upgradeEffect('p', 63));
        };
        if (hasUpgrade('p', 73)) mult = mult.mul(upgradeEffect('p', 73));
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    row: 1,
    hotkeys: [
        {key: "p", description: "P: Reset for prayers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.a.unlocked},
    passiveGeneration() {
        let gen = 0;
        if (hasMilestone("s", 7)) {
            gen += 0.005;
        };
        return gen;
    },
    automate() {
        if (player.p.auto_upgrades) {
            notsmart = !player.p.smart_auto_upgrades;
            buyUpgrade('p', 11);
            if (notsmart || player.p.points.gte(1000)) buyUpgrade('p', 12);
            buyUpgrade('p', 13);
            buyUpgrade('p', 14);
            if (hasUpgrade('p', 14)) buyUpgrade('p', 15);
            buyUpgrade('p', 21);
            buyUpgrade('p', 33);
            if (notsmart || hasUpgrade('p', 14)) buyUpgrade('p', 22);
            if (hasUpgrade('p', 22)) {
                buyUpgrade('p', 23);
                buyUpgrade('p', 24);
                if (hasUpgrade('p', 24)) buyUpgrade('p', 25);
                if (notsmart || hasUpgrade('p', 24)) buyUpgrade('p', 31);
                buyUpgrade('p', 32);
                buyUpgrade('p', 34);
                if (hasUpgrade('p', 34)) buyUpgrade('p', 35);
                if (notsmart || hasUpgrade('p', 34)) buyUpgrade('p', 41);
            };
            if (hasUpgrade('p', 41)) {
                buyUpgrade('p', 42);
                buyUpgrade('p', 43);
                buyUpgrade('p', 44);
                if (hasUpgrade('p', 44)) buyUpgrade('p', 45);
                if (notsmart || hasUpgrade('p', 44)) buyUpgrade('p', 51);
                buyUpgrade('p', 52);
                buyUpgrade('p', 53);
                buyUpgrade('p', 54);
                if (hasUpgrade('p', 54)) buyUpgrade('p', 55);
                if (notsmart || hasUpgrade('p', 54)) buyUpgrade('p', 61);
                buyUpgrade('p', 62);
                buyUpgrade('p', 63);
                buyUpgrade('p', 64);
                if (hasUpgrade('p', 64)) buyUpgrade('p', 65);
                buyUpgrade('p', 71);
                buyUpgrade('p', 72);
                buyUpgrade('p', 73);
                buyUpgrade('p', 74);
            };
        };
    },
    effect() {
        effBoost = new Decimal(0.01);
        effEx = new Decimal(1);
        if (hasMilestone('p', 1)) effBoost = effBoost.mul(2);
        if (hasUpgrade('p', 13)) effBoost = effBoost.mul(upgradeEffect('p', 13));
        if (hasUpgrade('p', 32)) effBoost = effBoost.mul(upgradeEffect('p', 32));
        if (hasUpgrade('p', 33)) effBoost = effBoost.mul(upgradeEffect('p', 33));
        if (hasUpgrade('p', 42)) effBoost = effBoost.mul(upgradeEffect('p', 42));
        if (hasMilestone('p', 2)) effEx = new Decimal(1.5);
        if (hasMilestone('p', 3)) effEx = new Decimal(1.6);
        eff = effBoost.mul(player.p.points).pow(effEx);
        sc_start0 = player.p.divinitysoftcap_start[0];
        if (eff.gt(sc_start0)) eff = eff.sub(sc_start0).pow(player.p.divinitysoftcap_power[0]).add(sc_start0);
        if (hasUpgrade('p', 71)) eff = eff.mul(upgradeEffect('p', 71));
        return eff;
    },
    effectDescription() {
        if (colorvalue[1] == "none") {
            if (tmp.p.effect.lt(0.1)) return 'which are generating ' + tmp.p.effect.mul(100).round().div(100) + ' divinity/sec';
            if (tmp.p.effect.gt(player.p.divinitysoftcap_start[0])) return 'which are generating ' + format(tmp.p.effect) + ' divinity/sec (softcapped)';
            return 'which are generating ' + format(tmp.p.effect) + ' divinity/sec';
        };
        if (tmp.p.effect.lt(0.1)) return 'which are generating <h2 class="layer-p">' + tmp.p.effect.mul(100).round().div(100) + '</h2> divinity/sec';
            if (tmp.p.effect.gt(player.p.divinitysoftcap_start[0])) return 'which are generating <h2 class="layer-p">' + format(tmp.p.effect) + '</h2> divinity/sec (softcapped)';
            return 'which are generating <h2 class="layer-p">' + format(tmp.p.effect) + '</h2> divinity/sec';
    },
    doReset(resettingLayer) {
        let keep = [];
            if (resettingLayer == "h") keep.push("points", "best", "total", "milestones");
            if (resettingLayer == "sp") keep.push("points", "best", "total", "milestones");
            if (hasMilestone('s', 5)) keep.push("auto_upgrades");
            if (hasMilestone('s', 6)) keep.push("smart_auto_upgrades");
            if (hasUpgrade('p', 22) && resettingLayer == "p") {
                mult = new Decimal(1);
                if (hasUpgrade('p', 61)) mult = mult.mul(upgradeEffect('p', 61));
                if (hasUpgrade('p', 23) && hasUpgrade('p', 25)) player.p.holiness = player.p.holiness.add(player.p.divinity.mul(0.08).mul(mult));
                else if (hasUpgrade('p', 23)) player.p.holiness = player.p.holiness.add(player.p.divinity.mul(0.06).mul(mult));
                else player.p.holiness = player.p.holiness.add(player.p.divinity.mul(0.04).mul(mult));
            };
            if (hasUpgrade('p', 41) && resettingLayer == "p") {
                if (hasUpgrade('p', 51) && hasUpgrade('p', 55)) player.p.hymn = player.p.hymn.add(player.p.holiness.div(175).floor());
                else if (hasUpgrade('p', 51)) player.p.hymn = player.p.hymn.add(player.p.holiness.div(200).floor());
                else player.p.hymn = player.p.hymn.add(player.p.holiness.div(250).floor());
            };
            if (layers[resettingLayer].row >= this.row) player.p.divinity = new Decimal(0);
            if (layers[resettingLayer].row > this.row) {
                layerDataReset("p", keep);
                if (!keep.includes("holiness")) player.p.holiness = new Decimal(0);
                if (!keep.includes("hymn")) player.p.hymn = new Decimal(0);
            };
        },
    update(diff) {
        if (tmp.p.effect.gt(0)) {
            player.p.divinity = player.p.divinity.add(tmp.p.effect.mul(diff));
            if (hasMilestone('s', 8) && hasUpgrade('p', 22)) {
                mult = new Decimal(1);
                if (hasUpgrade('p', 61)) mult = mult.mul(upgradeEffect('p', 61));
                if (hasUpgrade('p', 23) && hasUpgrade('p', 25)) player.p.holiness = player.p.holiness.add(player.p.divinity.mul(0.08).mul(mult).mul(diff).mul(0.002));
                if (hasUpgrade('p', 23)) player.p.holiness = player.p.holiness.add(player.p.divinity.mul(0.06).mul(mult).mul(diff).mul(0.002));
                else player.p.holiness = player.p.holiness.add(player.p.divinity.mul(0.04).mul(mult).mul(diff).mul(0.002));
            };
            if (hasMilestone('s', 8) && hasUpgrade('p', 41)) {
                mult = new Decimal(1);
                if (hasUpgrade('p', 51) && hasUpgrade('p', 55)) player.p.hymn = player.p.hymn.add(player.p.holiness.div(175).mul(diff).mul(0.002).floor());
                else if (hasUpgrade('p', 51)) player.p.hymn = player.p.hymn.add(player.p.holiness.div(200).mul(diff).mul(0.002).floor());
                else player.p.hymn = player.p.hymn.add(player.p.holiness.div(250).mul(diff).mul(0.002).floor());
            };
        };
        if (hasUpgrade('p', 41)) {
            if (hasUpgrade('p', 43) && hasUpgrade('p', 52) && hasUpgrade('p', 53)) player.p.hymnEff = player.p.hymn.add(1).pow(0.25);
            else if (hasUpgrade('p', 43) && hasUpgrade('p', 52)) player.p.hymnEff = player.p.hymn.add(1).pow(0.225);
            else if (hasUpgrade('p', 43)) player.p.hymnEff = player.p.hymn.add(1).pow(0.2);
            else player.p.hymnEff = player.p.hymn.add(1).pow(0.15);
        };
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        ["display-text",
            function() {
                if (colorvalue[1] == "none") {
                    text = 'You have ' + format(player.p.divinity) + ' divinity, which boosts point generation by ' + format(player.p.divinity.add(1).pow(0.1)) + 'x';
                    if (hasUpgrade('p', 22)) text += '<br>You have ' + format(player.p.holiness) + ' holiness, which boosts essence gain by ' + format(player.p.holiness.add(1).pow(0.055)) + 'x';
                    if (hasUpgrade('p', 41)) text += '<br>You have ' + formatWhole(player.p.hymn) + ' hymns, which boosts prayer gain by ' + format(player.p.hymnEff) + 'x';
                } else {
                    text = 'You have <h2 class="layer-p">' + format(player.p.divinity) + '</h2> divinity, which boosts point generation by <h2 class="layer-p">' + format(player.p.divinity.add(1).pow(0.1)) + '</h2>x';
                    if (hasUpgrade('p', 22)) text += '<br>You have <h2 class="layer-p">' + format(player.p.holiness) + '</h2> holiness, which boosts essence gain by <h2 class="layer-p">' + format(player.p.holiness.add(1).pow(0.055)) + '</h2>x';
                    if (hasUpgrade('p', 41)) text += '<br>You have <h2 class="layer-p">' + formatWhole(player.p.hymn) + '</h2> hymns, which boosts prayer gain by <h2 class="layer-p">' + format(player.p.hymnEff) + '</h2>x';
                };
                return text;
            }],
        "blank",
        "milestones",
        "upgrades",
    ],
    milestones: {
        0: {
            requirementDescription: "1 prayer",
            effectDescription: "hex and subatomic particle resets only reset<br>prayer upgrades and special resources<br>out of the things in the prayer layer",
            done() { return player.p.points.gte(1) },
        },
        1: {
            requirementDescription: "20 prayers",
            effectDescription: "prayers generate twice as much divinity",
            done() { return player.p.points.gte(20) },
        },
        2: {
            requirementDescription: "2,500 prayers & 250 hymns",
            effectDescription: "divinity gain is raised to the power of 1.5",
            done() { return player.p.points.gte(2500) && player.p.hymn.gte(250)},
            unlocked() { if (hasUpgrade('p', 41)) return true },
        },
        3: {
            requirementDescription: "1.00e55 prayers",
            effectDescription: "divinity gain is raised to the power<br>of 1.6 instead of 1.5",
            done() { return player.p.points.gte(1e55)},
            unlocked() { if (player.p.points.gte(1e50) || (hasMilestone('p', 2) && player.s.points.gt(3))) return true },
        },
    },
    upgrades: {
        11: {
            title() {
                return '<b class="layer-p' + getdark(this, "title") + 'Prayer Influence';
            },
            description() {
                return 'multiplies essence gain based on your prayers';
            },
            cost: 1,
            effect() {
                return player.p.points.add(1).pow(0.075);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.075';
                return text;
            },
        },
        12: {
            title() {
                return '<b class="layer-p' + getdark(this, "title") + 'Heretic Leniency';
            },
            description() {
                return 'multiplies hex gain by 1.02';
            },
            cost: 10,
        },
        13: {
            title() {
                return '<b class="layer-p' + getdark(this, "title") + 'Essence of Divinity';
            },
            description() {
                return 'multiplies divinity gain based on your essence';
            },
            cost: 25,
            effect() {
                return player.e.points.add(1).pow(0.0001);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.0001';
                return text;
            },
        },
        14: {
            fullDisplay() {
                text = '<h3 class="layer-p' + getdark(this, "title", true, true) + 'Prayer Divination</h3><br>Req: 100 divinity with having 0 holiness';
                if (this.canAfford()) text += '<br><br><b>Requirements met!';
                return text;
            },
            canAfford() {
                if (player.p.divinity.gte(100) && player.p.holiness.eq(0)) return true;
                return false;
            },
            style: {'height':'120px','border':'2px dashed','border-color':'#FF8800','background-color':'#0088FF'},
            unlocked() { return hasMilestone('s', 0) && !hasUpgrade('p', 14) },
        },
        15: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Prayer Divination</h3><br>multiplies prayer gain based on your divinity<br>Currently: ' + format(this.effect()) + 'x<br><br>Cost: 75 divinity'},
            canAfford() {
                if (player.p.divinity.gte(75)) return true;
                return false;
            },
            pay() {
                player.p.divinity = player.p.divinity.sub(75);
            },
            effect() {
                return player.p.divinity.add(1).pow(0.02);
            },
            unlocked() { return hasUpgrade('p', 14) },
        },
        21: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Divine Prayers</h3><br>multiplies prayer gain based on your divinity<br>Currently: ' + format(this.effect()) + 'x<br><br>Cost: 20 divinity' },
            canAfford() {
                if (player.p.divinity.gte(20)) return true;
                return false;
            },
            pay() {
                player.p.divinity = player.p.divinity.sub(20);
            },
            effect() {
                return player.p.divinity.add(1).pow(0.01);
            },
        },
        22: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Holy Light</h3><br>unlocks <b class="layer-p' + getdark(this, "ref", true) + 'holiness</b><br><br>Cost: 45 divinity';
            },
            canAfford() {
                if (player.p.divinity.gte(45)) return true;
                return false;
            },
            pay() {
                player.p.divinity = player.p.divinity.sub(45);
            },
        },
        23: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Holy Channeling</h3><br>increases efficiency of holiness conversion<br>0.04x --> 0.06x<br><br>Cost: 10 holiness' },
            canAfford() {
                if (player.p.holiness.gte(10)) return true;
                return false;
            },
            pay() {
                player.p.holiness = player.p.holiness.sub(10);
            },
            unlocked() { if (hasUpgrade('p', 22)) return true },
        },
        24: {
            fullDisplay() {
                text = '<h3 class="layer-p' + getdark(this, "title", true, true) + 'Holy Conversion</h3><br>Req: 75 holiness without owning <b class="layer-p' + getdark(this, "ref", true, true) + 'Church Relics</b>';
                if (this.canAfford()) text += '<br><br><b>Requirements met!';
                return text;
            },
            canAfford() {
                if (player.p.holiness.gte(75) && !hasUpgrade('p', 31)) return true;
                return false;
            },
            style: {'height':'120px','border':'2px dashed','border-color':'#FF8800','background-color':'#0088FF'},
            unlocked() { return hasMilestone('s', 0) && hasUpgrade('p', 22) && !hasUpgrade('p', 24) },
        },
        25: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Holy Conversion</h3><br>increases efficiency of holiness conversion if you own <b class="layer-p' + getdark(this, "ref", true) + 'Holy Channeling</b><br>0.06x --> 0.08x<br><br>Cost: 50 holiness';
            },
            canAfford() {
                if (player.p.holiness.gte(50)) return true;
                return false;
            },
            pay() {
                player.p.holiness = player.p.holiness.sub(50);
            },
            unlocked() { return hasUpgrade('p', 24) },
        },
        31: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Church Relics</h3><br>achievements also multiply prayer gain if you have all subsequent achievement upgrades<br><br>Cost: 175 divinity,<br>40 holiness' },
            canAfford() {
                if (player.p.divinity.gte(175) && player.p.holiness.gte(40)) return true;
                return false;
            },
            pay() {
                player.p.divinity = player.p.divinity.sub(175);
                player.p.holiness = player.p.holiness.sub(40);
            },
            unlocked() { if (hasUpgrade('p', 22)) return true },

        },
        32: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Divine Synergy</h3><br>multiplies divinity gain based on your holiness<br>Currently: ' + format(this.effect()) + 'x<br><br>Cost: 750 divinity,<br>50 holiness' },
            canAfford() {
                if (player.p.divinity.gte(750) && player.p.holiness.gte(50)) return true;
                return false;
            },
            pay() {
                player.p.divinity = player.p.divinity.sub(750);
                player.p.holiness = player.p.holiness.sub(50);
            },
            effect() {
                return player.p.holiness.add(1).pow(0.025);
            },
            unlocked() { if (hasUpgrade('p', 22)) return true },
        },
        33: {
            title() {
                return '<b class="layer-p' + getdark(this, "title") + 'Divine Recursion';
            },
            description() {
            return 'multiplies divinity gain based on your divinity';
            },
            cost: 750,
            effect() {
                return player.p.divinity.add(1).pow(0.2);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x+1)^0.2';
                return text;
            },
        },
        34: {
            fullDisplay() {
                text = '<h3 class="layer-p' + getdark(this, "title", true, true) + 'Holy Shift</h3><br>Req: 1,000 holiness with 0 hymns';
                if (this.canAfford()) text += '<br><br><b>Requirements met!';
                return text;
            },
            canAfford() {
                if (player.p.holiness.gte(1000) && player.p.hymn.eq(0)) return true;
                return false;
            },
            style: {'height':'120px','border':'2px dashed','border-color':'#FF8800','background-color':'#0088FF'},
            unlocked() { return hasMilestone('s', 0) && hasUpgrade('p', 22) && !hasUpgrade('p', 34) },
        },
        35: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Holy Shift</h3><br>increases efficiency of holiness conversion if you own <b class="layer-p' + getdark(this, "ref", true) + 'Holy Conversion</b> and all subsequent upgrades<br>0.08x --> 0.11x<br><br>Cost: 500 holiness';
            },
            canAfford() {
                if (player.p.holiness.gte(500)) return true;
                return false;
            },
            pay() {
                player.p.holiness = player.p.holiness.sub(500);
            },
            unlocked() { return hasUpgrade('p', 34) },
        },
        41: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Written hymns</h3><br>unlocks <b class="layer-p' + getdark(this, "ref", true) + 'hymns</b><br><br>Cost: 2,000 divinity,<br>450 holiness';
            },
            canAfford() {
                if (player.p.divinity.gte(2000) && player.p.holiness.gte(450)) return true;
                return false;
            },
            pay() {
                player.p.divinity = player.p.divinity.sub(2000);
                player.p.holiness = player.p.holiness.sub(450);
            },
            unlocked() { if (hasUpgrade('p', 22)) return true },
        },
        42: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Divine hymns</h3><br>multiplies divinity gain based on your hymns<br>Currently: ' + format(this.effect()) + 'x<br><br>Cost: 1,000 holiness,<br>75 hymns' },
            canAfford() {
                if (player.p.holiness.gte(1000) && player.p.hymn.gte(75)) return true;
                return false;
            },
            pay() {
                player.p.holiness = player.p.holiness.sub(1000);
                player.p.hymn = player.p.hymn.sub(75);
            },
            effect() {
                if (hasUpgrade('p', 45)) return player.p.hymn.add(1).pow(0.125);
                else return player.p.hymn.add(1).pow(0.1);
            },
            unlocked() { if (hasUpgrade('p', 41)) return true },
        },
        43: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Hymn Singing</h3><br>increases hymn effect exponent<br>0.15 --> 0.2<br><br>Cost: 1,000,000 holiness,<br>50,000 hymns' },
            canAfford() {
                if (player.p.holiness.gte(1000000) && player.p.hymn.gte(50000)) return true;
                return false;
            },
            pay() {
                player.p.holiness = player.p.holiness.sub(1000000);
                player.p.hymn = player.p.hymn.sub(50000);
            },
            unlocked() { if (hasUpgrade('p', 41)) return true },
        },
        44: {
            fullDisplay() {
                text = '<h3 class="layer-p' + getdark(this, "title", true, true) + 'Hymn Divination</h3><br>Req: 10,000,000 hymns without owning <b class="layer-p' + getdark(this, "ref", true, true) + 'Shorter Hymns</b>';
                if (this.canAfford()) text += '<br><br><b>Requirements met!';
                return text;
            },
            canAfford() {
                if (player.p.hymn.gte(10000000) && !hasUpgrade('p', 51)) return true;
                return false;
            },
            style: {'height':'120px','border':'2px dashed','border-color':'#FF8800','background-color':'#0088FF'},
            unlocked() { return hasMilestone('s', 0) && hasUpgrade('p', 41) && !hasUpgrade('p', 44) },
        },
        45: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Hymn Divination</h3><br>increases the exponent of <b class="layer-p' + getdark(this, "ref", true) + 'Divine Hymns</b><br>^0.1 --> ^0.125<br><br>Cost: 2,500,000 hymns';
            },
            canAfford() {
                if (player.p.hymn.gte(2500000)) return true;
                return false;
            },
            pay() {
                player.p.hymn = player.p.hymn.sub(2500000);
            },
            unlocked() { return hasUpgrade('p', 44) },
        },
        51: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Shorter Hymns</h3><br>decreases hymn requirement<br>250 --> 200<br><br>Cost: 1,000,000 hymns' },
            canAfford() {
                if (player.p.hymn.gte(1000000)) return true;
                return false;
            },
            pay() {
                player.p.hymn = player.p.hymn.sub(1000000);
            },
            unlocked() { if (hasUpgrade('p', 41)) return true },
        },
        52: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Stronger Hymns</h3><br>increases hymn effect exponent if you have <b class="layer-p' + getdark(this, "ref", true) + 'Hymn Singing</b><br>0.2 --> 0.225<br><br>Cost: 10,000,000 hymns';
            },
            canAfford() {
                if (player.p.hymn.gte(10000000)) return true;
                return false;
            },
            pay() {
                player.p.hymn = player.p.hymn.sub(10000000);
            },
            unlocked() { if (hasUpgrade('p', 41)) return true },
        },
        53: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Strongest Hymns</h3><br>increases hymn effect exponent if you have all subsequent upgrades<br>0.225 --> 0.25<br><br>Cost: 100,000,000 hymns' },
            canAfford() {
                if (player.p.hymn.gte(100000000)) return true;
                return false;
            },
            pay() {
                player.p.hymn = player.p.hymn.sub(100000000);
            },
            unlocked() { if (hasUpgrade('p', 41)) return true },
        },
        54: {
            fullDisplay() {
                text = '<h3 class="layer-p' + getdark(this, "title", true, true) + 'Even Shorter</h3><br>Req: 1.00e10 hymns without owning <b class="layer-p' + getdark(this, "ref", true, true) + 'Holy Hymns</b>';
                if (this.canAfford()) text += '<br><br><b>Requirements met!';
                return text;
            },
            canAfford() {
                if (player.p.hymn.gte(1e10) && !hasUpgrade('p', 61)) return true;
                return false;
            },
            style: {'height':'120px','border':'2px dashed','border-color':'#FF8800','background-color':'#0088FF'},
            unlocked() { return hasMilestone('s', 0) && hasUpgrade('p', 41) && !hasUpgrade('p', 54) },
        },
        55: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Even Shorter</h3><br>decreases hymn requirement if you own <b class="layer-p' + getdark(this, "ref", true) + 'Shorter Hymns</b><br>200 --> 175<br><br>Cost: 2.50e9 hymns';
            },
            canAfford() {
                if (player.p.hymn.gte(2.5e9)) return true;
                return false;
            },
            pay() {
                player.p.hymn = player.p.hymn.sub(2.5e9);
            },
            unlocked() { return hasUpgrade('p', 54) },
        },
        61: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Holy Hymns</h3><br>multiplies holiness gain based on your hymns<br>Currently: ' + format(this.effect()) + 'x<br><br>Cost: 1.00e9 hymns' },
            canAfford() {
                if (player.p.hymn.gte(1e9)) return true;
                return false;
            },
            pay() {
                player.p.hymn = player.p.hymn.sub(1e9);
            },
            effect() {
                return player.p.hymn.add(1).pow(0.02);
            },
            unlocked() { if (hasUpgrade('p', 41)) return true },
        },
        62: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Hymn Deconstruction</h3><br>multiplies prayer gain based on your hymns<br>Currently: ' + format(this.effect()) + 'x<br><br>Cost: 1.00e11 hymns' },
            canAfford() {
                if (player.p.hymn.gte(1e11)) return true;
                return false;
            },
            pay() {
                player.p.hymn = player.p.hymn.sub(1e11);
            },
            effect() {
                return player.p.hymn.add(1).log(5);
            },
            unlocked() { if (hasUpgrade('p', 41)) return true },
        },
        63: {
            fullDisplay() { return '<h3 class="layer-p' + getdark(this, "title", true) + 'Hymn Resolve</h3><br>multiplies the effect of <b class="layer-p' + getdark(this, "ref", true) + 'Hymn Deconstruction</b> based on your essence<br>Currently: ' + format(this.effect()) + 'x<br><br>Cost: 1.00e15 hymns';
            },
            canAfford() {
                if (player.p.hymn.gte(1e15)) return true;
                return false;
            },
            pay() {
                player.p.hymn = player.p.hymn.sub(1e15);
            },
            effect() {
                return player.e.points.add(1).pow(0.0015);
            },
            unlocked() { if (hasUpgrade('p', 41)) return true },
        },
        64: {
            fullDisplay() {
                text = '<h3 class="layer-p' + getdark(this, "title", true, true) + 'Silver Sanctums</h3><br>Req: 2.50e25 prayers, 2 sanctums, and all previous research';
                if (this.canAfford()) text += '<br><br><b>Requirements met!';
                return text;
            },
            canAfford() {
                if (player.p.points.gte(2.5e25) && player.s.points.gte(2) && hasUpgrade('p', 15) && hasUpgrade('p', 25) && hasUpgrade('p', 35) && hasUpgrade('p', 45) && hasUpgrade('p', 55)) return true;
                return false;
            },
            style: {'height':'120px','border':'2px dashed','border-color':'#FF8800','background-color':'#0088FF'},
            unlocked() { return hasMilestone('s', 0) && hasUpgrade('p', 41) && !hasUpgrade('p', 64) },
        },
        65: {
            title() {
                return '<b class="layer-p' + getdark(this, "title") + 'Silver Sanctums';
            },
            description() {
                return 'reduces sanctum gain exponent<br>5 --> 4';
            },
            cost: 1e25,
            unlocked() { return hasUpgrade('p', 64) },
        },
        71: {
            title() {
                return '<b class="layer-p' + getdark(this, "title") + 'Divine Sanctums';
            },
            description() {
                return 'multiplies divinity gain (unaffected by softcaps) based on your sanctums';
            },
            cost: 1e30,
            effect() {
                return player.s.points.mul(30).add(1).pow(0.95);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x*30+1)^0.95';
                return text;
            },
            unlocked() { return hasMilestone('s', 3) && hasUpgrade('p', 41) },
        },
        72: {
            title() {
                return '<b class="layer-p' + getdark(this, "title") + 'Sanctum Sanctions';
            },
            description() {
                return 'multiplies point gain based on your sanctums';
            },
            cost: 1e75,
            effect() {
                return player.s.points.mul(25).add(1).pow(0.5);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x*25+1)^0.5';
                return text;
            },
            unlocked() { return hasMilestone('s', 3) && hasUpgrade('p', 41) },
        },
        73: {
            title() {
                return '<b class="layer-p' + getdark(this, "title") + 'Sanctum Prayers';
            },
            description() {
                return 'multiplies prayer gain based on your sanctums';
            },
            cost: 1e125,
            effect() {
                return player.s.points.mul(2).add(1).pow(1.5);
            },
            effectDisplay() {
                text = format(this.effect()) + 'x';
                if (player.nerdMode) text += ' <br>formula: (x*2+1)^1.5';
                return text;
            },
            unlocked() { return hasMilestone('s', 3) && hasUpgrade('p', 41) },
        },
        74: {
            title() {
                return '<b class="layer-p' + getdark(this, "title") + 'Gold Sanctums';
            },
            description() {
                return 'reduces sanctum gain exponent if you have <b class="layer-p' + getdark(this, "ref") + 'Silver Sanctums</b><br>4 --> 3.48' 
            },
            cost: 1e175,
            unlocked() { return hasMilestone('s', 3) && hasUpgrade('p', 41) },
        },
    },
});

addLayer("s", {
    name: "Sanctums", 
    symbol: "S",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        devotion: new Decimal(0),
        devotion_effect: new Decimal(1),
    }},
    color() {
        if (player.p.points.gte(1e15) || player.s.unlocked) return "#AAFF00";
        return "#666666";
    },
    branches: ["r"],
    requires: 1e15,
    resource: "sanctums",
    baseResource: "prayers",
    baseAmount() {return player.p.points},
    type: "static",
    exponent() {
        if (hasUpgrade('p', 65) && hasUpgrade('p', 74)) return 3.48;
        if (hasUpgrade('p', 65)) return 4;
        return 5;
    },
    canBuyMax() {
        if (hasMilestone('s', 0)) return true;
        return false;
    },
    gainMult() {
        mult = new Decimal(1);
        return mult;
    },
    gainExp() {
        gain = new Decimal(1);
        if (player.r.points.gt(0)) gain = gain.mul(player.r.sanctummult);
        if (player.s.devotion_effect.gt(1)) gain = gain.mul(player.s.devotion_effect);
        return gain;
    },
    row: 2,
    hotkeys: [
        {key: "s", description: "S: Reset for sanctums", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.p.unlocked},
    effect() {
        effBase = new Decimal(2);
        effBoost = new Decimal(1);
        return effBase.pow(player.s.points).mul(effBoost);
    },
    effectDescription() {
        if (colorvalue[1] == "none") return 'which multiplies essence gain by ' + format(tmp.s.effect) + 'x';
        return 'which multiplies essence gain by <h2 class="layer-s">' + format(tmp.s.effect) + '</h2>x';
    },
    doReset(resettingLayer) {
        let keep = [];
            if (hasMilestone('s', 12) && resettingLayer == 'a') keep.push("points", "best", "total", "milestones");
            if (layers[resettingLayer].row > this.row) layerDataReset("s", keep);
        },
    update(diff) {
        player.s.devotion = getBuyableAmount('r', 11).mul(0.1);
        player.s.devotion_effect = player.s.devotion.add(1).pow(0.3);
    },
    tabFormat: {
        "Landmarks": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "blank",
                "milestones",
            ],
        },
        "Devotion": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "blank",
                ["display-text",
                    function() {
                        if (!colorvalue[0][2] || colorvalue[1] == "none") text = 'Worshipping.';
                        else text = '<b class="layer-s' + getdark(this, "ref", true, true) + 'Worshipping</b> and <b class="layer-s' + getdark(this, "ref", true, true) + 'Sacrificing</b>.';
                        return 'you have <h2 class="layer-s">' + format(player.s.devotion) + '</h2> devotion, which multiplies sanctum gain by <h2 class="layer-s">' + format(player.s.devotion_effect) + '</h2>x<br>Gain more by ' + text;
                    }],
                "blank",
                ["layer-proxy", ["r", ["buyables", [1]]]],
            ],
            unlocked() {
                if (hasMilestone("s", 13)) return true;
                return false;
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 sanctum",
            effectDescription: "you can buy max sanctums and<br><b>research</b> 6 new prayer upgrades",
            done() { return player.s.points.gte(1) },
        },
        1: {
            requirementDescription: "2 sanctums",
            effectDescription: "you can autobuy core upgrades",
            done() { return player.s.points.gte(2) },
            toggles: [["c", "auto_upgrades"]],
        },
        2: {
            requirementDescription: "3 sanctums",
            effectDescription: "you can autobuy core buyables",
            done() { return player.s.points.gte(3) },
            toggles: [["c", "auto_buyables"]],
        },
        3: {
            requirementDescription: "4 sanctums",
            effectDescription: "you can explore 4 further prayer upgrades",
            done() { return player.s.points.gte(4) },
        },
        4: {
            requirementDescription: "5 sanctums",
            effectDescription: "you can autobuy quark upgrades",
            done() { return player.s.points.gte(5) },
            toggles: [["q", "auto_upgrades"]],
        },
        5: {
            requirementDescription: "6 sanctums",
            effectDescription: "you can autobuy prayer upgrades",
            done() { return player.s.points.gte(6) },
            toggles: [["p", "auto_upgrades"]],
        },
        6: {
            requirementDescription: "7 sanctums",
            effectDescription: "you can have autobuy prayer upgrades<br>option be smart (toggle on or off)",
            done() { return player.s.points.gte(7) },
            toggles: [["p", "smart_auto_upgrades"]],
        },
        7: {
            requirementDescription: "8 sanctums",
            effectDescription: "gain 0.5% of prayer gain per second",
            done() { return player.s.points.gte(8) },
        },
        8: {
            requirementDescription: "9 sanctums",
            effectDescription: "gain 0.2% of holiness and hymn gain per second",
            done() { return player.s.points.gte(9) },
        },
        9: {
            requirementDescription: "10 sanctums",
            effectDescription: "gain 0.1% of hex gain per second",
            done() { return player.s.points.gte(10) },
        },
        10: {
            requirementDescription: "14 sanctums",
            effectDescription: "gain 0.001% of demon soul gain per second",
            done() { return player.s.points.gte(14) },
        },
        11: {
            requirementDescription: "16 sanctums",
            effectDescription: "subatomic particles reset nothing,<br>and perform subatomic particle<br>resets automatically",
            done() { return player.s.points.gte(16) },
        },
        12: {
            requirementDescription: "18 sanctums",
            effectDescription: "keep sanctums on atom resets",
            done() { return player.s.points.gte(18) },
        },
        13: {
            requirementDescription: "19 sanctums",
            effectDescription() {
                if (!colorvalue[0][2] || colorvalue[1] == "none") return 'unlock Devotion';
                return 'unlock <b class="layer-s' + getdark(this, "ref", true, true) + 'Devotion';
            },
            done() { return player.s.points.gte(19) },
        },
    },
});

addLayer("r", {
    name: "Relics", 
    symbol: "R",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        lightreq: new Decimal(20000),
        light: new Decimal(0),
        lightgain: new Decimal(0),
        relic_effects: [new Decimal(0), new Decimal(0)],
        sanctummult: new Decimal(1),
        essencemult: new Decimal(1),
    }},
    color() {
        if (player.s.points.gte(10) || player.r.unlocked) return "#B9A975";
        return "#666666";
    },
    requires: 10,
    resource: "relics",
    baseResource: "sanctums",
    baseAmount() {return player.s.points},
    type: "static",
    exponent: 0.5,
    canBuyMax() {
        return true;
    },
    gainMult() {
        mult = new Decimal(1);
        return mult;
    },
    gainExp() {
        gain = new Decimal(1);
        return gain;
    },
    row: 3,
    hotkeys: [
        {key: "r", description: "R: Reset for relics", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.p.unlocked},
    effect() {
        effBoost1 = new Decimal(1);
        effBoost2 = new Decimal(1);
        effBoost3 = new Decimal(1);
        if (challengeCompletions('r', 11) >= 1) {
            effBoost2 = player.r.relic_effects[0];
            effBoost3 = player.r.relic_effects[0];
        };
        player.r.sanctummult = player.r.points.add(1).pow(0.5).mul(effBoost2);
        player.r.essencemult = player.r.points.mul(100).add(1).pow(0.25).mul(effBoost3);
        return player.r.points.mul(effBoost1).add(1).pow(1.1);
    },
    effectDescription() {
        text = '';
        if (challengeCompletions('r', 11) >= 2) text = 'point and ';
        if (colorvalue[1] == "none") return 'which makes Essence Influence\'s hardcap start ' + format(tmp.r.effect) + 'x later, multiplies sanctum gain by ' + format(player.r.sanctummult) + 'x, and also multiplies ' + text + 'essence gain by ' + format(player.r.essencemult) + 'x';
        if (!colorvalue[0][2]) return 'which makes <h3>Essence Influence\'s</h3> hardcap start <h2 class="layer-r">' + format(tmp.r.effect) + '</h2>x later, multiplies sanctum gain by <h2 class="layer-r">' + format(player.r.sanctummult) + '</h2>x, and also multiplies ' + text + 'essence gain by <h2 class="layer-r">' + format(player.r.essencemult) + '</h2>x';
        return 'which makes <h3 class="layer-e">Essence Influence\'s</h3> hardcap start <h2 class="layer-r">' + format(tmp.r.effect) + '</h2>x later, multiplies sanctum gain by <h2 class="layer-r">' + format(player.r.sanctummult) + '</h2>x, and also multiplies ' + text + 'essence gain by <h2 class="layer-r">' + format(player.r.essencemult) + '</h2>x';
    },
    doReset(resettingLayer) {
        let keep = [];
            if (layers[resettingLayer].row > this.row) layerDataReset("r", keep);
        },
    update(diff) {
        player.r.lightreq = new Decimal(20000).mul(new Decimal(5).pow(challengeCompletions('r', 11)));
        player.r.relic_effects[0] = player.r.light.mul(10).add(1).pow(0.15);
        if (inChallenge('r', 11)) {
            player.r.lightgain = getPointGen(true).pow(0.001).div(10);
            player.r.light = player.r.light.add(player.r.lightgain.mul(diff));
        } else player.r.lightgain = new Decimal(0);
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        ["display-text",
            function() {
                if (colorvalue[1] == "none") {
                    text = 'you have ' + player.r.points.sub(challengeCompletions('r', 11)) + ' unactivated relics and ' + challengeCompletions('r', 11) + ' activated relics';
                } else {
                    text = 'you have <h2 class="layer-r">' + player.r.points.sub(challengeCompletions('r', 11)) + '</h2> unactivated relics and <h2 class="layer-r">' + challengeCompletions('r', 11) + '</h2> activated relics';
                };
                return text;
            }],
        "blank",
        "challenges",
        "blank",
    ],
    challenges: {
        11: {
            name() {
                if (colorvalue[0][1] && colorvalue[1] != "none") return '<h3 class="layer-r">Activate Relics';
                return '<h3>Activate Relics';
            },
            challengeDescription() {
                return 'Converts all point production into light production. Get enough light, and you can activate your relics for rewards.<br>';
            },
            goalDescription() {
                if (maxedChallenge('r', 11)) return 'You have ' + format(player.r.light) + ' light.<br>(' + format(player.r.lightgain) + '/sec)<br>';
                return 'You have ' + format(player.r.light) + '/' + format(player.r.lightreq) + ' light.<br>(' + format(player.r.lightgain) + '/sec)<br>';
            },
            rewardDescription() {
                text = '';
                if (challengeCompletions('r', 11) == 0) text += 'nothing currently<br><br>Next reward: multiply relic\'s second and third effects based on your light<br>Currently: ' + format(player.r.relic_effects[0]) + 'x';
                if (challengeCompletions('r', 11) >= 1) text += 'multiply relic\'s second and third effects based on your light<br>Currently: ' + format(player.r.relic_effects[0]) + 'x<br>';
                if (challengeCompletions('r', 11) == 1) text += '<br>Next reward: relic\'s third effect also effects point gain';
                if (challengeCompletions('r', 11) == 2) text += '<br>Next reward: square relic\'s first effect (doesn\'t actually work yet)';
                return text;
            },
            canComplete: function() {
                return player.r.light.gte(player.r.lightreq);
            },
            completionLimit() {
                return player.r.points;
            },
            style() {
                num = player.r.light.log(2).div(player.r.lightreq.log(2)).mul(100);
                if (num.lt(12)) color = '000033';
                else if (num.lt(24)) color = '111144';
                else if (num.lt(36)) color = '222255';
                else if (num.lt(48)) color = '333366';
                else if (num.lt(60)) color = '444477';
                else if (num.lt(72)) color = '555588';
                else if (num.lt(84)) color = '666699';
                else if (num.lt(96)) color = '7777AA';
                else color = '8888BB';
                if (maxedChallenge('r', 11)) color = '000033';
                textcolor = 'B9A975';
                if (colorvalue[1] == "none") textcolor = 'DFDFDF';
                return {'background-color':'#'+color,'color':'#'+textcolor,'border-radius':'25px','height':'400px','width':'400px'};
            },
        },
    },
    buyables: {
        11: {
            cost(x = 0) { return new Decimal(10).pow(getBuyableAmount('r', 11).add(x).add(1).mul(50)).mul(1e50) },
            title() {
                return '<h3 class="layer-s' + getdark(this, "title-buyable") + 'Worship';
            },
            canAfford() {
                return player.p.points.gte(this.cost());
            },
            buy() {
                player.p.points = player.p.points.sub(this.cost());
                setBuyableAmount('r', 11, getBuyableAmount('r', 11).add(1));
            },
            display() {
                return 'use some prayers to worship the gods. you will be rewarded with 0.1 devotion per worship.<br>Currently: ' + format(getBuyableAmount('r', 11).mul(0.1)) + '<br><br>Cost: ' + formatWhole(this.cost()) + ' prayers<br><br>Bought: ' + formatWhole(getBuyableAmount('r', 11));
            },
            style() {
                backcolor = '224400';
                if (this.canAfford()) backcolor = '448800';
                textcolor = 'AAFF00';
                if (colorvalue[1] == "none") textcolor = 'DFDFDF';
                return {'background-color':'#'+backcolor,'color':'#'+textcolor,'border-radius':'100px','height':'200px','width':'200px'};
            },
        },
    },
});
