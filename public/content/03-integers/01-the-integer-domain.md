# The Integer Domain
Integer domains are used to refer to a set of whole numbers. This set can be constrained to a range or can be left open.

Some properties:
- An integer domain which is declared with a range that has a start and end value is finite. This is the _only_ way to declare a finite integer domain.
- If you do not specify one of the start or end, or do not specify a range at all, then the domain will be _infinite_.
- You cannot declare a decision variable with an infinite integer domain.

You can declare an integer domain using the keyword `int`.
3. `int(expression)` refers to the integer domain with bounds described by the expression.

## Unbounded
You can refer to the infinite integer domain (-infty to +infty) with the keyword `int` alone.

For example, if you wanted to declare an alias `a` which refers to the infinite integer domain, you would write the following in your model:

```
letting a be domain int
```
*Let a refer to the infinite domain of integers.*

Remember, since this domain is infinite you cannot use it when declaring decision variables.

```
$ Invalid!
find b : int
```

## Bounded By Range(s)
You can also refer to a bounded integer domain by using ranges alongside `int`. These can be finite or infinite, depending on the parameters you give the range.

Let's look at how ranges work before we go further:
- Ranges are declared using the syntax `start..end`, which refers to the values between `start` and `end`.
    - `1..10` refers to the values between one and ten.
- You can omit either `start` or `end` as a bound for integers to create an infinite range.
    - `1..` refers to the values from one up to +infty.
    - `..10` refers to the values from -infty to ten.

Putting this together, you declare integer domains bounded by ranges with the syntax `int(r1, r2, ...)` where `r1`, `r2`, ... are ranges.

For example, if you wanted to declare a decision variable `c` with the integer domain bounded between one and ten or negative ten and negative one, you would write the following in your model:

```
find c : int(1..10, -10..-1)
```
*Find a c which may be any integer from 1 to 10 or from -10 to -1.*

Similarly, if you wanted to declare an alias `d` which refers to the integer domain bounded from one to +infty, you would write the following:

```
letting d be domain int(1..)
```
*Find a d which may be any integer from 1 to +infty.*

Once again, remember you cannot declare decision variables with an infinite domain.

```
$ Invalid!
find e : int(..10)
```

## Bounded By An Expression
!! TODO
