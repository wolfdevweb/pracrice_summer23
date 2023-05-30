let btnHint = document.querySelector(".btn-hint")
let hintProfile = document.querySelector(".hint-profile-fullness")


function changeContentBtnHint(contentElement) {
    return (contentElement === "Показать") ? "Скрыть" : "Показать"
}

btnHint.addEventListener("click", () => {
    btnHint.innerHTML = changeContentBtnHint(btnHint.innerHTML)
    hintProfile.classList.toggle("active");
})