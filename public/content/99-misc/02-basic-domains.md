# Basic Domains
The last section briefly introduced you to domains. To recap, these define the range of values that any given variable or declaration can hold. You can think of them as similar to that of data types in traditional programming languages, or the bag from which a value can be chosen.

Domains can refer to a finite or infinite set of values, but infinite domains can only be used for aliases and parameters.

For now we will focus on Booleans, integers, tuples and sets. You will be introduced to more domains as you progress through this guide.

## Booleans (`bool`)
Boolean domains can be one of either `true` or `false`. They are always finite.

For example, if you wanted to find a Boolean decision variable `x`, you would write the following:

```
find x : bool
```

An important caveat with Boolean domains is that they do not currently support objective statements. That means they cannot directly be minimised or maximised.

## Integers (`int`)
Integer domains refer to a set of whole numbers. They can be used in a few ways:
- `int` refers to the infinite set of integers.
- `int(r1,r2,...)` refers to an integer within one or more of the ranges `r1`, `r2`, etc. These can be finite or infinite.
- `int(expression)` refers to an integer within the bounds described by the expression.

Ranges have the syntax `start..end`, where only one of `start` and `end` is required. For example:
- `int(1..10)` refers to the finite set of integers from one to ten.
- `int(1..)` refers to the infinite set of all integers that are greater than or equal to one.
- `int(..10)` refers to the infinite set of integers that are less than or equal to ten.

To avoid unexpected results, values in an integer domain should be between $-2^{62}+1$ and $2^{62}-1$.

For example, if you wanted to declare an unbounded integer parameter `x`, you would write the following:

```
given x : int
```

If you wanted to find an integer decision variable `y` within the range -100 to 100, you would write the following:

```
find y : int(-100..100)
```

You can also state specific values. So if you wanted to find an integer decision variable `z` that could only be 10 or 25, you would write the following:

```
find z : int(10,25)
```

## Tuples (`tuple`)
Tuples domains refer to a tuple of any arity with values of any domain. You can use the `tuple` keyword to denote a tuple or, where the tuple's arity is two or more, you can simply surround the domains with brackets.

You can refer to domains inside a tuple using their positions, starting from 1.

For example, if you wanted to declare a decision variable `x` which would find a two-arity tuple of integers between 1 and 10, you would write the following:

```
find x : (int(1..10),int(1..10))
```

## Sets (`set`)
Set domains refer to a set of any size containing values of any domain. They can be used in a one of two ways:
- `set(size,minSize,maxSize) of domain` refers to a set with optional cardinality attributes (size) containing values of a domain.
- `{1,2,3}` refers to an integer set containing the numbers `1`, `2` and `3`.

If you wanted to declare a decision variable `x` which is a set of size 2, you would write the following:

```
find x : set(2)
```

If you wanted to declare an alias `y` which is the set `{1,2,3}`, you would write the following:

```
letting y be {1,2,3}
````
