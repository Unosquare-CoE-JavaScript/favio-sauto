# The Short Version

# Chapter 1: What Is Javascript?

JavaScript is a compiled programming language with the most use in web environments. It got its name thanks to marketing shenanigans, and it is no way related to the Java programming language. It is a multi-paradigm language, meaning that we can write our code as class oriented, functional programming or procedural programming.

The group in charge of the JS specification is called TC39 and are comprised of between 50 and about 100 different people from a broad section of web-invested companies.

Although the most use of JS is in the browsers there are other environments that run JS, like servers, robots, etc. But how JS is implemented for web browsers is the only reality that matters.

Not everything we use for our code is part of the JS specification, there are various environment-specific capabilities that are added "to the language" depending on the environment it is running, "alert(..)" is added as a web browser capabilities, and "fs.write(..)" in a Node.JS environment. A wide range of JS-looking APIs (fetch, getCurrentLocation, etc.) are all web APIs that look like JS.

One of the key aspects of JS is that it preserves _backwards compatibility_. This means that once something is accepted as valid JS, there won't be a future change to the language that causes that code to become invalid JS. Code written 20 years ago should still work today, or in 20 years from now.

If we are in a situation where we wrote modern JS and we have to release it to production in an old browser that do not support the modern syntax and features we can use a transpiler, the most commonly knownn is Babel, the transpiler converts newer JS syntax version to an equivalent older syntax.

If there is a missing API method that was added recently, the most common solution is to proivde a polyfill (a definition for that missing API method, that stands in and acts as if the older environment had already had it natively defined).

Now let's talk about the compile process of Javascript, it follows the next steps:

1. Developers original source code -> Babel -> Bundler (i.e., Webpack) -> JS engine
2. JS engine parses the code to an Abstract Syntax Tree (AST)
3. AST -> kind of byte code, a binary intermediate representation (IR) -> Refined/converted by the optimizing Just In Time (JIT) compiler
4. JS Virtual Machine (VM) executes the program.

To summarize these steps: Tools (including JS engine) process and verify a progam before it executes.

# Chapter 2: Surveying JS

JS sees al the files in an application as its own individual separate program. The reason this matters is primarily around error handling.

If we have an application dependant of five js files, and one file fails the application will still work but only partially, at best. It's important to ensure that each files works properly, and that they handle failure in other files as gracefully as possible.

The only way multiple js files act as a single program is by sharing their state via the "global scope".

Going deeper into the language we have values. This is the most fundamental unit of information in a program. Values are data, and in CS, data is king. In JS there are two forms of data: primitives and objects.

Values are embedded in programs using literals, primitive values can be: strings, numbers, booleans, bigint, undefined, symbol, and null. Objects values: Arrays, Functions, Objects (a litle redudant), Maps, Sets, etc. Objects are more general: an unordered, keyed collection of any various values.

Values can be assigned to variables, and there are several way of assigning variables, we can assign variables with the kewords var, let, and const followed by a whitespace and the name of the variable. In the case of const we nmust follow that structure with a equal sign and the value we want to assign it. We cannot decalre a const value without initializing it first.

Variables have to be declared (created) to be used. There are various syntax forms that declare variables (identifiers), and each from has different implied behaviors.

var -> re-declare -> function (wider) scope -> change values
let -> block scope -> change values
const -> block scope

Another useful feature of JS (and most programming languages) are functions, function can take the broader meaning of another related term: "procedure". That is, a collection of statements that can be invoked one or more times, may be provided some inputs, and may give back one or more outputs.

Functions have "function declarations" because they appear as a statement by themselves, not as an expression in another statement. Functions can return only a single value (it doesn't matter if it's a primitive or an object).

A term commonly known is comparisons, and here there is a lot of controversy... There are six comparisons signs: ">", "<", ">=", "<=", "==", and "===". The last two are the most interesting, to sum up a long (and in my opinion convoluted) explanation, "==" check if a value is closely similar or interchangable with other, while "===" check if is the same value and type. The only way we shouldn't use "===" is to define if a value is NaN (to know if something is the value is NaN use the built in function isNaN(..)), and if "0 === -0" (Here we could use the Object.is(..) function).

We can organize our JS in many ways (thanks to it being multi-paradigm):

Classes, as the Object Oriented Programming paradigm or modules. The goal is exactly the same, which is to group data and behavior together into logical units. Classes and modules can "include" or "access" the data and behaviors of other modules, for cooperation sake (each in its own way).

The main difference between these two is that the syntax is entirely different.

# Chapter 3: Digging to the Root of JS

Since programs are essentially built to process data (and make decisions on that data), the patterns used to step through the data have a big impact on the program's readabiltiy.

That's why there are **iterators** in JS, if we have a large amount of data we will need an easy way to deal with all that data. Wih the ES6 iteration protocol in place, it's workable to consume a data source one value at a time, checking after each next() call for done to be true to stop the iteration.

An iterator consumes an iterable, a value that can be iterated over (like arrays, or objects).

Another big and important feature of JS is Closure. Closure is when a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope. Objects don't get closures, functions do. To observe a closure, we must execute a function in a different scope than where that function was originally defined.

Let's pass to the "this" keyword, this is one of its most powerful mechanisms. When a function is defined, it is attached to its enclosing scope via closure. Scope is the set of rules that controls how references to variables are resolved.

Functions also have another characteristic that influences what they can access called: Execution Context, and it's exposed to the function via its this keyword.

This execution context is dynamic and its entirely dependent on how it is called, regardless of where it is defined or even called from. And this is determined each time the function is called.

An easier way to think about execution context is that i's a tangible object whose properties are made available to a function while it executes.

The benefit of this-aware functions--and their dynamic context--is the ability to more flexibly re-use a single function with data from different objects. A function that closes over a scope can never reference a different scope or set of variables.

Where this is a characteristic of function execution, a prototype is a characteristic of an object, and specifically resolution of a property access.

# Chapter 4: The Bigger Picture

There are 3 pillars of JavaScript: Scope and Closure, Prototypes, and Types and Coercion.

# Long Version

# Introduction to JavaScript

1. The name "JavaScript" is only a marketing shenanigans. It was code-named Mocha at first, later it was changed to LiveScript inside Netscape. And at last "JavaScript" won as the name to publicly advertise the new language.
   1. But why Javascript? Well, JS was meant to appeal to an audience of mostly Java programmers, and "script" was a popular word at the time to refer to lightweight programs. These scripts would be the first ones to be embedded inside of pages in the new web.
   2. Also "JavaScript" is an official trademark owned by Oracle (via Sun). For these reasons, some have suggested we use JS instead of Javascript. That is a very common shorthand. And further distancing the language from the Oracle-owned trademakr, the official name of the language specified by TC39\* and formalized by the ECMA standards body is ECMAScript. And indeed, since 2016, the official language name has also been suffixed by the revision year; as of this notes, that's ECMAScript2021, or abbreviated ES2021.
   3. As with CSS3 there's no more versioning and using only the JS is the best way to refer to all the language itself.
