/** hover-color-change.component.jsに依存してます。 **/

let selectedGrid = null;

AFRAME.registerComponent("show-quiz-board-settings-popup", {
  init: function () {
    this.name = this.el.getAttribute("position").x / QUIZ_GRID_OBJECT.width;
    this.quizSettingsModal = document.getElementById("quizSettingsModal");
    this.overlay = document.getElementById("overlay");
    this.outerColorPicker = document.getElementById("outerColorPicker");
    this.innerColorPicker = document.getElementById("innerColorPicker");
    this.quizText = document.getElementById("quizText");
    this.quizTextColorPicker = document.getElementById("quizTextColorPicker");
    this.toggleVisibilityButton = document.getElementById(
      "toggleVisibilityButton"
    );
  },
  events: {
    click: function () {
      selectedGrid = this.el;
      if (this.name in registry) {
        // set up existing settings
        this.outerColorPicker.value = registry[this.name].outerColor;
        this.innerColorPicker.value = registry[this.name].innerColor;
        this.quizText.value = registry[this.name].quizText;
        this.quizTextColorPicker.value = registry[this.name].quizTextColor;
        if (registry[this.name].isVisible) {
          this.toggleVisibilityButton.textContent = "Show";
        } else {
          this.toggleVisibilityButton.textContent = "Hide";
        }
      }
      this.quizSettingsModal.style.display = "block";
      this.overlay.style.display = "block";
    },
  },
});

window.onload = () => {
  const overlay = document.getElementById("overlay");
  const quizSettingsModal = document.getElementById("quizSettingsModal");
  const outerColorPicker = document.getElementById("outerColorPicker");
  const innerColorPicker = document.getElementById("innerColorPicker");
  const quizText = document.getElementById("quizText");
  const quizTextColorPicker = document.getElementById("quizTextColorPicker");
  const applyButton = document.getElementById("applyButton");
  const toggleVisibilityButton = document.getElementById(
    "toggleVisibilityButton"
  );
  const toggleClickabilityButton = document.getElementById(
    "toggleClickabilityButton"
  );
  const actionSettings = document.getElementById("actionSettings");
  const selectingColorPicker = document.getElementById("selectingColorPicker");
  const actionTargets = document.getElementById("actionTargets");

  toggleVisibilityButton.addEventListener("click", () => {
    if (toggleVisibilityButton.textContent === "Show") {
      toggleVisibilityButton.textContent = "Hide";
    } else {
      toggleVisibilityButton.textContent = "Show";
    }
  });

  toggleClickabilityButton.addEventListener("click", () => {
    if (toggleClickabilityButton.textContent === "Clickable") {
      toggleClickabilityButton.textContent = "UnClickable";
      actionSettings.style.display = "none";
    } else {
      toggleClickabilityButton.textContent = "Clickable";
      /** 作用先の選択肢を列挙 **/
      actionTargets.innerHTML = "";
      let grids = document.getElementById("quizGrids").children;
      console.log(`grids length: ${grids.length}`);
      for (let i = 0; i < grids.length; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `Grid ${i}`;
        actionTargets.appendChild(option);
      }
      /** Goalについての指定 **/
      let option = document.createElement("option");
      option.value = grids.length;
      option.textContent = "Goal";
      actionTargets.appendChild(option);
      actionSettings.style.display = "block";
    }
  });

  applyButton.addEventListener("click", () => {
    /** 既存要素の削除 **/
    // FIXME 今は「全削除->新しく生成」だが、「あるなら変更、ないなら生成」に変更すべき？
    selectedGrid.innerHTML = "";
    let influenceTargets = [];
    if (toggleClickabilityButton.textContent === "Clickable") {
      let selectedGridOptions = Array.from(actionTargets.selectedOptions);
      selectedGridOptions.forEach((option) => {
        influenceTargets.push(option.value);
      });
    }
    /** 状態保存 **/
    selectedGrid.addEventListener(
      "loaded",
      updateRegistry(
        selectedGrid.getAttribute("position").x / QUIZ_GRID_OBJECT.width,
        outerColorPicker.value,
        innerColorPicker.value,
        quizText.value,
        quizTextColorPicker.value,
        toggleVisibilityButton.textContent === "Show" ? true : false,
        toggleClickabilityButton.textContent === "Clickable" ? true : false,
        toggleClickabilityButton.textContent === "Clickable"
          ? selectingColorPicker.value
          : null,
        toggleClickabilityButton.textContent === "Clickable"
          ? influenceTargets
          : null
      )
    );
    /** make quiz board */
    setQuizBoard(selectedGrid);
    /** 初期状態を常にUnClickableに。ちょっとした仕様の解釈違いを防ぐため。 **/
    /** これがないと、次にadd quiz grid後に設定メニューに入った時、追加したハズのgridが選択肢に追加されていない。 **/
    /** 一度Unclickableにした後再度Clickableにすると正しく追加されているが、一目見てバグにしか見えないので、逐一UnClickableに戻す形とする。 **/
    if (toggleClickabilityButton.textContent === "Clickable")
      toggleClickabilityButton.click();
    /** ポップアップ消去 **/
    quizSettingsModal.style.display = "none";
    overlay.style.display = "none";
  });

  // オーバーレイクリックでモーダルを閉じる
  overlay.addEventListener("click", () => {
    quizSettingsModal.style.display = "none";
    overlay.style.display = "none";
  });
};
