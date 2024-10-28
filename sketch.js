let offsetX, offsetY;
let radius = 20;
let pieceRadiusMultiplier = 0.7;
const PI = Math.PI;
const INNER_ANGLE = 2*PI/8
const OUTER_ANGLE = 2*PI/16
const CENTER_WIDTH = 17;
const CENTER_HEIGHT = 9;

const sqrt3 = Math.sqrt(3);
// Distance from center to the outer circle
let distance = 0;

const NO_PIECE = 0;
const GREEN_PIECE = 1;
const BLUE_PIECE = 2;
const BLACK_PIECE = 3;
const RED_PIECE = 4;
const YELLOW_PIECE = 5;
const WHITE_PIECE = 6;

let centerGreen;
let centerBlue;
let centerBlack;
let centerRed;
let centerYellow;
let centerWhite;
let grid = new Array(300); // 150 + 17*9
let currentTile;
let possibleMoves;

// Draw center
const TILE_MAP_START_X = [2, 1, 1, 0, 0, 0, 1, 1, 2];
const ROW_SIZES = [5, 6, 7, 8, 9, 8, 7, 6, 5];

const BOUNDARY_TILE = {
  1: [153, 154, 155],
  2: [173, 191, 208],
  3: [242, 259, 275],
  4: [291, 290, 289],
  5: [270, 253, 235],
  6: [201, 185, 168],
}

const NAME_XT = ['兌', '離','震', '坤', '艮','坎', '巽', '乾'];
const NAME_HT = ['巽', '震', '艮', '坎', '乾', '兌', '坤', '離'];


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');

  updateShow();

  init();
  console.log(grid[0].getAdjacentTiles());
  console.log(grid[1].getAdjacentTiles());
}

function draw() {
  background(255);
  drawLines();

  for (let i = grid.length - 1; i >= 0; i--) {
		if (grid[i] != undefined) {
			grid[i].show();
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	updateShow();
  init();
}

function updateShow(){
  radius = min(width, height) / 36;
  offsetX = width / 2 - 4 * radius * 2;
	offsetY = height / 2 - 4 * radius * sqrt3;
}

// Populate the grid with tiles
function init() {
  for (let i = 0; i < CENTER_HEIGHT; i++) {
    let start = TILE_MAP_START_X[i];
    let end = start + ROW_SIZES[i];

    // Draw the circle based on x and y
    for (let j = start; j < end; j++){
      let index = getIndex(j, i);
      grid[index] = new Tile(j, i);
    }
  }

  let count = 0;
  console.log(grid);
  for (let i = 0; i < grid.length; i++) {
		if (grid[i] != undefined) {
			count++;
		}
	}

  // Calculate the coordinates of each center point
  // Index of the center point = (piece - 1)*25; 22 is the number of tiles in each circle
  for (let i = 1; i <= 6; i++) {
    // Get the first tile in each dict
    let index_0 = BOUNDARY_TILE[i][0];
    let index_1 = BOUNDARY_TILE[i][1];
    let index_2 = BOUNDARY_TILE[i][2];
    
    distance = dist(grid[index_0].showX, grid[index_0].showY, grid[index_2].showX, grid[index_2].showY)/2/Math.sin(OUTER_ANGLE); 
    let point = findThirdPoint(grid[index_0].showX, grid[index_0].showY, grid[index_2].showX, grid[index_2].showY, distance, distance);

    switch(i) {
      case GREEN_PIECE:
        centerGreen = {x: point[0].x3, y: point[0].y3};
        grid[(i-1)*22] = new circleTile(centerGreen.x, centerGreen.y, 0, 0, GREEN_PIECE, '八卦');
        drawCircles(i-1, centerGreen.x, centerGreen.y, grid[index_0].showX, grid[index_0].showY, grid[index_2].showX, grid[index_2].showY);
        // Add color and text to the boundary tile
        grid[index_1].piece = i;
        grid[index_1].msg = NAME_XT[7];
        break;
      case BLUE_PIECE:
        centerBlue = {x: point[0].x3, y: point[0].y3};
        grid[(i-1)*22] = new circleTile(centerBlue.x, centerBlue.y, 0, 0, BLUE_PIECE, '八卦');
        drawCircles(i-1, centerBlue.x, centerBlue.y, grid[index_0].showX, grid[index_0].showY, grid[index_2].showX, grid[index_2].showY);
        grid[index_1].piece = i;
        grid[index_1].msg = NAME_HT[7];
        break;
      case BLACK_PIECE:
        centerBlack = {x: point[0].x3, y: point[0].y3};
        grid[(i-1)*22] = new circleTile(centerBlack.x, centerBlack.y, 0, 0,BLACK_PIECE, '八卦');
        drawCircles(i-1, centerBlack.x, centerBlack.y, grid[index_0].showX, grid[index_0].showY, grid[index_2].showX, grid[index_2].showY);
        grid[index_1].piece = i;
        grid[index_1].msg = NAME_XT[7];
        break;
      case RED_PIECE:
        centerRed = {x: point[0].x3, y: point[0].y3};
        grid[(i-1)*22] = new circleTile(centerRed.x, centerRed.y, 0, 0, RED_PIECE, '八卦');
        drawCircles(i-1, centerRed.x, centerRed.y, grid[index_0].showX, grid[index_0].showY, grid[index_2].showX, grid[index_2].showY);
        grid[index_1].piece = i;
        grid[index_1].msg = NAME_HT[7];
        break;
      case YELLOW_PIECE:
        centerYellow = {x: point[0].x3, y: point[0].y3};
        grid[(i-1)*22] = new circleTile(centerYellow.x, centerYellow.y, 0, 0, YELLOW_PIECE, '八卦');
        drawCircles(i-1, centerYellow.x, centerYellow.y, grid[index_0].showX, grid[index_0].showY, grid[index_2].showX, grid[index_2].showY);
        grid[index_1].piece = i;
        grid[index_1].msg = NAME_XT[7];
        break;
      case WHITE_PIECE:
        centerWhite = {x: point[0].x3, y: point[0].y3};
        grid[(i-1)*22] = new circleTile(centerWhite.x, centerWhite.y, 0, 0, WHITE_PIECE, '八卦');
        drawCircles(i-1, centerWhite.x, centerWhite.y, grid[index_0].showX, grid[index_0].showY, grid[index_2].showX, grid[index_2].showY);
        grid[index_1].piece = i;
        grid[index_1].msg = NAME_HT[7];
        break;
    }

    // Add text to tiles
    if (i == 1 || i == 3 || i == 5) {
      for (let k = 0; k < 13; k += 2) {
        grid[(i-1)*22+9+k].msg = NAME_XT[k/2];
      }
    } else { //i = 2, 4, 6
      for (let k = 0; k < 13; k += 2) {
        grid[(i-1)*22+9+k].msg = NAME_HT[k/2];
      }
    }
  }
}

function drawLines() {
  let adj = [];
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] != undefined) {
      adj = grid[i].getAdjacentTiles();
      for (let j = 0; j < adj.length; j++) {
        if (adj[j] != undefined) {
          line(grid[i].showX, grid[i].showY, adj[j].showX, adj[j].showY);
        }
      }
    }
  }
}

