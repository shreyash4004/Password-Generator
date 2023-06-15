const inputSlider=document.querySelector("[data-lengthSlider]")
const lengthDisplay=document.querySelector("[data-lengthNumber]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolsCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const genereteBtn=document.querySelector(".generateBtn");
const allCheck=document.querySelectorAll("input[type=checkbox]");
const symbols='!@#$%^&*{;?<>:';
let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();

//set strength circle color to grey
setIndicator("#f0ffff");

//set pAssword Lenght
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=inputSlider.value;
    const min=inputSlider.min;
    const max=inputSlider.max;
    console.log(min)
    console.log(max);
    
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min)) + "% 100%";
}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;


    //Shadow
}

function getRndInteger(min,max){
    return Math.floor (Math.random() * (max-min))+min
}
function generateRandomnumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
     return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbols(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calStrength(){
let hasupper=false;
let haslower=false;
let hasnumber=false;
let hassym=false;

if(uppercaseCheck.checked) hasupper=true;
if(lowercaseCheck.checked) haslower=true;
if(numberCheck.checked) hasnumber=true;
if(symbolsCheck.checked) hassym=true;

if(hasupper && haslower && (hasnumber || hassym) && passwordLength >= 8){
    setIndicator("#00d42a");
}
else if( (haslower || hasupper) && (hasnumber || hassym) && passwordLength >= 6){
    setIndicator("#ff0");
}
else{
    setIndicator("#f00");
}
}

async function copyContent(){

    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }catch(e){
        copyMsg.innerText="Failed"
    }
    copyMsg.classList.add("active");
    
    setTimeout(() => {
        copyMsg.classList.remove("active")
        
    }, 2000);
    
}

function shufflePassword(array){
    //fisher Yates MEthod
    for(let i= array.length-1;i>0;i--){
        const j=Math.floor(Math.random() * (i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str= "";
    array.forEach((el) => (str+= el));
    return str;
      
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheck.forEach((checkbox) => {
        
        if(checkbox.checked){
            checkCount++;
        }
    });

    //special condition
    if(passwordLength < checkCount){
        passwordLength =checkCount;
        handleSlider();
    }
}

allCheck.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange)
})

inputSlider.addEventListener('input',(e) => {
passwordLength=e.target.value;
handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value){
        copyContent();
    }
})

genereteBtn.addEventListener('click',() =>{
 //none of th checkbox are selected

 if(checkCount == 0){
    return;
 }


 if(passwordLength < checkCount){
    passwordLength =checkCount;
    handleSlider();
   
 }
 //lets start journey 
 
//  if(uppercaseCheck.checked){
//     password+=generateUpperCase
//  }
//  if(lowercaseCheck.checked){
//     password+=generateLowerCase
//  }
//  if(numberCheck.checked){
//     password+=generateRandomnumber
//  }
//  if(uppercaseCheck.checked){
//     password+=generateSymbols
//  }

password="";
 let funArr=[];
 if(uppercaseCheck.checked){
    funArr.push(generateUpperCase)
 }
 if(lowercaseCheck.checked){
    funArr.push(generateLowerCase)
 }
 if(symbolsCheck.checked){
    funArr.push(generateSymbols)
 }
 if(numberCheck.checked){
    funArr.push(generateRandomnumber)
 }

 for(let i=0;i<funArr.length;i++){
password+=funArr[i]();
 }
 
 console.log("addition")


 for(let i=0;i<passwordLength-funArr.length;i++){
    let randIndex=getRndInteger(0,funArr.length-1)
    password+=funArr[randIndex]();

 }
 console.log("remaining addition")
 password=shufflePassword(Array.from(password));
 //show in ui
 passwordDisplay.value=password;
 console.log("UI DONe")
 calStrength();

} );