let INITIAL_GRID_ROWS = 3;
let INITIAL_GRID_COLUMNS = 4;

const OPACITY_VALUE = 0.5;
const ZERO_VEC3_OBJECT = { x: 0, y: 0, z: 0 };

const MAZE_GRIDS_POSITION = { x: 0, y: 0, z: -4 };
const MAZE_GRIDS_ROTATION = { x: 0, y: 0, z: 0 };

const MAZE_GRID_SETTINGS = {
  object: { primitive: "plane", height: 4, width: 4 },
  color: "silver",
  text: (i, j) => `value: Grid ${i} ${j}; align: center`,
  rotation: { x: -90, y: 0, z: 0 },
};

const MAZE_WALL_GRID_WIDTH = 0.5; // settingsでposition設定がobject.withに依存するため,ここで定義.
const MAZE_WALL_GRID_SETTINGS = {
  right: {
    object: {
      primitive: "plane",
      height: MAZE_GRID_SETTINGS.object.height,
      width: MAZE_WALL_GRID_WIDTH,
    },
    color: "gray",
    highlightColor: "green",
    position: {
      x: (MAZE_GRID_SETTINGS.object.width + MAZE_WALL_GRID_WIDTH) / 2,
      y: 0,
      z: 0,
    },
    rotation: { x: 0, y: 0, z: 0 },
  },
  below: {
    object: {
      primitive: "plane",
      height: MAZE_WALL_GRID_WIDTH,
      width: MAZE_GRID_SETTINGS.object.height,
    },
    color: "gray",
    highlightColor: "green",
    position: {
      x: 0,
      y: -(MAZE_GRID_SETTINGS.object.width + MAZE_WALL_GRID_WIDTH) / 2,
      z: 0,
    },
    rotation: { x: 0, y: 0, z: 0 },
  },
};

const MAZE_WALL_VISUALIZATION_HEIGHT = 4; // settingsでposition設定がobject.heightに依存するため,ここで定義.
const MAZE_WALL_VISUALIZATION_SETTINGS = {
  right: {
    object: {
      primitive: "box",
      height: MAZE_WALL_VISUALIZATION_HEIGHT,
      width: MAZE_WALL_GRID_SETTINGS.right.object.width,
      depth: MAZE_WALL_GRID_SETTINGS.right.object.height,
    },
    color: "gray",
    position: { x: 0, y: 0, z: MAZE_WALL_VISUALIZATION_HEIGHT / 2 },
    rotation: { x: 0, y: 0, z: 0 }, //
    opacity: OPACITY_VALUE,
  },
  below: {
    object: {
      primitive: "box",
      height: MAZE_WALL_VISUALIZATION_HEIGHT,
      width: MAZE_WALL_GRID_SETTINGS.below.object.width,
      depth: MAZE_WALL_GRID_SETTINGS.below.object.height,
    },
    color: "gray",
    position: { x: 0, y: 0, z: MAZE_WALL_VISUALIZATION_HEIGHT / 2 },
    rotation: { x: 90, y: 0, z: 0 },
    opacity: OPACITY_VALUE,
  },
};

let registry = {
  escapeRoomType: "maze",
  board: nullMatrix(INITIAL_GRID_ROWS, INITIAL_GRID_COLUMNS),
};

/**
 * 全要素nullの行列生成関数
 * @param {Number} row 行数
 * @param {Number} column 列数
 * @returns row行column列,全要素nullの行列
 */
function nullMatrix(row, column) {
  return Array.from({ length: row }, () => Array(column).fill(null));
}
