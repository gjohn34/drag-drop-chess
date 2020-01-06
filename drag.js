function allowDrop(ev) {
  ev.preventDefault();
}

function sameRow(rows, from, to) {
  return rows[from[0]] - rows[to[0]] != 0
}

function nextRow(gameBoard, rows, from, to) {
  try {
    return gameBoard[rows[from[0]]][from[1] - 1] - gameBoard[rows[to[0]]][to[1] - 1] == 1 || 
    gameBoard[rows[from[0]]][from[1] - 1] - gameBoard[rows[to[0]]][to[1] - 1] == -1
  } catch (error) {
    // console.log(to)
    // console.log(from)
    // console.log(gameBoard[rows[to[0]]])
    // console.log(error)    
  }
}

function dragStart(ev) {
  let turn = document.getElementById('move').innerText.toLowerCase()
  // console.log(ev.target.dataset.colour)
  // console.log(turn)
  if (ev.target.dataset.colour == turn) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }
}

function legalMove(fromId, toId, colour, piece="pawn") {
  let rows = {
    "A": 0,
    "B": 1,
    "C": 2,
  }
  let gameBoard = [
    ["1", "2", "3"],
    ["1", "2", "3"],
    ["1", "2", "3"],
  ]
  let from = fromId.split('')
  let to = toId.split('')
  switch (piece) {
    case "pawn":
      if (nextRow(gameBoard, rows, from, to) && sameRow(rows, from, to)) {
        let container = document.getElementById(toId)
        let children = container.children
        if (children.length > 0) {
          if (!children[0].classList.contains(colour)) {
            container.removeChild(children[0])
            return true  
          }
        }
      }
      if (from[1] == to[1] && document.getElementById(toId).children.length == 0) {
        return true
      }
      break;
    default:
      break;
  }
}

function dropIt(ev) {
  ev.preventDefault(); // default is not to allow drop
  let sourceId = ev.dataTransfer.getData("text/plain");
  if (sourceId) {
    let sourceIdEl = document.getElementById(sourceId);
    let sourceParentId = sourceIdEl.parentElement.id
    let targetEl = document.getElementById(ev.target.id)
    if (targetEl.parentElement.id != 'board') {
      targetEl = targetEl.parentElement
    }
    let targetElId = targetEl.id
    if (legalMove(sourceParentId, targetElId, sourceIdEl.dataset.colour)) {
      targetEl.appendChild(sourceIdEl)
      let moveDiv = document.getElementById('move')
      moveDiv.innerText = moveDiv.innerText == 'Black' ? 'White' : 'Black'
    } 
  } else {
    window.alert('not your turn')
  }
}