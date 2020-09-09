"use strict";

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const setting = {
  start: false,
  score: 0,
  speed: 3
}

const score = document.querySelector(".score");
const start = document.querySelector(".start");
const gameArea = document.querySelector(".gameArea");
const car = document.createElement("div");

car.classList.add("car");

start.addEventListener("click", () =>{
  start.classList.add("hide");
  for(let i = 0;i < 50;i++){
    const line = document.createElement("div");
    line.classList.add("line");
    line.style.top = (i * 100) + "px";
    line.y = i * 100;
    gameArea.appendChild(line);
  }
  setting.start = true;
  gameArea.appendChild(car);
  setting.x= car.offsetLeft;
  setting.y= car.offsetTop;
  requestAnimationFrame(playGame);
});

const run = (evt) =>{
  
  keys[evt.key] = true;
};
const stop = (evt) =>{
 
  keys[evt.key] = false;
};

const moveRoad = () =>{
  let lines = document.querySelectorAll(".line");
  lines.forEach( (line)=>{
    line.y += setting.speed;
    line.style.top = line.y + "px";

    if (line.y > document.documentElement.clientHeight){
      line.y = -10;
    }
  });
}

const playGame = () => {
  moveRoad();
  if(setting.start) {
    if(keys.ArrowLeft && setting.x > 0){
      setting.x-=setting.speed;
    }
    if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
      setting.x+=setting.speed;
    }
    if(keys.ArrowUp && setting.y > 0){
      setting.y-=setting.speed;
    }
    if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
      setting.y+=setting.speed;
    }
    
    car.style.left = setting.x + "px";
    car.style.top = setting.y + "px";
    requestAnimationFrame(playGame);
  }
  
}



document.addEventListener("keydown",run);
document.addEventListener("keyup",stop);