# Logic Operations
You can perform logic operations on declarations with a Boolean domain to create statements which hold an overall logical truth-value.

## The Fundamental Operations
This part covers the fundamental logical operators in detail. If you already know these, feel free to skip!

### AND (Conjunction)
Essence uses `/\` as its logical AND operator. For an AND operation to be true, both operands also must be true.

`x /\ y` can be read as *"x and y"* and has the following truth table:

| `x`   | `y`   | `x /\ y` |
|-------|-------|----------|
| true  | true  | true     |
| true  | false | false    |
| false | true  | false    |
| false | false | false    |

### OR (Disjunction)
Essence uses `\/` as its logical OR operator. For an OR operation to be true, one or more of its operands must be true.

`x \/ y` can be read as *"x or y"* and has the following truth table:

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

`x -> y` can be read as *"x implies y"* or *"if x, then y"* and has the following truth table:

| `x`   | `y`   | `x -> y` |
|-------|-------|----------|
| true  | true  | true     |
| true  | false | false    |
| false | true  | true     |
| false | false | true     |

### If And Only If (Iff)
Essence uses `<->` to denote iff.

Once again, iff takes two operands: an antecedent and a consequent. The difference is that now it works both ways: it is only true if the antecedent and consequent have the same truth-value.

`x <-> y` can be read as *"if and only if (iff) x, then y"* and the following truth table:

| `x`   | `y`   | `x <-> y` |
|-------|-------|-----------|
| true  | true  | true      |
| true  | false | false     |
| false | true  | false     |
| false | false | true      |

> **Aside:** Notice that the truth table for `<->` is the same as other logical operators. That is because it is equivalent to the identity relation or to XOR. It can also be expanded to the AND of two implies statements.

### NOT (Negation)
Finally, Essence uses `!` as its logical NOT operator. For a NOT operation to be true, it's sole operand must be false.

`!x` can be read as *"not x"* and has the following truth table:

| `x`   | `!x`  |
|-------|-------|
| true  | false |
| false | true  |

## Combining Operators
Logical operators can be combined to create complex logical statements.

For example, if you wanted to know whether it's true that both the hare (Rh) and the tortoise (Rt) are taking part in the race, and either the hare (Wh) or the tortoise (Wt) will win, you could join them together like so:

```
(Rh /\ Rt) /\ (Wh \/ Wt)
```

*Hare is racing and tortoise is racing, and hare will win or tortoise will win.*

## Order Of Precedence
Logical operators have an order of precedence much like typical arithmetic operators. That which is of a higher precedence will be evaluated first.

!! TODO: complete order of precedence
