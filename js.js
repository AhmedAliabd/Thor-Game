const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 590);
const CANVAS_HEIGHT = (canvas.height = 290);
const key = [];
const backgroundImg = new Image();
backgroundImg.src = "./Assets/Rock_Tile_Map.png";
const playerImg = new Image();
playerImg.src = "./Assets/Minotaur - Sprite Sheet_ready.png";

const player = {
  initialX: 0,
  initialY: 176,
  height: 96,
  width: 96,
  frameX: 0,
  frameY: 0,
  speed: 9,
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
//ArrowRight;//ArrowLeft
function movePlayer() {
  if (key["ArrowRight"] && player.initialX < CANVAS_WIDTH - 60) {
    player.initialX += player.speed;
    player.frameY = 1;
  } else if (key["ArrowLeft"] && player.initialX > 0) {
    player.initialX -= player.speed;
    player.frameY = 9;
  } else if (key[" "]) {
    player.frameY = 3;
  }
}
function handleAnimation() {
  if (player.moving == false) {
    if (player.frameX < 4) {
      player.frameY = 0;
      player.frameX++;
    } else player.frameX = 0;
  } else {
    if (player.frameX < 4 && player.moving) {
      player.frameX++;
    } else player.frameX = 0;
  }
}

window.addEventListener("keydown", (e) => {
  key[e.key] = true;
  player.moving = true;
  console.log(key);
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

let fbs, fbsInterval, startTime, now, then, elapsed;

function startAnimating(fbs) {
  fbsInterval = 1000 / fbs;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fbsInterval) {
    then = now - (elapsed % fbsInterval);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(backgroundImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawPlayer();
    movePlayer();
    handleAnimation();
  }
}
startAnimating(20);
