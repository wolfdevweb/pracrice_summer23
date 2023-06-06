
let dropdownStatus = document.querySelectorAll(".dropdown-item-status-response")
dropdownStatus.forEach((elem, i) => {
    elem.addEventListener("click", (event) => {
        // console.log(dropdownStatus[i].children[1].classList.toggle("close"))
         if (event.target.classList.contains("dropdown-body-item")) {
             if (dropdownStatus[i].classList.length > 2)
                 dropdownStatus[i].classList.remove(dropdownStatus[i].classList[dropdownStatus[i].classList.length-1])
             dropdownStatus[i].children[0].children[0].innerHTML = event.target.innerHTML
             dropdownStatus[i].classList.add(event.target.classList[event.target.classList.length-1])
             dropdownStatus[i].children[1].classList.add("close")
             setTimeout(()=> {
                 dropdownStatus[i].children[1].classList.remove("close")
             },0)
         }
    })
})


function changeContentBtnHint(contentElement) {
    return (contentElement === "Показать") ? "Скрыть" : "Показать"
}

let btnHint = document.querySelector(".btn-hint")
let hintProfile = document.querySelector(".hint-profile-fullness")
if (btnHint && hintProfile)
    btnHint.addEventListener("click", () => {
        btnHint.innerHTML = changeContentBtnHint(btnHint.innerHTML)
        hintProfile.classList.toggle("active");
    })

let cardListHeader = document.querySelectorAll(".card-list-header")
let dropdownArrowList = document.querySelectorAll(".dropdown-arrow-list-response")
let cardListBody = document.querySelectorAll(".card-list-body")
cardListHeader.forEach((elem, i) => {
    elem.addEventListener("click", () => {
        cardListHeader[i].classList.toggle("active")
        dropdownArrowList[i].classList.toggle("active")
        cardListBody[i].classList.toggle("active")
    })
})

