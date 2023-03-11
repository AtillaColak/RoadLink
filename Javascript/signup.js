const numbers = "0123456789";
const symbols = "~`!@#$%^&*()_-+={}[]|:;<>,.?/";
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
// not cool

function validateForm() {
    // If all validation checks pass, submit the form
    return validateUserId() && validatePassword() && validateFullName() && validateEmail() && validateZip() && validateLanguage() && validateSex() && validateCountry;
}

function validateUserId() {
    // this line get the values in the tag according to the id    
    const userid = document.getElementById("userid").value;
    // this line get the empty paragraph tag to put the error messages below according to the conditions
    let userIdMessage = document.getElementById("useridMessage");
    const inputLength = userid.length;
    let endCorrect = false;
    const numbersAndSymbols = numbers + symbols;
    for(i = 0; i < numbersAndSymbols.length; i++) {
        if(userid.endsWith(numbersAndSymbols[i])) {
            endCorrect = true;
        }
    }
    if(inputLength == 0) {
        userIdMessage.innerHTML = "UserID cannot be empty!";
        return false;
    }
    if(inputLength < 5) {
        userIdMessage.innerHTML = "Too short!";
        return false;
    }
    if(inputLength > 12) {
        userIdMessage.innerHTML = "Too long!";
        return false;
    }
    if(userid.charAt(0) != userid.charAt(0).toUpperCase() || !endCorrect) {
        userIdMessage.innerHTML = "UserID must start with a capital letter and end with a number or special character!";
        return false;
    } else {
        userIdMessage.innerHTML = "Looks good!";
        return true;
    }
}

function validatePassword() {
    // this lines get the values in the tag according to the id    
    const password = document.getElementById("password").value;
    // this line get the empty paragraph tag to put the error messages below according to the conditions
    let passwordMessage = document.getElementById("passwordMessage");
    const name = document.getElementById("name").value;
    const passwordLength = password.length;
    let containsUpperLetters = false;
    const numbersAndSymbols = numbers + symbols;
    for(letter of upperLetters) {
        if(password.includes(letter)) {
            containsUpperLetters = true;
        }
    }
    let containsLowerLetters = false;
    for(letter of lowerLetters) {
        if(password.includes(letter)) {
            containsLowerLetters = true;
        }
    }
    let containsNumber = false;
    for(number of numbers) {
        if(password.includes(number)) {
            containsNumber = true;
        }
    }
    let containsSymbol = false;
    for(symbol of numbersAndSymbols) {
        if(password.includes(symbol)) {
            containsSymbol = true;
        }
    }
    if(password.includes(name) && name.length > 0) {
        passwordMessage.innerHTML = "Password cannot contain your name!";
        return false;
    }
    if(passwordLength == 0) {
        passwordMessage.innerHTML = "Password cannot be empty!";
        return false;
    }
    if(passwordLength < 12) {
        passwordMessage.innerHTML = "Too short!";
        return false;
    }
    if(!containsUpperLetters || !containsNumber || !containsSymbol || !containsLowerLetters) {
        passwordMessage.innerHTML = "Password must be at least 12 characters long and include a combination of uppercase letters, lowercase letters, numbers, and symbols.";
        return false;
    } else if(passwordLength < 14) {
        passwordMessage.innerHTML = "That's good! But a password of at least 14 characters is better than a password of " + passwordLength + " characters!";
        return true;
    } else {
        passwordMessage.innerHTML = "Looking good!";
        return true;
    }
}

function validateFullName() {
    // this lines get the values in the tag according to the id    
    const name = document.getElementById("name").value;
    // this line get the empty paragraph tag to put the error messages below according to the conditions
    let fullNameMessage = document.getElementById("fullNameMessage");
    const letters = upperLetters + lowerLetters;
    let containLetters = true;
    for(char of name) {
        if(!letters.includes(char)) {
            containLetters = false;
        }
    }
    if(name.length == 0) {
        fullNameMessage.innerHTML = "Full name must not be empty!";
        return false;
    }
    if(!containLetters) {
        fullNameMessage.innerHTML = "Full name must only contain alphabets!";
        return false;
    } else {
        fullNameMessage.innerHTML = "Looks good!";
        return true;
    }
}

