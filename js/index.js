

let dropdownItem = document.querySelectorAll(".dropdown-item")
let dropdownBody = document.querySelectorAll(".dropdown-body")


dropdownItem.forEach((elem, i) => {
    elem.addEventListener("mouseover", () => {
        dropdownItem[i].classList.toggle("active")
        dropdownBody[i].classList.toggle("active")
    })

    elem.addEventListener("mouseout", () => {
        dropdownItem[i].classList.toggle("active")
        dropdownBody[i].classList.toggle("active")
    })
})
//
// dropdownItem.addEventListener("mouseover", () => {
//     dropdownItem.classList.toggle("active")
//     dropdownBody.classList.toggle("active")
// })
//
// dropdownItem.addEventListener("mouseout", () => {
//     dropdownItem.classList.toggle("active")
//     dropdownBody.classList.toggle("active")
// })
