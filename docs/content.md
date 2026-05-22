# Content
Essence Tutor should contain two broad types of content: notes and exercises. Notes should introduce learners to new concepts within the language and exercises should serve as a way for learners to play with said concepts and see how Essence can be used for actual problems.

The focus of Essence Tutor should be getting learners in front of models and encouraging them to see how their changes affect the outcome of their models. Therefore, exercises should be a priority when writing content.

## Chapters
Notes and exercises should be organised into chapters of related content. In general, each chapter should have at least one note and one exercise.

The general chapter structure should be as follows:
0. **First Steps** - Cover the basics of using Essence Tutor and introduce learners to Essence and constraints programming in general. This chapter should include a moderately complex exercise with heavy guidance to give the learner an idea as to what is taught.
1. **Model Structure** - Cover the basic building blocks of every model, including declarations, constraints and objectives.
2. **Domains** - Include a chapter for each domain, covering its features and how it can be used.
3. **Advanced** - Cover more advanced topics, for example advanced operations on specific or a combination of domains. This is particularly for content which does not fit into the categories above.
4. **Conjure** - Cover the Conjure ecosystem and how it relates to Essence as well as the various tools it encompasses.

Content from previous and future chapters where appropriate, but where future content is used, learners should not be expected to understand or apply this knowledge by themeslves. For example, the _First Steps_ chapter may need to use content from the _Model Structure_ chapter. This is acceptable, but there should be more guidance available to the learner when use of said content is required.

At intervals throughout this chapter structure, there should be quiz exercises which include content from all chapters up to that point. These should generally be more challenging, offering less guidance and a less thorough problem description than typical exercises. As a result, hints should be made available that are somewhat more descriptive so learners do not find themselves stuck on a problem.

## Notes
The aim of notes is to introduce learners to Essence concepts in a way that is accessible and easy to consume. In practice, this means they should use accessible language, explain complex concepts in a way that makes them easier to understand and they should be able to be broken down into "chunks" to prevent information overload.

Markdown should be the preferred format for writing notes, as it is easy to parse and is accessible even without a Markdown viewer. The [CommonMark](https://commonmark.org/) format should be used due to its widespread support. Where appropriate, certain syntax may be interpreted differently by an interface to achieve the goals set out above (for example using a horizontal line to indicate a page break).

## Exercises
The aim of exercises is to give learners a space to use the concepts they have learnt from notes with real problems. They should encourage tinkering with models so that learners can see how their changes affect the results produced.

Typical exercises should be stepped so that learners can see how a model can develop over time. At each step, the learner should be able to see the results their written model produces and should be shown whether this matches what is expected at this stage. As mentioned, there should be quiz exercises which offer less guidance, and therefore have less steps (if any).

To avoid learners getting stuck on problems too often, hints should be available. These hints should not directly push the learner in a certain direction, instead they should give guidance about the problem and suggest relevant notes to view. Again, as mentioned, hints should be more guiding for quiz exercises.

The difficulty of exercises should increase as more content is introduced and concepts naturally become more challenging. There should be a more-or-less linear increase in difficulty as progress is made, with the exception of quiz exercises.

### Format
Exercises need to be formatted in a way such that they contain the following information:
- A description of the problem that the learner will solve.
- If the problem is one which is stepped, a number of steps containing the following information:
    - A description of what the step is asking the learner to do.
    - An expected output result, either as a literal value or as a path to a file containing the output.
    - Essence code that the learner should modify.
    - Asides for optional tasks (for example, condensing a model).
- If the problem is one which is not stepped, an expected output result and Essence code that the learner should modify.

The resulting model should be the combination of all Essence sections in a given exercise. See the later examples for an illustration of how this might work.

Ideally, the metadata for an exercise would not be shown to the learner. Instead, an interface should keep track of where they are in the exercise and modify a pure Essence file to add the necessary information per step.

[TOML](https://toml.io/en/) will be used in the following examples, though any data-oriented markup language could be used.

*A full example of a stepped exercise specification, including steps which get their expected results from a file and from a literal.*
```toml
[exercise]
description = '''
Write a model to find an integer which is greater than 1 and less than 3.
'''

[[exercise.step]]
description = '''
Complete the decision variable declarations below.
'''
output_file = "step_output.csv"  # list of values from a csv
essence = '''
(...) x : int(1..3)
'''

[[exercise.step]]
description = '''
Complete the constraint(s) below.
'''
aside = ["Try to write both constraints in one declaration."]
output = 2  # literal value
essence = '''
such that (...)
such that (...)
'''
```

*A full example of a non-stepped exercise specification.*
```toml
[exercise]
description = '''
Write a model which solves a given Sudoku puzzle.
'''
output_file = "exercise_output.csv"
essence = '''
given initial : matrix indexed by [int(1..9, 1..9)] of int(0..9)  $ where 0 = empty
'''
```
