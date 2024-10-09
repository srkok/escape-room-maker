async function loadProgress() {
  const quizGrids = document.getElementById("quizGrids");
  quizGrids.innerHTML = "";
  await Promise.all([waitForObjectReady(quizGrids)]);
  /** set quiz grids */
  const indexOfAddQuizGrid =
    Math.max(
      ...Object.keys(registry)
        .map(Number)
        .filter((value) => !Number.isNaN(value))
    ) + 1;
  if (
    !registry ||
    Object.keys(registry).length === 0 ||
    indexOfAddQuizGrid === -Infinity
  ) {
    console.error("ERR! registry is invalid.");
    return;
  }
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
  for (const name in registry) {
    if (!isNaN(Number(name))) {
      setQuizBoard(quizGrids.children[Number(name)]);
    }
  }
}
