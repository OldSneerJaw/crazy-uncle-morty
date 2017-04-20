This repo contains a solution for the "Winning Ticket" problem. It was implemented by Joel Andrews using JavaScript (ECMAScript 6/2015) and Node.js.

Usage:

1. Install test dependencies using npm: `npm install`
2. Execute the tests using the mocha test runner: `npm test`
3. Extract lotto picks from an array of strings: `./pick-lotto-numbers ${inputString1} ${inputString2} ...`
4. (optional) Use JSHint to identify lint in the code: `npm run-script jshint`

NOTE #1: There are edge cases in which the current implementation fails to parse a valid lotto pick with zeros in it even though there may be a valid solution. For example, consider an input string of "76543210": a valid pick would be 7 6 5 4 3 2 10. However, the current implementation produces 7 6 54 3 2 1, and then rejects it because the only digit remaining is a zero and zero is not a valid lotto number. Another example: "12304567" could be interpreted as 1 2 30 4 5 6 7, but this implementation would produce 12 3, skip the zero, then produce 4 5 6 7, and then reject it because there are not enough numbers for a full pick. The solution could conceivably be updated to handle such cases with considerably more time and effort, but it is arguably beyond the scope of expected effort for the problem.

NOTE #2: If, in the course of attempting to resolve duplicate lotto numbers within a pick, it cannot avoid producing a duplicate, it will simply skip the duplicate number and continue parsing. In certain edge cases, this might lead to it being unable to parse a valid pick even though one is conceivably available. For example, consider the input string "1634616512": it would be parsed into 16 34 6, then because "16" has already been stored, it would split the number and store the "1". Then it would find that it can't store the remaining "6" because that is a duplicate too and, because the maximum lotto number value is 59, the "6" can't be the start of a new two-digit lotto number. In that case, the remaining "6" is simply discarded and parsing continues to produce "5", discards the duplicate "1" and then produces "2". The result has only six lotto numbers ("16", "34", "6", "1", "5", "2"), which is rejected. However, with considerably more complex logic, it could conceivably be parsed as 1 6 34 6 16 51 2 instead, but I have deemed that beyond the scope of expected effort for the problem.

For reference, here is the original problem description:

> Winning Ticket!
>
> Your favorite uncle, Morty, is crazy about the lottery and even crazier about how he picks his “lucky” numbers. And even though his “never fail” strategy has yet to succeed, Uncle Morty doesn't let that get him down.
>
> Every week he searches through the Sunday newspaper to find a string of digits that might be potential lottery picks. But this week the newspaper has moved to a new electronic format, and instead of a comfortable pile of papers, Uncle Morty receives a text file with the stories.
>
> Help your Uncle find his lotto picks. Given a large series of number strings, return each that might be suitable for a lottery ticket pick. Note that a valid lottery ticket must have 7 unique numbers between 1 and 59, digits must be used in order, and every digit must be used.
>
> For example, given the following strings:
>
> ```[ "569815571556", “4938532894754”, “1234567”, “472844278465445”]```
>
> Your function should return:
>
> ```
> 4938532894754 -> 49 38 53 28 9 47 54
> 1234567 -> 1 2 3 4 5 6 7
> ```
