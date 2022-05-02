## Introduction to Generators

Generators have been around longer than async await. A generator is a way to write code that we can pause and then continue at a later time. A generator is a function that we can use to cause the code to yield and the code won't continue until we tell it to at some later time.

When we yield or pause the code it doesn't hold up code that may be elsewhere. It simply pauses at the yield line in the generator function. A more technical description is that we start a generator function and then we can exit that function before it runs all the code. Later we can reenter that function at the point where we exited it.

## Understanding Generators

Setting up a generator involves two main parts. We must first define a function as a generator function, this requires the use of the asterisk character. The second part requires the use of the yield keyword (inside of the generator function) at the point we want the function to pause.
