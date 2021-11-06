class Player {
  constructor() {
    this.initialX = 0;
    this.initialY = CANVAS_HEIGHT - 151;
    this.height = 96;
    this.width = 96;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 4;
    (this.playerStatus = "idealRight"), (this.moving = false);
  }
}

const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 1000);
const CANVAS_HEIGHT = (canvas.height = 500);
const player = new Player();
const key = []; //pressed key when key pressed it will be stored here and on keyup event the stored value will be deleted. refer to the keyup and key down events methods
let gameFrame = 0;
const spritAnimation = [];
const backgroundImg = new Image();
backgroundImg.src = "./Assets/Rock_Tile_Map.png";
const playerImg = new Image();
playerImg.src = "./Assets/Minotaur - Sprite Sheet_ready.png";
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

animationStates.forEach((states, index) => {
  let frameObj = { loc: [] };
  for (let i = 0; i < states.frame; i++) {
    let positionX = i * player.width;
    let positionY = index * player.height;
    frameObj.loc.push({ x: positionX, y: positionY });
  }
  spritAnimation[states.name] = frameObj;
});

function drawPlayer() {
  ctx.drawImage(
    playerImg,
    player.frameX,
    player.frameY,
    player.width,
    player.height,
    player.initialX,
    player.initialY,
    player.width,
    player.height
  );
}
function movePlayer() {
  if (key["ArrowRight"] && player.initialX < CANVAS_WIDTH - 60) {
    player.playerStatus = animationStates[1].name;
    player.initialX += player.speed;
  } else if (key["ArrowLeft"] && player.initialX >= 0) {
    player.playerStatus = animationStates[7].name;
    player.initialX -= player.speed;
  } else if (key[" "] && player.playerStatus == "idealRight") {
    player.playerStatus = animationStates[2].name;
  } else if (key[" "] && player.playerStatus == "idealLeft") {
    player.playerStatus = animationStates[8].name;
  }
}

function animation() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / 5) % spritAnimation[player.playerStatus].loc.length;
  player.frameX = spritAnimation[player.playerStatus].loc[position].x;
  player.frameY = spritAnimation[player.playerStatus].loc[position].y;
  drawPlayer();
  movePlayer();
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
  if (
    player.playerStatus == "idealRight" ||
    player.playerStatus == "runRight" ||
    player.playerStatus == "attackRight"
  ) {
    player.playerStatus = "idealRight";
  } else {
    player.playerStatus = "idealLeft";
  }
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
//   Control the x and y for the player frames
// function handleAnimation() {
//   if (player.moving == false) {
//     if (player.frameX < 4) {
//       player.frameY = 0;
//       player.frameX++;
//     } else player.frameX = 0;
//   } else {
//     if (player.frameX < 4 && player.moving) {
//       player.frameX++;
//     } else player.frameX = 0;
//   }
// }

/////////////  -----> This section to control the client fbs <------ /////////////////////////////
// let fbs, fbsInterval, startTime, now, then, elapsed;

// function startAnimating(fbs) {
//   fbsInterval = 1000 / fbs;
//   then = Date.now();
//   startTime = then;
//   animate();
// }

// function animate() {
//   requestAnimationFrame(animate);
//   now = Date.now();
//   elapsed = now - then;
//   if (elapsed > fbsInterval) {
//     then = now - (elapsed % fbsInterval);
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     ctx.drawImage(backgroundImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     drawPlayer();
//     movePlayer();
//     //handleAnimation();
//   }
// }
/////////////^^  -----> This section to control the client fbs <------ ^^/////////////////////////////
