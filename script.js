const rulesBox = document.querySelector('.rules-container');
const rulesBtn = document.querySelector('.rules-btn');
const closeRulesBtn = document.querySelector('.close-btn');
const canvas = document.querySelector('.game-canvas');
const ctx = canvas.getContext('2d');
const blockTotal = 45;

// Event Listeners
rulesBtn.addEventListener('click', toggleRules);
closeRulesBtn.addEventListener('click', toggleRules);

// Toggle rules
function toggleRules() {
  rulesBox.classList.toggle('show-rules');
}

// Set Block Dimensions
const canvasPad = 50;
const blockGap = 10;
const blockWidth = (canvas.width - blockGap * 8 - canvasPad * 2) / 9;
const blockHeight = 20;

// Draw All Block
function drawAllBlocks() {
  for (let i = 0; i < 45; i++) {
    const column = i % 9;
    const row = Math.floor(i / 9);
    console.log(`Column: ${column}, Row: ${row}`);
    drawBlock(column, row);
  }
}

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

// drawBlock(0);
// drawBlock(1);
// drawBlock(2);
// drawBlock(3);
// drawBlock(4);
// drawBlock(5);
// drawBlock(6);
// drawBlock(7);
// drawBlock(8);
