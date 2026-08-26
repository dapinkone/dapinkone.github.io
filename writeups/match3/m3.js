const board = document.getElementById('board');
const WIDTH = 16;
const HEIGHT = 9;

function clearBoard() {
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

const TOKEN_TYPES = ['square', 'circle', 'triangle', 'triangle-inverted']

function addRow() {
    const row = document.createElement("div");
    row.classList.add("token-row")
    Array.from({ length: WIDTH }).forEach(element => {
        row.appendChild(newToken(randomChoice(TOKEN_TYPES)))
    });
    board.appendChild(row)
}

function populateBoard() {
    Array.from({ length: HEIGHT }).forEach( _ => addRow())
}

function newToken(type = "square") {
    const token = document.createElement("span");
    token.addEventListener("click", (e) => onTokenClick(e));
    token.classList.add('token');

    const shape = document.createElement("span");
    shape.classList.add(`token-${type}`);
    token.appendChild(shape);
    
    return token;
}


function onTokenClick(e) {
  const token = e.currentTarget;
  const row = token.parentElement;
  const tokens = Array.from(row.children);
  const index = tokens.indexOf(token);

  const isRightEdge = index === tokens.length - 1;
  const swapWith = isRightEdge ? tokens[index - 1] : tokens[index + 1];

  if (isRightEdge) {
    row.insertBefore(token, swapWith);
  } else {
    row.insertBefore(swapWith, token);
  }
}

function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}



populateBoard();


const preview = document.createElement("div");
preview.classList.add("swap-preview");
preview.innerHTML = `<span class="preview-left"></span><span class="preview-right"></span>`;
document.body.appendChild(preview);

document.addEventListener("mousemove", (e) => {
  const token = e.target.closest(".token");

  if (!token) {
    preview.style.display = "none";
    return;
  }

  const row = token.parentElement;
  const tokens = Array.from(row.children);
  const index = tokens.indexOf(token);
  const isRightEdge = index === tokens.length - 1;
  const swapWith = isRightEdge ? tokens[index - 1] : tokens[index + 1];

  const leftToken = isRightEdge ? swapWith : token;
  const rightToken = isRightEdge ? token : swapWith;
  const leftRect = leftToken.getBoundingClientRect();

  preview.style.display = "flex";
  preview.style.left = `${leftRect.left}px`;
  preview.style.top = `${leftRect.top}px`;
});
