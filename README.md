This repo contains a solution for the "Winning Ticket" problem. It is implemented using JavaScript (ECMAScript 6/2015) and Node.js.

Usage:

1. Install test dependencies using npm: `npm install`
2. Execute the tests using the mocha test runner: `node_modules/mocha/bin/mocha`
3. Extract the lotto pick from an array of strings: `./pick-lotto-numbers ${inputString1} ${inputString2} ...`
4. Use JSHint to identify lint in the code: `jshint .`

NOTE #1: There are edge cases in which the current implementation fails to parse a valid lotto pick even though there is a valid solution. For example, consider an input string of "76543210": a valid pick would be 7 6 5 4 3 2 10. However, the current implementation produces 7 6 54 3 2 1, and then it would throw an exception because the only digit remaining is a zero and zero is not a valid lotto number. Another example: "12304567" should produce 1 2 30 4 5 6 7, but this implementation would produce 12 3 4 5 6 7 and then throw an exception because there are not enough digits remaining to make a full pick.

NOTE #2: Because there is some ambiguity with regards to the uniqueness requirement in the problem description and in the follow-up response, I have chosen to interpret it to mean that an input string should be rejected if a duplicate lotto number is encountered. For example, the input "569815571556", if parsed to simply skip duplicate values, would produce 56 9 8 15 57 5 6 (notice the second "15" has been skipped). But, as mentioned, the current implementation simply rejects the input string altogether.

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
