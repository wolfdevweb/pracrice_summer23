
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

// Реализация слайдера
let arrowSliderLeft = document.querySelector(".slider-arrow-left")
let arrowSliderRight = document.querySelector(".slider-arrow-right")
let sliderBody = document.querySelector(".slider-body")
let i = 0
arrowSliderRight.addEventListener("click", () => {
    sliderBody.children.length
    if (i < (sliderBody.children.length-3) * 230) {
        i += 230
        sliderBody.style.transform = `translate(-${i}px)`
    }
})
arrowSliderLeft.addEventListener("click", () => {
    if (i !== 0) {
        i -= 230
        sliderBody.style.transform = `translate(-${i}px)`
    }
})

// Переход с модального окна выбора помещения на модальное окно со столами и наоборот
let returnToRooms = document.querySelector(".return-rooms")
let choiceTableModal = document.querySelector(".modal-transfer-meeting-tables")
let transferMeetingModal = document.querySelector(".modal-transfer-meeting")
let btnEnterHalls = document.querySelectorAll(".btn-enter-hall")
let enterHallName;

// Выбор помещения и переход на модальное окно со столами
btnEnterHalls.forEach((elem) => {
    elem.addEventListener("click", () => {
        enterHallName = elem.parentNode.children[2].children[0].innerText
        closeModal(transferMeetingModal)
        openModal(choiceTableModal)
    })
})
// Возврат на модальное окно выбора помещения
returnToRooms.addEventListener("click", () => {
    closeModal(choiceTableModal)
    openModal(transferMeetingModal)
})

let btnTables = document.querySelectorAll(".btn-table")

btnTables.forEach((elem) => {
    elem.addEventListener("click", () => {
        closeModal(choiceTableModal)
        // openModal()
    })
})


function closeModal(modal) {
    modal.classList.remove("active")
    overlay.classList.remove("active")
}


function openModal(modal) {
    overlay.classList.add("active")
    modal.classList.add("active")
}

//реализация выбора времени встречи
const step = 5 // "шаг" 5 минут
const intervalLength = 288
//убираем 10 утренних часов (0:00 - 10:00) для того чтобы интервал смотрелся красивее
const intervalMorning = 120
//убираем 2 ночных часа (22:00 - 0:00) 
const intervalNight = 24

const beautifyTime = (time) => {
    if (time.toString().length === 1) return "0" + time
    return time
}

const timeToSteps = (time) => {
    const [hours, minutes] = time.split(":")
    if (hours === 0) hours = 24
    return (hours * 60 / step) + Math.round(minutes / step)
}

const stepsToTime = (steps) => {
    const hours = Math.floor(steps / 12)
    const minutes = (steps - hours * 12) * 5 
    return `${beautifyTime(hours)}:${beautifyTime(minutes)}`
}

const stepsToOffset = (steps) => {
    return (steps-intervalMorning)/(intervalLength-intervalMorning-intervalNight)*100 + "%"
}

const stepsToWidth = (steps) => {
    return (steps)/(intervalLength-intervalMorning-intervalNight)*100 + "%"
}

const interval = document.querySelector("#transferMeetinInterval")

const timeSlots = {
    available: [
        {
            start: timeToSteps("12:00"),
            end: timeToSteps("19:00")
        },
    ],
    appointment: [
        {
            start: timeToSteps("12:00"),
            end: timeToSteps("14:30")
        },
        {
            start: timeToSteps("16:00"),
            end: timeToSteps("17:45")
        }
    ]
}

// устанавливаем точки начала/конца интервалов
const placeIntervalTips = () => {
    const timeSlotsFlattened = []

    Object.keys(timeSlots).forEach((key) => {
        const flattenedPoint = []
        timeSlots[key].forEach((point) => {
            flattenedPoint.push(...Object.values(point))
        })
        timeSlotsFlattened.push(...flattenedPoint)
    })

    const tipPositions = [...new Set(timeSlotsFlattened)].sort((a, b) => a - b)
    
    tipPositions.forEach(tip => {
        const tipEl = document.createElement("div")
        tipEl.classList.add("interval-tip")
        tipEl.style.left = stepsToOffset(tip)
        tipEl.dataset.content = stepsToTime(tip)
        interval.appendChild(tipEl)
    })
}

const placeStripe = (start, end, classList) => {
    const stripeEl = document.createElement("div")
    stripeEl.classList.add(...classList)

    stripeEl.style.left = stepsToOffset(start)
    stripeEl.style.width = stepsToWidth(end - start)

    console.log(timeSlots)

    interval.appendChild(stripeEl)
}

const placeGreenStripe = () => {
    placeStripe(timeSlots.available[0].start, timeSlots.available[0].end, ["interval-stripe", "interval-stripe-green"])
}

const placeYellowStripes = () => {
    timeSlots.appointment.forEach(slot => {
        console.log(slot)
        placeStripe(slot.start, slot.end, ["interval-stripe", "interval-stripe-yellow"])
    })
}

const placeIntervalStripes = () => {
    placeGreenStripe()
    placeYellowStripes()
}

console.log(timeSlots)
placeIntervalTips()
placeIntervalStripes()
