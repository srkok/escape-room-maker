/** multi-choice escape room settings **/
const QUIZ_GRIDS_NUM = 4;
const QUIZ_GRIDS_POSITION_OBJECT = { x: 0, y: 0, z: -4 };
const QUIZ_GRIDS_POSITION_STRING = "0 0 -4";

const QUIZ_GRID_OBJECT = { primitive: "plane", height: 2, width: 4 };
const QUIZ_GRID_STRING = "primitive: plane; height: 2; width: 4";
const QUIZ_GRID_DEFAULT_COLORS = ["gray", "silver"];
const QUIZ_GRID_HIGHLIGHT_COLOR = "green";
const QUIZ_ADD_GRID_DEFAULT_COLOR = "black";

const QUIZ_BOARD_OBJECT = { primitive: "box", height: 2, width: 4, depth: 4 };
const QUIZ_BOARD_STRING = "primitive: box; height: 2; width: 4; depth: 4";
const QUIZ_BOARD_RELATIVE_POSITION_OBJECT = { x: 0, y: 0, z: 2.1 };
const QUIZ_BOARD_RELATIVE_POSITION_STRING = "0 0 2.1";

const QUIZ_TEXT_OBJECT = { primitive: "plane", height: 3.5, width: 3.5 };
const QUIZ_TEXT_STRING = "primitive: plane; height: 3.5; width: 3.5";
const QUIZ_TEXT_RELATIVE_POSITION_OBJECT = { x: 0, y: -1.1, z: 2.1 };
const QUIZ_TEXT_RELATIVE_POSITION_STRING = "0 -1.1 2.1";

/** maze escape room settings **/
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
const MAZE_WALL_BELOW_RELATIVE_POSITION = {
  x: (MAZE_GRID_OBJECT.width + MAZE_WALL_OBJECT.width) / 2,
  y: 0,
  z: 0,
};
const MAZE_WALL_RIGHT_RELATIVE_POSITION = {
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

/** general settings **/
const ZERO_VEC3_OBJECT = { x: 0, y: 0, z: 0 };
const ZER_VEC3_STRING = "0 0 0";

let registry = {}; // 状態保存先

const ALERT_DISTANCE = 2.5;
