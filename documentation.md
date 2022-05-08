# Break Eternity Function Documentation

note: all functions are written in code as Decimal.function(parameters)

## Format conversions:

fromComponents(sign, layer, mag), fromMantissaExponent(mantissa, exponent)
> Converts various components to decimals. Can add **_noNormalize** to the end of the function name not normalize the output.

fromNumber(value), fromString(value)
> Converts numbers and strings to decimals, respectively.

fromValue(value)
> Detects if it's a number or a string, then converts it to a decimal.

## Basic math:

abs(value)
> Absolute value for decimals.

neg(value), negate(value), negated(value)
> Reverses the decimals' sign (positive to negative and vise versa).

sign(value), sgn(value)
> For positive input, returns 1. For negative, returns -1. For positive and negative zeros, returns itself.

round(value), floor(value), ceil(value), trunc(value)
> Normal rounding, rounding down, rounding up, and truncation, respectively.

add(value), plus(value)
> Adding for decimals.

sub(value), subtract(value), minus(value)
> Subtracting for decimals.

mul(value), multiply(value), times(value)
> Multiplying for decimals.

div(value), divide(value), times(value)
> Dividing for decimals.

recip(value), reciprocal(value), reciprocate(value)
> Find the reciprocal of a decimal.

## Comparators:

cmp(value), compare(value)
> Compares two values, and returns -1 for less than, 0 for equals, and 1 for greater than.

cmpabs(value)
> The same as **cmp()** and **compare()** but absolute values the numbers before calculating

eq(value), equal(value)
> Returns true if the values are equal.

neq(value), notEquals(value)
> Returns true if the values are not equal.

lt(value), gt(value)
> Returns true if the value is less than or greater than, respectively.

lte(value), gte(value)
> Returns true if the value is less than or equal to, or greater than or equal to, respectively.

max(value), min(value)
> Returns the value that is bigger or smaller, respectively.

maxabs(value), minabs(value)
> Returns the absolute value that is bigger or smaller, respectively.

clamp(min, max)
> Returns the value if it is between the minimum and maximum.

clampMin(min), clampMax(max)
> The same as **clamp()** but only applies min and max, respectively.

cmp_tolerance(value, tolerance), compare_tolerance(value, tolerance), eq_tolerance(value, tolerance), equals_tolerance(value, tolerance)
> Returns true if the values are equal, with a relative tolerance.

neq_tolerance(value, tolerance), notEquals_tolerance(value, tolerance)
> Returns true if the values are not equal, with a relative tolerance.

lt_tolerance(value, tolerance), gt_tolerance(value, tolerance)
> Returns true if the value is less than or greater than, respectively (with a relative tolerance).

lte_tolerance(value, tolerance), gte_tolerance(value, tolerance)
> Returns true if the value is less than or equal to, or greater than or equal to, respectively (with a relative tolerance).

## Advanced math:

log(value), logarithm(value)
> Takes the logarithm (with a base of your choosing) of a decimal.

ln(), log2(), log10()
> Takes the natural logarithm, base 2 logarithm, or base 10 logarithm of a decimal, respectively.

absLog10()
> The same as **log10()** but takes the absolute value of your input before calculating.

pLog10()
> The same as **log10()** but if you input a negative number, it returns 0.

pow(value)
> Raises a decimal to the power of a value of your choosing.

exp(), sqr(), cube(), pow10()
> Raises a decimal to the power of e (the natural logarithm base), 2, 3, or 10, respectively.

pow_base(value)
> Raises a value of your choosing to the power of a decimal.

root(value)
> Takes the root (with a base of your choosing) of a decimal.

sqrt(), cqrt()
> Takes the square (base 2) root, or the cube (base 3) root of a decimal, respectively.

factorial()
> Takes the factorial of a decimal.

gamma()
> Takes the gamma function of a decimal.

lngamma()
> Is literally just **gamma()** taken to the natural logarithm.

tetrate(height = 2, payload = 1), iteratedexp(height = 2, payload = 1)
> Raises a decimal to the power of itself (height) times in a row.<br>
If the payload is not 1, then it is 'iterated exponentiation', the result of exping (payload) to base (decimal) (height) times.

iteratedlog(base = 10, times = 1)
> The result of applying log (base) 'times' times in a row.<br>
Equivalent to tetrating to a negative height.

slog(base = 10)
> Returns what height you'd have to get the decimal from tetrate (base).<br>
Note: cannot be higher than 1.8e308.

layeradd(diff, base)
> Adds layers to a Decimal, even fractional layers (can also subtract if you enter a negative number),<br>
like adding 'diff' to the number's slog (base) representation.<br>
Similar to tetrate base (base) and iterated log base (base).

layeradd10(diff)
> The same as **Layeradd()** but always has a base of 10.

lambertw(value)
> The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.

pentate(value, height = 2, payload = 1)
> The result of tetrating 'height' times in a row.

## Trig functions:

sin(), asin()
> Sine and inverse sine function for decimals.

cos(), acos()
> Cosine and inverse cosine function for decimals.

tan(), atan()
> Tangent and inverse tangent function for decimals.

sinh(), asinh()
> Hyperbolic sine and inverse hyperbolic sine function for decimals.

cosh(), acosh()
> Hyperbolic cosine and inverse hyperbolic cosine function for decimals.

tanh(), atanh()
> Hyperbolic tangent and inverse hyperbolic tangent function for decimals.

## Special formulas:

affordGeometricSeries(resourcesAvailable, priceStart, priceRatio, currentOwned)
> If you're willing to spend (resourcesAvailable), and you want to buy something with multiplicatively increasing cost each purchase, how much of it can you buy?<br>
Other parameters: priceStart = starting price, priceRatio = multiplying cost, currentOwned = amount already owned.

sumGeometricSeries(numItems, priceStart, priceRatio, currentOwned)
> How much resource would it cost to buy (numItems) items if you already have (currentOwned),<br>
the initial price is (priceStart), and it multiplies the cost by (priceRatio) each purchase?

affordArithmeticSeries(resourcesAvailable, priceStart, priceAdd, currentOwned)
> If you're willing to spend (resourcesAvailable), and you want to buy something with additively increasing cost each purchase, how much of it can you buy?<br>
Other parameters: priceStart = starting price, priceRatio = multiplying cost, currentOwned = amount already owned.

sumArithmeticSeries(numItems, priceStart, priceAdd, currentOwned)
> How much resource would it cost to buy (numItems) items if you already have (currentOwned),<br>
the initial price is (priceStart) and it adds (priceAdd) each to the cost purchase?

efficiencyOfPurchase(cost, currentRpS, deltaRpS)
> When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),<br>
the lowest efficiency score is the better one to purchase.