//Populate the outer circle
function drawCircles(i, x1, y1, x2, y2, x3, y3) {
  const d1 = distance; // Center circle and white outer circle
  const d2 = distance*Math.sin(OUTER_ANGLE)*2; // Two white outer circles
  const d3 = distance*Math.cos(OUTER_ANGLE);

  grid[i*22 + 1] = new circleTile((x1+x2)/2, (y1+y2)/2, 1, 0, i+1, '');
  let start_small_point = grid[i*22 + 1];

  // The 9th tiles in each circle, the first tile on the right of the outer circle
  let ref_point = findThirdPoint(x1, y1, x3, y3, d3, d2/2);
  grid[i*22 + 9] = new circleTile(ref_point[0].x3, ref_point[0].y3, 2, 3*OUTER_ANGLE, i+1, '');
  let start_big_point = grid[i*22 + 9];

  let small_point;
  for (let k = 1; k < 8; k++) {
    // Populate the small circle
    small_point = findThirdPoint(x1, y1, start_small_point.showX, start_small_point.showY, d1/2, d2/2);
    // Create the corresponding grid elements
    grid[i*22 + 1 + k] = new circleTile(small_point[0].x3, small_point[0].y3, 1, k*INNER_ANGLE, i+1,'');
    start_small_point = grid[i*22 + 1 + k];
  }

  let big_point;
  for (let k = 1; k < 13; k++){
    // Populate the big circle
    if (k % 2 == 0) {
      big_point = findThirdPoint(x1, y1, start_big_point.showX, start_big_point.showY, d3, d2/2);
    } else {
      big_point = findThirdPoint(x1, y1, start_big_point.showX, start_big_point.showY, d1, d2/2);
    }
    // Create the corresponding grid elements
    grid[i*22 + 9 + k] = new circleTile(big_point[0].x3, big_point[0].y3, 2, (k+3)*OUTER_ANGLE, i+1, '');
    start_big_point = grid[i*22 + 9 + k];
  }
}

