const 정답 = "GHOST";

let attempts = 0;
let index = 0;
let timer = 0;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-contents:center;align-items:center;position:absolute;top:40vh; left:40vh; background-color:white;width :200px;heigth:100px;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    console.log(attempts);
    if (attempts === 5) return gameover();
    attempts++;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const pad = document.querySelector(
        `.pad-block[data-key='${입력한_글자}']`
      );
      const 정답_글자 = 정답[i];

      if (입력한_글자 === 정답_글자) {
        맞은_갯수++;
        block.style.background = "#6AAA64";
        pad.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
        if (pad.style.background !== "rgb(106, 170, 100)") {
          pad.style.background = "#C9B458";
        }
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) {
      anime(2000, "linear", "both", Infinity);
      gameover();
    } else {
      anime(500, "linear", "both", 1);
      nextLine();
    }
  };

  const anime = (Duration, Easing, Fill, iter) => {
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      block.animate(
        // keyframes
        [
          { transform: "translateX(0px)", opacity: 1 },
          { transform: "translateX(-100px)", opacity: 0 },
          { transform: "translateX(0px)", opacity: 1 },
          { transform: "translateX(100px)", opacity: 0 },
          { transform: "translateX(0px)", opacity: 1 },
        ],
        // options
        {
          duration: Duration,
          easing: Easing,
          fill: Fill,
          iterations: iter,
        }
      );
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const eventClick = (event) => {
    const key = event.target.innerText;
    const keyCode = key.charCodeAt(0);
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (key === "←") {
      handleBackspace();
    } else if (index === 5) {
      if (key === "ENTER") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function sayTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const minute = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const second = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${minute}:${second}`;
    }
    // 주기성
    timer = setInterval(sayTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
  //외부클릭방지
  const Btn = document.querySelectorAll(".pad-block");
  Btn.forEach((element) => {
    element.addEventListener("mouseup", eventClick);
  });
}
appStart();
