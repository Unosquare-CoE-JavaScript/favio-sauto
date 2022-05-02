//Create a function that will retrieve the posts from the jsonplaceholder site (https://jsonplaceholder.typicode.com/posts). Set up the function so you can pass in the userID and the function will assign only the posts for that user to a variable. The data should be stored in an array.

async function retrievePostsByID(id) {
  try {
    if (id > 10 || id < 1) {
      throw Error("User not found");
    }

    if (isNaN(id)) {
      throw Error("You must pass in a number.");
    }

    const url = "https://jsonplaceholder.typicode.com/posts";

    const posts = await fetch(url).then((posts) => posts.json());
    const postsByUserID = posts.filter((post) => post.userId === id);

    console.log(postsByUserID.length > 0 ? postsByUserID : "User not found");

    return postsByUserID;
  } catch (error) {
    console.log(error);
  }
}