// Find the third point in a triangle using two points with known distances
function findThirdPoint(x1, y1, x2, y2, d1, d2) {
  // d1: The distance from P1 to the unknown P3
  // d2: The distance from P2 to the unknown P3
  // Calculate the distance between P1 and P2
  const d12 = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  // console.log('d12', d12);

  if (d12 > d1 + d2 || d12 < Math.abs(d1 - d2)) {
      throw new Error("No solution: The circles do not intersect.");
  }

  // Find the point halfway between P1 and P2
  const a = (d1 ** 2 - d2 ** 2 + d12 ** 2) / (2 * d12);

  // Find the coordinates of the midpoint along the line P1 to P2
  const x3_base = x1 + a * (x2 - x1) / d12;
  const y3_base = y1 + a * (y2 - y1) / d12;

  // Distance from the midpoint to the intersection points
  const h = Math.sqrt(d1 ** 2 - a ** 2);

  // Calculate the two possible intersection points (third points)
  const x3_1 = x3_base + h * (y2 - y1) / d12;
  const y3_1 = y3_base - h * (x2 - x1) / d12;

  const x3_2 = x3_base - h * (y2 - y1) / d12;
  const y3_2 = y3_base + h * (x2 - x1) / d12;

  return [
      { x3: x3_1, y3: y3_1 },  // First possible solution (clockwise)
      { x3: x3_2, y3: y3_2 }   // Second possible solution (counterclockwise)
  ];
}

// Draw the center hexagon of the board
function drawCenter() {
  // There are 9 rows
  for (let i = 0; i < 9; i++) {
    let start = TILE_MAP_START_X[i];
    let end = start + (ROW_SIZES[i] - 1) * 2;

    // Draw the circle based on x and y
    for (let j = start; j <= end; j = j + 2){
      let index = getIndex(j, i);
      console.log(index);
      grid[index] = new Tile(j, i);
    }

  }
}

// Get index by x, y-coordinates
function getIndex(x, y) {
  if (x < 0 || x >= CENTER_WIDTH || y < 0 || y >= CENTER_HEIGHT) {
    return -1;
  }
  return 150 + x + y * CENTER_WIDTH; // First exclude the number of tiles around
}

// Draw a tile filled with color
function drawPiece(x, y, piece, msg) {
	let color = getColor(piece);
	fill(color);
	ellipse(x, y, radius * 2 * pieceRadiusMultiplier);
  
  textSize(10);
  fill('white');
  // textAlign(CENTER);
  if (msg === '八卦') {
    text(msg, x-radius*pieceRadiusMultiplier*5/6, y+radius*pieceRadiusMultiplier/3);
  } else {
    text(msg, x-radius*pieceRadiusMultiplier/2, y+radius*pieceRadiusMultiplier/3);
  }
}

// Get the index of a tile based on its x, y values
function getTile(x, y) {
	return grid[getIndex(x, y)];
}

