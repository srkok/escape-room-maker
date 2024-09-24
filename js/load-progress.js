//let registry = {};

//考え中.
function initializeQuizGrid(newQuizGridEl, name) {
  newQuizGridEl.setAttribute(
    "mixin",
    `${["gray", "silver"][name % 2]} quizGrid`
  );
  newQuizGridEl.setAttribute("position", { x: name * 4, y: 0, z: 0 });
  newQuizGridEl.classList.add("raycastable");
  newQuizGridEl.setAttribute("show-quiz-board-settings-popup", "");
}

//考え中.
/**
 * addQuizPanelの移動
 * @param {vec3} positionX 移動先
 */
function moveAddQuizPanel(positionX) {
  //
}

//考え中.
function loadProgress(dataObject) {
  const quizGrids = document.getElementById("quizGrids");
  /** delete all */
  quizGrids.innerHTML = "";
  /** generate quizGrids */
  for (const name in dataObject) {
    let newQuizGridEl = document.createElement("a-entity");
    initializeQuizGrid(newQuizGridEl, name);
    quizGrids.appendChild(newQuizGridEl);
  }
  /** move addQuizGrid */
  /** generate quizBoard/Text/Arrows */
  for (const name in dataObject) {
    const selectedGrid = quizGrids.children[name];
    /** quizBoard generate */
    let newQuizBoardEl = document.createElement("a-entity");
    setNewElementProperties(
      newQuizBoardEl,
      QUIZ_BOARD_OBJECT,
      dataObject[name].outerColor,
      { x: 0, y: 0, z: 2.1 },
      ZERO_VEC3_OBJECT,
      dataObject[name].isVisible ? "Show" : "Hide"
    );
    if (dataObject[name].isClickable) {
      setActionSettingsProperties(
        newQuizBoardEl,
        dataObject[name].outerColor,
        dataObject[name].highlightColor
      );
    }
    /** quizText generate */
    let newQuizTextEl = document.createElement("a-entity");
    setNewElementProperties(
      newQuizTextEl,
      QUIZ_TEXT_OBJECT,
      dataObject[name].innerColor,
      { x: 0, y: -1.1, z: 2.1 },
      { x: 90, y: 0, z: 0 },
      dataObject[name].isVisible ? "Show" : "Hide"
    );
    newQuizTextEl.setAttribute("text", "value: " + dataObject[name].quizText);
    newQuizTextEl.setAttribute("text", "color", dataObject[name].quizTextColor);
    selectedGrid.appendChild(newQuizBoardEl);
    selectedGrid.appendChild(newQuizTextEl);
  }
  /** arrows generate */
}