function validateEmail() {
    // this lines get the values in the tag according to the id    
    let email = document.getElementById("email").value;
    // this line get the empty paragraph tag to put the error messages below according to the conditions
    let emailMessage = document.getElementById("emailMessage");
    const numbersAndLetters = numbers + upperLetters + lowerLetters;
    if(email.length == 0) {
        emailMessage.innerHTML = "Email must not be empty!";
        return false;
    }
    const indexOfAtSymbol = email.indexOf("@");
    if(indexOfAtSymbol == -1) {
        emailMessage.innerHTML = "Invalid email!";
        return false;
    }
    const prefix = email.slice(0, indexOfAtSymbol);
    const allowedSymbols = "_.-";
    const notAllowedSymbols = "~`!@#$%^&*()+={}[]|:;<>,?/";
    let isValidPrefix = true;
    // Acceptable email prefix formats
    // Allowed characters: letters (a-z), numbers, underscores, periods, and dashes.
    // An underscore, period, or dash must be followed by one or more letter or number.
    const domain = email.slice(indexOfAtSymbol + 1, email.length);
    let isValidDomain = true;
    const allowedCharacters = upperLetters + lowerLetters + numbers + "-";
    const periodIndex = domain.indexOf(".");
    const firstDomainPart = domain.slice(0, periodIndex);
    const lastDomainPart = domain.slice(periodIndex + 1, email.length);
    // Allowed characters: letters, numbers, dashes.
    // The last portion of the domain must be at least two characters, for example: .com, .org, .cc
    //source: https://help.xmatters.com/ondemand/trial/valid_email_format.htm#:~:text=A%20valid%20email%20address%20consists,com%22%20is%20the%20email%20domain.
    for(i = 0; i < prefix.length; i++) {
        if(notAllowedSymbols.includes(prefix[i]) || (allowedSymbols.includes(prefix[i]) && (i == prefix.length - 1 || !numbersAndLetters.includes(prefix[i+1])))) {
            isValidPrefix = false;
        }
    }
    if(periodIndex == -1 || lastDomainPart.length < 2) {
        emailMessage.innerHTML = "Invalid email!";
        return false;
    }
    for(char of firstDomainPart) {
        if(!allowedCharacters.includes(char)) {
            isValidDomain = false;
        }
    }
    if(!isValidPrefix || !isValidDomain) {
        emailMessage.innerHTML = "Invalid email!";
        return false;
    } else {
        emailMessage.innerHTML = "Looks good!";
        return true;
    }
}

function validateZip() {
    // this lines get the values in the tag according to the id    
    const zip = document.getElementById("zip").value;
    // this line get the empty paragraph tag to put the error messages below according to the conditions
    let zipMessage = document.getElementById("zipMessage");
    //regex pattern for zip code according to the requirements in the assignment
    if(zip.length != 6) {
        zipMessage.innerHTML = "Zip code must be 6 characters long!";
        return false;
    }
    const zipNumber = zip.slice(0, 4);
    const zipLetter = zip.slice(4, 6);
    let isFirstFourNumbers = true;
    let isEndWithLetters = true;
    const letters = upperLetters + lowerLetters;
    for(char of zipNumber) {
        if(!numbers.includes(char)) {
            isFirstFourNumbers = false;
        }
    }
    for(char of zipLetter) {
        if(!letters.includes(char)) {
            isEndWithLetters = false;
        }
    }
    if(!isFirstFourNumbers || !isEndWithLetters) {
        zipMessage.innerHTML = "Zip code must start with 4 numbers and end with 2 letters!";
        return false;
    } else {
        zipMessage.innerHTML = "Looks good!";
        return true;
    }
}

function validateLanguage() {
    // this lines get the values in the tag according to the id    
    let language = document.getElementById("language").value;
    // this line get the empty paragraph tag to put the error messages below according to the conditions
    let languageMessage = document.getElementById("languageMessage");
    if(language == "default") {
        languageMessage.innerHTML = "Please choose a language!";
        return false;
    } else {
        languageMessage.innerHTML = "Looks good!";
        return true;
    }
}

function validateSex() {
    // this lines get the values in the tag according to the id    
    let sex = document.getElementById("sex").value;
    // this line get the empty paragraph tag to put the error messages below according to the conditions
    let sexMessage = document.getElementById("sexMessage");
    if(sex == "default") {
        sexMessage.innerHTML = "Please choose a gender type!";
        return false;
    } else {
        sexMessage.innerHTML = "Looks good!";
        return true;
    }
}

function validateCountry() {
    // this lines get the values in the tag according to the id    
    let country = document.getElementById("country").value;
    // this line get the empty paragraph tag to put the error messages below according to the conditions
    let countryMessage = document.getElementById("countryMessage");
    if(country == "default") {
        countryMessage.innerHTML = "Please choose a country!";
        return false;
    } else {
        countryMessage.innerHTML = "Looks good!";
        return true;
    }
}

















