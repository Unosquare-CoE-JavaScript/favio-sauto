# The short version

The most important observation we can make about processing of JS programs is that it occurs in at least two phases: parsing/compilation first, then execution.

There are three program characteristics we can observe to prove this: syntax errors, early errors, and hoisting.

In this two-phase process of a JS program, let's turn our attention to how the JS engine identifies variables and determines the scopes of a program as it is compiled.

All occurrences of variables/**identifiers** in a program serve in one of two "roles": target of an assignment or the source of a value.

If there is a value that is being assigned to it, it's a target. If not, then the variable is a source.

We can do runtime scope modifications, and in the note's long version is explained how, but as this is a shorter version all I want to write is: It is really not a good practice to make runtime scope modifications so I'm not going to explain how to do them.

The key idea of "lexical scope" is that it's controlled entirely by the placement of functions, blocks, and variable declarations, in relation to one another.

## Shadowing

Where having different lexical scopes start to matter more is when we have two or more variables, each in different scopes, with the same lexical names. A single scope cannot have two or more variables with the same name; such multiple references would be assumed as just one variable.

If we pass a parameter with the same name of a variable in an outer scope, then we are doing shadowing.

## Hoisting: Declaration vs. Expression

_Function hoisting_ only applies to formal function declarations (specifically those which appear outside of blocks), not to function expression assignments.

In addition to being hoisted, variables declared with var are also automatically initialized to undefined at the beginning of their scope (the nearest enclosing function, or the global).

To initliaze an unintialized variable with let/const, the only way to do so is with an assignment attached to a declaration statement. An assignment by itself is insufficient.

## Limiting Scope Exposure

We should always use different levels of scope (functions and blocks) to organize our program's variables, specifically to reduce scope over-exposure.

Scopes defined by functions make sense, but why create blocks?

Well creating block scopes follows a fundamental software engineer discipline: The Principle of Least Exposure (POLE).

POLE let us minimize the exposure of the variables registered in each scope, so we can easily avoid over-exposure that can generate other problems as security failures, naming collisions, unexpected behavior, uninteded dependency, etc.

POLE, as applied to variable/function scoping, essentially says, default exposing the bare minimum necessary, keeping everything else private as possible. Declare variables in as small and deeply nested of scopes as possible, rather than placing everything in the global (or even outer function) scope.

## Invoking Function Expressions Immediately

Immediately Invoked Function Expressions (IIFE) are a cool way of enclosing a closure with an internal "cache data", we can use IIFEs to avoid scope over-exposure and its syntax is easy to follow, just wrap a function inside () and execute it immediately like: (function() {})().

If the code we need to wrap a sope around has return, this, break, or continue in it, an IIFE is probably not the best approach. In that case, we might look to create the scope with a block instead of a function.

## Function Declarations In Blocks (FiB)

We can use function declarations inside blocks, depending on the context this could be a good implementation but in cases as declaring a function that relies on a conditional we should approach that conditional inside the function instead of declaring the function based on that conditional. This makes for a better debugging process, and more legible code.

# The long version

# Chapter 1: What's the Scope?

How does JS know which variables are accessible by any given statement, and how does it handle two variables of the same name?

The asnwers to questions like these take the form of well-defined rules called scope.

JS is typically classified as an interpreted scripting language, so it's assumed by most that JS programs are processed in a single, top-down pass. But JS is in fact parsed/compiled in a separate phase _before execution begins_.

JS functions are themselves first-class values; they can be assigned and passed around just like numbers or strings. But since these functions hold and access variables, they maintain their original scope no matter where in the program the functions are eventually executed. This is called closure.

Modules are a code organization pattern characterized by public methods that have privileged access (via closure) to hidden variables and functions in the internal scope of the module.

## Compiled vs. Iterpreted

Code compilation is a set of steps that process the text of our code and turn it into a list of instructions the computer can understand. Typically, the whole source code is transformed at once, and those resulting instructions are saved as output (usually in a file) that can later be executed.

We also may have heard that code can be _interpreted_, so how is that different from being _compiled_?

Interpretation performs a similar task to compilation, in that it transforms our program into machine-understandable instructions. But the processing model is different. Unlike a program being compiled all at once, with interpretation the source code is transfromed line by line; each line or statement is executed before immediately proceeding to processing the next line of the source code.

Are these two processing models mutually exclusive? Generally, yes. However, the issue is more nuanced, because interpretation can actually take other forms than just operating line by ine on source code text. Modern JS engines actually employ numerous variatios of both compilation and iterpretation in the handling of JS programs.

## Compiling Code

But first, why does it even matter whether JS is compiled or not?

Scope is primarily determined during compilation, so understanding how compilation and execution relate is key in mastering scope.

In classic compiler theory, a program is processed by a compiler in three basic stages:

1. Tokenizing/Lexing: breaking up a string of characters into meaningful (to the language) chunks, called tokens. For instance, consider the program: var a = 2;. This program would likely be broken up into the following tokens: var, a, =, 2, and ;. Whitespace may or may not be persisted as a token, depending on whether it's meaningful or not.

(The difference between tokenizing and lexing is subtle and academic, but it centers on whether or not these tokens are identified in a stateless or stateful way. Put simply, if the tokenizer were to invoke stateful parsing rules to figure out whether a should be considered a distict token or just part of another token, that would be lexing.)

2. Parsing: taking a stream (array) of tokens and turning it into a tree of nested elements, which collectively represent the grammatical structure of the program. This is called an Abstract Syntax Tree

For example, the tree for var a = 2; might start with a top-level node called VariableDeclaration, with a child node called Identifier (whose value is a), and another child called AssignmentExpression which itself has a child called NumericLiteral (whose value is 2)

3. Code Generation: taking a AST and turning it into executable code. This part varies greatly depending on the language, the platform it's targeting, and other factors. The JS engine takes the just described AST for vr a = 2; and turns it into a set of machine instructions to actually _create_ a variable called a (including reserving memory, etc.), and then store value into a.

The JS engine is vastly more complex than _jus_ thse three stages. In the process of parsing and code generation, there are steps to optimize the performance of the execution (i.e., collapsing redundant elements). In fact, code can even be recompiled and re-optimized during the progression of execution.

JS engines don't have the luxury of an abundance of time to perform their work and optimizations, because JS compilation doesn't happen in a build step ahead of time, as with other languages. It usually must happen in mere microseconds (or less) right before the code is executed. To ensure the fastests performance under these constraints, JS engines use all kinds of tricks (like JITs, which lazy compile and even hot re compile).

## Required: Two Phases

To state it as simply as possible, the most important observation we can make about processing of JS programs is that it occurs in (at least) two phases: parsing/compilation first, then execution.

The separation of a parsing/compilation phase from the subsequent execution phase is observable fact, not theory or opinion. While the JS specification does not require "compilation" explicitly, it requires behavior that is essentially only practical with a compile-then-execute approach.

There are three program characteristics we can observe to prove this to ourselves: syntax errors, early errors, and hoisting.

### Syntax Errors from the Start

Consider the program:

var greeting = "Hello";

console.log(greeting);

greeting = ."Hi";
// SyntaxError: unexpected token .

This program produces no output ("Hello" is not printed),

but instead throws a SyntaxError about the unexpected . token right before the "Hi" string. Since the syntax error happens after the well-formed console.log(..) statement, if JS was executing top-down line by line, one would expect the "Hello" message being printed before the syntax error being thrown. That doesn't happen.

In fact, the only way the JS engine could know about the syntax error on the third line, before executing the first and second lines, is by the JS engine first parsing the entire program before any of it is executed.

### Early Errors

Next, consider:

console.log("Howdy");

saySomething("Hello", "Hi");
// Uncaught SyntaxError: Duplicate parameter name not
// allowed in this context

function saySomething(greeting, greeting) {
"use strict";
console.log(greeting)
}

The "Howdy" message is not printed, despite being a well formed statement.

Instead, just like the snippet in the previous section, the SyntaxError here is thrown before the program is executed. In this case, it's because strict-mode (opted in for only the saySomething(..) function here) forbids, among many other things, functions to have duplicate parameter names; this has alwasy been allowed in non-strict-mode.

The error thrown is noot a syntax error in the sense of being a malformed string of tokens (like ."Hi" prior), but in strict-mode is nonetheless required by the specification to be thrown as an "early error" before any execution begins.

But how does the JS engine know that the greeting parameter has been duplicated? How does it know that the saySomething(..) function is even in strict-mode while processing the parameter list (the "use strict" pragma appears only later, in the function body)?

Again, the only reasonable explanation is that the code must first be _fully_ parsed before any execution occurs.

### Hoisting

Finally, consider:

function saySomething() {
var greeting = "Hello";

{
greeting = "Howdy"; // error comes from here
let greeting = "Hi";
console.log(greeting)
}
}

saySomething()
// ReferenceError: Cannot access 'greeting' before initialization

The noted ReferenceError occurs from the line with the statement greeting = "Howdy". What's happening is that the greeting variable for that statement belogs to the declaratin on the next line, let greeting = "Hi", rather than to the previous var greeting = "Hello" statement.

The only way the JS engine could know, at the line where the error is thrown, that the _next statement_ would declare a block-scoped variable of the same name (greeting) is if the JS engine had already processed this code in an earlier pass, and already set up all the scopes and their variable associations. This processing of scopes and declarations can only accurately be accomplished by parsing the program before execution.

The ReferenceError here technically comes from greeting = "Howdy" accessing the greeting variable _too early_, a conflict referred to as the Temporal Dead Zone (TDZ).

Could JS parse a program, but then execute that program by _interpreting_ operations represented in the AST _without_ first compiling the program? Yes, that is _possible_. But it's extremely unlikely, mostly because it would be extremely inefficient performance wise.

It's hard to imagine a production-qualit JS engine going to all the trouble of parsing a program into an AST, but not then converting (aka, "compiling") that AST into the most efficient (binary representation for the engine to then execute).

Classifying JS as a compiled language is not concerned with the distribution model for its binary (or byte-code) executable representations, but rather in keeping a clear distinction in our minds about the phase where JS code is processed and analyzed; this phase observably and indisputedly happens _before_ the code starts to be executed.

### Compiler Speak

How the JS engine identifies variables and determines the scopes of a program as it is compiled.

First, let's examine a simple JS program to use for analysis over the next several chapters:

var students = [
{ id: 14, name: "Kyle" },
{ id: 73, name: "Suzy" },
{ id: 112, name: "Frank" },
{ id: 6, name: "Sarah" }
]

function getStudentName(studentID) {
for (let student of students) {
if (student.id == studentID) {
return student.name;
}
}
}

var nextStudent = getStudentName(73)

console.log(nextStudent);
// Suzy

Other than declarations, all occurrences of variables/identifiers in a program serve in one of two "roles": either they're the _target_ of an assignment or they're the _source_ of a value.

How do I know if a variable is a _target_? Check if there is a value that is being assigned to it; if so, it's a target. If not, then the variable is a source.

For the JS engine to properly handle a program's variables, it must first label each occurrence of a variable as target or source. We'll dig in now to how each role is determined.

## Sources

The other variable references must then be _source_ references.

In for (let student of students), student is a _target_, but studendtsis a _source_ reference. In the statement if (student.id == StudentID), both student and studentID are _source_ reference in return student.name.

In getStudentName(73), getStudentName is a source referece (which we hope resolves to a function reference value).

## Cheating: Runtime Scope Modifications

It should be clear by now that scope is determined as the program is compiled, and should not generally be affected by runtime conditions. However, in no-strict-mode, there are technically still two ways to cheat this rule, modifying a program's scopes during runtime.

Neither of these techniques _should_ be used-they're both dangerous and confusing, and we should be using strict-mode (where they're disallowed) anyway. But it's important to be aware of them in case we run acrss them in some programs.

The eval(..) function receives a string of code to compile and execute on the fly during the program runtime. If that string of code has a var or function declaration in it, those declarations will modify the current scope that the eval(..) is currently executing in:

function badIdea() {
eval("var oops = 'Ugh!';");
console.log(oops);
}

badIdea(); // Ugh!

eval(..) modifies the scope of the badIdea() function at runtime. This is bad for many reasons, including the performance hit of modifying the already compiled and optimized scope, every time badIdea() runs.

The second cheat is the with keyword, which essentially dynamically turns an object into a local scope--its properties are treated as identifiers in that new scope's block:

badIdea = { oops: "Ugh!" };

with (badIdea) {
console.log(oops); // Ugh!
}

The global scope was not modified here, but badIdea was turned into a scope at runtime rather than compile time, and its property oops becomes a variable in that scope. Again, this is a terrible idea, for performance and readability reasons. At all costs, avoid eval(..) (at least, eval(..) creating declarations) and with. Again, neither of these cheats is available in strict-mode.

## Lexical Scope

If we place a variable declaration inside a function, the compiler handles this declaration as it's parsing the function, and associates that declaration with the function's scope. If a variable is block-scope declared (let / const), then it's associated with the nearest enclosing { .. } block, rather than its enclosing function (as with var).

Furthermore, a reference (target or source role) for a variable must be resolved as coming from one of the scopes that are lexically available to it; otherwise the variables is said to be "undeclared" (which usually results in an error). If the variable is not declared in the current scope, the next outer/enclosing scope will be consulted. This process of stepping out one level of scope nesting continues until either a matching variable declaration can be found, or the global scope is reached and there's nowhere else to go. It's important to note that compilation doesn't acutlly do anything in terms of reserving memory for scopes and variables. None of the program has been executed yet.

Instead, compilation creates a map of all the lexical scopes that lays out what the program will need while it executes. We can think of this plan as inserted code for use at runtime, which defines all the scopes (aka, "lexical environments") and registers all the identifiers (variables) for each scope.

In other words, while scopes are identified during compilation, they're not actually created until runtime, each time a scope needs to run.

# Chapter 2: Illustrating Lexical Scope

To properly reason about our programs, it's important to have a solid conceptual foundation of how scope works. If we rely on guesses and intuition, we may accidentally get the righ answers some of the time, but many other times we're far off.

## Marbles, and Buckets, and Bubbles... Oh My!

An effective metaphor in understanding scope is sorting colored marbles into butckets of their matching color.

Imagine we come across a pile of marbles, and notice that all the marbles are colored red, blue, or green. Let's sort all the marbles, dropping the red ones into a red bucket, green into a green bucket, and blue into a blue bucket. After sorting, when we later need a green marble, we already know the green bucket is where to go to get it.

In this metaphor, the marbles are the variables in our program. The buckets are scopes (functions and blocks (ifs, loops, etc.)), which we just conceptually assign individual colors for our discussion purposes. The color of each marble is thus determined by which _color_ scope we find the marble originally created in.

Let's annotate the running program example from Chapter 1 with scope color labels:

// outer/global scope: RED

var students = [
{ id: 14, name: "Kyle" },
{ id: 73, name: "Suzy" },
{ id: 112, name: "Frank" },
{ id: 6, name: "Sarah" }
]

function getStudentName(studentID) {
// function scope: BLUE
for (let student of students) {
// loop scope: GREEN
if (student.id == studentID) {
return student.name;
}
}
}

We've designated three scope colors with code comments: RED (outermost global scope), BLUE (scope of function getStudentName(..)), and GREEN (scope of/inside the for loop). But it still may be difficult to recognize the boundaries of these scope buckets when looking at a code listing.

1. Bubble 1 (RED) encompasses the global scope, which holds three identifiers/variables: students, getStudentName, and nextStudent.
2. Bubble 2 (BLUE) encompasses the scope of the function getStudentName(..), which holds just one identifier/variable: the parameter studentID
3. Bubble 3 (GREEN) encompasses the scope of the for loop, which holds just one identifier/variable: student.

#### Note

Technically, the parameter studentID is not exactly in the BLUE scope. We'll unwind that confusion in "Implied Scopes"

Scope bubbles are determined during compilation based on where the functions/blocks of scope are written, the nesting inside each other, and so one. Each scope bubble is entirely contained within its parent scope bubble--a scope is never partially in two different outer scopes.

Each marble (variable/identifier) is colored based on which bubble (bucket) it's declared in, not the color of the scope it may be accessed from.

As the JS engine processes a program (during compilation), and finds a declaration for a variable, it essentially asks, "Which _color_ scope (bubble or bucket) am I currently in?" The variable is designated as the same _color_, meaning it belongs to that bucket/bubble.

The GREEN bucket is wholly nested inside of the BLUE bucket, and similarly the BLUE bucket is wholly nested inside the RED bucket. Scopes can nest inside each other as shown, to any depth of nesting as our program needs.

References (non-declarations) to variables/identifiers are allowed if there's a matching declaration either in the current scope, or any scope above/outside the current scope, but not with declarations from lower/nested scopes.

An expresession in the RED bucket only has access to RED marbles, not BLUE or GREEN. An expresion in the BLUE bucket can reference either BLUE or RED marbles, not GREEN. And an expression in the GREEN bucket has access to RED, BLUE, GREEN marbles.

The key take-aways from marbles and buckets (and bubbles):

- Variables are declared in specific scopes, which can e thought of as colored marbles from matching-color buckets.
- Any variable reference that appears in the scope where it was declare or appears in any deeper nested scopes, will be labeled a marble of that same color--unless an intervening scope "shadows" the variable declaration.
- The determination of colored buckets, and the marbles they contain, happens during compilation. This information used for variable (marble color) "lookups" during code execution.

## A Conversation Among Friends

Another useful metaphor for the proceess of analyzing variables and the scopes they come from is to imagine varios conversations that occur inside the engine as code is processed an then executed. We can "listen in" on these conversations to get a better conceptual foundation for how scopes work.

These are the members of the JS engine that will have conversations as they process our program:

- Engine: responsible for start-to-finish compilation and execution of our JS program
- Compiler: one of Engine's friends; handles all the dirty wok or parsing and code-generation
- Scope Manage: another friend of Engine; collects and maintains a lookup list of all the declared variables/identifiers, and enfirces a set of rules as to how these are accesible to currently executing code.

For us to _fully understand_ how JS works, we need to begin to _think_ like Engine (and members) think, ask the questions they ask, and aswer their questions likewise.

Consider this again:

var students = [
{ id: 14, name: "Kyle" },
{ id: 73, name: "Suzy" },
{ id: 112, name: "Frank" },
{ id: 6, name: "Sarah" }
]

function getStudentName(studentID) {
// function scope: BLUE
for (let student of students) {
// loop scope: GREEN
if (student.id == studentID) {
return student.name;
}
}
}

var nextStudent = getStudentName(73);

console.log(nextStudent)
// Suzy

Let's examine how JS is going to process that program, specifically starting with the first statement. The array and its contents are just basic JS value literals (and thus unaffected by any scoping concerns), so our focus here will be on the var students = [ .. ] declaration and initialization assignment parts.

We typically think of that a single statement, but that's not how our friend _Engine_ sees it. In fact, JS treats these as two distinct operations, one which _Compiler_ will handle during compilation, and the other which _Engine_ will handle during execution.

The first thing _Compiler_ will do with this program is perform lexing to break it down into tokens, which it will then parse into a tree (AST).

Once _Compiler_ gets to code generation, there'es more detail to consider than may be obvious. A reasonable assumption would be that _Compiler_ will produce code for the first statement such as: "Allocate memory for a variable, label it students, then stick a reference to the array into that variable." But that's not the whole story.

Here's the steps Compiler will follow to handle the statement:

1. Encountering var students, _Compiler_ will ask _Scope Manager_ to see if a variable named students already exists for that particular scope bucket. If so, _Compiler_ would ignore this declaration and move one. Otherwise, _Compiler_ will produce code that (at execution time) asks _Scope Manager_ to create a new variable called students in that scope bucket.
2. _Compiler_ then produces code for _Engine_ to later execute to handle the students = [] assignment. The code _Engine_ runs will first ask _Scope Manager_ if there is a variable called students accessible in the current scope bucket. If not, _Engine_ keeps looking elsewhere. Once _Engine_ finds a variable, it assigns the reference of the [ .. ] array to it.

A kind of conversation is a question-and-answer exchange, where _Compiler_ asks the current Scope Manager if an encountered identifier delcaration has already been encountered. If "no" _Scope Manager_ creates that variable in that scope. If the answer is "yes", then it's effectively skipped over since there's nothing more for that _Scope Manager_ to do.

_Compiler_ also signals when it runs across functions or block scopes, so that a new scope bucket and _Scope Manager_ can be instantiated.

Later, when it comes to execution of the program, the conversation will shift to _Engine_ and _Scope Manager_.

That conversation is another question-and-answer exchange, where _Engine_ first asks the current _Scope Manager_ to look up the hoisted getStudentName identifier, so as to associate the function with it. _Engine_ then proceeds to ask _Scope Manager_ about the _target_ reference for students, and so on.

To review and summarize how a statement like var students = [ .. ] is processed, in two distinct steps:

1. _Compiler_ sets up the declaration of the scope variable (since it wasn't previously declared in the current scope).
2. While _Engine_ is executing, to process the assignment part of the statement, _Engine_ asks _Scope Manager_ to look up the variable, initializes it to undefined so it's ready to use, and then assigns the array value to it.

## Nested Scope

When it comes time to execute the getStudentName() function, _Engine_ asks for a _Scope Manager_ instance for that function's scope, and it will then proceed to look up the parameter (studentID) to assign the 73 argument value to, and so on.

The function scope for getStudentName(..) is nested inside the global scope. The block scope of the for-loop is similarly nested inside that function scope. Scopes can be lexically nested to any arbitrary depth as tehe program defines.

Each scope gets its own _Scope Manager_ instance each time that scope is executed (one or more times). Each scope automatically has all its identifiers registered at the start of the scope being executed (this is called "variable hoisting")

At the beginning of a scope, if any identifier came from a function declaration, that variable is automatically initialized to its associated function reference. And if any identifier came from a var declaration (as opposed to let/const), that variable is automatically initialized to undefined so that it can be used; otherwise, the variable remains uninitialized (aka, in its "TDZ") and cannot be used until its full declaration-and-initialization are executed.

In the for (let studnet of students) { statement, students is a _source_ reference that must be looked up. But how will that lookup be handled, since the scope of the function will not find such an identifier?

One of the key aspecst of lexical scope is that any time an identifier reference cannot be found in the current scope, the next outer scope in the nesting is consulted; that process is repeated until an answer is found or there are no more scopes to consult.

## Lookup Failures

When _Engine_ exhausts all _lexically available scopes_ (moving outward) and still cannot resolve hte lookup of an identifier, an error condition then exists. However, depending on the mode of the program (strict-mode or not) and the role of the variable (i.e., _target_ vs _source_), this error condition will be handled differently.

### Undefined Mess

If the variable is a _source_, an unresolved identifier lookup is considered an undeclared (unknown, missing) variable, which always results in a ReferenceError being thrown. Also, if the variable is a _target_, and the code at that moment is running in strict-mode, the variable is considered undeclared and similarly throws a ReferenceError.

The error message for an undeclared variable condition, in most JS environments, will look like, "ReferenceError: XYZ is not defined". The phrase "not defined" seems almost identical to the word "undefined". But these two are very different in JS, and this error message unfortunately creates a persistent confusion.

"Not defined" really means "not declared"--or, rather, "undeclared", as in a variable that has no matching formal declaration in any _lexically available scope_. By contrast, "undefined" really means a variable was found (declared), but the variable otherwise has no other value in it at the moment, so it defaults to the undefined value.

## Gobal... What!?

If the variable is a _target_ and strict-mode is not in effect, a confusing and surprising legacy behavior kicks in. The troublesome outcome is that the global scopes's _Scope Manager_ will just create an accidental global variable to fulfill that target assignment.

Assigning to a never-declared variable _is_ an error, so it's right that we would receive a ReferenceError.

## Building On Metaphors

To visualize nested scope resolution, we could use another metapho, an office building.

The building represents our program's nested scope collection. The first floor of the building represents the currently executin scope. The level of the building is the global scope.

You resolve a _target_ or _source_ variable reference by first lookin on the current floor, and if we don't find it, taking the elevator to the next floor (i.e. an outer scope), looking there, then the next, and so on. Once we get to the top floor (the global scope), we either find what we are looking for, or we don't. But we stop regardless.

# Chapter 3: The Scope Chain

The connections between scopes that are nested within other scopes is called the scope chain, which determines the path along which variables can be accessed. The chain is directed, meaningthe lookup moves upward/outward only.

## "Lookup" is (Mostly) Conceptual

In Chapter 2, we described the runtime access of a variable as a "lookup", where the _Engine_ has to start by asking the current scope's _Scope Manager_ if it knows about an identifier/variable, and proceeding upward/outward back through the chain of nested scopes (toward the global scope) until found, if ever. The lookup stops as soon as the first matching named declaration in a scope bucket is found.

The color of a marble's bucket (aka, meta information of what scope a variable originates from) is _usually determined_ during the initial compilation processing. Because lexical scope is pretty much finalized at that point a marble's color will not change based on anything that can happen later during runtime.

Since the marble's color is known from compilation, and it's immutable, this information would likely be stored with (or at least accessible from) each variable's entry in the AST; that information is then used explicitly by the executable instructions that constitute the program's runtime.

In other words, _Engine_ doesn't need to lookup through a bunch of scopes to figure out which scope bucket variable comes from. That information is already known! Avoiding the need for a runtime lookup is a key optimization benefit of lexical scope. The runtime operates more performantly without spending time on all these lookups.

In what case would it ever _not_ be known during compilation?

Consider a reference to a variable that isn't declared in any lexically available scopes in the current file--see _Get Started_, which asserts that each file is its own separate program from the perspective of JS compilation. If no declaration is found, that's not _necessarily_ an error. Another file (program) in the runtime may indeed declare that variable in the shared global scope.

So the ultimate determination of wether the variable was ever approapriately declared in some accessible bucket may need to be deferred to the runtime.

Any reference to a variable that's initially _undeclared_ is left as an uncolored marble during that file's compilation; this color cannot be determined until other relevant file(s) have been compiled and the application runtime commences. That deferred lookup will eventually resolve the color to whichever scope the variable is found in (likely the global scope).

However, this lookup would only be needed once per variable at most, since nothing else during runtime could later change that marble's color.

## Shadowing

Where having different lexical scope buckets starts to matter more is when we have two or more variables, each in different scopes, with the same lexical names. A single scope cannot have two or mor variables with the same name; such multiple references would be assumed as just one variable.

If we need to maintain two or more variables of the same name, we must use separate (often nested) scopes. And in that case, it's very relevant how the different scope buckets are laid out.

With te conceptual notion of the "lookup", we asserted that it starts with the current scope and works its way outward/upward, stopping as soon as a matching variable is found.

This is a key aspect of lexical sope behavior, called shadowing. Parameters are sahdowing the (shadowed) global variable.

When we choose to shadow a variable from an outer scope, one direct impact is that from that scope inward/downward (thorugh any nested scopes) it's now impossible for any marble to be colored as the shadowed variable. In other words, any identifier reference will correspond to that parameter variable, never the global variable.

## Global Unshadowing Trick

It is possible to access a global variable from a scope where that variable has been shadowed, but not through a typical lexical identifier reference.

The "window." porperty allows us to access the global scope inside another nested scope and shadow a variable. But it can only be accessed if a variable is declared with the _var_ keyword.

Variables (no matter how they're declared) that exist in any other scope than the global scope are completely inaccessible from a scope where they've been shadowed.

### Copying Is Not Accessing

Mutating the contents of the object value via a reference copy is not the same thing as lexically accessing the variable itself. We still can't reassign the BLUE special parameter

### Illegal Shadowing

Not all combinations of declaration shadowing are allowed. let can shadow var, but var cannot shadow let.

The real reason it's raised as a SyntaxError is because the var is basically trying to "cross the boundary" of (or hop over) the let declaration of the same name, which is not allowed.

That boundary-crosing prohibition effectively stops at each function boundary.

Summary: let (in an inner scope) can always shadon an outer scope's var. var (in an inner scope) can only shadow an outer scope's let if there is a function boundary in between.

## Function Name Scope

A function declaration will create an identifier in the enclosing scope. The same is true for variables, but since it's a function expression--a function definition used as value instead of a standalone declaration--the function itself will not "hoist".

One major difference between function declarations and function expressions is what happens to the name identifier of the function. Consider a named function expression.

A function expression with a name identifier is referred to as a "named function expression" but one without a name identifier is referred to as an "anonymous function expression". Anonymous function expressions clearl have no name identifier that affects either scope.

## Arrow Functions

ES6 added an additional function expression form to the language, called "arrow functions".

The arrow function doen't require the word funciton to define it. Also, the (..) around parameter list is optional in some simple cases. Likewise, the { .. } around the function body is optional in some cases. And when the { .. } are omitted, a return value is sent out without using a return keyword.

#### Note

The attractiveness of arrow functions is often sold as "shorter syntax", and that's claimed to equate to objectively more readable code. This claim is dubious at best, and I believe outright misguided. We'll dig into the "readability" of various function forms in Appendix A.

Arrow Functions are lexically anonymous, meaning they have no directly related identifier that references the function.

Arrow functions achieve their syntactic brevity at the expense of having to mentally juggle a bunch of variations for different forms/conditions.

There's a common but incorrect claim that arrow functions somehow behave differently with respect to lexical scope from standard function functions. This is incorrect.

Other than being anonymous (and having no declarative form), => arrow functions have the same lexical scope rules as function functions do. An arrow function, with or without { .. } around its body, still creates a separate, inner nested bucket of scope. Variable declarations inside this nested scope bucket behave the same as in a function scope.

## Backing out

When a function (declaration or expression) is defined, a new scope is created. The positioning of scopes nested inside one another creates a natural scope hierarchy throughout the program, called the scope chain. The scope chain controls variable access, directionally oriented upward an outward.

Each new scope offers a clean slate, a space to hold its own set of variables. When a variable name is repeated at different levels of the scope chain, shadowing occurs, which prevents access to the outer variable from that point inward.

# Chapter 4: Around the Global Scope

The global scope of a JS program is a rich topic, with much more utility and nuance than we would likely assume.

## Why Global Scope?

Most applications are composed of multiple (sometimes many) individual JS files.

How exactly do all those separate files get stitched together in a single runtime context by the JS engine?

With respect to browser-executed applications, there are three main ways.

First, if we are directly using ES modules (not transpiling them into some other module-bundle format), these files are loaded individually by the JS environment. Each module then imports references to whichever other modules it needs to access. The separate module files cooperate with each other exclusively through these shared imports, without needing any shared outer scope.

Second, if we are using a bundler in our build process, all the files are typically concatenated together before delivery to the browser and JS engine, which then only processes one big file. Even with all the pieces of the application co-located in a single file, some mechanism is necessary for each piece to register a _name_ to be referred to by other pieces, as well as some facility for that access to occur.

In some build setups, the entire contents of the file are wrapped in a single enclosing scope, such as a wrapper function, universal module (UMD), etc. Each piece can register itself for access from other pieces by way of local variables in that shared scope. For example:

(function wrappingOuterScope() {
var moduleOne = (function one() {
// ..
})();

var moduleTwo = (function two() {
// ..
function callModuleOne() {
moduleOne.someMethod()
// ..
}
})()
})()

As shown, the moduleOne and moduleTwo local variables inside the wrappingOuterScope() function scope are declared so that these modules can access each other for their cooperation.

While the scope of wrappingOuterScope() is a function and not the full environment global scope, it does act as a sort of "application-wide scope", but a bucket where all the top-level identifiers can be stored, though not in the real global scope. It's kind of like a stand-in for the global scope in that respect.

And finally, the third way: whether a bundler tool is used for an application, or whether the (non-ES module) files are simply loaded in the browser individually (via <script></script> tags or other dynamic JS resource loading), if there is no single surrounding scope encompassing all these pieces, the _global scope_ is the only way for them to cooperate with each other:

A bundled file of this sort often looks something like this:

var moduleOne = (function one() {
// ..
})()

var moduleTwo = (function two() {
// ..

function callModuleOne() {
moduleOne.someMethod()
}

// ..
})()

Here, since there is no surrounding function scope, these moduleOne and moduleTwo declarations are simply dropped into the global scope. This is effectively the same as if the files hadn't been concatenated, but loaded separately:

module1.js:
var moduleOne = (function one() {
// ..
})()

module2.js:
var moduleTwo = (function two() {
// ..

function callModuleOne() {
moduleOne.someMethod()
}

// ..
})()

If these files are loaded separately as normal standalone .js fles in a browser environment, each top-level variable declaration will end up as a golbal variable, since the global scope is the only shared resource between these two separate files--they're independent programs, from the perspective of the JS engine.

In addition to (potentially) accounting for where an application's code resides during runtime, and how each pieace is able to access the other pieces to cooperate, the global scope is also where:

- JS exposes its built-ins:
  - primitives: undefined, null, Infinity, NaN
  - natives: Date(), Object(), String(), etc.
  - global functions: eval(), parseInt(), etc.
  - namespaces: Math, Atomics, JSON
  - friends of JS: Intl, WebAssembly
- The environment hosting the JS engine exposes its own built-ins:
  - console (and its methods)
  - the DOM (window, document, etc)
  - timers (setTimeout(..), etc.)
  - web platform APIs: navigator, history, geolocation, WebRTC, etc.

These are just some of the many _globals_ our programs will interact with.

#### Note

Node also exposes several elements "globally", but they're technically not in the global scope:
require(), \_\_dirname, module, URL, and so on.

Most developers agree that the global scope shouldn't just be a dumping ground for every variable in our application. That's a mess of bugs just waiting to happen. But it's also undeniable that the global scope is an important _glue_ for practically every JS application.

## Where Exactly is this Global Scope

It might seem obvious that the global scope is located in the outermost portion of a file; that is, not inside any function or other block. But it's not quite as simple as that.

Different JS environments handle the scopes of our programs, especially the global scope, differently. It's quite common for JS developers to harbor misconcenptions without even realizing it.

### Browser "Window"

With respect to treatment of the global scope, the most _pure_ environment JS can be run in is as a standalon .js file loaded in a web page environment in a browser. I don't mean "pure" as in nothing automatically added--lots may be added-- but rather in terms of minimal intrusion on the code or interference with its expected global scope behavior.

Consider this .js file:

var studentName = "Kyle";

function hello() {
console.log(`Hello, ${ studentName }`)
}

hello()
// Hello, Kyle

This code may be loaded in a web page environment usin an inline <script></script> tag, a <script src=..></script> script tag in the markup, or even a dynamically created <script></script> DOM element. In all three cases, the studentName and hello identifiers are declared in the global scope.

That means if we access the global object (commonly, window in the browser), we'll find properties of those same names there:

var studentName = "Kyle";

function hello() {
console.log(`Hello, ${ window.studnetName }`)
}

window.hello();
// Hello, Kyle

That's the default behavior one would expect from reading of the JS specification: the outer scope _is_ the global scope and studentName is legitimately created as global variable.

That's what I mean by _pure_. But unfrotunately, that won't always be true of all JS environments we encounter, that's often surprising to JS developers.

### Globals Shadowing Globals

Where one variable declaration can override and prevent access to a declaration of the same name from an outer scope.

An unusual consequence of the difference between a global variable and a global property of the same name is that, within just the global scope itself, a global object property can be shadowed by a global variable:

window.something = 42

let something = "Kyle"

console.log(something)
// Kyle

console.log(window.something)
// 42

The let declaraion adds a something global variable but not a global object property. The effect then is that the something lexical identifier shadows something global object property.

It's almost certainly a bad idea to create a divergence between the global object and the global scope. Readers of your code will almost certainly be tripped up.

A simple way to avoid this gotcha with global declarations: always use var for globals. Reserve let and const for block scopes.

## DOM Globals

A browser-hosted JS environment has the most _pure_ global scope behavior. However, it's not entirely _pure_.

One surprising behavior in the global scope we may encounter with browser-based JS applications: a DOM element with an id attribute automatically creaes a global variable that references it.

If the id value is a valid lexical name (like first), the lexical variable is created. If not, the only way to access that global is through the global object.

The auto-registration of all id-bearing DOM elements as global variables is an old legacy browser behavior that nevertheless must remain because so many old sites still rely on it. The advice is never to use these global variables, even though they will always be silently created.

## What's in a (Window) Name?

Another global scope oddity in browser-based JS:

var name = 42;

console.log(name, typeof name);
// "42" string

window.name is a pre-defined "global" in a browser context; it's a property on the global object, so it seems like a normal global variable (yet it's anything but "normal").

We used var for our declaration, which does not shadow the pre-defined name global property. That means, effectively, the var declaration is ignored, since there's already a global scope object property of that name. As we discussed earlier, had we used let name, we would have shadowed window.name with a separate global name variable.

But the truly surprising behavior is that even though we assigned the number 42 to name (and thus window.name), when we then retrieve its value, it's a string "42". In this case, the weirdness is because name is actually a pre-defined getter/setter on the window object, which insists on its value being a string value.

With the exception of some rare corner cases like DOM element ID's and window.name, JS running as a standalone file in a browser page has some of the most pure global scope behavior we will encounter.

## Web Workers

Web Workers are a web platform extension on top of browser-JS behavior, which allows a JS file to run in a completely separate thread (operating system wise) from the thread that's running the main JS program.

Since these Web Worker programs run on a separate thread, they're restricted in their communications with the main application thread, to avoid/limit race conditions and other complications. Web Worker code does not have access to the DOM, for example. Some web APIs are, however, made available to the worker, such as navigator.

Since a Web Worker is treated as a wholly separate program, it does not share the global scope with the main JS program.

However, the browser's JS engine is still running the code, so we can expect similar _purity_ of its global scope behavior. Since there is no DOM access, the window alias for the global scope doesn't exist.

In a Web Worker, the global object reference is typically made using self:

var studentName = "Kyle";
let studentID = 42;

function hello() {
console.log(`Hello, ${ self.studentName }!`);
}

self.hello();
// Hello, Kyle!

self.studentID;
// undefined

Just as with main JS programs, var and functions declarations create mirrored properties on the global object (aka, self), where other declarations(let, etc) do not.

So again, the global scope behavior we're seeing here is about as _pure_ as it gets for running JS programs; perhaps it's even more _pure_ since there's no DOM to muck things up!

## Developer Tools Console/REPL

Altough it might seem, while using the console/REPL, that statements entered in the outermost scope are being processed in the real global scope, that's not quite accurate. Such tools typically emulate the global scope position to an extent; it's emulation, not strict adherence. These tool environments prioritize developer convenience, which means that at times (such as with our current discussions regarding scope), observed behavior may deviate from the JS specification.

The take-away is that Developer Tools, while optimized to be convenient and useful for a variety of developer activities, are not suitable environments to determine or verify explicit and nuanced behaviors of an actual JS program context.

## ES Modules (ESM)

ES6 introduced first-class support for the module pattern. One of the most obvious impacts of using ESM is how it changes the behavior of the observably top-level scope in a file.

Recall this code snippet from earlier (which we'll adjust to ESM format by using the export keyword)

var studentName = "Kyle"

function hello() {
console.log(`Hello, ${ studentName }!`)
}

hello()
// Hello, Kyle

export hello;

If that code is in a file that's loaded as an ES module, it will still run exactly the same. However, the observable effects, from the overall application perspective, will be different.

Despite being declared at the top level of the (module) file, in the outermost obvious scope, studentName and hello are not global variables. Instead, they are module-wide, or, "module-global".

However, in a module there's no implicit "module-wide scope object" for these top-level declarations to be added to as properties, as there is when declarations appear in the top-level of non-module JS files. This is not to say that global variables cannot exist or be accessed in such programs. It's just that global variables don't get _created_ by declaring variables in the top-level scope of a module.

The module's top-level scope is descended from the global scope, almost as if the entire contents of the module were wrapped in a function. Thus, all variables that exist in the global scope (whether they're on the global object or not) are available as lexical identifiers from inside the module's scope.

ESM encourages a minimization of reliance on the global scope, where we import whatever modules we may need for the current module to operate. As such, we less often see usage of the global scope or its global object.

However, as noted earlier, there are still plenty of JS and web globals that we will continue to access from te global scope.

## Node

One aspect of Node that often catches JS developers off-guard is that Node treats every single .js file that it loads, including the main one we start the Node process with, as a _module_ (ES module or CommonJS module). The practical effect is that the top level of our Node programs is never actually the global scope, the way it is when loading a non-module file in the browser.

Node defines a number of "globals" like require(), but they're not actually identifiers in the global scope (nor properties of the global object). They're injected in the scope of every module, essentially a bit like the parameters listed in the Module(..) function declaration.

So how do we define actual global variables in Node? The only way to do so is to add properties to another of Node's automatically provided "globals", which is ironically called global.global is a reference to the real global scope object, somewhat like using window in a browser JS enviornment.

The identifier global is not defined by JS; it's specifically defined by Node

## Global This

Reviewing the JS environments we've looked at so far, a program may or may not:

- Declare a global variable in the top-level scope with var or function declarations-or let, const, and class.
- Also add global varaibles declarations as properties of the global scope object if var or function are used for declaration.
- Refer to the global scope object (for adding or retrieving global variables, as properties) with window, self, or global.

#### Note

A function can be dynamically constructed from code stored in a string value with the Function() constructor, similar to eval(..). Such a function will automatically be run in non-strict-mode (for legacy reasons) when invoked with the normal () function invocation as shown; its this will point at the glboal object.

So, we have window, self, global, and this ugly new Function(..) trick.

As of ES2020, JS has finally defined a stardized reference to the global scope object, called globalThis. So, subject to the recency of the JS engines, our code runs in, we can use globalThis in place of any of those other approaches.

We could even attempt to define a cross-environment polyfill that's safer across pre-globalThis JS environments.

## Globally Aware

The global scope is present and relevant in every JS program, even though modern patters for organizing code into modules de-emphasizes much of the reliance on storing identifiers in that namespace.

Still, as our code proliferates more and more beyond the confines of the browser, it's especially important we have a solid grasp on the differences in how the global scope (and global scope object) behave across different JS environments.

With the big picture of global scope now sharper in focus, the next chapter again descends into the deeper details of lexical scope, examining how and when variables can be used.

# Chapter 5: the (Not So) Secret Lifecycle of Variables

## When can I use a Variable?

All identifiers are registered to their respective scopes during compile time. Moreover, every identifier is _created_ at the bginning of the scope it belongs to, _every time that scope is entered_.

The term mos commonly used for a variable being visible from the beginning of its enclosing scope, even though its declaration may appear further down in the scope, is called _hoisting_.

If we call a function before the declaration this works because of a special characteristic of formal function declarations, called _function hoisting_. when a function declaration's name identifier is registered at the tope of its scope, it's additionally auto-initialized to that function's reference. That's why the function can be called throughout the entire scope.

One key detail is that both _function hoisting_ and var-flavored variable hoisting attach their name identifiers to the nearest enclosing _function scope_ (or, if none, the global scope), not a block scope.

#### Note

Declarations with let and const still hoist. But these two declaration forms attach to their enclosing function as with var and function declarations.

## Hoisting: Declaration vs. Expression

_Function hoisting_ only applies to formal function declarations, not to function expression assignments.

In addition to being hoisted, variables declared with var are also automatically initialized to undefined at the beginning of their scope--again, the neares enclosing function, or the global. Once initialized, they're available to be used (assigned to, retrieved from, etc.) throughout the whole scope.

A function declaration is hoisted and initialized to tis function value (again, called function hoisting). A var variable is also hoisted, and then auto-initialized to udefined. Any subsequent function expression assignments to that variable don't happen until that assignment is processed during runtime execution.

In both cases, the name of the identifier is hoisted. But the function reference association isn't handled at initialization time (beginning of the scope) unless the identifier was create in a formal function declaration.

## Variable Hoisting

Here's an example of _variable hoisting_:

greeting = "Hello!";
console.log(greeting);
// Hello!

var greeting = "Howdy!";

though greeting isn't declared until line 5, it's available to be assigned to as early as line 1. Why?

There's two necessary parts to the explanation:

- The identifier is hoisted,
- _and_ it's automatically initialized to the value undefined from the top of the scope.

#### Note

Using _variable hoisting_ of this sort probably feels unnantural, and many readers might rightly want to avoid relying on it in their programs. But should all all hoisting be avoided?

## Hoisting: Yet Another Metaphor

Rather than hoisting being a concrete execution step the JS engine performs, it's more useful to think of hoisting as a visualization of various actions JS takes in setting up the program _before execution_.

The typical assertion of what hoisting means: lifting--like lifting a heavy weight upward--anyidentifiers all the way to the top of a scope. The explanation often asserted is that the JS engine will actually _rewrite_ that program before execution.

The hoisting (metaphor) proposes that JS pre-processes the orignal program and re-arranges it a bit, so that all the declarations have been moved to the top of their respective scopes before execution. Moreover, the hoisting metaphor asserts that function declarations are, in their entirety, hoisted to the top of each scope.

The "rule" of the hoisting metaphor is that function declarations are hoisted first, then variables are hoisted immediately after all the functions. Thus, the hoisting story suggests that program is re-arranged by the JS engine.

This hoisting metaphor is convenient. Its benefit is allowing us to hand wave over the magial look-ahead pre-processing necessary to find all these declarations buried deep in scopes and somehow move (hoist) them to the top; we can just think about the program as if it's executed by the JS engine in a _single pass_, top-down.

Hoisting as a mechanism for re-ordering code may be an attractive simplification, but it's not accurate. The JS engine doesn't actually re-arrange the code. It can't magically look ahead and find declarations; the only way to accurately find them, as well as all the scope boundaries in the program, would be to fully parse the code.

Guess what parsing is? The first phase of the two-phase processing. There's no magical mental gymnastics that gets around that fact.

So if the hoisting metaphor is (at best) inaccurate, what should we do with the term? It's still useful--indeed, even members of TC39 regularly use it--but we should not claim it's an actual re-arrangement of source code.

We should assert that hoisting _should_ be used to refer to the _compile time operation_ of generating runtime instructions for the automatic registration of a variable at the beginning of its scope, each time that scope is entered.

That's a subtle but important shift, from hoisting as a runtime behavior to its proper place among compile-time tasks.

## Re-declaration?

There's no such thing as a variable being re-declared in the same scope.

## Constants?

The const keyword is more constrained than let. Like let, const cannot be repeated with the same identifier in the same scope. But there's actually an overriding technical reason why that sort of "re-declaration" is disallowed, unlike let wich disallows "re-declaration" mostly for stylistic reasons.

const declarations create variables that cannot be reassigned.

#### Warning

The error thrown when re-assigning a const is a TypeError, not a SyntaxError. The subtle distinction here is actually pretty important, but unfortunately far too easy to miss. Syntax errors represent faults in the program that stop it from even starting execution. Type errors represent faults that arise during program execution.

## Loops

JS doesn't really want us to "re-declare" our variables within the same scope.

That probably seems like a straightforward admonition, until we consider what it means for repeated execution of declaration statements in loops. Consider:

var keepGoing = true;
while (keepGoing) {
let value = Math.random();
if (value > 0.5) {
keepGoing = false;
}
}

Is value being "re-declared" repeatedly in this program? Will we get errors thrown? No.

All the rule of scope (including "re-declaration" of let-created variables) are applied _per scope instance_. In other words, each time a scope is enered during execution, everything resets.

Each loop iteration is its own new scope instance, and within each scope instance, value is only being declared once. So there's no attempted "re-declaration", and thus no error.

## Uninitialized Variables (aka, TDZ)

With var declarations, the variable is "hoisted" to the top of its scope. But it's also automatically initialized to the undefined value, so that the variable can be used throughout the entire scope.

However, let and const declarations are not quite the same in this respect.

How do we initialize and uninitialized variable? For let/const, the only way to do so is with an assignment attached to a declaration statement. An assignment by itself is insufficient.

The term coined by TC39 to refer to a period of time from the entering of a scope to where the auto-initialization of the variable occurs is: Temporal Dead Zone (TDZ)

The TDZ is the time window where a variable exists but is still uninitialized, and therefore cannot be accessed in any way. Only the execution of the instructions can do that initialization. After that moment, the TDZ is done, and the variable is free to be used for the rest of the scope.

A var also has techinally a TDZ, but it's zero in length and thus unobservable to our programs. Only let and const have an observable TDZ.

A common misconception that TDZ means let and const do not hoist. This is inaccurate, or at least slightly misleading, claim. They definitely hoist.

The actual difference is that let/const declaration do not automatically initialize at the beginning of the scope, the way var does. The debate then is if the auto-initialization is _part of hoisting_, or not? I think auto-registration of a variable at the top of the scope and auto-initialization at the top of the scope are distinct operations and shouldn't be lumped together under the single term "hoisting".

We've already seen that let and const don't auto-initialize at the top of the scope. let and const do hoist (auto-register at the top of the scope), we can prove this thanks to shadowing.

var studentName = "Kyle";

{
console.log(studentName);
// ???

// ..

let studentName = "Suzy";

console.log(studentName);
// Suzy
}

The first console.log(..) throws a TDZ error, because in fact, the inner scope's studentName _was_ hoisted (auto-registered at the top of the scope). What didn't happen was the auto-initialization of that inner studentName; it's still unintialized at that moment, hence the TDZ violation.

TDZ errors occur because let/const declarations do hoist their declarations to the top of their scopes, but unlike var, they defer the auto-initialization of their variables until the moment in the code's sequencing where the original declaration appeared. This window of time, whatever its length, is the TDZ.

How can we avoid TDZ errors?

Always put our let and const declarations at the top of any scope. Shrink the TDZ window to zero (or near zero) length, and then it'll be moot.

But why is TDZ even a thing? Why didn't TC39 dictate that let/const auto-initialize the way var does?

# Chapter 6: Limiting Scope Exposure

## Least Exposure

It makes sense that functions define their own scopes. But why do we need blocks to create a scopes as well?

Software engineering articulates a fundamental discipline, typically applied to software security, called "The Principle of Least Privilege". And a variation of this principle that applies to our current discussion is typically labeled as "Least Exposure" (POLE)

POLP expresses a defensive posture to software architecture: components of the system should be designed to function with least privilege, least access, least exposure. If each piece is connected with minimum-necessary capabilities, the overall system is stronger from a security standpoint, because a compromise or failure of one piece has a minimized impact on the rest of the system.

If POLP focuses on system-level component design, the POLE _Exposure_ variant focuses on a lower level; we'll apply it to how scopes interact with each other.

In following POLE, what do we want to minimize the exposure of? Simply: the variables registered in each scope.

When variables used by one part of the program are exposed to another part of the program, via scope, there are three main hazards that often arise:

- Naming Collisions
- Unexpected Behavior
- Uninteded Dependency

POLE, as applied to variable/function scoping, essentially says, default to exposing the bare minimum necessary, keepin everything else as private as possible. Declare variables in a small and deeply nested of scopes as possible, rather than placing everythin in the global (or even outer function) scope.

## Hiding in Plain (Function) Scope

We should hide our variable and function declarations in the lowest scopes possible. But how do we do so?

We've already seen the let and const keywords, which are block scoped declarators; we'll come back to them in more detail shortly. But first, what about hiding var or function declarations in scopes? That can easily be done by wrapping a function scope around a declaration.

var factorial = (function hideTheCache() {
var cache = {};

function factorial(x) {
if (x < 2) return 1;
if (!(x in cache)) {
cache[x] = x \* factorial(x - 1);
}

    return cache[x]

}

return factorial;
})()

## Invoking Function Expressions Immediately

An IIFE (Immediately Invoked Function Expression) is useful when we want to create a scope to hide variables/functions. Since it's an expression, it can be used in _any_ place in a JS program where an expression is allowed. An IIFE can be named, or unnamed/anonymous. And it can be standalone or, as before, part of another statement.

### Function Boundaries

Beware that using an IIFE to define a scope can have some unintended consequences, depending on the code around it. Because an IIFE is a full function, the function boundary alters the behavior of certain statements/constructs.

For example, a return statement in some piece of code would change its meaning if an IIFE is wrapped around it, because now the return would refer to the IIFE's function. Non-arrow function IIFEs also change the binding of a this keyword. And statements like break and continue won't operate across an IIFE function boundary to control an outer loop or block.

So, if the code we need to wrap a scope around has return, this, break, or continue in it, an IIFE is probably not the best approach. In that case, we might look to create the scope with a block instead of a function.

## Scoping with Blocks

In general, any { .. } curly-brace pair which is a statement will act as a block, but **not necessarily** as a scope.

A block only becomes a scope if necessary, to contain its block-scoped declarations (i.e., let or const). Consider:

{
// not necessarily a scope (yet)

// ..

// now we know the block needs to be a scope
let thisIsNowAScope = true;

for (let i = 0; i < 5; i++) {
// this is also a scope, activated each iteration

    if (i % 2 == 0) {
      // this is just a block, not a scope
      console.log(i)
    }

}
}

Not all { .. } curly-bacre pairs create blocks (and thus are elegible to become scopes):

- Object literals use { .. } curly-brace pairs to delimit their key-value lists, but such object values are **not** scopes.
- class uses { .. } curly-braces around its body definition, but this is not a block or scope.
- A function uses { .. } around its body, but this is not technically a block--it's a single statement for the function body. It _is_, however, a (function) scope.
- The { .. } curly-brace pair on a switch statement (around the set of case clauses) does not define a block/scope.

## var and let

var attaches to the nearest enclosing function scope, no matter where it appears. That's true even if var appears inside a block.

While we can declare var inside a block (and still have it be function-scoped), we shouldn't take this approach in a few specific cases. Otherwise, var should be reserved for use in the top-level scope of a function.

Why not just use let in that same location? Because var is visually distinct from let and therefore signals clearly, "this variable is function-scoped". Using let in the top-level scope, especially if not in the first few lines of a function, and when all the other declarations in blocks use let, does not visually draw attention to the difference with the function scoped declaration.

## Where to let?

POLE already guides us on that decision, but let's make sure we explicitly state it. The way to decide is not based on which keyword we want to use. The way to decide is to ask "What is the most minimal scope exposure that's sufficient for this variable?"

Once that is answered, we'll know if a variable belongs in a block scope or the function scope. If we decide initially that a variable should be block-scoped, and later realize it needs to be elevated to be function-scoped, then that dictates a change not only in the location of that variable's declaration, but also the declarator keyword used. The decision-making process really should proceed like that.

An example that was historically based on var but which should now pretty much always use let is the for loop.

No matter where such a loop is defined, the i should basically always be used only inside the loop, which case POLE dictates it should be declared with let instead of var.

Almost the only vase where switching a var to a let in this way would "break" our code is if we were relying on accessing the loop's iterator(i) outside/after the loop, such as:

for (var i = 0; i < 5; i++) {
if (checkValue(i)) {
break;
}
}

if (i < 5) {
console.log("The loop stopped early")
}

## What's the Catch?

The catch clause has used an additional (little-known) block-scoping declaration capability

The err variable declared by the catch clause is block-scoped to that block. This catch clause block can hold other block-scoped declarations via let. But a var declaration inside this block still attaches to the outer function/global scope.

ES2019 changed catch clauses so their declaration is optional; if the declaration is omitted, the catch block is no longer (by default) a scope; it's still a block.

So if we need to react to a condition that an exception occurred, but we don't care about the error value itself, we can omit the catch declaration.

## Function Declarations in Blocks (FiB)

We've seen now that declarations using let or const are block-scoped, and var declarations are function-scoped.

But what about function declarations that appear directly inside blocks? As a feature, this is called "FiB".

We typically think of function declarations like they're the equivalent of a var declaration.

Let's dig in:

if (false) {
function ask() {
console.log("Does this run?");
}
}

ask();

What do we expect for this program to do? Three reasonable outcomes:

1. The ask() call might fail with a ReferenceError exception, because the ask identifier is block-scoped to the if block scope and thus isn't available in the outer/global scope.
2. The ask() call might fail with a TypeError exception, because the ask identifier exists, but it's undefined (since the if statement doesn't run) and thus not a callable function.
3. The ask() call might run correctly, printing out the "Does it run?" message.

Here's the confusing part: depending on which JS environment we try that code snippet in, we may get different results. This is one of those few crazy areas where existing legacy behavior betrays a predictable outcome.

The JS specification says that function declarations inside of blocks are block-scoped, so the answer should be (1). However, most browser-based JS engines will behave as (2), meaning the identifier is scoped outside the if block but the function value is not automatically initialized, so it remains undefined.

One of the most common use cases for placing a function declaration in a block is to conditionally define a function one way or another (like with an if..else statement) depending on some environment state. For example:

if (typeof Array.isArray != "undefined") {
function isArray(a) {
return Array.isArray(a);
}
} else {
function isArray(a) {
return Object.prototype.toString.call(a) == "[object Arra]"
}
}

It's tempting to structure code this way for performance reasons, since the typeof Array.isArray check is only performed once, as opposed to defining just one isArray(..) and putting the if statement inside it--the check would then run unnecessarily on every call.

#### Warning

In addition to the risks of FiB deviatons, another problem with conditional-definition of functions is it's harder to debug such a program. If we end up with a bug in the isArray(..) function, we first have to figure out which isArray(..) implementation is actually running. Sometimes, the bug is that the wrong one was applied because the conditional check was incorrect. If we deifne multiple versions of a function, that program is always harder to reason about and maintain.

In addition to the previous snippets, several other FiB corner cases are lurking; such behaviors in various browsers and non-browser JS environments (JS engines that aren't browser based) will likely vary. For example:

if (true) {
function ask() {
console.log("Am I called?");
}
}

if (true) {
function ask() {
console.log("Or what about me?");
}
}

for (let i = 0; i < 5; i++) {
function ask() {
console.log("Or is it one of these?");
}
}

ask();

function ask() {
console.log("Wait, maybe, it's this one?")
}

The only practical answer to avoiding the vagaries of FiB is to simply avoid FiB entirely. In other words, never place a function declaration directly inside any block. Always place function declarations anywhere in the top-level scope of a function (or in the global scope).

So for the earlier if..else example, my suggestion is to avoid conditionally deifining functions if at all possible.

# Chapter 7: Using Closures

Closure builds on the POLE (least exposure principle) approach: for variables we need to use over time, instead of placing them in larger outer scopes, we can encapsulate (more narrowly scope) them but still preserve access from inside functions, for broader use. Functions remember these referenced scoped variables via closure.

Closure is one of the most important language characteristics ever invented in programming--it underlies major programming paradigms, including Functional Programming (FP), modules, and even a bit of class-oriented design. Getting comfortable with closure is required for mastering JS and effectively leveraging many important design patterns throughout our code.

## See the Closure

Closure is a behavior of functions and only functions. If we aren't dealing with a function, closure does not apply. An object cannot have closure, nor does a class have closure (though its function/methods might). Only functions have closure.

For closure to be observed, a function must be invoked, and specifically it must be invoked in a different branch of the scope chain from where it was originally defined. A function executing in the same scope it was defined would not exhibit any observably different behavior with or wihtout closure being possible; by the observational perspective and definition, that is not closure.

// outer/global scope: RED

function lookupStudent(studentID) {
// function scope: BLUE

var students = [
{ id: 14, name: "Kyle" },
{ id: 73, name: "Suzy" },
{ id: 112, name: "Frank" },
{ id: 6, name: "Sarah" }
]

return function greetStudent(greeting) {
// function scope: GREEN

var student = students.find(
student => student.id == studentID
)

return `${ greeting }, ${ student.name }!`
}
}

var chosenStudents = [
lookupStudent(6),
lookupStudent(112),
]

// accessing the function's name:
choosenStudents[0].name;
// greetStudent;

choosenStudents[0]("Hello");
// Hello, Sarah!

choosenStudents[1]("Howdy");
// Howdy, Frank!

Closure allows greetStudent(..) to continue to access those outer variables even after the outer scope is finished (when each call to lookupStudent(..) completes). Instead of the instances of students and StudentID being garbage collected , they stay around in memory. At a later time when either instance of the greetStudent(..) function is invoked, those variables are still there, holding their current values.

If JS functions did not have closure, the completion of each lookupStudent(..) call would immediatley tear down its scope and Garbage collected the students and studentID variables. When we later called one of the greetStudent(..) functions, what would then happen?

If greetStuden(..) tried to access what it thought was a BLUE marble, but that marble did not actually exists (anymore), the reasonable assumption is we should get a ReferenceError, right?

But we don't get an error. The fact that the execution of chosenStudents[0]("Hello") works and returns us the message, means it was still able to access the students and studentID variables. This is a direct observation of closure.

## Adding Up Closures

Closure is associated with an instance of a function, rather than its single lexical definition. In the preceding snippet, there's just one inner addTo(..) function defined inside adder(..), so it might seem like that would imply a single closure.

But actually, every time the outer adder(..) function runs a _new_ inner addTo(..) function instance is created, and for each new instance, a new closure. So each inner function instance has its own closure over its own instance of the scope environment from that exectuion of adder(..).

Even though closure is based on lexical scope, which is handled at compile time, closure is observed as a runtime characteristic of function instances.

## Live Link, Not a Snapshot

In both examples from the previous sections, we read the value from a variable that was held in a closure. That makes it feel like closure might be a snapshot of a value at some given moment. Indeed, that's a common misconception.

Closure is actually a live link, preserving access to the full variable itself. We're not limited to merely reading a value; the closed-over variable can be update(re-assigned) as well. By closing over a variable in a function, we can keep using that variable (read and write) as long as that function reference exists in the program, and from anywhere we want to invoke that function. This is why closure is such a powerful technique used widely across so many areas of programming.

Because it's so common to mistake closure as value-oriented instead of variable-oriented, developers sometimes get tripped up trying to use closure to snapshot-preserve a value from some moment in time.

The classic illustration of this mistake is defining functions inside a loop:

var keeps = []

for (var i = 0; i < 3; i++) {
keeps[i] = function keepI() {
return i;
}
}

keeps[0]() // 3
keeps[1]() // 3
keeps[2]() // 3

We may have expected the keeps[0]() invocation to return 0, since that function was created during the first iteration of the loop when i was 0. But again, that assumption stems from thinking of closure as value-oriented rather than variable-oriented.

Something about the structure of a for-loop can trick us into thinking that each iteration gets its own new i variable; in fact, this program only has one i since it was declared with var.

Each saved function returns 3, because by the end of the loop the single i variable in the program has been assigned 3. Each of the three functions in the keeps array do have individual closures, but they're all closed over that same shared i variable.

Of course, a single variable can only ever hold hold one value at any given moment. So if we want to preserve multiple values, we need a different variable for each.

Each function is now closed over a separate (new) variable from each iteration, even though all of them are named j. And each j gets a copy of the value of i at that point in the loop iteration; that j never gets re-assigned.

A let declaration in a for loop actually creates not just one variable for the loop, but actually creates a new variable for each iteration of the loop.

## Common Closures: Ajax and Events

Closure is most commonly encountered with callbacks:

function lookupStudentRecord(studentID) {
ajax(
`https://some.api/student/${ studentID }`,
function onRecord(record) {
console.log(
`${ record.name } (${ studentID })`
)
}
)
}

lookupStudentRecord(114);
// Frank (114)

The onRecord(..) callback is going to be invoked at some point in the future, after the response form the Ajax call comes back. This invocation will happen from the internals of the ajax(..) utility, wherever that comes from. Furthemore, when that happens, the lookupStudentRecord(..) call will long since have completed.

## What if I Can't See it?

We've probably heard this common adage:

If a tree falss in the forest but nobody is around to hear it, does it make a sound?

It's a silly bit of philosophical gymnastics. Of course from a scientific perspective, sound waves are created. But the real point: _does it matter_ if the sound happens?

If a closure exists but it cannot be observerd in our programs, does it matter? No

## Observable Definition

Closure is observed when a function uses variable(s) from outer scope(s) even while running in a scope where those those variabe(s) wouldn't be accessible.

The key parts of this definition are:

- Must be a function involved
- Must reference at least one variable from an outer scope
- Must be invoked in a different branch of the scope chain from the variable(s)

## The Closure Lifecycle and Garbage Collection (GC)

Since closure is inherently tied to a function instance, its closure over a variable lasts as long as there is still a reference to that function.

If ten functions all close over the same variable, the lone remaining function reference still preserves that variable. Once that final function reference is discarded, the last closure over that variable is gone, and the variable itsef is GC'd.

Closure can unexpectedly prevent the GC of a variable that we are otherwise done with, which leads to run-away memory usage over time. It's important to discard function references (and thus their closures) when they're not needed anymore.

## Per Variable or Per Scope?

Should we think of closure as applied only to the referenced outer variable(s) or does closure preserve the entire scope chain with all its variables?

Conceptually, closure is per variable rathar than per scope. But the reality is more complicated than that.

## Closer to Closure

Summarizing the benefits to our programs:

- Closure can improve efficiency by allowing a function instance to remember previously determined information instead of having to compute it each time.
- Closure can improve readability, bounding scope exposure by encapsulating variable(s) inside function instances, while still making sure the information in those variables is accessible for future use. The resultant narrower, more specialized function instances are cleaner to interact with, since the preserved information doesn't need to be passed in every invocation.

# Chapter 8: The Module Pattern

## Encapsulation and Least Exposure

The goal of encapsulation is the bundling or co-location of information (data) and behavior (functions) that together serve a common purpose.

Encapsulation can be as simple as using separate files to hold bits of the overall program with common purpose. If we bundle everything that powers a list of search results into a single file called "search-list.js", we're encapsulating that part of the program.

## What Is a Module?

A module is a collection of related data and functions (often referred to as methods in this context), characterized by a division between hidden _private details_ and _public_ accessible details, usually called the "public API".

A module is also stateful: it maintains some information over time, along with functionality to access and update that information.

## Namespaces (Stateless Grouping)

If we group a set of related functions together, without data, then we don't really have the expected encapsulation a module implies. The better term for this grouping of _stateless_ functions is a namespace:

var Utils = {
cancelEt(evt) {
// ..
},
wait(ms) {
// ..
},
isValidEmail(email) {
// ..
}
}

Utils here is a useful collection of utilities, yet they're all state-independent functions. Gathering functionality together is generally good practice, but that does't make this a module. Rather, we've defined a Utils namespace and organized the functions under it.

## Data Struct

ures (Stateful Grouping)

Even if we bundle data and stateful functions together, if we are not limiting the visibility of any of it, then we're stopping short of the POLE aspect of encapsulation; it's not particularly helpful to label that a module.

## Modules (Stateful Access Control)

## Module Factory (Multiple Instances)

### Classic Module Definition

- There must be an outer scope, typically from a module factory function running at least once.
- The module's inner scope must have at least one piece of hidden information that represents state for the module.
- The module must return on its public API a reference to at least one function that has closure over the hidden module state(so that this state is actually preserved).

## Node CommonJS Modules

To expose something on the public API of a CommonJS module, we add a property to the empty object provided as module.exports.

## Modern ES Modules (ESM)

The ESM format shares several similarities with the CommonJS format. ESM is file-based, and module instances are singletons, with everything private _by default_. One notable difference is that ESM files are assumed to be strict-mode, without needing a "use strict" pragma at the top. There's no way to define an ESM as non-strict-mode.

The "default keyword" has a different emantics from other exports. In essence, a "default export" is a shorthand for consumers of the module when they import, giving them a terser syntax when they only need this single default API member.

Non-default exports are referred to as "named exports"

## Exit Scope

Wether we use ESM or CommonJS modules formats, modules are one of the most effective ways to structure and organize our program's functionality and data.
