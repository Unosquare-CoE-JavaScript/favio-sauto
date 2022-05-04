"use strict";
let add = (a, b) => +a + +b;
class Person {
    constructor(name) {
        if (name)
            this.name = name;
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name || "a Person"} from a class`);
    }
}
let user1;
user1 = new Person();
user1.greet("Hi, there - I'm");
//# sourceMappingURL=app.js.map