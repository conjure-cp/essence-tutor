# Arithmetic, Logic and Comparison
Essence contains a variety of operators which allow you to specify conditions and constraints.

## Arithmetic
The standard arithmetic operations are supported by Essence:
- `x + y` - addition.
- `x - y` - subtraction.
- `x * y` - multiplication.
- `x / y` - *integer* division.
- `x % y` - modulo (remainder of `x` divided by `y`).
- `x ** y` - exponention (`x` to the power of `y`).
- `x!` or `factorial(x)` - factorial.
- `|x|` - absolute value (positive value).

## Logic

### AND (Conjunction)
Essence uses `/\` as its logical AND operator. For an AND operation to be true, both operands also must be true.

The truth table for `x /\ y` is as follows:

| `x`   | `y`   | `x /\ y` |
|-------|-------|----------|
| true  | true  | true     |
| true  | false | false    |
| false | true  | false    |
| false | false | false    |

### OR (Disjunction)
Essence uses `\/` as its logical OR operator. For an OR operation to be true, one or more of its operands must be true.

The truth table for `x \/ y` is as follows:

| `x`   | `y`   | `x \/ y` |
|-------|-------|----------|
| true  | true  | true     |
| true  | false | true     |
| false | true  | true     |
| false | false | false    |

### Implies (If-Then)
Essence uses `->` to denote implies.

Implies takes two operands: an antecedent and a consequent. It effectively states that if the antecedent is true then the consequent must also be true. For an implies operation to be true, then, it must *not* be the case that the antecedent can be true and the consequent be false.

> **Tip:** This is confusing at first for some. Remember that it's only one-way! 
> To illustrate, the statement *"the Sun is blue implies Earth has land"* is *always* true because the colour of the Sun has no bearing on the fact Earth has land. Earth has land whether or not the Sun is blue.

The truth table for `x -> y` is as follows:

| `x`   | `y`   | `x -> y` |
|-------|-------|----------|
| true  | true  | true     |
| true  | false | false    |
| false | true  | true     |
| false | false | true     |

### If And Only If (Iff)
Essence uses `<->` to denote iff.

Once again, iff takes two operands: an antecedent and a consequent. The difference is that now it works both ways: it is only true if the antecedent and consequent have the same truth-value.

The truth table for `x <-> y` is as follows:

| `x`   | `y`   | `x <-> y` |
|-------|-------|-----------|
| true  | true  | true      |
| true  | false | false     |
| false | true  | false     |
| false | false | true      |

> **Aside:** Notice that the truth table for `<->` is the same as other logical operators. That is because it is equivalent to the identity relation or to XOR. It can also be expanded to the AND of two implies statements.

### NOT (Negation)
Finally, Essence uses `!` as its logical NOT operator. For a NOT operation to be true, it's sole operand must be false.

The truth table for `!x` is as follows:

| `x`   | `!x`  |
|-------|-------|
| true  | false |
| false | true  |

## Comparison
Once again, the standard comparison operators are supported by Essence:
- `x = y` - equality (notice that it's one symbol!).
- `x != y` - inequality.
- `x < y` - less than.
- `x <= y` - less than or equal to.
- `x > y` - greater than.
- `x >= y` - greater than or equal to.