2. \*TC39, TC39 is the technical steering committee that manages JS. Their primary task is managing the official specification for the language. They meet regularly to vote on any agreed changes, which they then submit to ECMA, the standards organization. ECMA is a nonprofit standards organization for information and communication systems, the name used to stand for an acronym but they changed the name to reflect the organization's global reach and activities.

JS's syntax and behavior are defined in the ES (EcmaScript) specification.

The TC39 committee is comprised of between 50 and about 100 different people from a broad section of web-invested companies, such as browser makers (Mozilla, Google, Apple) and device makers (Samsung, etc). All members of the committee are volunteers, though many of them are employees of these companies and so may receive compensation in part of their duties on the committee.

TC39 meets generally about every other month, usually for about three days, to review work done by members since last meeting, discuss issues, and vote on proposals. Meeting locations rotate among member companies willing to host.

All TC39 proposals progres through a five-stage process. From stage 0 through Stage 4. The first stage roughly means that someone on TC39 thinks it's a worthy idea and plans to champion work on it. That means lots of ideas that non-TC39 members "propose", through informal means such as social media or blog posts, are really "pre-stage 0". I have to get a TC39 member to champion a proposal for it to be considered "Stage 0" officically.

Once a proposal reaches "Stage 4" status, it is eligible to be included in the next yearly revision of the language. It can take anywhere from several months to a few years for a proposal to work its way through these stages. There's just one JS, the official standard as maintained by TC39 and ECMA.

All major browsers and device makers have committed to keeping their JS implementations compliant with this one central specification. Of course, engines implement features at different times. But it should never be the case that the v8 engine implements a specied feature differently or incompatibly as compared to the SpiderMonkey engine. We can learn one JS, and rely on that same JS everywhere.

## The Web Rules Everything About (JS)

There are many environments where we can run JS, but the one environment that rules JS is the web, how JS is implemented for web browsers is, in all practicality, the only reality that matters.

Sometimes the JS specification will dictate some new or refined behavior, and yet that won't exactly match with how it works in browser-based JS engines. Such a mismatch is historical.

In these cases, often TC39 will backtrack and simply choose to conform the specification to the reality of the web. For example, TC39 planned to add a contains() method for Arrays, but it was found that this name conflicted with old JS frameworks still in use on some sites, so they changed the name to a non-conflicting includes(). Occasionally, TC39 will decide the specification should stick firm on some point even though it is unlikely that browser-based JS engines will ever conform.

The solution? Appendix B, "Additional ECMAScript features for Web Browsers". The JS specificaction includes this appendix to detail out any known mismatches between the official JS specification and the reality of JS on the web. In other words, these are exceptions that are allowed only for web JS; other JS environments must stick to the letter of the law.

The Section B.1 and B.2 cover additions to JS (syntax and APIs) that web JS includes, again for historical reasons, but which TC39 does not plan to formally specify in the core of JS. Section B.3 includes some conflicts where code may run in both web and non-web JS engines, but where the behavior could be observably different, resulting in defferent outcomes. Most of the listed changes involve situations that are labeled as early errors when code is running in strict mode.

Wherever possible, we have to stick to the JS specification and don't rely on behavior that's only applicable in certain JS engine environments.

## Not All (Web) JS...

There are some functions that work on browsers but are not included in the JS specification, but it is in all web JS environments. Yet, we won't find it in Appendix B, e.g. alert().

Various JS environments (like browser JS engines, Node.js, etc.) add APIs into the global scope of our JS programs that give us environment-specific capabilities, like being able to pop an alert-style box in the user's browser.

In fact, a wide range of JS-looking APIs, like fetch(), getCurrentLocation(), and getUserMedia() are all web APIs that look like JS. In Node.js, we can access hundres of API methods from various built-in modules, like fs.write().

Another common example is console.log() (and all others console.\* methods). These are not specified in JS, but because of their universal utility are defined by pretty much every JS environment, according to a roughly agreed consensus.

alert() and console.log() obey syntax rules, and are functions and objects methods. The behaviors behind them are controlled not by the specification but by the environment running the JS engine, but on the surface they definitely have to abide by JS to be able to play in the JS playground.

## It's Not Always JS

Fun fact, using the REPL in my browser's developer tools it's not really a JS environment. (Como dicen los chavos: quede 🤡)

Developer Tools does not have the goal to accurately and purely reflect all nuances that may act as "gotchas" if we're treating the console as pure JS environment.

We shouldn't expect that such tools to always adhere strictly to the way JS programs are handled, because that's not the purpose of these tools.

We need to think of the console as a "JS-friendly" environment. That's useful in its own right.

## Many Faces

The term "paradigm" in programming language context refers to a broad (almost universal) mindset and approach to structuring code. Within a paradigm, there are myriad variations of style and form that distinguish programs, including countless different libraries and frameworks that leave their unique signature on any given code.

But no matter what a program's individual style may be, the big picture divisions around paradigms are almost always evident at first glance of any program.

Typical paradigm-level code categories include -but are not limited to- procedural, object-oriented, and functional:

- Procedural style organizes code in a top-down, linear progression through a pre-determined set of operations, usually collected together in related units called procedures.
- OO style organizes code by collecting logic and data together into units called classes
- FP style organizes code into functions (pure computations as opposed to procedures), and the adaptations of those functions as values.

Paradigms are neither right nor wrong. They're orientations that guide and mold how programmers approach problems and solutions, how they structure and maintain their code.

Many languages also support code patterns that can come from, and even mix and match from, different paradigms. So called "multi-paradigm languages" offer ultimate flexibility. In some cases, a single program can even have two or more expressions of these paradigms sitting side by side.

JS is most definitely a multi-paradigm language. We can write procedural, class-oriented, or FP-style code, and we can make those decision on a line-by-line basis instead of being forced into an all-or-nothing choice.

## Backwards & Forwards

One of the most foundational principles that guides JS is preservation of backwards compatibility. Not to be confused with forwards compatibility.

Backwards compatibility -> Once something is accepted as valid JS, there will not be a future change to the language that causes that code to become invalid JS.

The costs of sticking to this principle should not be casually dismissed. It necessarily creates a very high bar to including changing or extending the language; any decisions becomes effectively permanent, mistakes and all. Once it's in JS, it can't be taken out because it might break programs, even if we'd really, really like to remove it.

There are some small exceptions to this rule. JS has had some backwards-incompatible changes, but TC39 is extremely cautious in doing so. These kinds of chages are rare, and are almost always in corner cases of usage that are unlikely to be observably breaking in many sites.

