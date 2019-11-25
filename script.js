let result = document.getElementById('result');
let clipboard = document.getElementById('clipboard');

let lengthEl = document.querySelector('.password-length');
let uppercaseEl = document.querySelector('.uppercase--letters');
let lowercaseEl = document.querySelector('.lowercase--letters');
let numbersEl = document.querySelector('.numbers');
let symbolsEl = document.querySelector('.symbols');
let generateEl = document.querySelector('#Generate');


const randomFunc = {
    lower : getRandomLower,
    upper : getRandomUpper,
    number : getRandomNumber,
    symbol : getRandomSymbol
};

generateEl.addEventListener('click',()=>{
    const length = lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // console.log(length,hasUpper,hasLower,hasNumber,hasSymbol);

    result.innerText = generatePassword(length,hasUpper,hasLower,hasNumber,hasSymbol);
})

// Copy Password to clipboard

clipboard.addEventListener('click',()=>{
    const textarea = document.createElement('textarea');
    const password = result.innerText;

    if(!password) { return; }

    textarea.value = password;
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password Copied to Clipboard');

});

function generatePassword(length,upper,lower,number,symbol){
    // 1. Init pw var 
    let generatedPassword = "";

    const typescount = upper + lower + number + symbol;
    // console.log(typescount);


    // 2. Filter out unchecked types
    const typesArray = [{lower},{upper},{number},{symbol}].filter(item => Object.values(item));

    // console.log('typesArray :- ',typesArray);

    if(typescount === 0){
        return '';
    }

    // 3. Loop over length call generator function for each type
    for(let i = 0; i < length;  i+= typescount){
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];

            // console.log('funcName :- ',funcName);

            generatedPassword += randomFunc[funcName]();
        })
    }
    
    // 4. Add final password to password var and return
    const finalPassword = generatedPassword.slice(0,length);
    return finalPassword;  
}

// Random Generator functions

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}
