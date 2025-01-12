// FIXME const->let?
let INITIAL_GRID_ROWS = 3;
let INITIAL_GRID_COLUMNS = 4;

/** FIXME delete *
const MAZE_GRID_OBJECT = { primitive: "plane", height: 4, width: 4 }; //o
const MAZE_GRID_COLOR = "silver"; //o
const MAZE_GRID_HIGHLIGHT_COLOR = "green"; //x
const MAZE_WALL_OBJECT = {
  primitive: "plane",
  height: MAZE_GRID_OBJECT.height,
  width: 0.5,
}; //o
const MAZE_WALL_COLOR = "gray"; //o
const MAZE_WALL_HIGHLIGHT_COLOR = "green"; //x
const MAZE_WALL_RIGHT_RELATIVE_POSITION = {
  x: (MAZE_GRID_OBJECT.width + MAZE_WALL_OBJECT.width) / 2,
  y: 0,
  z: 0,
}; //o
const MAZE_WALL_BELOW_RELATIVE_POSITION = {
  x: 0,
  y: -(MAZE_GRID_OBJECT.height + MAZE_WALL_OBJECT.width) / 2,
  z: 0,
}; //o
const MAZE_WALL_VISUALIZATION_OBJECT = {
  primitive: "box",
  height: 4,
  width: MAZE_WALL_OBJECT.width,
  depth: MAZE_GRID_OBJECT.height,
}; //o
const MAZE_WALL_VISUALIZATION_RELATIVE_POSITION = {
  x: 0,
  y: 0,
  z: MAZE_WALL_VISUALIZATION_OBJECT.height / 2,
}; //o
/**/

let registry = {
  escapeRoomType: "maze",
  board: nullMatrix(INITIAL_GRID_ROWS, INITIAL_GRID_COLUMNS),
};

const OPACITY_VALUE = 0.5;
const ZERO_VEC3_OBJECT = { x: 0, y: 0, z: 0 };

/**
 * 全要素nullの行列生成関数
 * @param {Number} row 行数
 * @param {Number} column 列数
 * @returns row行column列,全要素nullの行列
 */
function nullMatrix(row, column) {
  return Array.from({ length: row }, () => Array(column).fill(null));
}
