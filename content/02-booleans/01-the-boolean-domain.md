# The Boolean Domain
Boolean domains are used to express the truth-value of logical constructs. Something with a Boolean domain can be of the value `true` or `false`.

Some properties:
- Declarations with the Boolean domain can hold one of the values `true` or `false`.
- The Boolean domain is finite, since there are only two possible values within it.
- Objective statements cannot be used on declarations with a Boolean domain at this time. That means they cannot be directly minimised or maximised.

The keyword `bool` is used to denote this domain. So, if you wanted to declare a decision variable `a` with a Boolean domain, you would write the following in your model:

```
find a : bool
```
*Find an a which is either true or false.*

Remember you can't directly minimise or maximise a Boolean!

```
$ Invalid!
maximise a
```
