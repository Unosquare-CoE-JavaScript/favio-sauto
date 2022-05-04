interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn = (a: number, b: number) => +a + +b;

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;

  constructor(name?: string) {
    if (name) this.name = name;
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name || "a Person"} from a class`);
  }
}

let user1: Person;

user1 = new Person();

user1.greet("Hi, there - I'm");
