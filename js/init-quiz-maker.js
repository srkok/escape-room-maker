function initQuizMaker(quizGridsNum) {
  const quizGrids = document.getElementById("quizGrids");
  quizGrids.setAttribute("position", QUIZ_GRIDS_POSITION_OBJECT);
  quizGrids.innerHTML = "";
  for (let i = 0; i < quizGridsNum; i++) {
    let newQuizGridEl = document.createElement("a-entity");
    initializeQuizGrid(newQuizGridEl, i);
    quizGrids.appendChild(newQuizGridEl);
  }
  initializeAddQuizGrid({
    x: quizGridsNum * QUIZ_GRID_OBJECT.width,
    y: 0,
    z: QUIZ_GRIDS_POSITION_OBJECT.z,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initQuizMaker(QUIZ_GRIDS_NUM);
});
