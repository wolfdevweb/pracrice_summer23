
// Раскрытие блока описания заказа
let readContinue = document.querySelector(".read-continue")
let descriptionContent = document.querySelector(".description-content")
let hidingBlock = document.querySelector(".hiding-block")
readContinue.addEventListener("click", () => {
    (readContinue.innerText === "Читать далее") ? readContinue.innerText = "Скрыть" : readContinue.innerText = "Читать далее";
    readContinue.classList.toggle("active")
    descriptionContent.classList.toggle("open")
    hidingBlock.classList.toggle("hide")
})

// Реализация прокрутки имени файла
let file = document.querySelectorAll(".file")
file.forEach((elem,i) => {
    elem.addEventListener("mouseover", () => {
        file[i].children[1].scroll(0, file[i].children[1].scrollHeight)
    })
    elem.addEventListener("mouseout", () => {
        file[i].children[1].scroll(0, 0)
    })
})



let btnCloseOrder = document.getElementById("close-order")
let btnEditOrder = document.getElementById("edit-order")
let overlay = document.querySelector(".overlay")
let modalCloseOrder = document.querySelector(".modal-close-order")
let modalEditOrder = document.querySelector(".modal-edit-order")
let crossModal = document.querySelectorAll(".cross-modal")
let undoAction = document.querySelectorAll(".undo-action")

// Открытие модального окна "Закрытие заказа"
btnCloseOrder.addEventListener("click", () => {
    openModal(modalCloseOrder)
})

// Открытие модального окна "Редактирование заказа"
btnEditOrder.addEventListener("click", ()=> {
    openModal(modalEditOrder)
})

// Закрытие конктретного модального окна по кнопке
undoAction.forEach((elem) => {
    elem.addEventListener("click", () => {
        closeModal(elem.parentNode.parentNode.parentNode)
    })
})
// Закрытие модального окна по нажатию на крестик
crossModal.forEach((elem) => {
    elem.addEventListener("click", () => {
        closeModal(elem.parentNode.parentNode)
    })
})



// Заготовка под AJAX для модального окна "Закрытие заказа" при продтверждении действия
let applyCloseOrder = document.getElementById("apply-close-order")
applyCloseOrder.addEventListener("click", async () => {
    await fetch("http://localhost/test/api", {
        method: "POST"
    }).then(res => console.log(res)).catch(err => console.log(err))
    closeModal(modalCloseOrder)
})

// Заготовка под AJAX для модального окна "Редактирование заказа" при подтвержедении действия
let applyEditOrder = document.getElementById("apply-edit-order")
applyEditOrder.addEventListener("click", async () => {
    await fetch("http://localhost/test/api", {
        method: "POST"
    }).then(res => console.log(res)).catch(err => console.log(err))
    closeModal(modalEditOrder)
})


function closeModal(modal) {
    modal.classList.remove("active")
    overlay.classList.remove("active")
}


function openModal(modal) {
    overlay.classList.add("active")
    modal.classList.add("active")
}