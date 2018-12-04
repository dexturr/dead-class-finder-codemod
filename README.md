# dead-class-finder-codemod

## Usage

**WARNING:** `jscodeshift`, and thus this codemod, edits your files in place. It does not make a copy. Make sure your code is checked into a source control repository like Git and that you have no outstanding changes to commit before running this tool.

Navigate to your Ember project's directory and run the following:

If you do not have `jscodeshift` installed globally, then run:
`npm i jscodeshift -g`

To perform the transformation run the following commands:

`jscodeshift -t https://raw.githubusercontent.com/dexturr/dead-class-finder-codemod/master/index.js ./tests/acceptance`

`jscodeshift -t https://raw.githubusercontent.com/dexturr/dead-class-finder-codemod/master/index.js ./tests/integration`