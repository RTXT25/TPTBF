# Break Eternity Function Documentation

note: all functions are written in code as Decimal.function()

### Format conversions:

fromComponents(sign, layer, mag)

fromMantissaExponent(mantissa, exponent)

can add _noNormalize to the end of the function name not normalize the output



fromNumber(value)

converts numbers to decimals.



fromString(value)

converts strings to decimals.



fromValue(value)

converts numbers and strings to decimals.



### Normal math functions:

abs(value)

absolute value for decimals.



neg(value), negate(value), negated(value)

reverses the decimals' sign (positive to negative and vise versa).



sign(value), sgn(value)

For positive input, returns 1. For negative, returns -1. For positive and negative zeros, returns itself.



round(value), floor(value), ceil(value), trunc(value)

normal rounding, rounding down, rounding up, and truncation, respectively.



add(value), plus(value)

adding for decimals.



sub(value), subtract(value), minus(value)

subtracting for decimals.



mul(value), multiply(value), times(value)

multiplying for decimals.



div(value), divide(value), times(value)

dividing for decimals.



recip(value), reciprocal(value), reciprocate(value)

find the reciprocal of a decimal.
