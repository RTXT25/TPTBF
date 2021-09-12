function getResetGain(layer, useType = null) {
	let type = useType
	if (!useType){ 
		type = tmp[layer].type
		if (layers[layer].getResetGain !== undefined)
			return layers[layer].getResetGain()
	} 
	if (tmp[layer].gainExp.eq(0)) return DecimalZero

	if (PRESTIGE_TYPES[type]) return PRESTIGE_TYPES[type].gain(layer)
	return decimalZero
}

function getNextAt(layer, canMax=false, useType = null) {
	let type = useType
	if (!useType) {
		type = tmp[layer].type
		if (layers[layer].getNextAt !== undefined)
			return layers[layer].getNextAt(canMax)

		}

	if (tmp[layer].gainMult.lte(0)) return new Decimal(Infinity)
	if (tmp[layer].gainExp.lte(0)) return new Decimal(Infinity)
	
	if (PRESTIGE_TYPES[type]) return PRESTIGE_TYPES[type].nextAt(layer, canMax)
	return new Decimal (Infinity)	

}


const PRESTIGE_TYPES = {
	static: {
		gain(layer) {
			if ((!tmp[layer].canBuyMax) || tmp[layer].baseAmount.lt(tmp[layer].requires)) return decimalOne
			let gain = tmp[layer].baseAmount.div(tmp[layer].requires).div(tmp[layer].gainMult).max(1).log(tmp[layer].base).times(tmp[layer].gainExp).pow(Decimal.pow(tmp[layer].exponent, -1))
			gain = gain.times(tmp[layer].directMult)
			return gain.floor().sub(player[layer].points).add(1).max(1);
		},
		nextAt(layer, canMax=false) {
			if (!tmp[layer].canBuyMax) canMax = false
			let amt = player[layer].points.plus((canMax&&tmp[layer].baseAmount.gte(tmp[layer].nextAt))?tmp[layer].resetGain:0).div(tmp[layer].directMult)
			let extraCost = Decimal.pow(tmp[layer].base, amt.pow(tmp[layer].exponent).div(tmp[layer].gainExp)).times(tmp[layer].gainMult)
			let cost = extraCost.times(tmp[layer].requires).max(tmp[layer].requires)
			if (tmp[layer].roundUpCost) cost = cost.ceil()
			return cost;	
		},
		total: true,
	},
	normal: {
		gain(layer) {
			if (tmp[layer].baseAmount.lt(tmp[layer].requires)) return decimalZero
			let gain = tmp[layer].baseAmount.div(tmp[layer].requires).pow(tmp[layer].exponent).times(tmp[layer].gainMult).pow(tmp[layer].gainExp)
			if (gain.gte(tmp[layer].softcap)) gain = gain.pow(tmp[layer].softcapPower).times(tmp[layer].softcap.pow(decimalOne.sub(tmp[layer].softcapPower)))
			gain = gain.times(tmp[layer].directMult)
			return gain.floor().max(0);	
		},
		nextAt(layer){
			let next = tmp[layer].resetGain.add(1).div(tmp[layer].directMult)
			if (next.gte(tmp[layer].softcap)) next = next.div(tmp[layer].softcap.pow(decimalOne.sub(tmp[layer].softcapPower))).pow(decimalOne.div(tmp[layer].softcapPower))
			next = next.root(tmp[layer].gainExp).div(tmp[layer].gainMult).root(tmp[layer].exponent).times(tmp[layer].requires).max(tmp[layer].requires)
			if (tmp[layer].roundUpCost) next = next.ceil()
			return next;	
		},
		total: false,

	},
	linear: {
		gain(layer) {
			if ((!tmp[layer].canBuyMax) || tmp[layer].baseAmount.lt(tmp[layer].requires)) return decimalOne
			let gain = tmp[layer].baseAmount.sub(tmp[layer].requires).div(tmp[layer].costStep).floor().plus(1)
			gain = gain.times(tmp[layer].gainMult).pow(tmp[layer].gainExp).times(tmp[layer].directMult)
			return gain.floor().sub(player[layer].points).add(1).max(1);
		},
		nextAt(layer, canMax=false) {
			if (!tmp[layer].canBuyMax) canMax = false
			let next = player[layer].points.plus((canMax&&tmp[layer].baseAmount.gte(tmp[layer].nextAt))?tmp[layer].resetGain:1).div(tmp[layer].directMult)
			console.log(format(next))
			next = next.root(tmp[layer].gainExp).div(tmp[layer].gainMult)
			return tmp[layer].requires.add(next.sub(1).times(tmp[layer].costStep))
		},
		total: true,
	},
	quadratic: {
		gain(layer) {
			if ((!tmp[layer].canBuyMax) || tmp[layer].baseAmount.lt(tmp[layer].requires)) return decimalOne
			let c = tmp[layer].requires.sub(tmp[layer].baseAmount)
			let b = tmp[layer].linearStep
			let a = tmp[layer].quadraticStep
			let gain = (b.times(-1).add((b.pow(2).sub(a.times(c).times(4))).sqrt())).div(2).div(a).add(1)
			gain = gain.times(tmp[layer].gainMult).pow(tmp[layer].gainExp).times(tmp[layer].directMult)
			return gain.floor().sub(player[layer].points).add(1).max(1);
		},
		nextAt(layer, canMax=false) {
			if (!tmp[layer].canBuyMax) canMax = false
			let next = player[layer].points.plus((canMax&&tmp[layer].baseAmount.gte(tmp[layer].nextAt))?tmp[layer].resetGain:1).div(tmp[layer].directMult)
			next = next.root(tmp[layer].gainExp).div(tmp[layer].gainMult)
			next=next.sub(1)
			return tmp[layer].requires.add(next.times(tmp[layer].linearStep)).add(next.pow(2).times(tmp[layer].quadraticStep))
		},
		total: true,

	},
	custom: {
		gain(layer) {
			return layers[layer].getResetGain()
		},
		nextAt(layer) {
			return layers[layer].getNextAt(canMax)
		}

	},
}




function softcap(value, cap, power = 0.5) {
	if (value.lte(cap)) return value
	else
		return value.pow(power).times(cap.pow(decimalOne.sub(power)))
}