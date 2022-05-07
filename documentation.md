# Break Eternity Function Documentation

note: all functions are written in code as Decimal.function(parameters)

## Format conversions:

fromComponents(sign, layer, mag), fromMantissaExponent(mantissa, exponent)

> converts various components to decimals. Can add <b>_noNormalize</b> to the end of the function name not normalize the output.

fromNumber(value), fromString(value)

> converts numbers and strings to decimals, respectively.

fromValue(value)

> detects if it's a number or a string, then converts it to a decimal.

## Basic math functions:

abs(value)

> absolute value for decimals.

neg(value), negate(value), negated(value)

> reverses the decimals' sign (positive to negative and vise versa).

sign(value), sgn(value)

> For positive input, returns 1. For negative, returns -1. For positive and negative zeros, returns itself.

round(value), floor(value), ceil(value), trunc(value)

> normal rounding, rounding down, rounding up, and truncation, respectively.

add(value), plus(value)

> adding for decimals.

sub(value), subtract(value), minus(value)

> subtracting for decimals.

mul(value), multiply(value), times(value)

> multiplying for decimals.

div(value), divide(value), times(value)

> dividing for decimals.

recip(value), reciprocal(value), reciprocate(value)

> find the reciprocal of a decimal.

## Comparators:

cmp(value), compare(value)

> compares two values, and returns -1 for less than, 0 for equals, and 1 for greater than.

cmpabs(value)

> the same as <b>cmp()</b> and <b>compare()</b> but absolute values the numbers before calculating

eq(value), equal(value)

> returns true if the values are equal.

neq(value), notEquals(value)

> returns true if the values are not equal.

lt(value), gt(value)

> returns true if the value is less than or greater than, respectively.

lte(value), gte(value)

> returns true if the value is less than or equal to, or greater than or equal to, respectively.

max(value), min(value)

> returns the value that is bigger or smaller, respectively.

maxabs(value), minabs(value)

> returns the absolute value that is bigger or smaller, respectively.

clamp(min, max)

> returns the value if it is between the minimum and maximum.

clampMin(min), clampMax(max)

> the same as <b>clamp()</b> but only applies min and max, respectively.

cmp_tolerance(value, tolerance), compare_tolerance(value, tolerance), eq_tolerance(value, tolerance), equals_tolerance(value, tolerance)

> returns true if the values are equal, with a relative tolerance.

neq_tolerance(value, tolerance), notEquals_tolerance(value, tolerance)

> returns true if the values are not equal, with a relative tolerance.

lt_tolerance(value, tolerance), gt_tolerance(value, tolerance)

> returns true if the value is less than or greater than, respectively (with a relative tolerance).

lte_tolerance(value, tolerance), gte_tolerance(value, tolerance)

> returns true if the value is less than or equal to, or greater than or equal to, respectively (with a relative tolerance).

## Advanced math functions:

log(value), logarithm(value)

> Takes the logarithm (with a base of your choosing) of a decimal.

ln(), log2(), log10()

> Takes the natural logarithm, base 2 logarithm, or base 10 logarithm of a decimal, respectively.

absLog10()

> The same as <b>log10()</b> but takes the absolute value of your input before calculating.

pLog10()

> The same as <b>log10()</b> but if you input a negative number, it returns 0.

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

> Is literally just <b>gamma()</b> taken to the natural logarithm.

tetrate(height = 2, payload = 1), iteratedexp(height = 2, payload = 1)

> Raises a decimal to the power of itself (height) times in a row.

> If the payload is not 1, then it is 'iterated exponentiation', the result of exping (payload) to base (decimal) (height) times.

iteratedlog(base = 10, times = 1)

> Iterated log: The result of applying log (base) 'times' times in a row.

> Equivalent to tetrating to a negative height.

slog(base = 10)

> Super-logarithm, one of tetration's inverses, tells you what height you'd have to tetrate (base) to to get the decimal.

> Note: cannot be higher than 1.8e308.
