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

const OPACITY_VALUE = 0.5;

const ARROW_WIDTH = 0.8;
const ARROW_COLOR = "red";
const ARROW_DISTANCE = 0.2;
const ARROW_HEAD_SCALE = "1.7 1.2 1.2";
const ARROW_POSITION_Z = [5, -1.25]; // 奇数なら下迂回、偶数なら上迂回

let registry = {}; // 状態保存先
