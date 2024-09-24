/** hover-color-change.component.jsに依存. **/
/** show-quiz-board-settings.component.jsに依存. **/

AFRAME.registerComponent("add-quiz-grid", {
  events: {
    click: async function () {
      const quizGrids = document.getElementById("quizGrids");
      let newGridEl = document.createElement("a-entity");
      newGridEl.classList.add("raycastable");
      newGridEl.setAttribute("show-quiz-board-settings-popup", "");
      const lastMixin = quizGrids.lastElementChild.getAttribute("mixin");
      /** 色指定、silverとgrayが交互になるように **/
      if (lastMixin === "gray quizGrid") {
        newGridEl.setAttribute("mixin", "silver quizGrid");
      } else {
        newGridEl.setAttribute("mixin", "gray quizGrid");
      }
      await waitForObjectReady(this.el);
      const thisPosition = this.el.getAttribute("position");
      /** 現在のgrid追加パネル位置に追加 **/
      newGridEl.setAttribute("position", {
        x: thisPosition.x,
        y: thisPosition.y,
        z: thisPosition.z + 4,
      });
      /** grid追加用パネルを右にずらす **/
      this.el.setAttribute("position", {
        x: thisPosition.x + 4,
        y: thisPosition.y,
        z: thisPosition.z,
      });
      quizGrids.appendChild(newGridEl);
    },
  },
});
