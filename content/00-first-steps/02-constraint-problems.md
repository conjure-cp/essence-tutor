# CSPs and Constraints Programming
A Constraint Satisfaction Problem, or CSP, is a puzzle that contains a few important fields that all play a part in getting to the solution, and does so without much guidance aside from being given some rules, or *constraints*. CSPs will be covered more later on.

For now, we can think of CSPs as regular problems that are modelled a bit differently, and rely on a set of constraints to create a solution; they're not given other instructions!

Have you ever solved a [Sudoku](https://en.wikipedia.org/wiki/Sudoku)? Well congratulations, that's a famous CSP! Let's explore it:
* The empty tiles in a Sudoku puzzle are our *placeholders*
* Our *constraints* are the numbers 1-9, as well as whether or not they can be placed in a certain position (no number can repeat in any single row, column, or grouping of tiles)
* And our *values* are again just the numbers 1-9, since that's all that the puzzle permits as input to the tiles

Constraint programming involves working with computers to get them to solve these problems systematically. It is a form of artificial intelligence and is of great interest in the computer science research community.

## Conjure, Conjure-Oxide, and Essence
As previously mentioned, Essence is a language which allows us to formally define these problems. It does so in a way which is concise and can be interpreted easily.

Conjure and Conjure-Oxide are tools that take an Essence model, determine the best way to solve it, and produce the results. They separate _how_ the model is solved from the constraints within the model.

From this point in the guide, Conjure and Conjure-Oxide will be mentioned sparingly. If you would like to learn more about it, see the [Conjure documentation](https://conjure.readthedocs.io/).

> **Aside:** [Conjure Oxide](https://github.com/conjure-cp/conjure-oxide) is a re-write of Conjure in Rust and is the subject of the AI for Decision Making VIP at the University of St. Andrews. While it has not yet reached feature parity, you can try it out with Essence Tutor by <insert how that works here>.

In the next section, we will see an example Essence model for a simple CSP.
