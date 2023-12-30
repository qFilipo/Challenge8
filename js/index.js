changeImg()
generateAdvise()

let advice = new Object;
async function generateAdvise(){
    await fetch("https://api.adviceslip.com/advice")
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok!")
        }
        return response.json();
    })
    .then(data=>{
       advice = data;
       console.log(advice.slip.id)
       console.log(advice.slip.advice)
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

console.log(advice)

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

