## Understanding Javascript callbacks

A callback is just a function that is invoked or called after something else happens. Wether or not the function runs depends entirely on something else happening, not simply the running of the program. In JS this is achieved by passing a function into another function and then the funtion that we passed in is called back executed after something else has occurred.

This is posible because JS supports higher order functions.

A very common use of callbacks are event listeners.

A callback does not necessarily make the code asynchronous. To make a code asynchronous we need to take advantage of the evet loop by placing a message in the message queue with the associated callback. Events take advantage of that, setTimeout, setInterval among other web apis take advantage of that.

## Problems with Callbacks

- Callback hell
- Difficult to reason about
- Inversion of control
