let advice = new Array;
let i=0;
let firstLog = true;

const btn=document.getElementById("icon-dice-container")
btn.style.background = "grey"
btn.style.boxShadow = "0 0 0 grey";

setInterval(function(){
    if(advice.length <=10){
        generateAdvice()
    }
}, 5000)

function generateAdvice(){
    fetch("https://api.adviceslip.com/advice")
        .then(response => {
            if(!response.ok){
                throw new Error("Network response was not ok!")
            }
            return response.json();
        })
        .then(data=>{
                advice.push(data);
                if (firstLog===true){
                    checkAdvice()
                    firstLog = false
                    setTimeout(function(){
                        btn.style.background = ""
                        btn.style.boxShadow = "";
                    },5000)
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
    let isClickable = true
    btn.addEventListener("click", ()=> {
        if (isClickable){

            isClickable = false
            btn.style.background = "grey"
            btn.style.boxShadow = "0 0 0 grey";

            checkAdvice()

            advice.shift()
            console.log(advice)

            setTimeout(function(){
                btn.style.background = ""
                btn.style.boxShadow = "";
                isClickable = true
            }, 5000)
        }
    })
}      

function checkAdvice(){
    const textAdvice=document.getElementById("advise-text")
    const idAdvice=document.getElementById("number")
    if(textAdvice.textContent != '"'+advice[0].slip.advice+'"'){
        textAdvice.textContent = '"'+advice[0].slip.advice+'"'
        idAdvice.textContent = advice[0].slip.id
    }
    else{
        advice.shift()
        checkAdvice()
    }
}

changeImg()
btnAdvice()