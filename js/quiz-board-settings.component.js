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

/**
 * newElを設定
 * @param {Node} newEl 設定対象
 * @param {String} geometry 形状
 * @param {String} color 色
 * @param {vec3} position 位置
 * @param {vec3} rotation 回転
 * @param {String} isVisible 可視性
 */
function setNewElementProperties(
  newEl,
  geometry,
  color,
  position,
  rotation,
  isVisible
) {
  newEl.setAttribute("geometry", geometry);
  newEl.setAttribute("material", "color", color);
  newEl.setAttribute("position", position);
  newEl.setAttribute("rotation", rotation);
  if (isVisible === "Hide") {
    newEl.setAttribute("material", "opacity", OPACITY_VALUE);
  }
}

/**
 * newElにマウスカーソルが乗った/離れた際の色について設定する
 * @param {Node} newEl 設定対象
 * @param {String} defaultColor マウスが触れていない状態での色
 * @param {String} highlightColor マウスが触れている状態での色
 */
function setActionSettingsProperties(newEl, defaultColor, highlightColor) {
  newEl.classList.add("raycastable");
  newEl.setAttribute(
    "hover-color-change",
    `mouseenterColor: ${highlightColor}; mouseleaveColor: ${defaultColor}`
  );
}

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
    /** クイズボード生成 **/
    let newQuizBoardEl = document.createElement("a-entity");
    setNewElementProperties(
      newQuizBoardEl,
      QUIZ_BOARD_OBJECT,
      outerColorPicker.value,
      { x: 0, y: 0, z: 2.1 },
      ZERO_VEC3_OBJECT,
      toggleVisibilityButton.textContent
    );
    if (toggleClickabilityButton.textContent === "Clickable") {
      setActionSettingsProperties(
        newQuizBoardEl,
        outerColorPicker.value,
        selectingColorPicker.value
      );
    }
    selectedGrid.appendChild(newQuizBoardEl);
    /** クイズテキスト生成 **/
    let newQuizTextEl = document.createElement("a-entity");
    setNewElementProperties(
      newQuizTextEl,
      QUIZ_TEXT_OBJECT,
      innerColorPicker.value,
      { x: 0, y: -1.1, z: 2.1 },
      { x: 90, y: 0, z: 0 },
      toggleVisibilityButton.textContent
    );
    newQuizTextEl.setAttribute("text", "value: " + quizText.value);
    newQuizTextEl.setAttribute("text", "color", quizTextColorPicker.value);
    if (toggleClickabilityButton.textContent === "Clickable") {
      setActionSettingsProperties(
        newQuizTextEl,
        innerColorPicker.value,
        selectingColorPicker.value
      );
    } // TODO いらない?検討。
    selectedGrid.appendChild(newQuizTextEl); // TODO selectedGridにappendするの?確認。
    /** 矢印の生成 **/
    let selectedGridOptions = Array.from(actionTargets.selectedOptions);
    let influenceTargets = [];
    selectedGridOptions.forEach((option) => {
      let targetGridEl =
        document.getElementById("quizGrids").children[option.value];
      makeArrow(selectedGrid, targetGridEl);
      influenceTargets.push(option.value);
    });
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
