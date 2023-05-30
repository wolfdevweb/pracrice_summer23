function dropdownToggleActive(index) {
    dropdownItem[index].classList.toggle("active")
    dropdownBody[index].classList.toggle("active")
}

function changeContentBtnHint(contentElement) {
    return (contentElement === "Показать") ? "Скрыть" : "Показать"
}


let dropdownItem = document.querySelectorAll(".dropdown-item")
let dropdownBody = document.querySelectorAll(".dropdown-body")
dropdownItem.forEach((elem, i) => {
    elem.addEventListener("mouseover", () => dropdownToggleActive(i))
    elem.addEventListener("mouseout", () => dropdownToggleActive(i))
})

let btnHint = document.querySelector(".btn-hint")
let hintProfile = document.querySelector(".hint-profile-fullness")
btnHint.addEventListener("click", () => {
    btnHint.innerHTML = changeContentBtnHint(btnHint.innerHTML)
    hintProfile.classList.toggle("active");
})
