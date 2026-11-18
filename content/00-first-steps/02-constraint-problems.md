# CSPs and Constraints Programming
CSPs are puzzles in which there are a number of entities that each hold certain constraints, or requirements, relating to how the world may be. Have you ever solved a [Sudoku](https://en.wikipedia.org/wiki/Sudoku) or completed a [Nonogram](https://en.wikipedia.org/wiki/Nonogram)? Congratulations, these are famous CSPs! <!-- not sure I like this -->

Constraints programming involves working with computers to get them to solve these problems systematically. It is a form of artificial intelligence and is of great interest in Computer Science research.

## Conjure and Essence
As we have mentioned, Essence is a language which allows us to formally define these problems. It does so in a way which is concise and can be interpreted easily.

Conjure is a tool which takes an Essence model, determines the best way to solve it and produces the results. It separates _how_ the model is solved from the constraints within the model.

From this point in the guide, Conjure will be mentioned sparingly. If you would like to learn more about it, see the [Conjure documentation](https://conjure.readthedocs.io/).

> **Aside:** [Conjure Oxide](https://github.com/conjure-cp/conjure-oxide) is a re-write of Conjure in Rust and is the subject of the AI for Decision Making VIP at the University of St. Andrews. While it has not yet reached feature parity, you can try it out with Essence Tutor by <insert how that works here>.

In the next section, we will see an example Essence model for a simple CSP.
