
let readContinue = document.querySelector(".read-continue")
let descriptionContent = document.querySelector(".description-content")
let hidingBlock = document.querySelector(".hiding-block")

readContinue.addEventListener("click", () => {
    (readContinue.innerText === "Читать далее") ? readContinue.innerText = "Скрыть" : readContinue.innerText = "Читать далее";
    readContinue.classList.toggle("active")
    descriptionContent.classList.toggle("open")
    hidingBlock.classList.toggle("hide")
})

let filename = document.querySelectorAll(".filename")
filename.forEach((elem,i) => {
    elem.addEventListener("mouseover", (event) => {
        filename[i].scroll(0, filename[i].scrollHeight)
    })
    elem.addEventListener("mouseout", () => {
        filename[i].scroll(0, 0)
    })
})