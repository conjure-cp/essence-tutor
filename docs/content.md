# Content
Essence Tutor should contain two broad types of content: notes and exercises. Notes should introduce learners to new concepts within the language and exercises should serve as a way for learners to use said concepts and see how Essence can be used for actual problems.

The focus of Essence Tutor should be getting learners in front of models and encouraging them to see how their changes affect the outcome of their models. Therefore, exercises should be a priority when writing content.

## Chapters
Notes and exercises should be organised into chapters of related content. In general, each chapter should have at least one note and one exercise.

The general chapter structure should be as follows:
1. **First Steps** - Cover the basics of using Essence Tutor and introduce learners to Essence and constraints programming in general. This chapter should include a moderately complex exercise with heavy guidance to give the learner an idea as to what is taught.
2. **Model Structure** - Cover the basic building blocks of every model, including declarations, constraints and objectives.
3. **Domains** - Include a chapter for each domain, covering its features and how it can be used.
4. **Advanced** - Cover more advanced topics, for example advanced operations on specific or a combination of domains. This is particularly for content which does not fit into the categories above.
5. **Conjure** - Cover the Conjure ecosystem and how it relates to Essence as well as the various tools it encompasses.

Content from previous and future chapters where appropriate, but where future content is used, learners should not be expected to understand or apply this knowledge by themeslves. For example, the _First Steps_ chapter may need to use content from the _Model Structure_ chapter. This is acceptable, but there should be more guidance available to the learner when use of said content is required.

At intervals throughout this chapter structure, there should be quiz exercises which include content from all chapters up to that point. These should generally be more challenging, offering less guidance and a less thorough problem description than typical exercises. As a result, hints should be made available that are somewhat more descriptive so learners do not find themselves stuck on a problem.

## Notes
The aim of notes is to introduce learners to Essence concepts in a way that is accessible and easy to consume. In practice, this means they should use accessible language, explain complex concepts in a way that makes them easier to understand and they should be able to be broken down into "chunks" to prevent information overload.

Markdown should be the preferred format for writing notes, as it is easy to parse and is readable even without a Markdown viewer. The [CommonMark](https://commonmark.org/) format should be used due to its widespread support. Where appropriate, certain syntax may be interpreted differently by an interface to achieve the goals set out above (for example using a horizontal line to indicate a page break).

## Exercises
The aim of exercises is to give learners a space to use the concepts they have learnt from notes with real problems. They should encourage tinkering with models so that learners can see how their changes affect the results produced.

### Process
Typical exercises should take a stepped approach, making the learner build their model up to something which can solve a complex problem when finished. At each step, the learner should be able to see the results their model produces and how they compare to that which is expected. Hints should be available which provide gentle guidance as to what might be involved in solving a problem so learners do not get stuck on problems.

As mentioned, quiz exercises should be more challenging, and therefore should offer less steps (if any) towards solving the overall problem. Hints should be more guiding to accommodate for this in the event that the learner gets stuck.

The difficulty of exercises should increase as more content is introduced and concepts naturally become more challenging. There should be a more-or-less linear increase in difficulty as progress is made, with the exception of quiz exercises.

### Format
Exercises should be formatted with the following information:
- An overall problem description.
- One or more steps which contain the following information:
    - A description of what the step requires the learner to do.
    - Zero or more asides for optional tasks which may improve the model.
    - Zero or more hints which can guide the learner if they get stuck.
    - An expected outcome in literal form or from a file.
    - Essence which the learner will modify to complete the step.

The resulting model should be the combination of all Essence sections in a given exercise. See the later examples for an illustration of how this might work.

Ideally, the metadata for an exercise would not be shown to the learner. Instead, an interface should keep track of where they are in the exercise and modify a pure Essence file to add the necessary information per step.

### Examples
[TOML](https://toml.io/en/) will be used in the following examples, though any data-oriented markup language could be used.

*An example of a step definition with a literal expected output.*
```toml
[[step]]
description = "Complete the decision variable declaration(s)."
asides = ["Try to combine all declarations into one."]
hints = ["Go back and read the chapter on model structure."]
output = 3
essence = '''
(...) x : int(1..9)
(...) (...) : int(1..9)
'''
```

*An example of a step definition with expected outputs in a file.*
```toml
[[step]]
description = "Complete the decision variable declaration(s)."
asides = ["Try to combine all declarations into one."]
hints = ["Go back and read the chapter on model structure."]
output_file = "step_output.csv"
essence = '''
(...) x : int(1..9)
(...) (...) : int(1..9)
'''
```

*A full example of a stepped exercise specification.*
```toml
[exercise]
description = "I'm thinking of a number that is greater than 1 and less than 3. What number am I thinking of?"

[[exercise.step]]
description = "Complete the decision variable declaration."
hints = ["What keyword do you use to declare a decision variable? Go back and read Model Structure."]
output_file = "step_output.csv"
essence = '''
(...) x : int(1..3)
'''

[[exercise.step]]
description = "Complete the constraints."
aside = ["Try to combine all constraints into one."]
output = 2
essence = '''
such that (...)
such that (...)
'''
```

*The previous example may produce the following Essence.*
```essence
$ I'm thinking of a number that is greater than 1 and less than 3. What number am I thinking of?

$ STEP 1: Complete the decision variable declaration.
(...) x : int(1..3)

$ STEP 2: Complete the constraints.
$ (aside: Try to combine all constraints into one.)
such that (...)
such that (...)
```
