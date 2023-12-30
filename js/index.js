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

changeImg()