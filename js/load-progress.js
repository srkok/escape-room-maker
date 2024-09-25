async function loadProgress() {
  const quizGrids = document.getElementById("quizGrids");
  quizGrids.innerHTML = "";
  await Promise.all([waitForObjectReady(quizGrids)]);
  console.log(quizGrids.children);
  /** set quiz grids */
  const indexOfAddQuizGrid = Math.max(...Object.keys(registry).map(Number)) + 1;
  for (let idx = 0; idx < indexOfAddQuizGrid; idx++) {
    let newQuizGridEl = document.createElement("a-entity");
    initializeQuizGrid(newQuizGridEl, idx);
    quizGrids.appendChild(newQuizGridEl);
  }
  /** set add-quiz grid */
  initializeAddQuizGrid({
    x: indexOfAddQuizGrid * QUIZ_GRID_OBJECT.width,
    y: 0,
    z: QUIZ_GRIDS_POSITION_OBJECT.z,
  });
  await Promise.all([waitForObjectReady(quizGrids)]);
  /** set quiz boards */
  for (const name in registry) setQuizBoard(quizGrids.children[Number(name)]);
}
