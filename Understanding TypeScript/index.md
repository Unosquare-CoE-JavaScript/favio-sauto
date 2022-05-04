Typescript is a superset to Javascript, basically a programming language which actually builds up on Javascript, it takes Javascript to the next level. With Typescript (TS) we can write less error prone, better and cleaner code.

TypeScript takes the JavaScript language and adds new features and advantages to it.

The disadvantage of typescript is that it can't be executed by JavaScript environments like the browsers or and environment like node or deno.

TS is a powerful compiler which we run over our code to compile our typescript code to JS.

The TS compiler compiles these new features to JavaScript workarounds. It gives us a nicer syntax and easier ways of doing something.

More than anything TS is a developer tool not the end goal.

## TypeScript Overview

TypeScript adds:

- Types
- Next-gen Javascript features (compiled down for older browsers)
- Non-javascript features like interfaces or generics
- Rich Configuration Options
- Modern Tooling that helps even in non-typescript projects

## Core Types

- number (All numbers, no differentiation between integers or floats)
- string (All text values)
- boolean (Just true or false, no "truthy" or "falsy" values)
- object (Any JS object, more specific types (type of object) are possible)
- Array (Any JS array, type can be flexible or strict (regarding the element types))
- Tuple (Added by Typescript: Fixed-length array)
- Enum (Added by TS: Automatically enumerated global constant identifiers)
- Any (Any kind of value, no specific tpe assignment)

Typescript can also use a feature named type inference that allows it to know the type of a value assigned to a variable. But it needs to be an assignation.

The difference between unknown and any is that when we assign a variable unknown to another variable this throws us an error while with any type this does not happen.

never type can be used for error handling with "throw" keyword or infinite loops (very rarely)

## Classes

TypeScript is great for Object-Oriented Programming

## Interfaces vs Types

Only interfaces can be used to describe the structure of an object, and while "type" is more flexible, interfaces are clearer.

Interface can be used as a contract a class then has to adhere to.

## Intersection types

This is mainly used to combine existing object types. And it is defined using the & operator.

## Types Guard

Is just a term that describes the idea or approach of checking if a certain property or method exists before we try to use it, or if we can do something with the type before we try to use it for objects that can be done with instance of or with in

## Discriminated Union

It's a pattern that we can use when working with union types that makes implementing type guards easier, it is available when we work with object types.
