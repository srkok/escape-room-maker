function initMazeMaker(row, column) {
  const mazeGrids = document.getElementById("mazeGrids");
  const dragContainer = document.getElementById("dragContainer");
  mazeGrids.setAttribute("position", MAZE_GRIDS_POSITION);
  mazeGrids.setAttribute("rotation", MAZE_GRIDS_ROTATION);
  mazeGrids.innerHTML = "";
  dragContainer.innerHTML = "";
  removeElementsByClass("delete-me");
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      // make grid
      let newGridEl = document.createElement("a-entity");
      const newGridElPosition = {
        x: j * (MAZE_GRID_SETTINGS.object.width + MAZE_WALL_GRID_WIDTH),
        y: 0,
        z: i * (MAZE_GRID_SETTINGS.object.height + MAZE_WALL_GRID_WIDTH),
      };
      setNewElementProperties(
        newGridEl,
        MAZE_GRID_SETTINGS.object,
        MAZE_GRID_SETTINGS.color,
        newGridElPosition,
        MAZE_GRID_SETTINGS.rotation
      );
      newGridEl.setAttribute("text", MAZE_GRID_SETTINGS.text(i, j));
      newGridEl.setAttribute("code-block-slot", "");
      // make gridname's textblock
      dragContainer.appendChild(
        makeTextBlockModel(
          EDITMODE_PARTS.textblock.inner.text.gridname(i, j),
          sumObjectsByKey(
            newGridElPosition,
            EDITMODE_PARTS.textblock.outer.position.gridname
          )
        )
      );

      /**
       * クリックによりWallの設定ができる WallGrid を作成する関数.
       * @param {String} direction "below" or "right"
       * @returns WallGrid element
       */
      function generateWallGrid(direction) {
        // wall grid
        let newWallGridEl = document.createElement("a-entity");
        setNewElementProperties(
          newWallGridEl,
          MAZE_WALL_GRID_SETTINGS[direction].object,
          MAZE_WALL_GRID_SETTINGS[direction].color,
          MAZE_WALL_GRID_SETTINGS[direction].position,
          MAZE_WALL_GRID_SETTINGS[direction].rotation
        );
        setActionSettingsProperties(
          newWallGridEl,
          MAZE_WALL_GRID_SETTINGS[direction].color,
          MAZE_WALL_GRID_SETTINGS[direction].highlightColor
        );
        newWallGridEl.setAttribute(
          "toggle-wall-make",
          `direction: ${direction}`
        );
        // wall visualization
        let newWallVisualizationEl = document.createElement("a-entity");
        setNewElementProperties(
          newWallVisualizationEl,
          MAZE_WALL_VISUALIZATION_SETTINGS[direction].object,
          MAZE_WALL_VISUALIZATION_SETTINGS[direction].color,
          MAZE_WALL_VISUALIZATION_SETTINGS[direction].position,
          MAZE_WALL_VISUALIZATION_SETTINGS[direction].rotation
        );
        newWallVisualizationEl.setAttribute(
          "material",
          "opacity",
          MAZE_WALL_VISUALIZATION_SETTINGS[direction].opacity
        );
        if (
          !registry.board[i][j][
            `is${direction[0].toUpperCase() + direction.slice(1)}Wall`
          ]
        ) {
          newWallVisualizationEl.setAttribute("scale", ZERO_VEC3_OBJECT);
        }
        newWallGridEl.appendChild(newWallVisualizationEl);
        return newWallGridEl;
      }

      // make below wall
      newGridEl.appendChild(generateWallGrid("below"));
      // below wall textblock
      dragContainer.appendChild(
        makeTextBlockModel(
          EDITMODE_PARTS.textblock.inner.text.wallname(i, j, "Below"),
          sumObjectsByKey(
            newGridElPosition,
            MAZE_WALL_GRID_SETTINGS.below.position,
            EDITMODE_PARTS.textblock.outer.position.wallname_below
          )
        )
      );

      // make right wall
      newGridEl.appendChild(generateWallGrid("right"));
      // right wall textblock
      dragContainer.appendChild(
        makeTextBlockModel(
          EDITMODE_PARTS.textblock.inner.text.wallname(i, j, "Right"),
          sumObjectsByKey(
            newGridElPosition,
            MAZE_WALL_GRID_SETTINGS.right.position,
            EDITMODE_PARTS.textblock.outer.position.wallname_right
          )
        )
      );

      mazeGrids.appendChild(newGridEl);

      // registryに従いobjectを生やす
      if (registry.board[i][j].partsName) {
        const editParts = Object.keys(EDITMODE_PARTS).filter(
          (item) => !["all", "startportal", "textblock"].includes(item)
        );
        /**
         * 引数としたelementsが全てload済なら, taegetElにeventを発火させる関数.
         * @param {element} targetEl イベント発火対象
         * @param {String} event イベント内容
         * @param  {...any} elements 条件となるelements
         */
        function setupConditionalDispatch(targetEl, event, ...elements) {
          const flags = new Map(elements.map((el) => [el, false]));
          function conditionalDispatch() {
            if (Array.from(flags.values()).every(Boolean)) {
              targetEl.dispatchEvent(new Event(event));
            }
          }
          elements.forEach((el) => {
            el.addEventListener("loaded", () => {
              flags.set(el, true); // 対応するフラグを true に更新
              conditionalDispatch(); // 状態を確認してイベント発火
            });
          });
        }
        function computeTextSlotWorldPosition(menu_outer, menu_slot) {
          return sumObjectsByKey(
            MAZE_GRIDS_POSITION,
            newGridElPosition,
            {
              x: CODE_BLOCK_SETMENU.outer.position[menu_outer].x,
              y: CODE_BLOCK_SETMENU.outer.position[menu_outer].z,
              z: -CODE_BLOCK_SETMENU.outer.position[menu_outer].y,
            },
            {
              x: CODE_BLOCK_SETMENU.slot.position[menu_slot].x,
              y: CODE_BLOCK_SETMENU.slot.position[menu_slot].z,
              z: -CODE_BLOCK_SETMENU.slot.position[menu_slot].y,
            }
          ); // Gridが地面と平行になるよう回転しているため,その子要素であるouter,slotのy,z座標もGridに応じて変化している.
        }
        if (editParts.includes(registry.board[i][j].partsName)) {
          // set objects
          let newMakePartsFunc = () => {
            throw new Error("no func");
          };
          let positionCorrection = null;
          if (registry.board[i][j].partsName === "octahedron") {
            newMakePartsFunc = makeOctahedronModel;
            positionCorrection = EDITMODE_PARTS.octahedron.position;
          } else if (registry.board[i][j].partsName === "goalflag") {
            newMakePartsFunc = makeGoalFlagModel;
            positionCorrection = EDITMODE_PARTS.goalflag.base.position;
          } else if (registry.board[i][j].partsName === "spiketrap") {
            newMakePartsFunc = makeSpikeTrapModel;
            positionCorrection = EDITMODE_PARTS.spiketrap.base.position;
          }
          let newPartsEl = newMakePartsFunc(
            sumObjectsByKey(
              MAZE_GRIDS_POSITION,
              newGridElPosition,
              invertObjectValues(positionCorrection)
            )
          );
          newPartsEl.classList.add("delete-me");
          newPartsEl.removeAttribute("repop-model");
          dragContainer.appendChild(newPartsEl);
          // dispatchEvent handleMouseUp
          setupConditionalDispatch(
            newPartsEl,
            "initMazeMaker",
            newGridEl,
            newPartsEl
          );

          // set actionTargets textblock
          const actionTargets = registry.board[i][j].actionTargets;
          for (let idx = 0; idx < actionTargets.length; idx++) {
            // get text content
            if (actionTargets[idx] === null) continue;
            let blockText = "";
            if (actionTargets[idx].includes("Wall")) {
              const regex = /Grid (\d+) (\d+) 's\n(\w+) Wall/;
              const match = actionTargets[idx].match(regex);
              blockText = EDITMODE_PARTS.textblock.inner.text.wallname(
                match[1],
                match[2],
                match[3]
              );
            } else {
              const regex = /Grid (\d+) (\d+)/;
              const match = actionTargets[idx].match(regex);
              blockText = EDITMODE_PARTS.textblock.inner.text.gridname(
                match[1],
                match[2]
              );
            }
            // make textblock
            let newActionTargetEl = makeTextBlockModel(
              blockText,
              computeTextSlotWorldPosition(
                "menu_actionTarget",
                `menu_actionTarget${idx + 1}`
              )
            );
            newActionTargetEl.classList.add("delete-me");
            newActionTargetEl.removeAttribute("repop-model");
            dragContainer.appendChild(newActionTargetEl);
            // put textblock on slot
            setupConditionalDispatch(
              newActionTargetEl,
              "initMazeMaker",
              newGridEl,
              newPartsEl,
              newActionTargetEl
            );
          }
        } else if (registry.board[i][j].partsName === "startportal") {
          // only move startportal
          let startPortalEl = document.getElementsByClassName("startportal")[0];
          startPortalEl.setAttribute(
            "position",
            sumObjectsByKey(MAZE_GRIDS_POSITION, newGridElPosition)
          );
          // dispatchEvent handleMouseUp
          setupConditionalDispatch(
            startPortalEl,
            "initMazeMaker",
            newGridEl
            //startPortalEl // XXX いらないらしい. why?
          );
        }
        // set initVis textblock
        if (registry.board[i][j].isInitVisibility !== null) {
          // make new textblock element
          let newInitVisibilityTextBlockEl = makeTextBlockModel(
            EDITMODE_PARTS.textblock.inner.text[
              registry.board[i][j].isInitVisibility ? "enable" : "disable"
            ],
            computeTextSlotWorldPosition(
              "menu_initialVisibility",
              "menu_initialVisibility"
            )
          );
          newInitVisibilityTextBlockEl.classList.add("delete-me");
          newInitVisibilityTextBlockEl.removeAttribute("repop-model");
          dragContainer.appendChild(newInitVisibilityTextBlockEl);
          // put textblock on slot
          setupConditionalDispatch(
            newInitVisibilityTextBlockEl,
            "initMazeMaker",
            newGridEl,
            newInitVisibilityTextBlockEl
          );
        }
      }
    }
  }
  const mazeGridsAddRowButton = document.getElementById(
    "mazeGridsAddRowButton"
  );
  const mazeGridsAddColumnButton = document.getElementById(
    "mazeGridsAddColumnButton"
  );

  let mazeGridsAddRowButtonEl = makeExpandMazeMatrixButton("row");
  mazeGridsAddRowButtonEl.classList.add("delete-me");
  mazeGridsAddRowButton.appendChild(mazeGridsAddRowButtonEl);

  let mazeGridsAddColumnButtonEl = makeExpandMazeMatrixButton("column");
  mazeGridsAddColumnButtonEl.classList.add("delete-me");
  mazeGridsAddColumnButton.appendChild(mazeGridsAddColumnButtonEl);
}

document.addEventListener("DOMContentLoaded", () => {
  // make registry
  for (let row = 0; row < INITIAL_GRID_ROWS; row++) {
    for (let column = 0; column < INITIAL_GRID_COLUMNS; column++) {
      updateRegistry(
        row,
        column,
        null,
        null,
        [null, null],
        false,
        false,
        false
      );
    }
  }
  initMazeMaker(INITIAL_GRID_ROWS, INITIAL_GRID_COLUMNS);
});
