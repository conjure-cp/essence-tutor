# Interface
Essence Tutor should have an accompanying interface that can be used by learners to make engaging with the content a smoother process. Importantly, it should _not_ complicate the existing methods for using Conjure. Instead, it should be complementary and use existing ways to work with Essence to achieve its goals.

## Aims
**Primary:**
- Provide navigation through content, allowing a learner to skip back and forth between content that they have completed so they can view previous notes and exercises throughout.
- Save the progress of the learner so they can come back to their latest changes at any time, as well as display this progress so the learner has a sense of how far through the guide they are.
- Interact with and display the two forms of content:
    - Render Markdown notes, potentially alongside exercises.
    - Automatically run and display the output of models written by learners for exercises.
    - Check models written by learners for correctness, displaying the result.
    - Display hints when required for exercises.

**Secondary:**
- Enhance Markdown notes with page breaks and runnable Essence snippets.
- Provide an editing experience for learners so they can work with models directly within Essence Tutor.
    - Give learners the choice between writing Essence as text or building models using Conjure Blocks (see `conjure-blocks.md`).
- Check written models not only for correctness but for specific syntax (e.g. compact declarations) if they are required by an exercise.
- Work offline so learners do not have to be tethered to an internet connection.

## Implementation Considerations
With the above aims in mind, and the findings of building the existing prototype, this section will consider the pros and cons of different implementation types.

### Terminal
Essence Tutor could be built as a terminal runner, similar to that of [Rustlings](https://rustlings.rust-lang.org/). This would be a complement to an existing text editor, so would not implement its own editor.

**Pros:**
- Relatively simple both to implement and to use. Based around a filesystem instead of a more complex database.
- Could be implemented in Rust, which offers continuity with the rest of the VIP.
- Intended as a complement to a text editor, so the learner can use the editor of their preference to work with exercises.
- Requires the installation of Conjure on a system, so once the learner has worked with Essence Tutor their system is ready to go for their own models.
- Avoids creating unnecessary additional ways to interact with Essence.
- Works offline.

**Cons:**
- Rust TUI libraries have taken a while for me (Hayden) to pick up personally.
- Requires the installation of Conjure and Essence Tutor, adding a layer of complexity to getting started with Essence.
- Difficult if not impossible to allow editing with Conjure Blocks.
- Requires the learner to switch between windows on their system.
- Rendering Markdown in a terminal is harder to do.

### Web
Essence Tutor could be built as a web application that potentially uses [Conjure-aaS](https://conjure-aas.cs.st-andrews.ac.uk/) to run models. It would implement its own editor or use an editor component.

**Pros:**
- Extremely easy to get started with; learners simply have to open a web page.
- Notes and exercises can be viewed alongside each other in the same window.
- Doesn't require tooling to be installed on a local system.
- Would be possible to implement a Conjure Blocks editor.
- More flexible UI system, so Markdown can be rendered properly and it could have more complex components (e.g. an assistant to provide hints or highlighting problems directly on models).

**Cons:**
- Learners are forced to use our editor instead of their own.
- Difficulty in saving progress and working offline.

**Challenges:**
- There are a couple options for saving progress, each having benefits and drawbacks:
    - The interface could save to browser local storage, but this risks losing progress when browser data is cleared.
    - Learners could log in with a username and password to save progress to a backend, but this would require handling user information and would not work offline.
- Work would need to be done to make the system work offline.
    - The interface could be made into a Progressive Web Application (PWA).
    - For offline support, it would not be able to use Conjure-aaS. We could potentially bundle a Conjure executable as WebAssembly.
    - Content would need to be saved locally somewhere.

### Visual Studio Code
Similar to [Git By Bit](https://gitbybit.com/), Essence Tutor could be built as an editor extension. Since Visual Studio Code is likely the most unanimous, it would make sense to build with it in mind. Since we would be working inside an editor, it would not be necessary to create our own.

This could be combined with creating a web interface, since VS Code can be run in a browser too.

**Pros:**
- Within an editor that would be familiar to many learners, so wouldn't have to build an editor.
- Provides the flexibility to use the filesystem for saving progress.
- Would be able to use this in combination with the existing Conjure VS Code extension to provide syntax highlighting and an LSP.
- Would provide the same basic abilities as a typical web application, since VS Code is web-based.

**Cons:**
- Requires that learners use VS Code instead of an editor of their choice, or an editor that we control.
- Requires us to work around the restrictions of building upon an existing editor, for example less flexibility with setting out the user interface.
- Requires Conjure to be installed on the system that it runs on, adding complexity to getting started with Essence.
- If built for the web, it has the same difficulties with offline capabilities.

### Notebooks
Existing examples for Essence have worked with Jupyter notebooks through Google Colab. Essence Tutor could build off this, creating Jupyter notebooks for notes and exercises. These could be hosted through Google or ourselves, and an editor would not need to be developed.

**Pros:**
- Extremely easy to set up, requiring little to no development.
- Functions similarly to existing examples, so learners can move from one experience to another without too much adaptation.
- No modifications would need to be made to standards (e.g. adding page breaks to Markdown) because we would work with the tools provided by Jupyter notebooks.
- Exercises and notes can be alongside each other in the same file.

**Cons:**
- Heavily restricted in terms of our control over the user interface, since we would be building with an existing service.
- Much more difficult to work with Essence Tutor on a local machine, requiring significant effort from a learner.
- Offline access would similarly require much more significant effort from a learner.
- The overhead for the project would be significantly higher than before, since Conjure would have to run on a server per instance of the project (or we would have to use Google Colab).
