## Introduction to Async Await

Async/Await is syntactic sugar and it simplifies the way we work with promises, async/await lets us write code that looks like synchronous code but that takes advantage of asyncrhonisity.

When async is used in a function it forces that function to return a promise, if that function already returns a value, then that value is wrapped in a promise. If no value is returned, the function still get transforms into a promise

We use async to use await. It can only be used inside an async function. It waits for a promise. It causes the async function to pause.

Async/await is not necessarily more performant than original promises. A small rule of thumb is to create our async/await functions small.

async before a function statement does not make code asynchronously. async await is a pattern that allows us to manage and work with asynchronous code.
