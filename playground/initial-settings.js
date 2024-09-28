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

const ZERO_VEC3_OBJECT = { x: 0, y: 0, z: 0 };
const ZER_VEC3_STRING = "0 0 0";

let registry = {}; // 状態保存先
