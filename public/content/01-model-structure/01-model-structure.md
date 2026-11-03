# Model Structure
Essence models can broadly be split into three sections: declarations, constraints and objectives. Together, they build a precise definition of the solution you are looking for that can be transferred between solvers.

> **Aside:** Domains describe the range of values something can be. You can think of them like data types or the bag of values that a solver can choose from. More on these later.

## Declarations
Declarations are where you assign names to values (aliases), introduce changable values that will be provided alongside the model (parameters) and tell the solver the type of data it is going to search for (decision variables).

### Aliases
Aliases can be thought of as similar to variables in traditional programming languages. You take an expression or a domain *(explain)*, and you assign a name to it which you can use throughout the rest of the model. This is done with `letting` statements.

```
letting <name> be <expression>
letting <name> be domain <domain>
```

For example, if you wanted to assign the expression `4 * 5` to the name `twenty`, you would do so as follows:

```
letting twenty be 4 * 5
```
_Let twenty refer to the value that is 4 times 5 (20)._

Similarly, if you wanted to easily refer to the domain of numbers between one and ten by the name `range`, you could do as follows:

```
letting range be domain int(1..5)
```
_Let range refer to the domain of integers between 1 and 5._

### Parameters
Parameters are similar in that they assign a name to a provided value, only the provided value is not part of the model itself. When you declare that a parameter is expected, it will need to be provided in a separate file. You declare parameters using `given` statements, giving the domain it is expected to be.

```
given <name> : <domain>
```

For instance, if you wanted the user of your model to provide a variable temperature with the name `temp`, you could state the following:

```
given temp : int(-100..100)
```
_Given the parameter temp which is an integer between -100 and 100._

### Decision Variables
Decision variables are used to tell the solver what it is supposed to look for. These are declared alongside the domain they are expected to be within with `find` statements. You need one or more of these within your model for it to do anything useful.

```
find <name(s)> : <domain>
```

Say you wanted to look for an integer between one and ten and you wanted to call it `x`, you would then do the following:

```
find x : int(1..10)
```
_Find an x which is an integer between 1 and 10._

## Constraints
Constraints are where you tell the solver the conditions that the values it finds must satisfy. For example, that the number `x` must be twice that of `y`. You do this with `such that` statements with expressions which outline said conditions.

```
such that <expression>
```

Using the example mentioned before, you would do as follows:

```
such that x = 2 * y
```
_Such that x must be two times y._

## Objectives
Finally, objectives optionally tell the solver additional requirements, like that it needs to minimise or maximise a final result.

```
minimising <expression>
maximising <expression>
```

Say you wanted to minimise the value of `x`, you would include this in the model like so:

```
minimising x
```
_Making x as small as possible._