Forwards compatibility -> Including a new addition to the language in a program would not cause that program to break if it were run in an older JS engine. _JS is not forwards-compatible_, despite many wishing such, and even incorrectly believing the myth that it is.

HTML and CSS, by contrast, are forwards-compatible but not backwards-compatible. If we dug up some HTML or CSS written back in 1995, it's entirely possible it would not work (or work the same) today. But, if we use a new feature from 2019 in a browser from 2010, the page isn't "broken" - the unrecognized CSS/HTML is skipped over, while the rest of the CSS/HTML would be processed accordingly.

It may seem desirable for forwards-compatibility to be included in programming language design, but it's generally impractical to do so. Markup (HTML) or styling (CSS) are declarative in nature, so it's much easier to "skip over" unrecognized declarations with minial impact to other recognized declarations.

So though JS isn't, and can't be, forwards-compatible, it's critical to recognize JS's backwards compatibility, including the enduring benefits to the web and the constraints and difficulties it places on JS as a result.

## Jumping the Gaps

Since JS is not forwards-compatible, it means that there is always the potential for a gap between code that we can write that's valid JS, and the oldest engine that our site or application needs to support. If we run a program that uses an ES2021 feature in an engine from 2016, we're very likely to see the progra break and crash.

If the feature is a new syntax, the program will in general completely fail to compile and run, usually throwing a syntax error. If the feature is an API (such as ES6's Object.is()), the program may run up to a point but then throw a runtime exception and stop once it encounters the reference to the unknown API.

To solve for new and incompatible syntax, we use transpiling. Transpiling is a contrived and community-invented term to describe using a tool to convert the source code of a program from one form to another (but still as textual source code). Typically, forwards-compatibility problems related to syntax are solved by using a transpiler (the most common one being Babel) to convert from that newer JS syntax version to an equivalent older syntax.

We can wonder why use transpilers in general? Why we don't start writing code that is accepted by the oldest browser? Well, that's because it's strongly recommended that developers use the latest version of JS so that their code is clean and communicates its ideas most effectively.

## Filling the Gaps

If the forwards-compatibility issue is not related to new syntax, but rather to a missing API method that was only recently added, the most common solution is to provide a definition for that missing API method that stands in and acts as if the older environment had already had it natively defined. This pattern is called a polyfill (aka "shim").

## What is in an Interpretation?

A long-debated question for code written in JS: is it an interpreted script or a compiled program?

Doesn't matter... well it matters a lot but not for the "Developer Status" but for how errors are handled.

Scripted or interpreted languages were executed in generally a top-down and line-by-line fashion; there's typically not an initial pass through the program to process it before execution begins.

In scripted or interpreted languages, an error on line 5 of a program won't be discoered until lines 1 through 4 have already executed. Depending on context, deferring error handling to the line the error occurs on may be a desirable or undesirable effect.

Compare that to languages which do go through a processing step (typically, called parsing) before any execution occur.

In this processing model, an invalid command (such as broken syntax) on line 5 would be caught during the parsing phase, before any execution has begun, and none of the program would run. For catching syntax (or otherwse "static") errors, generally it's preferred to know about them ahead of any doomed partial execution.

What do "parsed" languages have in common with "compiled" languages? First, all compiled languages are parsed. So a parsed language is quite a ways down the road toward being compiled already. In classic compilation theory, the last remaining step after parsing is code generation: producing an executable form.

Once any source program has been fully parsed, it's very common that its subsequent execution will, in some form or fashion, include a translation from the parsed form of the program-usually called an Abstract Syntax Tree (AST)- to that executable form.

In other words, parsed languages usually also perform code generation before execution, so it's not that much of a strecth to say that, in spirit, they're compiled languages.

JS source code is parsed before it is executed. The specification requires as much, because it calls for "early errors"-statically determined errors in code, such as a duplicate parameter name-to be reported before the code starts executing. Those errors cannot be recognized without the code having been parsed.

The parsed JS is converted to an optimized (binary) form, and that "code" is subsequently executed; the engine does not commonly switch back into line-by-line execution mode after it has finished all the hard work of parsing-most languages/engines wouldn't, because that would be highly inefficient.

To be specific, this "compilation" produces a binary byte code (of sorts), which is then handed to the "JS virtual machine" to execute. Some like to say this VM is "interpreting" the byte code. But then that means Java, and a dozen other JVM-driven languages, for that matter, are interpreted rather than compiled. Of course, that contradicts the typical assertion that Java/etc are compiled languages.

Another wrinkle is that JS engines can employ multiple passes of Just-In-Time(JIT) processing/optimization on the generated code (post parsing), which againg could reasonably be labeled either "compilation" or "interpretation" depending on perspective. It's actually a fantastically complex situation under the hood of a JS engine.

So what do these nitty-gritty details boil down to? Step back and consider the entire flow of a JS source program:

1. After a program leaves a developer's editor, it gets transpiled by Babel, then packed by Webpack (and perhaps half a dozen other build processes), then it gets delivered in that very different form to a JS engine.
2. The JS engine parses the code to an AST.
3. Then the engine converts that AST to a kind-of byte code, a binary intermediate representation (IR), which is then refined/converted even further by the optimizing JIT compiler
4. Finally, the JS VM executes the program.

It's clear that in spirit, if not in practice, JS is a compiled language.

The reason that matters is, since JS is compiled we are informed of static errors (such as malformed syntax) before our code is executed. That is a substantively different interaction model than we get with traditional "scripting" programs, and arguably more helpful.

## Web Assembly (WASM)

One dominating concern that has driven a significant amount of JS's evolution is performance, both how quickly JS can be parsed/compiled an how quickly that compiled code can be executed.

In 2013, engineers from Mozilla Firefox demonstrated a port of the Unreal 3 game engine from C to JS. The ability for this code to run in a browser JS engine at full 60fps performance was predicated on a set of optimizationsthat the JS engine could perform specifically because the JS version of the Unreal engine's code used a style of code that favored a subset of the JS language, named "ASM.js".

This subset is valid JS written in ways that are somewhat uncommon in normal coding, but which signal certain important typing information to the engine that allow it to make key optimizations. ASM.js was introduced as one way of addressing the pressures on the runtime performance of JS.

But it's important to note that ASM.js was never intended to be code that was authored by developers, but rather a representation of a program having been transpiled from another language (such as C), where these typing "annotations" were inserted automatically by the tooling.

Several years after ASMjs demonstrated the validity of tooling-created versions of programs that can be processed more efficiently by the JS engine, another group of engineers (also, initially, from Mozilla) released Web Assembly (WASM).

WASM is similar to ASM.js in that its original intent was to provide a path for non-JS programs (C, etc) to be converted to a form that could run in the JS engine. Unlike ASM.js WASM chose to additionally get around some of the inherent delays in JS parsing/compilation before a program can execute, by representing the program in a form that is entirely unlike JS.

WASM is a representation format more akin to Assembly (hence, its name) that can be processed by a JS engine by skipping the parsing/compilation that the JS engine normally does. The parsing/compilation of a WASM-targeted program happen ahead of time (AOT); what's distributed is a binary-packed program ready for the JS engine to execute with very minimal processing.

An initial motivation for WASM was clearly the potential performance improvements. While that continues to be a focus, WASM is additionally motivated to the web platform. For example, if a language like Go supports threaded programming, but JS (the language) does not, WASM offers the potential for such a Go program to be converted to a form the JS engine can understand, without needing a threads feature in the JS language itself.

In other words, WASM relieves the pressure to add features to JS that are mostly/exclusively intended to be used by transpiled programs from other languages. That means JS feature development can be judged (by TC39) without being skewed by interests/demands in other language ecosystems, while still letting those languages have a viable path onto the web.

Another perspective on WASM that's emerging is, interestingly, not even directly related to the web (W). WASM is evolving to become a cross-platform virtual machine (VM) of sorts, where programs can be compiled once and run in a variety of different system environments.

So, WASM isn't only for the web, and WASM also isn't JS.

Ironically, even though WASM runs in the JS engine, the JS language is one of the least suitable languages to source WASM programs with, because WASM relies heavily on static typing information. Even TypeScript is not quite suitable (as it stands) to transpile to WASM, though language variants like assemblyscript are attemptig to bridge the gap between JS/TS and WASM.

## Strictly Speaking

In 2009 when ES5 was released, JS added "strict mode" as an opt-in mechanism for encouraging better JS programs.

The benefits of strict mode far outweigh the costs.

Strict mode shouldn't be thought of as a restriction on what we can't do, but rather as a guide to the best way to do things so that the JS engine has the best chance of optimizing and efficiently running the code. Most JS code is worked on by teams of developers, so the strictness of strict mode often helps collaboration on code by avoiding some of the more problematic mistakes that slib by in non-strict mode.

Strict mode guides us to the best way to do things so that the JS engine has the best chance of optimizing and efficiently running the code.

Most strict mode controls are in the form of early errors, meaning errors that aren't strictly syntax errors but are still thrown at compile time (before the code is run). For example, strict mode disallows naming two function parameters the same, and resulsts in an early error. Some other strict mode controls are only observable at runtime, such as how this defaults to undefined instead of the global object.

Strict mode is like a linter reminding us how JS should be written to have the highest quality and best chance at performance.

Strict mode can alternatively be turned on per-function scope, with exactly the same rules about its surroundings.

There's only one valid reason to use a per-function approach to strict mode is when we are converting an existing non-strict mode program file and need to make the canges little by little over time.

Strict mode is not likely to be made a default in JS due to the previous mention of backwards compatibility feature.

All transpiled code ends up in strict mode even if the original source code isn't written as such.

## Defined

JS is an implementation of the ECMAScript standard (version ES2021), which is guided by the TC39 committee and hosted by ECMA. It runs in browsers and other JS environments such as Node.js

JS is a multi-paradigm language, meaning the syntax and capabilities allow a devloper to mix and match concepts from various major paradigms, such as procedural, object-oriented, and functional.

JS is a compiled language, meaning the tools (including the JS engine) process and verify a program before it executes.

# Chapter 2: Surveying JS

## Each File is a Program

Most websites we use are comprised of many different JS files. We could think of the whole thing as one program. But JS sees it differently.

In JS, each standalone file is its own separate program.

The reason this matters is primarily around error handlin. Since JS treats files as programs, one file may fail (during parse/compile or execution) and that will not necessarily prevent the next file from being processed. Obviously, if our application depends on five .js files, and one of them fails, the overall application will probably only partially operate, at best. It's important to ensure that each file works properly, and that to whatever extent possible, they handle failure in other files as gracefully as possible.

The only way multiple standalon .js files act as a single program is by sharing their state (and access to their public functionality) via the "global scope". They mix together in tis global scope namespace, so at runtime they act as a whole.

Since ES6, JS has also supported a module format in addition to the typical standalone JS program format. Modules are also file-based. If a file is loaded via module-loading mechanism such as an import statement or a <script type="module"></script> all this code is treated as a single module.

JS still treat each module separately. Similar to how "global scope" allows standalone files to mix together at runtime, importing a module into another allows runtime interoperation between them.

Regardless of which code organization pattern and loading mechanism is used for a file, we should still think of each file as its own (mini) program, which may then cooperate with other (mini) programs to perform the functions of our overall application.

## Values

The most fundamental unit of information in a program is a value. Values are data. They're how the program maintains state. Values come in two forms in JS: primitive and object.

Values are embedded in programs using literals.

Two types of values:

1. Primitive
2. Object

Primitives are 6: Strings, numbers, booleans, undefined, null, and symbol

We won't encounter direct usage of symbols very often in typical JS programs. They're mostly used in low-level code such as in libraries and frameworks.

Functions are values that can be held in arrays or objects.

Functions, like arrays, are a special kind of object.

Objects or Reference value values: Arrays, Functions, Objects

Objects are more general: an unordered, keyed collection of any various values. In other words, we can access the element by a string location name (aka "key" or "property") rather than by its numeric position (as with arrays).

To be explicit about something that may not have been obvious in the previous section: in JS programs, values can either appear as literal values, or they can be held in variables.

Variables have to be declared to be used. There are various syntax forms that declare variables ("identifiers"), and each form has different implied behaviors.

There are 3 statements to declare a value: _var_ _let_ y _const_ the _let_ keyword has some differences to _var_, with the most obvious being that let allows a more limited access to the variable than var. This is called "block scoping" as opposed to regular or function scoping.

example:

var adult = true;

if (adult) {
var name = "kyle";
let age = 39;
console.log('Secret message')
}

console.log(name)
kyle

console.log(age)

end example

The attempt to access age outside of the if statement results in an error, because age was block-scoped to the if, whereas name was not.

Block-scoping is very useful for limiting how widespread variable declarations are in our programs, which helps prevent accidental overlap of their names.

But var is still useful in that it communicates "this variable will be seen by a wider scope". Both declarationns forms can be appropiate in any given part of a program, depending on the circumstances.

A third declaration form is _const_. It's like let but has an adittional limitation that it must be given a value at the moment it's declared, and cannot be re-assigned a different value later.

const declared variables are not "unchangeable", they just cannot be re-assigned. It's ill advised to use const with object values, because those values can still be changed even though the variable can't be re-assigned. This leads to potential confusion down the line.

Besides _var_ / _let_ / _const_, there are other syntactic forms that declare identifiers (variables) in various scopes.

An identifier can be associated so that it references the function.

## Functions

In JS, we should consider function to take the broader meaning of another related term: "procedure". A procedure is a collection of statements that can be invoked one or more times, may be provided some inputs, and may give back one or more outputs.

The association between an identifier and the function value happens during the compile phase of the code, before that code is executed.

function awsomeFunction(coolThings) {
// ...
return amazingStuff;
}

In contrast to a function declaration statement, a function expression can be defined and assigned like this:

var awesomefunction = function(coolThings) {
// ...
return amazingStuff;
}

This function is an expression that is assigned to the variable awesomeFunction. Different from the function declaration form, a function expression is not associated with its identifier until that statement during runtime.

It's extremely important to note that in JS, functions are values that can be assigned (as shown in this snippet) and passed around. In fact, JS functions are a special type of object value type. Not all languages treat functions as values, but it's essential for a language to support the functional programming pattern, as JS does.

## Comparisons

Making decisions in programs requires comparing values to determine their identity and relationship to each other. JS has several mechanisms to enable value comparison, so let's take a closer look at them.

### Equal...ish

The most common comparison in JS programs asks the question, "Is this X value the same as the Y value?" What exactly does "the same as" really mean to JS, though?

It ay seem reasonable to assume that an equality check considers the nature or contents of the value; after all, 42 === 42 considers the actual 42 value and compares it. But when it comes to objects, a content-aware comparison is generally referred to as "structural equality".

JS does not define === as structural equality for object values. Instead, === uses identity equality for object values.

In JS, all objects values are held by _reference_, are assigned and passed by reference-copy, and to our current discussion, are compared by reference (identity) equality.

How can we determine if two function references are "structurally equivalent"? Even stringifying to compare their source code text wouldn't take into account things like closure. JS doesn't provide structural comparison because it's almost intractable to handle all the corner cases.

### Coercive Comparisons

Coercion means a value of one type being converted to its repsective representation in another type. Coercion is a core pillar of the JS langugage, not some optional feature that can reasonably be avoided.

Few JS features draw more ire in the broader JS community than the == operator, genrally referred to as the "loose equality" operator. The majority of all writing and public discourse on JS condemns this operator as poorly designed and dangerous/bug-ridden when used in JS programs. Even the creator of JS himself, Brendan Eich, has lamented how it was designed as a big mistake.

From what I can tell, most of this frustration comes from a pretty short list of confusing corner cases, but a deeper problem is the extremely widespread misconception that it performs its comparisons without considering the types of its compared values.

The == operator performs an equality comparison similarly to how the === performs it. In fact, both operators consider the type of the values being compared. And if the comparison is between the same value type, both == and === do exactly the same thing, no difference whatsoever.

If the value types being compared are different, the == differs from === in that it allows coercion before the comparison. In other words, they both want to compare values of like types, but == allows type conversions first, and once the types have been converted to be the same on both sides, then == does the same thing as ===. Instead of "loose equality", the == operator should be described as "coercive equality".

Aqui no estoy de acuerdo con el autor, empiezo a notar un intento de alzar a JS a un lugar donde en esta ocasion no corresponde, ya que al hacer un coercion de dos valores puede resultar en problemas a futuro al correr el codigo. Aqui me crea la duda de: es necesario usar === en TS? Una respuesta cruda es si, porque TS ayuda al momento de desarrollo pero no al momento de ejecucion.

Relational comparison operators like <, > (and even <=, >=).

Just like ==, these operators will perform as if they're "strict" if the types being relationally compared already match, but they'll allow coercion first (generally, to numbers) if the types differ.

These relational operators typically use numeric comparisons, except in the case where both values being compared are already strings; in this case, they use alphabetical (dictionary like) comparison of the strings

There's no way to get these relational operators to avoid coercion, other than to just never use mismatched types in the comparisons. That's perhaps admirable as a gaol, but it's still pretty likely you're going to run into a case where the types may differ.

The wiser approach is not to avoid coercive comparisons, but to ebrace and learn their ins and outs.

Coercive comparisons crop up in other places in JS, such as conditionals (if, etc.).

## How We Organize in JS

Two major patterns for organizing code (data and behavior) are used broadly across the JS ecosystem: classes and modules. Thse pattern are not mutually exclusive; many programs can an do use both. Other programs will stick with just one pattern, or even neither.

In some respect, these patterns are ver different. But interestingly, in other ways, they're just different sides of the same coin. Being proficient in JS requires understanding both patterns and where they are appropiate (and not).

### Classes

The terms "object-oriented", "class-oriented", and "classes" are all very loaded full of detail and nuance; they're not universal in definition.

A class in a program is a definition of a "type" of custom data structure that includes both data and behaviors that operate on that data. Classes define how such a data structure works, but classes are not themselves concrete values. To get a concrete value that we can use in the program, a class must be instantiated (with the _new_ keyword) one o more times.

### Modules

The module pattern has essentially the same goal as the class pattern, which is to group data and behavior together into logical units. Also like classes, modules can "include" or "access" the data and behaviors of other modules, for cooperation sake.

But modules have some important differences from classes. Most notably, the syntax is entirely different.

## Classic Modules

ES6 added a module syntax form to native JS syntax, which we'll look at in a moment. But from the early days of JS, modules was an important and common pattern that was leveraged in countless JS programs, even without a dedicated syntax.

There are many factory functions form that are quite common across JS, even in 2022; we may run across these forms in different JS programs: AMD (Asynchronous Module Definition), UMD (Universal Module Definition), and CommonJS (classic Node.js-style modules). The variations, however, are minor (yet not quite compatible). Still, all of these forms rely on the same basic principles.

## ES Modules

ES modules (ESM), introduced to the JS language in ES6, are meant to serve much the same spirit and purpose as the existing classic modules just described, especifically taking into account important variations and use cases from AMD, UMD, and CommonJS.

The implementation approach does, however, differ significantly.

First, there's no wrapping function to define a module. The wrapping context is a file. ESMs are always file-based; one file, one module.

Second, we don't interact with a module's "API" explicitly, but rather use the export keyword to add a variable or method to its public API definition. If something is defined in a module but not exported, then it stays hidden (just as with classic modules).

Third, and maybe most noticeably different from previously discussed patterns, we don't "instantiate" an ES module, we just import it to use its single instance. ESMs are, in effect "singletons", in that there's only ne instance ever created, at first import in our program, and all other imports just receive a reference to that same single instance. If our module needs to support multiple instantiations, we have to provide a classic module-style factory function on our ESM definition for that purpose.

# Chapter 3: Digging to the Root of JS

## Iteration

Programs are essentially built to process data (and make decisions on that data), the patterns used to step through the data have a big impact on the program's readability.

The iterator pattern has been around for decades and suggests a "standardized" approach to consuming data from a source one chunk at a time. The idea is that it's more common and helpful to iterate the data source-to progressively handle the collection of data by processing the first part, then the next, and so on, rather than handling the entire set all at once.

Imagine a data structure that represents a relational database SELECT query, which typically organizes the results as rows. If this query had only one or a couple of rows, we could handle the entire result set at once, and assign each row to a local variable, and perform whatever operations on that data that were appropiate.

But if the query has 100 or 1_000 (or more) rows, we'll need iterative processing to deal with this data.

The iterator pattern defines a data structure called an "iterator" that has a reference to an underlying data source (like the query result rows), which exposes a method like next(). Calling next() returns the next piece of data(i.e., a "record" or "row" from a database query).

We don't always know how many pieces of data that we'll need to iterate through, so the pattern typically indicates completion by some special value or exception once we iterate through the entire set and go past the end.

The importance of the iterator pattern is in adhering to a standard way of processing data iteratively, which creats cleaner and easier to understand code, as opposed to having every data structure/source define its own custom way of handling its own custom way of handling its data.

After many years of various JS community efforts around mutually agreed-upon iteration techniques, ES6 standardized a specific protocol for the iterator pattern directly in the language. The protocol defines a next() method whose return is an object called an iterator result; the object has _value_ and _done_ properties, where _done_ is a boolean that is _false_ until the iteration over the underlying data source is complete.

## Consuming Iterators

With the ES6 iteration protocol in place, it's workable to consume a data source one value at a time, checking after each next() call for _done_ to be _true_ to stop the iteration. But this approach is rather manual, so ES6 also included several mechanisms (syntax and APIs) for standardized consumption of these iterators.

Another mechanism that's often used for consuming iterators is the ... operator. This operator actually has two symmetrical forms: _spread_ and _rest_ (or _gather_). The _spread_ form is an iterator-consumer.

To _spread_ an iterator, we have to have _something_ to spread it into. There are two possibilities in JS: an array or an argument list for a function call.

## Iterables

The iterator-consumption protocol is technically defined for consuming _iterables_; an iterable is a value that can be iterated over.

The protocol automatically creates an iterator instance from an iterable, and consumes _just that iterator instance_ to its completion. This means a single iterable could be consumed more than once; each time, a new iterator instance would be created and used.

Where do we find iterables?

ES6 defined the basic data structure/collection types in JS as iterables. This includes strings, arrays, maps, sets, and others.

A _Map_ data structure uses objects as keys, associating a value of any type with that object. Maps have a different default iteration than seen here, in that the iteration is not just over the map's values but instead its _entries_. An _entry_ is a tuple (2-element array) including both a key and a value.

Each of the built-in iterables in JS expose a default iteration, one which likely matches our intuition. But we can also choose a more specific iteration if necessary.

For the most part, all built-in iterables in JS have three iterator forms available: keys-only (keys()), values-only (values()), and entries (entries()).

Beyond just using built-in iterables, we can also ensure our own data structures adhere to the iteration protocol; doing so means we opt into the ability to consume our data with for ..of loops and the ... operator. "Standardizing" on this protocol means code that is overall more readily recognizable and readable.

## Closure

Perhaps without reallizint it, almows every JS developer has made use of closure. In fact, closure is one of the most pervasive programming functionalities across a majority of languages. It might even be as important to understand as variables or loops; that's ow fundamental it is.

Yet it feels kind of hidden, almost magical. And it's often talked about in either very abstact or very informal terms, which does little to help us nail down exactly what it is.

We need to be able to recognize where closure is used in programs, as the presence or lack of closure is sometimes the cause of bugs (or even the cause of performance issues).

So let's define closure in a pragmatic and concrete way:
Closure is when a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope.

We see two definitional characteristics here. First, closure is part of the nature of a function. Objects don't get closures, functions do. Second, to observer a closure, we must execute a function in a different scope than where that function was originally defined.

Consider:

function greeting(msg) {
return function who(name) {
console.log(`${msg}, ${name}!`)
}
}

var hello = greeting("Hello")
var howdy = greeting("Howdy")

hello("Kyle")
// Hello, Kyle!

hello("Sarah");
// Hello, Sarah!

howdy("Grant")
// Howdy, Grant!

First, the greeting(..) outer function is executed, creating an instance of the inner function who(..); that function closes over the variable _msg_, which is the parameter from the outer scope of greeting(..). When that inner function is returned, its reference is assiigned to the hello variable in the outer scope. Then we call greeting(..) a second time, creating a new inner function instance, with a new closure over a new msg, and return that reference to be assigned to howdy.

When the greeting(..) function finishes running, normally we would expect all of its variables to be garbage collected (removed from memory). We'd expect each msg to go away, but they don't. The reason is closure. Since the inner function instances are still alive (assigned to hello and howdy, respectively), their closures are still preserving the msg variables.

These closures are not a snapshot of the msg variable's value; they are a direct link and preservation of the variable itself. That eans closure can actually observe (or make) updatesto these variables over time.

function counter(step = 1) {
var count = 0

return function increaseCount() {
count = count + step

      return count

}
}

var incBy1 = counter(1)
var incBy3 = counter(3)

incBy1() // 1
incBy1() // 2

incBy3() // 3
incBy3() // 6
incBy3() // 9

Each instance of the inner increaseCount() function is closed over both the count and step variables from its outer counter(..) function's scope. step remains the same over time, but count is updated on each invocation of that inner function. Since closure is over the variables and not just snapshots of the values, these updates are preserved.

Closure is most common when working with asynchronous code, such as with callbacks. Consider:

function getSomeData(url) {
ajax(url, function onResponse(resp) {
console.log(`Response (from ${ url }): ${ resp }`)
})
}

getSomeData("https://some.url/wherever")
// Response (from https:://some.url/wherever): ...

The inner function onResponse(..) is closed over url, and thus preserves and remembers it until the Ajax call returns and excutes onResponse(..). Even though getSomeData(..) finishes right away, the url parameter variable is kept alive in the closure for as long as needed.

It's not necessary that the outer scope be a function -it usually is, but not always- just that there be at least one variable in an outer scope accessed from an inner function:

for (let [idx,btn] of buttons.entries()) {
btn.addEventListener("click", function onClick() {
console.log(`Clicked on button (${idx})!`)
})
}

Because this loop is using let declarations, each iteration gets new block-scoped (aka, local) idx and btn variables; the loop also creates a new inner onClick(..) function each time. That inner function closes over idx, preserving it for as long the click handler is set in the btn. So when each button is clicked, its handler can print its associated index value, because the handler remembers its respective idx variable.

We need to remember: this closure is not over the value (like 1 or 3), but over the variable idx itself.

Closure is one of the most prevalent and important programming patterns in any language. But that's specially true of JS; it's hard to imagine doing anything useful without leveraging closure in one way or another.

## this Keyword

One of JS's most powerful mechanisms is also one of its most misunderstood: the this keyword. One coommon misconception is that a function's this refers to the function itself. Because of how this works in other languages, another misconception is that this points the instance that a method belongs to. Both are incorrect.

As discuessed previously, when a function is defined, it is attached to its enclosing scope via closure. Scope is the set of rules that controls how references to variables are resolved.

But functions also have another characteristic besides their scope that influences what they can access. This characteristic is best described as an _execution context_, and it's exposed to the function via its _this_ keyword.

Scope is static and contains a fixed set of variables available at the moment and location we define a function, but function's execution _context_ is dynamic, entirely dependent on _how it is called_ (regardless of where it is defined or even called from).

this is not a fixed characteristic of a function base on the function's definition, but rather a dynamic characteristic that's determined each time the function is called.

One way to think about the _execution context_ is that it's a tangible object whose properties are made available to a funcion while it executes. Compare that to scope, which can also be though of as an _object_; except the _scope object_ is hidden inside the JS engine, it's always the same for that function, and its properties take the form of identifier variables available inside the function.

function classroom(teacher) {
return function study() {
console.log(
`${ teacher } says to study ${ this.topic }`
)
}
}

var assignment = classrom("Kyle")

The outer classroom(..) function makes no reference to a this keyword, so it's just like any other function we've seen so far. But the inner study() function does reference this, which makes it a this-aware function. In other words it's a function that is dependent on its _execution context_.

The inner study() function returned by classroom("Kyle") is assigned to a variable called assignment. So how can assignment() (aka study()) be called?

assignment()
// Kyle says to study _undefined_ -- Bad bad :(

In this snippet, we call assignment() as a plain, normal function, without providing it any _execution context_.

Since this program is not in strict mode, context-aware functions that are called _without any context specified_ default the context to the global object (window in the browser). As there is no global variable named topic (and thus no such property on the global object), this.topic resoles to undefined.

Now consider:

var homework = {
topic: "JS",
assignment: assignment
}

homework.assignment()
// Kyle says to study JS

A copy of the assignment function reference is set as a property on the homework object, and then it's called as homework.assignment(). That means the this for that function call will be the homework object. Hence, this.topic resolves to "JS".

Lastly:

var otherHomework = {
topic: "Math"
}

assignet.call(otherHomework)
// Kyle says to study Math

A third way to invoke a function is with the call(..) method, which takes an object (otherHomework in this example) to use for setting the this reference for the function call. The property reference this.topic resolves to "Math".

The same context-aware funciton invoked three different ways, gives different answers each time for what object this will reference.

The benefit of this-aware functions-and their dynamyc context-is the ability to more flexibly re-use a single function data from different objects. A function that closes over a scope can never reference a different scope or set of variables. But a function that has dynamic this context can be quite helpful for certain tasks.

## Prototypes

Where _this_ is a characteristic of function execution, a prototype is a characteristic of an object, and specifically resolution of a property access. A prototype is specifically a resolution of a property access.

Think about a prototype as a linkage between two objects; the linkage is hidden behind the scenes, though there are ways to expose and observe it. This prototype linkage occurs when an object is created; it's linked to another object that already exists.

A series of objects linked together via prototypes is called the prototype chain.

The purpose of this prototype linkage (i.e., from an object B to another object A) is so that accesses against B for properties/methods that B does not have, are _delegated_ to A to handle. Delegation of property/method access allows two (or more) objects to cooperate with each other to perform a task.

Consider defining an object as a normal literal:

var homework = {
topic: "JS"
}

The homework object only has a single property on it: topic. However, its default prototype linkage connects to the Object.prototype object, which has common built-in methods on it like toString() and valueOf(), among others.

We can observe this prototype linkage _delegation_ from homweork to Object.prototype:

homework.toString(); // [object Object]

homework.toString() works even though homework doesn't have a toString() method defined; the delegation invokes Object.prototype.toString() instead.

## Object Linkage

To define an object prototype linkage, we can create the object using the Object.create(..) utility:

var homework = {
topic: "JS"
}

var otherHomework = Object.create(homework);

otherHomework.topic; // "JS"

The first argument to Object.create(..) specifies an object to link the newly created object to, and then returns the newly created (and linked) object.

Delegation through the prototype chain only applies for accesses to lookup the value in a property. If we assign to a property of an object, that will appli directly to the object regardless of where that object is prototype linked to.

#### Tip

Object.create(null) creates an object that is not prototype linked anywhere, so it's purley just a standalon object; in some circumstances, that may be preferable.

Consider

homework.topic;
// "JS"

otherHomework.topic;
// "JS"

otherHomework.topic = "Math";
otherHomework.topic;
// "Math"

homework.topic;
// "JS" -- not "Math"

The assignment to topic creates a property of that name directly on otherHomework; there's no effect on the topic property on homework. The next statement then accesses otherHomework.topic, and we see the non-delegated answer from that new property: "Math".

## this Revisited

We covered the this keyword earlier, but its true importance shines when considering how it powers prototype-delegated function calls. Indeed, one of the main reasons this supports dynamic context based on how the function is called is so that method calls on objects which delegate through the prototype chain still maintain the expected this.

Consider:

var homewrok = {
study() {
console.log(`Please study ${ this.topci }`)
}
}

var jsHomework = Object.create(homework)
jsHomework.topic = "JS"
jsHomework.study()
// Please study JS

var mathHomework = Object.create(homework)
mathHomework.topic = "Math"
mathHomework.study()
// Please study Math

The two objects jsHomework and mathHomework each prototype link to the single homework object, which has the study() function. jsHomework and mathHomework are each given their own topic property.

jsHomework.study() delegates to homework.study(), but its this(this.topic) for that execution resolves to jsHomework because of how the function is called, so this.topic is "JS". Similarly for mathHomework.study() delegating to homework.study() but still resolving this to mathHomework, and thus this.topic as "Math".

The preceding code snippet would be far less useful if this was resolved to homework. Yet, in many other languages, it would seem this would be homework because the study() method is indeed defined on homework.

Unlike many other languages, JS's this being dynamic is a critical component of allowing prototype delegation, and indeed class, to work as expected.

# Chapter 4: The Bigger Picture

## Pillar 1: Scope and Closure

The organization of variables into units of scope (functions, blocks) is one of the most foundational characteristic of any language; perhaps no other characteristic has a greater impact on how programs behave.

Scopes are like buckets, and variables are like marbles you put into those buckets. The scope model of a language is like the rules that help us determine which color marbles go in which matching-color buckets.

Scope nest inside each other, and for any given expression or statement, only variables at the level of scope nesting, or in higher/outer scopes, are accessible; variables from lower/inner scopes are hidden and inaccessible.

This is how scopes behave in most languages, which is called lexical scope. The scope unit boundaries, and how variables are organized in them, is determined at the time the program is parsed (compiled). In other words, it's an author-time decision: where we locate a function/scope in the program determines what the scope structure of that part of the program will be.

JS is lexically scoped, though many claim it isn't, because of two particular characteristics of its model that are not present in other lexically scoped languages.

The first is commonly called _hoisting_: when all variables declared anywhere in a scope are treated as if they're declared at the beginning of the scope. The other is that var-declared variables are function scoped, even if they appear inside a block.

Neither hoisting nor function-scoped var are sufficient to back the claim that JS is not lexically scoped. let/const declarations have a peculiar error behavior called the "Temporal Dead Zone" (TDZ) which results in observable but unusable variables. Though TDZ can be strange to encounter, it's also not an invalidation of lexical scoping. All of these are just unique parts of the language that should be learned and understood by all JS developers.

Closure is a natural result of lexical scope when the language has functions as first-class values, as JS does. When a function makes reference to variables from an outer scope, and that function is passed around as a value and executed in other scopes, it maintains access to its original scope variables; this is closure.

Across all of programming, but especially in JS, closure drives many of the most important programming patterns, including modules.

## Pillar 2: Prototytpes

The second pillar of the language is the prototypes system.

JS is one of very few languages where we have the option to create objects directly and explicitly, without first defining their structure in a class.

For many years, people implemented the class design pattern on top of prototypes-so-called "prototypal inheritance" and then with the advent of ES5's class keyword, the language doubled-down on its inclination toward OO/class-style programming.

But I think that focus has obscured the beauty and power of the prototype system: the ability for two objects to simply connect with each other and cooperate dynamically (during function/method execution) through sharing a this context.

Classes are just one pattern we can build on top of such power. But another approach, in a very different direction, is to simply embrace objects as objects, forget classes altogether, and let objects cooperate through the prototype chain. This is called _behavior delegation_. I think delegation is more powerful than class inheritance, as a means for organizing behavior and data in our programs.

But class inheritance gets almost all the attention. And the rest goes to functional programming, as the sort of "anti-class" way of designing programs.

## Pillar 3: Types and Coercion

The vast majority of developers have strong misconceptions about how types work in programming languages, and especifically how they work in JS. A tidal wave of interest in the broader JS community has begun to shift to "static typing" approaches, using type-aware tooling like TypeScript.

Arguably, this pillar is more important than the other two, in the sense that no JS program will do anything useful if it doesn't properly levarage JS's value types, as well as the conversion (coercion) of values between types.

Even if we love TypeScript we are not going to get the most out of those tools or coding approaces if we aren't deeply familiar with how the language itself manages value types.

# Appendix A: Exploring Further

## Values vs. References

In many languages, the developer can choose between assigning/passing a value as the value itself, or as a reference to the value. In JS, however, this decision is entirely determined by the kind of vale. That surprises a lot of developers from other languages when they start using JS.

References are the idea that two or more variables are pointing at the same value, such that modifying this shared value would be reflected by an access via any of those references. In JS, only object values are treated as references.

JS chooses the value-copy vs. reference-copy behavior based on the value type. Primitives are held by value, objects are held by reference. There's no way to override this in JS, in either direction.

## So Many Function Forms

There is this code:

var awesomeFunction = function(coolThings) {
// ..
return amazingStuff;
}

That expression is referred to as an anonymous function expression, since it has no name identifier between the function keyword and the (..) parameter list. This point confuses man JS developers because as of ES6, JS performs a "name inference" on an anonymous function.

If there's no identifier between the keyword _function_ and the _parameters list ()_ then we have an anonymous function.

The _name_ property of a function will reveal either its directly given name (in the case of a declaration) or its inferred name in the case of an anonymous function expreession. That value is generally used by developer tools when inspecting a function value or when reporting an error stack trace.

So even an anonymous function expression might get a name. However, name inference only happens in limited cases such as when the function expression is assigned (with =). If we pass a function expression as an argument to a function call, for example, no name inference occurs; the _name_ property will be an empty string, and the developer console will usually report "(anonymous function)".

Even if a name is inferred, it's still an anonymous function. Why? Because the inferred name is a metadata string value, not an available identifier to refer to the function. An anonymous function doen't have an identifier to use to refer to itself from inside itself for recursion, event unbidngin, etc.

Compare the anonymous function expression form to:

var awesomeFunction = function someName(coolThings) {
// ..
return amazingStuff;
}

This function expression is a _named function expression_, since the identifier someName is directly associated with the function expression at compile time; the association with the identifier awesomeFunction still doesn't happen until runtime at the time of that statement. Those two identifiers don't have to match; sometimes it makes sense to have them be different, other times it's better to have them be the same.

Notice also that explicit function name, the identifier _someName_, takes precedence when assigning a _name_ for the _name_ property.

Should function expressions be named or anonymous? Opinions vary widely on this. Most developers tend to be unconcerned with using anonymous functions. They're shorter, and unquestionably more common in the broad sphere of JS code out there.

Here are some more declaration forms:

// generator function decalaration
function \*two() { .. }

// async function declaration
async function three() { .. }

// async generator function declaration
async function \*four() { .. }

// named function export declaration (ES6 modules)
export function five() { .. }

Here are some more of the (many) function expression forms:

// IIFE (Inmediately Invoked Function Expression)
(function(){ .. })()

// asynchronous IIFE
(async function() { .. })()
(async function namedAIIFE(){ .. })()

// arrow function expresions
var f
f = () => 42;
f = x => x _ 2;
f = (x) => x _ 2;
f = (x, y) => x _ y;
f = x => ({ x: x _ 2})
f = x => { return x _ 2}
f = async x => {
var y = await doSomethingAsync(x)
return y _ 2
}
someOperation( x => x \* 2 )

Keep in mind that arrow function expressions are synctactically anonymous, meaning the syntax doesn't provide a way to provide a direct name identifier for the function. The function expression may get an inferred name, but only if it's one of the assingments forms, not in the (more common) form of being passed as a function call argument (as in the last line of the snippet).

Arrow functions has a specific purpose (i.e., handling the this keyword lexically), but that doesn't mean we should use it for every function we write.

## Coercive Conditional Comparison

if and ? :-ternary statements, as well as the test clauses in while and for loops, all perform an implicit value comparison. But what sort? Is it "strict" or "coercive"? Both.
