/** hover-color-change.component.jsに依存してます。 **/

let selectedGrid = null;

AFRAME.registerComponent("show-quiz-board-settings-popup", {
  events: {
    click: function (evt) {
      selectedGrid = this.el;
      quizSettingsModal.style.display = "block";
      overlay.style.display = "block";
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
      for (let i = 0; i < grids.length; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `Grid ${i}`;
        actionTargets.appendChild(option);
      }
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
        selectedGrid.getAttribute("position").x / 4,
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

/** クイズボード生成 **
    let newQuizBoardEl = document.createElement("a-entity");
    setNewElementProperties(
      newQuizBoardEl,
      QUIZ_BOARD_OBJECT,
      outerColorPicker.value,
      QUIZ_BOARD_RELATIVE_POSITION_OBJECT,
      ZERO_VEC3_OBJECT,
      toggleVisibilityButton.textContent === "Show"
    );
    /****/
/** アニメーション設定 **
      setActionSettingsProperties(
        newQuizBoardEl,
        outerColorPicker.value,
        selectingColorPicker.value
      );
      /** 矢印の生成 **/
/*
        let targetGridEl =
          document.getElementById("quizGrids").children[option.value];
        makeArrow(selectedGrid, targetGridEl);*/
/*
    selectedGrid.appendChild(newQuizBoardEl);
    /** クイズテキスト生成 **
    let newQuizTextEl = document.createElement("a-entity");
    setNewElementProperties(
      newQuizTextEl,
      QUIZ_TEXT_OBJECT,
      innerColorPicker.value,
      QUIZ_TEXT_RELATIVE_POSITION_OBJECT,
      { x: 90, y: 0, z: 0 },
      toggleVisibilityButton.textContent === "Show"
    );
    newQuizTextEl.setAttribute("text", "value: " + quizText.value);
    newQuizTextEl.setAttribute("text", "color", quizTextColorPicker.value);
    selectedGrid.appendChild(newQuizTextEl); // TODO selectedGridにappendするの?確認。*/
