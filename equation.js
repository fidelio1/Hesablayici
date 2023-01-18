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
    let KB1 = eval((psyNum + 180) - MKK);
    document.getElementById("KB").value = KB1;
   
  } else if (psyNum > 180) {
    let KB2 = eval((psyNum - 180) - MKK);
    document.getElementById("KB").value = KB2;
  }

  //Evaluation of wind correction angle
  let us = (document.getElementById("AB").value = eval(
    Math.round(
      ((UU * 60) / VV) * Math.sin(toRad(document.getElementById("KB").value))
    )
  ));

  let fmyb = MKK + us;
  console.log(fmyb);
  document.getElementById("fmyb").value = fmyb;
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
