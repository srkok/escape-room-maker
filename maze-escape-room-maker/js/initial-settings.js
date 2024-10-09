const INITIAL_GRID_ROWS = 3;
const INITIAL_GRID_COLUMNS = 4;
const MAZE_GRID_OBJECT = { primitive: "plane", height: 4, width: 4 };
const MAZE_GRID_COLOR = "silver";
const MAZE_GRID_HIGHLIGHT_COLOR = "green";
const MAZE_WALL_OBJECT = {
  primitive: "plane",
  height: MAZE_GRID_OBJECT.height,
  width: 0.5,
};
const MAZE_WALL_COLOR = "gray";
const MAZE_WALL_HIGHLIGHT_COLOR = "green";
const MAZE_WALL_RIGHT_RELATIVE_POSITION = {
  x: (MAZE_GRID_OBJECT.width + MAZE_WALL_OBJECT.width) / 2,
  y: 0,
  z: 0,
};
const MAZE_WALL_ABOVE_RELATIVE_POSITION = {
  x: 0,
  y: (MAZE_GRID_OBJECT.height + MAZE_WALL_OBJECT.width) / 2,
  z: 0,
};
const MAZE_WALL_VISUALIZATION_OBJECT = {
  primitive: "box",
  height: 4,
  width: MAZE_WALL_OBJECT.width,
  depth: MAZE_GRID_OBJECT.height,
};
const MAZE_WALL_VISUALIZATION_RELATIVE_POSITION = {
  x: 0,
  y: 0,
  z: MAZE_WALL_VISUALIZATION_OBJECT.height / 2,
};

let registry = {
  escapeRoomType: "maze",
  board: nullMatrix(INITIAL_GRID_ROWS, INITIAL_GRID_COLUMNS),
};

const OPACITY_VALUE = 0.5;
const ZERO_VEC3_OBJECT = { x: 0, y: 0, z: 0 };
function nullMatrix(row, column) {
  return Array.from({ length: row }, () => Array(column).fill(null));
}
