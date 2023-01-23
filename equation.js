function calc() {
  let V = document.getElementById("V").value;
  let U = document.getElementById("U").value;
  let psy = document.getElementById("psy").value;
  let maxPsy = document.getElementById("psy").max;
  let minPsy = document.getElementById("psy").min;
  let MK = document.getElementById("MK").value;
  let maxMKK = document.getElementById("MK").max;
  let minMKK = document.getElementById("MK").min;
  let KB = document.getElementById("KB");
  let AB = document.getElementById("AB");
  let V1 = document.getElementById("V1");
  let run = document.getElementById("run");
  let clear = document.getElementById("clear");

  const VV = Number(V);
  const UU = eval(Number(U) * 3.6);
  const psyNum = Number(psy);
  const MKK = Number(MK);

  if (psyNum > maxPsy) {
    alert("Dərəcə 360-dan çox ola bilməz");
    document.getElementById("psy").value = "360";
  }
  if (MKK > maxMKK) {
    alert("Dərəcə 360-dan çox ola bilməz");
    document.getElementById("MK").value = "360";
  }

  let toRad = function toRad(angle) {
    return angle * (Math.PI / 180);
  };

  //Evaluation of wind angle
  if (psyNum < 180) {
    let KB1 = eval(psyNum + 180 - MKK);
    document.getElementById("KB").value = KB1;
  } else if (psyNum > 180) {
    let KB2 = eval(psyNum - 180 - MKK);
    document.getElementById("KB").value = KB2;
  }

  //Evaluation of wind correction angle
  let us = (document.getElementById("AB").value = eval(
    Math.round(
      ((UU * 60) / VV) * Math.sin(toRad(document.getElementById("KB").value))
    )
  ));
  let mkHesab = MKK - us;
  document.getElementById("mkHesab").value = mkHesab;
  let fmyb = MKK + us;

  document.getElementById("fmyb").value = fmyb;
  console.log(us);
  console.log(document.getElementById("fmyb").value);
  //evaluation of speed correction
  let VV1 = Math.round(
    eval(VV + Math.cos(toRad(document.getElementById("KB").value)) * UU)
  );
  document.getElementById("V1").value = VV1;
}

run.addEventListener("click", (e) => {
  calc();
});
let clear = document.getElementById("clear");
clear.addEventListener("click", (event) => {
  console.log("clicked");
  document.getElementById("form1").reset();
  console.clear();
});

let convertation = () => {
  let mm = Number(document.getElementById("mm").value);
  let mb = Number(document.getElementById("mb").value);
  let run2 = document.getElementById("run2");
  mm1 = Math.round(eval(mm * 1.33322));
  mb1 = Math.round(eval(mb / 1.33322));
  document.getElementById("mm").value = mb1;
  document.getElementById("mb").value = mm1;
};
run2.addEventListener("click", (event) => {
  convertation();
});
clear2.addEventListener("click", (event) => {
  document.getElementById("form2").reset();
  console.clear();
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "green");
gradient.addColorStop(0.2, "green");
gradient.addColorStop(0.4, "green");
gradient.addColorStop(0.6, "green");
gradient.addColorStop(0.8, "green");
gradient.addColorStop(1, "green");

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters = "0123456789";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
  }
  draw(context) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 20;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }

  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(
        i,
        Math.random() * -50,
        this.fontSize,
        this.canvasHeight
      );
    }
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
    console.log(this.symbols);
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if (timer > nextFrame) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.textAlign = "center";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient;
    ctx.font = effect.fontSize + "px monospace";
    effect.symbols.forEach((symbol) => symbol.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }
  requestAnimationFrame(animate);
}

animate(0);

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  effect.resize(canvas.width, canvas.height);
});
