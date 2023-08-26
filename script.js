const passwordLengthSlider = document.getElementById("length-slider");
const passwordLength = document.getElementById("lenght");
const copyBtn = document.getElementById("copy-btn");
const generateBtn = document.getElementById("btn");
const passwordGenrated = document.getElementById("password-genrated");
const copyMessage = document.getElementById("copy-message");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const lowerCaseChar = document.getElementById("lowercase");
const uperCasecChar = document.getElementById("upercase");
const numberChar = document.getElementById("number");
const specialCaseChar = document.getElementById("special");

//  variable initilization
let currentPasswordLength = 8;
const symbolList = "~`!@#$%^&*()_-+={[}]|:;'<,>.?/";
var passowrd = "";
var checkCount = 0;

handleSlider();

/*
function declearation
*/

// set password length
function handleSlider() {
    passwordLengthSlider.value = currentPasswordLength;
    passwordLength.innerHTML = currentPasswordLength;
}

passwordLengthSlider.addEventListener("input", (e) => {
    currentPasswordLength = e.target.value;
    handleSlider();
});

// get random int
function getRandomInt(min, max) {
    let rand = Math.random();
    let x = Math.floor(rand * (max - min) + min);
    console.log("rand is " + rand + " and random " + x);
    return x;
}

// get random number
function getRandomNumber() {
    return getRandomInt(0, 9);
}

// get lower case
function getLowerCase() {
    console.log("char is " + String.fromCharCode(getRandomInt(97, 123)));
    return String.fromCharCode(getRandomInt(97, 123));
}

// get uper case
function getUperCase() {
    let temp = String.fromCharCode(getRandomInt(65, 95));
    console.log("char is " + temp);
    return String.fromCharCode(getRandomInt(65, 95));
}
// get symbols
function getSymbols() {
    var index = getRandomInt(0, symbolList.length);
    console.log("ww " + index);
    return symbolList.charAt(index);
}

// get password strength
function calculatePasswordStrength(password) {
    const lengthScore = Math.min(password.length / 8, 1); // Normalize length to a score between 0 and 1

    // Check for character types
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialCharacters = /[\W_]/.test(password);

    const characterTypes = [
        hasUppercase,
        hasLowercase,
        hasNumbers,
        hasSpecialCharacters,
    ];
    const characterTypeScore = characterTypes.filter(Boolean).length / 4;

    // Calculate overall strength score
    const strengthScore = (lengthScore + characterTypeScore) / 2;

    // Map the strength score to a descriptive label
    let strengthLabel = "Weak";
    if (strengthScore > 0.6) {
        strengthLabel = "Strong";
    } else if (strengthScore > 0.3) {
        strengthLabel = "Moderate";
    }

    return {
        score: strengthScore,
        label: strengthLabel,
    };
}

// copy password
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordGenrated.value);
        copyMessage.innerHTML = "copied";
    } catch {
        copyMessage.innerHTML = "failed";
    }

    // make copy span visible
    copyMessage.checkVisibility.classList.add("active");

    // 2s time interval
    setTimeout(() => {
        copyMessage.classList.remove("active");
    }, 2000);
}

copyBtn.addEventListener("click", () => {
    if (passwordGenrated.value) copyContent();
});

// checkbox
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) checkCount++;
    });

    console.log("checkbox " + checkCount);
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange);
});

// shuffel password
function shuffelPassword(array) {
    let i = array.length;
    while (--i > 0) {
        let temp = Math.floor(Math.random() * (i + 1));
        [array[temp], array[i]] = [array[i], array[temp]];
    }

    var str = "";

    array.forEach((e) => {
        str += e;
    });

    return str;
}

// generate password
generateBtn.addEventListener("click", () => {
    passowrd = "";

    if (checkCount == 0) return;

    let functionArr = [];

    if (uperCasecChar.checked) {
        functionArr.push(getUperCase());
    }
    if (lowerCaseChar.checked) {
        functionArr.push(getLowerCase());
    }
    if (numberChar.checked) functionArr.push(getRandomNumber());

    if (specialCaseChar.checked) functionArr.push(getSymbols());

    // compulsory additions
    for (let i = 0; i < functionArr.length; i++) {
        passowrd += functionArr[i];
    }

    // compulsory additions
    for (let i = 0; i < currentPasswordLength - functionArr.length; i++) {
        var index = getRandomInt(0, functionArr.length);

        passowrd += functionArr[index];
    }

    // shuffel
    passowrd = shuffelPassword(Array.from(passowrd));

    // set password
    passwordGenrated.value = passowrd;

    // Example usage
    const password = passowrd;
    const strength = calculatePasswordStrength(password);
    console.log(`Password strength: ${strength.label}`);
    console.log(`Strength score: ${strength.score}`);
    
    console.log("password is " + passowrd);
});
