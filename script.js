const rulesBox = document.querySelector('.rules-container');
const rulesBtn = document.querySelector('.rules-btn');
const closeRulesBtn = document.querySelector('.close-btn');
const canvas = document.querySelector('.game-canvas');
const ctx = canvas.getContext('2d');
const blockTotal = 45;
const blockArray = [];
let score = 0;

// Event Listeners
rulesBtn.addEventListener('click', toggleRules);
closeRulesBtn.addEventListener('click', toggleRules);
window.addEventListener('keydown', setPlayerDirection);
window.addEventListener('keyup', () => {
  player.speed = 0;
});

// Determine direction of the player
function setPlayerDirection(e) {
  if (e.key === 'ArrowRight') {
    player.speed = 5;
  } else if (e.key === 'ArrowLeft') {
    player.speed = -5;
  }
}

// Toggle rules
function toggleRules() {
  rulesBox.classList.toggle('show-rules');
}

// Set Block Dimensions
const canvasPad = 50;
const blockGap = 10;
const blockWidth = (canvas.width - blockGap * 8 - canvasPad * 2) / 9;
const blockHeight = 20;

// Instantiate Player Bar
const player = {
  speed: 0,
  height: 10,
  width: 80,
  y: canvas.height - 25,
  x: canvas.width / 2 - 80 / 2,
  getY: function () {
    return this.y - this.height;
  },
  getWidthBoundary: function () {
    return { wLeft: this.x, wRight: this.x + this.width };
  },
};

// Instantiate Ball Object
const ball = {
  x: Math.floor(canvas.width / (Math.random() * (5 - 1.25) + 1.25)),
  y: canvas.height / 2,
  size: 10,
  dy: 2,
  dx: Math.random() > 0.5 ? 1 : -1,
  xDir: function () {
    return this.dx > 0 ? 'right' : 'left';
  },
  yDir: function () {
    return this.dy > 0 ? 'down' : 'up';
  },
};

console.log(ball.x);

// Draw Player
function drawPlayer() {
  movePlayer();
  ctx.beginPath();
  ctx.rect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = '#87a352';
  ctx.fill();
}

// Update Player
function movePlayer() {
  player.x += player.speed;
  if (player.x <= 0) {
    player.x = 0;
  } else if (player.x >= canvas.width - player.width) {
    player.x = canvas.width - player.width;
  }
}

// Clear Canvas
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw All Blocks
function drawAllBlocks() {
  for (let i = 0; i < 45; i++) {
    const column = i % 9;
    const row = Math.floor(i / 9);
    drawBlock(column, row, i);
  }
}
updateGame();
drawPlayer();
drawAllBlocks();
drawBall();

// Draw Single Block
function drawBlock(column, row, i) {
  let rowGap = column > 0 ? blockGap * column : 0;
  let colGap = row > 0 ? blockGap * row : 0;

  if (blockArray.length < 45) {
    loadBlockData(
      canvasPad + colGap + blockHeight * row,
      canvasPad + colGap + blockHeight * row + blockHeight,
      Math.floor(canvasPad + rowGap + blockWidth * column),
      Math.floor(canvasPad + rowGap + blockWidth * column + blockWidth)
    );
  }
  if (!blockArray[i].broken) {
    ctx.beginPath();
    ctx.rect(
      Math.floor(canvasPad + rowGap + blockWidth * column),
      canvasPad + colGap + blockHeight * row,
      Math.floor(blockWidth),
      blockHeight
    );

    ctx.fillStyle = '#87a352';
    ctx.fill();
  }
}

// Draw Ball
function drawBall() {
  moveBall();
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#87a352';
  ctx.fill();
}

// Move Ball
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  checkBallColl();
}

// Update Game
function updateGame() {
  clear();
  drawPlayer();
  drawBall();
  drawAllBlocks();
  setScore();
  requestAnimationFrame(updateGame);
}

// Check Ball Collisions
function checkBallColl() {
  // Collision check for player paddle
  if (
    ball.y >= player.getY() &&
    ball.x >= player.getWidthBoundary().wLeft &&
    ball.x <= player.getWidthBoundary().wRight
  ) {
    console.log('crossed');
    ball.dy *= -1;
  }
  // Border Collision check
  if (ball.x <= 0 || ball.x >= canvas.width) {
    ball.dx *= -1;
  }
  if (ball.y <= 0) {
    ball.dy *= -1;
  }

  blockArray.forEach((current) => {
    if (
      ball.y + ball.size >= current.top &&
      ball.y - ball.size <= current.bottom &&
      ((ball.x - ball.size == current.right && ball.xDir() == 'left') ||
        (ball.x + ball.size == current.left && ball.xDir() == 'right')) &&
      !current.broken
    ) {
      console.log('side hit');
      score++;
      current.broken = true;
      ball.dx *= -1;
    } else if (
      ball.x - ball.size < current.right &&
      ball.x + ball.size > current.left &&
      ((ball.y + ball.size == current.top && ball.yDir() == 'down') ||
        (ball.y - ball.size == current.bottom && ball.yDir() == 'up')) &&
      !current.broken
    ) {
      console.log('vert hit');
      score++;
      current.broken = true;
      ball.dy *= -1;
    }
  });
  //   Checking for reset
  if (ball.y >= canvas.height) {
    reset();
    ball.dy *= -1;
  }
}

function loadBlockData(top, bottom, left, right) {
  blockArray.push({ top, bottom, left, right, broken: false });
}

// Add Score
function setScore() {
  ctx.font = '18px Ariel';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
  ctx.font = '200';
}

// Reset game upon loss
function reset() {
  blockArray.forEach((current) => {
    current.broken = false;
  });
  score = 0;
}
