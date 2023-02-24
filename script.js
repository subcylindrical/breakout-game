const rulesBox = document.querySelector('.rules-container');
const rulesBtn = document.querySelector('.rules-btn');
const closeRulesBtn = document.querySelector('.close-btn');
const canvas = document.querySelector('.game-canvas');
const ctx = canvas.getContext('2d');
const blockTotal = 45;
const blockArray = [];

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
};

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
    console.log(player.x);
  }
}

// Update Game
function updateGame() {
  clear();
  drawPlayer();
  drawAllBlocks();
  requestAnimationFrame(updateGame);
}

// Clear Canvas
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw All Block
function drawAllBlocks() {
  for (let i = 0; i < 45; i++) {
    const column = i % 9;
    const row = Math.floor(i / 9);
    // console.log(`Column: ${column}, Row: ${row}`);
    drawBlock(column, row);
  }
}
updateGame();
drawPlayer();
drawAllBlocks();

// Draw Single Block
function drawBlock(column, row) {
  ctx.beginPath();
  let rowGap = column > 0 ? blockGap * column : 0;
  let colGap = row > 0 ? blockGap * row : 0;
  ctx.rect(
    canvasPad + rowGap + blockWidth * column,
    canvasPad + colGap + blockHeight * row,
    blockWidth,
    blockHeight
  );
  ctx.fillStyle = '#87a352';
  ctx.fill();
}
