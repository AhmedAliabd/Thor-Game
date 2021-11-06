const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 1000);
const CANVAS_HEIGHT = (canvas.height = 500);
const key = []; //pressed key when key pressed it will be stored here and on keyup event the stored value will be deleted. refer to the keyup and key down events methods
let gameFrame = 0;
const spritAnimation = [];
const animationStates = [
  { name: "idealRight", frame: 4 },
  { name: "runRight", frame: 7 },
  { name: "attackRight", frame: 8 },
  { name: "shieldRight", frame: 5 },
  { name: "specialAttackRight", frame: 8 },
  { name: "koRight", frame: 5 },
  { name: "idealLeft", frame: 4 },
  { name: "runLeft", frame: 7 },
  { name: "attackLeft", frame: 8 },
  { name: "shieldLeft", frame: 5 },
  { name: "specialAttackLeft", frame: 8 },
  { name: "koLeft", frame: 5 },
];

const backgroundImg = new Image();
backgroundImg.src = "./Assets/Rock_Tile_Map.png";
const playerImg = new Image();
playerImg.src = "./Assets/Minotaur - Sprite Sheet_ready.png";

const player = {
  initialX: 0,
  initialY: CANVAS_HEIGHT - 155,
  height: 96,
  width: 96,
  frameX: 0,
  frameY: 0,
  speed: 9,
  playerStatus: "idealRight",
  moving: false,
};

function drawPlayer() {
  ctx.drawImage(
    playerImg,
    player.width * player.frameX,
    player.height * player.frameY,
    player.width,
    player.height,
    player.initialX,
    player.initialY,
    player.width,
    player.height
  );
}
animationStates.forEach((states, index) => {
  let frameObj = { loc: [] };
  for (let i = 0; i < states.frame; i++) {
    let positionX = i * player.width;
    let positionY = index * player.height;
    frameObj.loc.push({ x: positionX, y: positionY });
  }
  spritAnimation[states.name] = frameObj;
});
function movePlayer() {
  if (key["ArrowRight"] && player.initialX < CANVAS_WIDTH - 60) {
    player.playerStatus = animationStates[0].name;
  } else if (key["ArrowLeft"] && player.initialX >= 0) {
    player.playerStatus = animationStates[7].name;
  } else if (key[" "] && player.playerStatus == "idealRight") {
    player.playerStatus = animationStates[2].name;
  } else if (key[" "] && player.playerStatus == "runLeft") {
    player.playerStatus = animationStates[8].name;
  }
}

// Control the x and y for the player frames
function handleAnimation() {
  if (player.moving == false) {
    if (player.frameX < 4) {
      player.frameY = 0; //*
      player.frameX++;
    } else player.frameX = 0;
  } else {
    if (player.frameX < player.xIncrement && player.moving) {
      player.frameX++;
    } else player.frameX = 0;
  }
}

/////////////  -----> This section to control the client fbs <------ /////////////////////////////
// let fbs, fbsInterval, startTime, now, then, elapsed;

// function startAnimating(fbs) {
//   fbsInterval = 1000 / fbs;
//   then = Date.now();
//   startTime = then;
//   animate();
// }

// function animate() {
//   gameFrame++;

//   requestAnimationFrame(animate);
//   now = Date.now();
//   elapsed = now - then;

//   if (elapsed > fbsInterval) {
//     then = now - (elapsed % fbsInterval);
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     ctx.drawImage(backgroundImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     let position =
//       Math.floor(gameFrame / 10) %
//       spritAnimation[player.playerStatus].loc.length;
//     player.frameX = spritAnimation[player.playerStatus].loc[position].x;
//     player.frameY = spritAnimation[player.playerStatus].loc[position].y;
//     drawPlayer();
//     movePlayer();
//     //handleAnimation();
//   }
// }
/////////////^^  -----> This section to control the client fbs <------ ^^/////////////////////////////

function animation() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / 15) % spritAnimation[player.playerStatus].loc.length;
  player.frameX = spritAnimation[player.playerStatus].loc[position].x;
  player.frameY = spritAnimation[player.playerStatus].loc[position].y;
  drawPlayer();
  movePlayer();
  handleAnimation();
  //THE LAST 4 ARGUMENTS IS TO DETERMINE WHERE ON OUR CANVAS TO DRAW THE IMAGE

  gameFrame++;
  requestAnimationFrame(animation);
}
//    Events Listener methods
window.addEventListener("load", () => {
  animation();
});
window.addEventListener("keydown", (e) => {
  key[e.key] = true;
  player.moving = true;
});
window.addEventListener("keyup", (e) => {
  delete key[e.key];
  player.moving = false;
});

// function animation() {
//   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//   ctx.drawImage(backgroundImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//   drawPlayer();
//   movePlayer();
//   handleAnimation();
//   requestAnimationFrame(animation);
// }
// animation();
