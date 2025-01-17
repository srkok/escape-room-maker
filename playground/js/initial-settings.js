/** general settings **/
const ZERO_VEC3_OBJECT = { x: 0, y: 0, z: 0 };
const ZER_VEC3_STRING = "0 0 0";

let registry = {}; // 状態保存先

const ALERT_DISTANCE = 2.5;

/** multi-choice escape room settings **/
const QUIZ_GRIDS_NUM = 4;
const QUIZ_GRIDS_POSITION_OBJECT = { x: 0, y: 0, z: -4 };

const QUIZ_GRID_OBJECT = { primitive: "plane", height: 2, width: 4 };
const QUIZ_GRID_DEFAULT_COLORS = ["gray", "silver"];
const QUIZ_GRID_HIGHLIGHT_COLOR = "green";
const QUIZ_ADD_GRID_DEFAULT_COLOR = "black";

const QUIZ_BOARD_OBJECT = { primitive: "box", height: 2, width: 4, depth: 4 };
const QUIZ_BOARD_RELATIVE_POSITION_OBJECT = { x: 0, y: 0, z: 2.1 };

const QUIZ_TEXT_OBJECT = { primitive: "plane", height: 3.5, width: 3.5 };
const QUIZ_TEXT_RELATIVE_POSITION_OBJECT = { x: 0, y: -1.1, z: 2.1 };

/** maze escape room settings **/
const MAZE_GRIDS_POSITION = { x: 0, y: 0, z: 0 };
const MAZE_GRIDS_ROTATION = { x: 0, y: 0, z: 0 };

const MAZE_GRID_SETTINGS = {
  object: { primitive: "plane", height: 4, width: 4 },
  color: "gray",
  text: (i, j) => `value: Grid ${i} ${j}; opacity: 0; align: center`, //invisible text
  rotation: { x: -90, y: 0, z: 0 },
};

const MAZE_WALLGRID_WIDTH = 0.5;
const MAZE_WALLGRID_SETTINGS = {
  object: {
    primitive: "plane",
    height: MAZE_GRID_SETTINGS.object.height,
    width: MAZE_WALLGRID_WIDTH,
  },
  color: "gray",
  position: {
    below: {
      x: 0,
      y: -(MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH) / 2,
      z: 0,
    },
    right: {
      x: (MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH) / 2,
      y: 0,
      z: 0,
    },
  },
  rotation: {
    below: { x: 0, y: 0, z: 90 },
    right: { x: 0, y: 0, z: 0 },
  },
};

MAZE_WALL_HEIGHT = 4;
const MAZE_WALL_SETTINGS = {
  object: {
    primitive: "box",
    height: MAZE_WALL_HEIGHT,
    width: MAZE_WALLGRID_SETTINGS.object.width,
    depth: MAZE_WALLGRID_SETTINGS.object.height,
  },
  color: "silver",
  position: { x: 0, y: 0, z: MAZE_WALL_HEIGHT / 2 },
  rotation: { x: 0, y: 0, z: 0 },
};
