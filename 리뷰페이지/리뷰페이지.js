const pop=document.querySelector('pop')
const popBg=document.querySelector('popBg')
const change=()=>{
    pop.classList.remove("up")
    popBg.classList.remove("down")
}
const none=()=>{
    pop.classList.add("up")
    popBg.classList.add("down")
}