// Get color of a tile
function getColor(piece) {
  switch (piece) {
		default:
		case 0:
			return color(0, 0, 0);
		case 1:
			return color(20, 144, 20);
		case 2:
			return color(20, 20, 144);
		case 3:
			return color(10, 10, 10);
		case 4:
			return color(160, 20, 20);
		case 5:
			return color(224, 221, 31);
		case 6:
			return color(130, 130, 130);
	}
}

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.piece = 0;
    this.msg = '';
  }

  get showX() {
		return this.y % 2 == 0 ? this.x * radius * 2 + offsetX : this.x * radius * 2 + radius + offsetX;
	}

	get showY() {
		return this.y * 1 * radius * sqrt3 + offsetY;
	}

  show() {
    fill(200);
    // stroke('white');
    ellipse(this.showX, this.showY, pieceRadiusMultiplier*radius*2);

    // If tile has color
    if (this.msg != '') { // && this != currentTile
			drawPiece(this.showX, this.showY, this.piece, this.msg);
		}
  }

  // Get adjacent tiles of a tile
	getAdjacentTiles() {
		let adj = new Array(8);

    let x = this.y % 2 == 0 ? this.x : this.x + 1;

		adj[0] = getTile(x, this.y - 1);
		adj[1] = getTile(this.x + 1, this.y);
		adj[2] = getTile(x, this.y + 1);
		adj[3] = getTile(x - 1, this.y + 1);
		adj[4] = getTile(this.x - 1, this.y);
		adj[5] = getTile(x - 1, this.y - 1);
    
    // Get adjacent tiles in circles for boundary tiles
    for (let i = 1; i < 7; i++) {
      if (getTile(this.x, this.y) === grid[BOUNDARY_TILE[i][0]]) {
        adj.push(grid[(i-1)*22+1], grid[(i-1)*22+21]);
      }
      if (getTile(this.x, this.y) === grid[BOUNDARY_TILE[i][1]]) {
        adj.push(grid[(i-1)*22+1], grid[(i-1)*22+2]);
      }
      if (getTile(this.x, this.y) === grid[BOUNDARY_TILE[i][2]]) {
        adj.push(grid[(i-1)*22+2], grid[(i-1)*22+9]);
      }
    }

    // Get adjacent tiles for circle tiles
    for (let i = 1; i < 7; i++) {
      let index = (i-1)*22;
      switch (this) {
        
        case grid[index]:
          for (let j = 1; j < 9; j++) {
            adj.push(grid[index+j]);
          }
          break;
        case grid[index+1]:
          adj.push(grid[index], grid[index+2], grid[index+8], grid[index+21], grid[BOUNDARY_TILE[i][0]], grid[BOUNDARY_TILE[i][1]]);
          break;
        case grid[index+2]:
          adj.push(grid[index], grid[index+1], grid[index+3], grid[index+9], grid[BOUNDARY_TILE[i][1]], grid[BOUNDARY_TILE[i][2]]);
          break;
        case grid[index+3]:
          adj.push(grid[index], grid[index+2], grid[index+4], grid[index+9], grid[index+10], grid[index+11]);
          break;
        case grid[index+4]:
          adj.push(grid[index], grid[index+3], grid[index+5], grid[index+11], grid[index+12], grid[index+13]);
          break; 
        case grid[index+5]:
          adj.push(grid[index], grid[index+4], grid[index+6], grid[index+13], grid[index+14], grid[index+15]);
          break; 
        case grid[index+6]:
          adj.push(grid[index], grid[index+5], grid[index+7], grid[index+15], grid[index+16], grid[index+17]);
          break; 
        case grid[index+7]:
          adj.push(grid[index], grid[index+6], grid[index+8], grid[index+17], grid[index+18], grid[index+19]);
          break;
        case grid[index+8]:
          adj.push(grid[index], grid[index+7], grid[index+1], grid[index+19], grid[index+20], grid[index+21]);
          break;
        case grid[index+9]:
          adj.push(grid[BOUNDARY_TILE[i][2]], grid[index+2], grid[index+3], grid[index+10]);
          break;
        case grid[index+10]:
          adj.push(grid[index+3], grid[index+9], grid[index+11]);
          break;
        case grid[index+10]:
          adj.push(grid[index+3], grid[index+9], grid[index+11]);
          break;
        case grid[index+11]:
          adj.push(grid[index+3], grid[index+4], grid[index+10], grid[index+12]);
          break;
        case grid[index+12]:
          adj.push(grid[index+4], grid[index+11], grid[index+13]);
          break;
        case grid[index+13]:
          adj.push(grid[index+4], grid[index+5], grid[index+12], grid[index+14]);
          break;
        case grid[index+14]:
          adj.push(grid[index+5], grid[index+13], grid[index+15]);
          break;
        case grid[index+15]:
          adj.push(grid[index+5], grid[index+6], grid[index+14], grid[index+16]);
          break;
        case grid[index+16]:
          adj.push(grid[index+6], grid[index+15], grid[index+17]);
          break;
        case grid[index+17]:
          adj.push(grid[index+6], grid[index+7], grid[index+16], grid[index+18]);
          break;
        case grid[index+18]:
          adj.push(grid[index+7], grid[index+17], grid[index+19]);
          break;
        case grid[index+19]:
          adj.push(grid[index+7], grid[index+8], grid[index+18], grid[index+20]);
          break;
        case grid[index+20]:
          adj.push(grid[index+8], grid[index+19], grid[index+21]);
          break;
        case grid[index+21]:
          adj.push(grid[index+1], grid[index+8], grid[index+20], grid[BOUNDARY_TILE[i][0]]);
          break;
      }
    }
    return adj;
	};
}

class circleTile extends Tile{
  constructor(x, y, circle, angle, piece, msg) {
    super(x, y);
    this.circle = circle;
    this.angle = angle;
    this.piece = piece;
    this.msg = msg;
  }

  get showX() {
    return this.x;
  }

  get showY() {
    return this.y;
  }
}


