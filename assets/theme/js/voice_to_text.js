// function tooltips(el, content) {
//   tippy(el, {
//     content: content,
//     arrow: true,
//     arrowType: 'round',
//     placement:'bottom',
//     animation: 'scale',
//     interactive: true,
//   });
// }

$(document).ready(function(){
    // $(".icon_mic").mouseover(function () {
    //     tooltips(this, "Ввод голосом");
    // });
  });

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;

class Recognizer {
  constructor() {
    this.recognition = new SpeechRecognition();
    this.recognition.lang = "ru-RU";
    if (!isMobile()) {
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
    }
    this.isRecognizing = false;
    this.transcript = "";
  }

  start(handler) {
    this.transcript = "";
    this.recognition.onresult = (event) => {
      this.onResult(event, handler);
    };
    this.recognition.start();
    this.isRecognizing = true;
    // console.log("Started recognition");
  }

  stop() {
    this.recognition.abort();
    this.isRecognizing = false;
    // console.log("Stopped recognition");
  }

  onResult(event, handler) {
    var interim_transcript = "";
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      var result = event.results[i];
      if (result.isFinal) {
        this.transcript += result[0].transcript;
      } else {
        interim_transcript += result[0].transcript;
      }
    }
    // console.log(interim_transcript);
    handler(interim_transcript);
  }
}




const recognizer = new Recognizer();

function voice_to_text(idInput, idBtnMicro) {

var items_hide = document.querySelectorAll('.btnVoice'), i = 0, l = items_hide.length;
for (i; i < l; i++) {
    if (items_hide[i].id == idBtnMicro){
      continue;
    } else {
      items_hide[i].disabled = true;
    }
}

const btnRecognize = document.getElementById(idBtnMicro);
const txtInterim = document.getElementById(idInput);

  function showText(text) {
    txtInterim.value = text;
    //когда происходит отановка в речи он возвращает пустую строку
    if (text === "") {
      txtInterim.value = recognizer.transcript; //делаем вывод окончательно сказанного текста в этоже поле
      stop(); //останавливаем запись
    }
  }

  function start() {
    txtInterim.value = "";
    recognizer.start(showText);
    btnRecognize.style.color = 'red'; // цвет активной кнопки
    // console.log('start');
  }

  function stop() {
    recognizer.stop();
    btnRecognize.style.color = '#727cf5';// цвет НЕ активной кнопки

    var items_hide = document.querySelectorAll('.btnVoice'), i = 0, l = items_hide.length;
    for (i; i < l; i++) {
        items_hide[i].disabled = false;
    }

    // console.log('stop');
  }

  if (!recognizer.isRecognizing) {
    start();
  } else {
    stop();
  }

  // btnRecognize.addEventListener("click", () => {
  //
  // });







}
