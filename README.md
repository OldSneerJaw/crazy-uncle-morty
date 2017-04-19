This repo contains a solution for the "Winning Ticket" problem. It is implemented using JavaScript (ECMAScript 6/2015) and Node.js.

Usage:

1. Install test dependencies using npm: `npm install`
2. Execute the tests using the mocha test runner: `node_modules/mocha/bin/mocha`
3. Extract the lotto pick from an array of strings: `./pick-lotto-numbers ${inputString1} ${inputString2} ...`
4. Use JSHint to identify lint in the code: `jshint .`

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
> ```4938532894754 -> 49 38 53 28 9 47 54```
> ```1234567 -> 1 2 3 4 5 6 7```
