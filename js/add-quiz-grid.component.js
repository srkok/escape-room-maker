AFRAME.registerComponent("add-quiz-grid", {
  events: {
    click: async function () {
      const quizGrids = document.getElementById("quizGrids");
      let newGridEl = document.createElement("a-entity");
      await waitForObjectReady(this.el);
      const thisPosition = this.el.getAttribute("position");
      initializeQuizGrid(newGridEl, thisPosition.x / QUIZ_GRID_OBJECT.width);
      initializeAddQuizGrid({
        ...thisPosition,
        x: thisPosition.x + QUIZ_GRID_OBJECT.width,
      });
      quizGrids.appendChild(newGridEl);
    },
  },
});
