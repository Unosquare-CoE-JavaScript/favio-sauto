## Synchronous Code VS Asynchronous Code

Synchronous code is what is written by default when we write JavaScript. It means that one piece of code executes and must finish before the next piece of code can start. It goes in order.

Asynchronous code allows other parts of the code to execute and run while we are waiting and still be able to deal with a response.

### Advantages and Disadvaßntages

Synchronous Code:

- Easy to write and to reason about

* May create blocking code
* Less performant

Asynchronous Code:

- Very performant
- Eliminates code blocking

* Difficult to reason about
* Harder to write

## The Event Loop

In order JS achieves asynchronous coding it makes use of callbacks, the environment performs an operation like setTimeOut providing a callback function and then moves on to do something else. When the operation has been completed a message is queued along with the provider callback function at some point in the future the message is dequeued and the callback function is fired and executed.

The event loop is important in making this happen, it continuosly checks for queued messages and takes care of the next one in line. It is through the event loop that asynchronisity is achieved. The purpose of the event loop is to make sure that all the code is handled. JS is a single threaded environment, we can only execute one piece of code at a time, but the event loop makes it possible to achieve asynchronicity because we are able to set code aside such as a callback that was created by setTimeOut set that aside and then the event loop will check for that and make sure that it gets taking care of when its time to execute that.

The event loop is key in making asynchronicity available, as things are added to its queues it keeps going around and making sure that those things are handled and by putting them into a queue that is part of the event loop, instead of taking care of them right away, it allows the JS engine to do other things.
