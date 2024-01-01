let advice = new Object;
let i=0;
let firstLog = true;
let isClickable = true;

const textAdvice=document.getElementById("advise-text");
const idAdvice=document.getElementById("number");
const btn=document.getElementById("icon-dice-container")

btn.style.background = "grey"
btn.style.boxShadow = "0 0 0 grey";

function generateAdvice(){
    fetch("https://api.adviceslip.com/advice")
        .then(response => {
            if(!response.ok){
                throw new Error("Network response was not ok!")
            }
            return response.json();
        })
        .then(data=>{
                if (firstLog===true){
                    textAdvice.textContent = '"'+data.slip.advice+'"';
                    advice = data;
                    idAdvice.textContent = data.slip.id;
                    firstLog=false
                    checkAdvice()
                }
                else{
                    advice = data;
                    setTimeout(function(){
                        checkAdvice()
                    },2500)
                }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function changeImg(){
    const imgSrc = document.getElementById("divider")
    const changeSrc = () => {
        if (this.window.innerWidth<=425){
            imgSrc.src='images/pattern-divider-mobile.svg'
        }
        else{
            imgSrc.src='images/pattern-divider-desktop.svg'
        }
    }
    window.addEventListener("resize", changeSrc);
    changeSrc();
}

function btnAdvice(){
    btn.addEventListener("click", ()=> {
        if (isClickable){
            textAdvice.textContent = '"'+advice.slip.advice+'"'
            idAdvice.textContent = advice.slip.id
            isClickable = false
            btn.style.background = "grey"
            btn.style.boxShadow = "0 0 0 grey";
            checkAdvice()
        }
    })
}      

function checkAdvice(){
    if(textAdvice.textContent != '"'+advice.slip.advice+'"'){
        btn.style.background = "";
        btn.style.boxShadow = "";
        isClickable = true;
    }
    else{
        generateAdvice()
    }
}

btnAdvice()
changeImg()
generateAdvice()
