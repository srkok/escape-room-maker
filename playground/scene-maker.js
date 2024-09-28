function sceneMaker(dataObject) {
  const quizGrids = document.getElementById("quizGrids");

  /** 一度すべてのquizBlocksを生成し終える **/
  for (const name in dataObject) {
    /** 外箱の設定 **/
    let newQuizBoardEl = document.createElement("a-entity");
    setNewElementProperties(
      newQuizBoardEl,
      QUIZ_BOARD_OBJECT,
      dataObject[name].outerColor,
      {
        ...QUIZ_BOARD_RELATIVE_POSITION_OBJECT,
        x: Number(name) * QUIZ_BOARD_OBJECT.width,
      },
      ZERO_VEC3_OBJECT,
      dataObject[name].isVisible
    );
    /** 内テキストの設定 **/
    let newQuizTextEl = document.createElement("a-entity");
    setNewElementProperties(
      newQuizTextEl,
      QUIZ_TEXT_OBJECT,
      dataObject[name].innerColor,
      { x: 0, y: -1.1, z: 0 },
      { x: 90, y: 0, z: 0 },
      true
    );
    newQuizTextEl.setAttribute("text", "value: " + dataObject[name].quizText);
    newQuizTextEl.setAttribute("text", "color", dataObject[name].quizTextColor);
    /** 生成 **/
    newQuizBoardEl.appendChild(newQuizTextEl);
    quizGrids.appendChild(newQuizBoardEl);
  }
  /** create Goal Grid **/
  let newGoalGridEl = document.createElement("a-entity");
  let indexOfAddQuizGrid = Math.max(...Object.keys(dataObject).map(Number)) + 1;
  if (indexOfAddQuizGrid < QUIZ_GRIDS_NUM) indexOfAddQuizGrid = QUIZ_GRIDS_NUM;
  setNewElementProperties(
    newGoalGridEl,
    QUIZ_GRID_OBJECT,
    QUIZ_ADD_GRID_DEFAULT_COLOR,
    { x: indexOfAddQuizGrid * QUIZ_BOARD_OBJECT.width, y: 0, z: 0 },
    ZERO_VEC3_OBJECT,
    false
  );
  newGoalGridEl.setAttribute(
    "text",
    "value: Goal\nIt is not working right now."
  );
  newGoalGridEl.setAttribute("text", "align: center");
  //newGoalGridEl.setAttribute("goal-alert-popup", "");
  quizGrids.appendChild(newGoalGridEl);
  /** 全てのquizBlocksを生成し終えたのち、相互作用の設定に移る **/
  for (const name in dataObject) {
    if (dataObject[name].isClickable) {
      const clickableQuizBoardEl = quizGrids.children[Number(name)];
      setActionSettingsProperties(
        clickableQuizBoardEl,
        dataObject[name].outerColor,
        dataObject[name].highlightColor
      );
      clickableQuizBoardEl.addEventListener("click", () => {
        dataObject[name].influenceTargets.forEach((el) => {
          const targetEl = quizGrids.children[Number(el)];
          toggleVisible(targetEl);
        });
      });
    }
  }
}
