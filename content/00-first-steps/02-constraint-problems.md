# CSPs and Constraints Programming
A Constraint Satisfaction Problem, or CSP, is a puzzle that contains a few important fields that all play a part in getting to the solution. First, the *placeholders*, which are the values that you want to find. Then, there's the *constraints* (or rules) defining which types of combinations can be done. Finally, there's the actual *values* that can be placed into the placeholders in a way that satisfies the constraints! 

Essentially, CSPs are regular problems that are modelled a bit differently, and rely on a set of rules to create a solution; they're not given other instructions!

Have you ever solved a [Sudoku](https://en.wikipedia.org/wiki/Sudoku) or completed a [Nonogram](https://en.wikipedia.org/wiki/Nonogram)? Congratulations, these are famous CSPs! For example, in a sudoku, the empty tiles would be your placeholders, the rules would be about which values can be placed where, and the allowed values would be all numbers between 1-9. 

Constraint programming involves working with computers to get them to solve these problems systematically. It is a form of artificial intelligence and is of great interest in the computer science research community.

## Conjure and Essence
As we have mentioned, Essence is a language which allows us to formally define these problems. It does so in a way which is concise and can be interpreted easily by humans and solving algorithms alike.

Conjure is a tool which takes an Essence model, determines the best way to solve it, and produces the results. It separates _how_ the model is solved from the constraints within the model.

From this point in the guide, Conjure will be mentioned sparingly. If you would like to learn more about it, see the [Conjure documentation](https://conjure.readthedocs.io/).

> **Aside:** [Conjure Oxide](https://github.com/conjure-cp/conjure-oxide) is a re-write of Conjure in Rust and is the subject of the AI for Decision Making VIP at the University of St. Andrews. While it has not yet reached feature parity, you can try it out with Essence Tutor by <insert how that works here>.

In the next section, we will see an example Essence model for a simple CSP.
