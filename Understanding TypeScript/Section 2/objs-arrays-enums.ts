enum ROLE {
  AUTHOR = 0,
  ADMIN = 1,
  READONLY = 2,
}

const person = {
  name: "Favio",
  age: 23,
  hobbies: ["Reading", "Videogames"],
  role: ROLE.AUTHOR,
};

let favoriteActivities: string[];
favoriteActivities = ["Sports"];

console.log(person);

for (const hobby of person.hobbies) {
  console.log(hobby);
}
