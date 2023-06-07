
let readContinue = document.querySelector(".read-continue")
let descriptionContent = document.querySelector(".description-content")
let hidingBlock = document.querySelector(".hiding-block")

readContinue.addEventListener("click", (event) => {
    (readContinue.innerText === "Читать далее") ? readContinue.innerText = "Скрыть" : readContinue.innerText = "Читать далее";
    readContinue.classList.toggle("active")
    descriptionContent.classList.toggle("open")
    hidingBlock.classList.toggle("hide")
})