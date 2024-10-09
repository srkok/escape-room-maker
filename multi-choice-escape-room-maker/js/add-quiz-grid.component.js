AFRAME.registerComponent("add-quiz-grid", {
  events: {
    click: async function () {
      const quizGrids = document.getElementById("quizGrids");
      /** 新しくquizGridを追加 */
      let newGridEl = document.createElement("a-entity");
      await waitForObjectReady(this.el);
      const thisPosition = this.el.getAttribute("position");
      initializeQuizGrid(newGridEl, thisPosition.x / QUIZ_GRID_OBJECT.width);
      quizGrids.appendChild(newGridEl);
      /** addQuizGridを移動 */
      initializeAddQuizGrid({
        ...thisPosition,
        x: thisPosition.x + QUIZ_GRID_OBJECT.width,
      });
    },
  },
});
