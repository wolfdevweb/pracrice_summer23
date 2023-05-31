function dropdownToggleActive(index) {
    dropdownItem[index].classList.toggle("active")
    dropdownBody[index].classList.toggle("active")
}

function changeContentBtnHint(contentElement) {
    return (contentElement === "Показать") ? "Скрыть" : "Показать"
}


let dropdownItem = document.querySelectorAll(".dropdown-item")
let dropdownHeader = document.querySelectorAll(".dropdown-header span")
let dropdownBody = document.querySelectorAll(".dropdown-body")
dropdownItem.forEach((elem, i) => {
    if (!elem.classList.contains("dropdown-item-status-response")) {
        elem.addEventListener("mouseover", () => dropdownToggleActive(i))
        elem.addEventListener("mouseout", () => dropdownToggleActive(i))
    }
    else
        elem.addEventListener("click", (event) => {
            dropdownToggleActive(i)
            if (event.target !== dropdownItem[i] && event.target.textContent !== "" &&
            event.target !== dropdownBody[i]) {
                dropdownHeader[i].textContent = event.target.textContent
                let item = dropdownItem[i]
                switch (dropdownHeader[i].textContent) {
                    case "Принят":
                        item.style.background = "var(--light-green-100)"
                        break;
                    case "В резерве":
                        item.style.background = "var(--light-yellow)"
                        break;
                    case "Отклонен":
                        item.style.background = "var(--light-red)"
                        break;
                    case "На рассмотрении":
                        item.style.background = "var(--light-grey)"
                        break;
                }
            }
        })
})

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

