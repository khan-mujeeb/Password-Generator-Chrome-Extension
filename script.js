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

const strengthPb = document.getElementById("strength");

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

    // 0.25 * 9  = 2.25 + 0
    let x = Math.floor(rand * (max - min) + min);
    console.log(
        "rand is " + rand + " and random " + x + " min " + min + " max " + max
    );
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
    var temp = String.fromCharCode(getRandomInt(65, 91));
    console.log("char is " + temp);
    return temp;
}
// get symbols
function getSymbols() {
    var index = getRandomInt(0, symbolList.length);
    console.log("ww " + index);
    return symbolList.charAt(index);
}

// get password strength
function calculatePasswordStrength(password) {
    let percentage = 0;
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?~]/;
    const ownWeight = 20;
    
    if (/\d/.test(password)) {
        percentage += ownWeight;
    }
    if (/.*[a-z].*/.test(password)) {
        percentage += ownWeight;
    }
    if (/.*[A-Z].*/.test(password)) {
        percentage += ownWeight;
    }
    if (specialChars.test(password)) {
        percentage += ownWeight;
    }
    if (password.length >= 8) {
        percentage += ownWeight;
    }

    return {
        score: percentage/100,
        label: ""
    }
}

// Driver code
const input_password = "GeeksforGeeks!@12";
const passwordStrengthPercentage = calculatePasswordStrength(input_password);
console.log(`Password strength percentage: ${passwordStrengthPercentage}`);


// copy password
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordGenrated.value);
        copyMessage.innerHTML = "copied";
    } catch {
        copyMessage.innerHTML = "failed";
    }

    // make copy span visible
    copyMessage.classList.add("active");

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

    if (checkCount == 0) {
        passwordGenrated.value = passowrd;
        return;
    }

    let functionArr = [];

    if (uperCasecChar.checked) {
        functionArr.push(getUperCase);
    }
    if (lowerCaseChar.checked) {
        functionArr.push(getLowerCase);
    }
    if (numberChar.checked) functionArr.push(getRandomNumber);

    if (specialCaseChar.checked) functionArr.push(getSymbols);

    console.log("compulsory");
    // compulsory additions

    console.log(functionArr);
    for (let i = 0; i < functionArr.length; i++) {
        var ll = functionArr[i]();
        console.log("kya generate huaa " + ll);
        passowrd += ll;
    }

    // function arr
    console.log("bacha huaa");
    // compulsory additions
    for (let i = 0; i < currentPasswordLength - functionArr.length; i++) {
        var index = getRandomInt(0, functionArr.length);
        console.log("bacha huaa index of function " + index);
        var qq = functionArr[index]();
        console.log(" generate huaa " + qq);
        passowrd += qq;
    }

    // shuffel
    passowrd = shuffelPassword(Array.from(passowrd));

    // set password
    passwordGenrated.value = passowrd;

    // Example usage
    const password = passowrd;
    const strength = calculatePasswordStrength(password);
    console.log(`Password strength: ${strength.label}`);
    console.log(`Strength score: ${strength.score * 100}`);

    var abc = strength.score * 100;

    strengthPb.value = abc
    // progressBarValue.style.backgroundColor = "blue";
    console.log("password is " + passowrd);

    if (abc == 100) {
        strengthPb.style.setProperty("--webkit-progress-value-background", "blue");
    } else if (abc >= 60) {
        strengthPb.style.setProperty("--webkit-progress-value-background", "greenyellow");
    } else if (abc >= 30) {
        strengthPb.style.setProperty("--webkit-progress-value-background", "lightsalmon");
    } else {
        strengthPb.style.setProperty("--webkit-progress-value-background", "crimson");
    }
    
});
