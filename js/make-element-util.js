/**
 * newElを設定
 * @param {Node} newEl 設定対象
 * @param {String} geometry 形状
 * @param {String} color 色
 * @param {vec3} position 位置
 * @param {vec3} rotation 回転
 * @param {Boolean} isVisible 可視性
 */
function setNewElementProperties(
  newEl,
  geometry,
  color,
  position,
  rotation,
  isVisible
) {
  newEl.setAttribute("geometry", geometry);
  newEl.setAttribute("material", "color", color);
  newEl.setAttribute("position", position);
  newEl.setAttribute("rotation", rotation);
  if (!isVisible) {
    newEl.setAttribute("material", "opacity", OPACITY_VALUE);
  }
}

/**
 * newElにマウスカーソルが乗った/離れた際の色について設定する
 * @param {Node} newEl 設定対象
 * @param {String} defaultColor マウスが触れていない状態での色
 * @param {String} highlightColor マウスが触れている状態での色
 */
function setActionSettingsProperties(newEl, defaultColor, highlightColor) {
  newEl.classList.add("raycastable");
  newEl.setAttribute(
    "hover-color-change",
    `mouseenterColor: ${highlightColor}; mouseleaveColor: ${defaultColor}`
  );
}

/**
 * @param {Object} newQuizGridEl Setting target
 * @param {Number} name index of Setting target
 */
function initializeQuizGrid(newQuizGridEl, name) {
  const newQuizGridColor =
    QUIZ_GRID_DEFAULT_COLORS[name % QUIZ_GRID_DEFAULT_COLORS.length];
  setNewElementProperties(
    newQuizGridEl,
    QUIZ_GRID_OBJECT,
    newQuizGridColor,
    { x: name * QUIZ_GRID_OBJECT.width, y: 0, z: 0 },
    ZERO_VEC3_OBJECT,
    true
  );
  newQuizGridEl.classList.add("raycastable");
  newQuizGridEl.setAttribute(
    "hover-color-change",
    `mouseenterColor: ${QUIZ_GRID_HIGHLIGHT_COLOR}; mouseleaveColor: ${newQuizGridColor}`
  );
  newQuizGridEl.setAttribute("show-quiz-board-settings-popup", "");
}

/**
 * @param {vec3} position
 */
function initializeAddQuizGrid(position) {
  const addQuizGridEl = document.getElementById("addQuizGrid");
  setNewElementProperties(
    addQuizGridEl,
    QUIZ_GRID_OBJECT,
    QUIZ_ADD_GRID_DEFAULT_COLOR,
    position,
    { x: -90, y: 0, z: 0 },
    true
  );
  addQuizGridEl.classList.add("raycastable");
  addQuizGridEl.setAttribute("add-quiz-grid", "");
}

/**
 * make quiz board & text & arrows
 * @param {Object} selectGridEl the base on making quiz
 */
async function setQuizBoard(selectGridEl) {
  const quizGrids = document.getElementById("quizGrids");
  selectGridEl.innerHTML = "";
  waitForObjectReady(selectGridEl);
  const selectedGridIdx =
    selectGridEl.getAttribute("position").x / QUIZ_GRID_OBJECT.width;
  /** set quiz board **/
  let newQuizBoardEl = document.createElement("a-entity");
  setNewElementProperties(
    newQuizBoardEl,
    QUIZ_BOARD_OBJECT,
    registry[selectedGridIdx].outerColor,
    QUIZ_BOARD_RELATIVE_POSITION_OBJECT,
    ZERO_VEC3_OBJECT,
    registry[selectedGridIdx].isVisible
  );
  if (registry[selectedGridIdx].isClickable) {
    setActionSettingsProperties(
      newQuizBoardEl,
      registry[selectedGridIdx].outerColor,
      registry[selectedGridIdx].highlightColor
    );
    /** set arrows **/
    for (let target of registry[selectedGridIdx].influenceTargets) {
      makeArrow(selectGridEl, quizGrids.children[Number(target)]);
    }
  }
  selectGridEl.appendChild(newQuizBoardEl);
  /** set quiz text **/
  let newQuizTextEl = document.createElement("a-entity");
  setNewElementProperties(
    newQuizTextEl,
    QUIZ_TEXT_OBJECT,
    registry[selectedGridIdx].innerColor,
    QUIZ_TEXT_RELATIVE_POSITION_OBJECT,
    { x: 90, y: 0, z: 0 },
    registry[selectedGridIdx].isVisible
  );
  newQuizTextEl.setAttribute(
    "text",
    "value: " + registry[selectedGridIdx].quizText
  );
  newQuizTextEl.setAttribute(
    "text",
    "color",
    registry[selectedGridIdx].quizTextColor
  );
  selectGridEl.appendChild(newQuizTextEl);
}
