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
        const applyButton = document.getElementById("applyButton");

        applyButton.addEventListener("click", () => {
          /**/
          console.log("outer color: " + outerColorPicker.value);
          console.log("inner color: " + innerColorPicker.value);
          console.log("quiz text: " + quizText.value);
          /** クイズボード生成 **/
          let newQuizBoardEl = document.createElement("a-entity");
          newQuizBoardEl.setAttribute("geometry", {
            primitive: "box",
            height: 2,
            width: 4,
            depth: 4,
          });
          newQuizBoardEl.setAttribute(
            "material",
            "color",
            outerColorPicker.value
          );
          let selectedGridPosition = selectedGrid.getAttribute("position");
          newQuizBoardEl.setAttribute("position", {
            x: 0,
            y: selectedGridPosition.y,
            z: selectedGridPosition.z + 2.1,
          });
          // TODO idいる?要検討
          newQuizBoardEl.setAttribute(
            "id",
            "quizBoard" + selectedGridPosition.x / 4
          );
          selectedGrid.appendChild(newQuizBoardEl);
          /** クイズテキスト生成 **/
          let newQuizTextEl = document.createElement("a-entity");
          newQuizTextEl.setAttribute("geometry", {
            primitive: "plane",
            height: 3.5,
            width: 3.5,
          });
          newQuizTextEl.setAttribute(
            "material",
            "color",
            innerColorPicker.value
          );
          newQuizTextEl.setAttribute("text", "value: " + quizText.value);
          newQuizTextEl.setAttribute("position", {
            x: 0,
            y: selectedGridPosition.y - 1.1,
            z: selectedGridPosition.z + 2.1,
          });
          newQuizTextEl.setAttribute("rotation", { x: 90, y: 0, z: 0 });
          // TODO idいる?要検討
          newQuizTextEl.setAttribute(
            "id",
            "quizText" + selectedGridPosition.x / 4
          );
          selectedGrid.appendChild(newQuizTextEl);
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