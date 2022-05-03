var userInput;
var userName;
userInput = "Max";
userInput = 5;
if (typeof userInput === "string") {
    userName = userInput;
}
function generateError(message, code) {
    throw {
        message: message,
        errorCode: code
    };
}
generateError("An error occurred", 500);
