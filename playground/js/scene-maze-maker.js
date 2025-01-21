function sceneMazeMaker(dataObject) {
  const mazeGrids = document.getElementById("mazeGrids");
  mazeGrids.setAttribute("position", MAZE_GRIDS_POSITION);
  mazeGrids.setAttribute("rotation", MAZE_GRIDS_ROTATION);

  /**
   * generate HTMLElement wall_grid which includes wall element
   * @param {Vector3} position
   * @param {Vector3} rotation
   * @param {Boolean} isVisible
   * @returns HTMLElement wall_grid
   */
  function generateWallGrid(position, rotation, isVisible) {
    let newWallGridEl = document.createElement("a-entity");
    setNewElementProperties(
      newWallGridEl,
      MAZE_WALLGRID_SETTINGS.object,
      MAZE_WALLGRID_SETTINGS.color,
      position,
      rotation,
      isVisible
    );
    let newWallEl = document.createElement("a-entity");
    setNewElementProperties(
      newWallEl,
      MAZE_WALL_SETTINGS.object,
      MAZE_WALL_SETTINGS.color,
      MAZE_WALL_SETTINGS.position,
      MAZE_WALL_SETTINGS.rotation,
      true
    );
    if (isVisible) {
      newWallEl.classList.add("wall");
    }
    newWallEl.classList.add("raycastable"); // 壁の奥の物体がクリックできないよう妨害する.
    newWallGridEl.appendChild(newWallEl);
    return newWallGridEl;
  }

  const clickableObjects = [];

  // set outermost walls
  for (let i = 0; i < dataObject.board.length; i++) {
    // left
    mazeGrids.appendChild(
      generateWallGrid(
        {
          x: -MAZE_GRID_SETTINGS.object.width / 2, //(MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH) / -2,
          y: 0,
          z: i * MAZE_GRID_SETTINGS.object.height, //(MAZE_GRID_SETTINGS.object.height + MAZE_WALLGRID_WIDTH),
        },
        { x: -90, y: 0, z: 0 },
        true
      )
    );
    // right
    mazeGrids.appendChild(
      generateWallGrid(
        {
          x:
            MAZE_GRID_SETTINGS.object.width *
            (dataObject.board[i].length - 1 / 2),
          //(MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH) * (dataObject.board[i].length - 1 / 2),
          y: 0,
          z: i * MAZE_GRID_SETTINGS.object.height, //(MAZE_GRID_SETTINGS.object.height + MAZE_WALLGRID_WIDTH),
        },
        { x: -90, y: 0, z: 0 },
        true
      )
    );
  }
  for (let j = 0; j < dataObject.board[0].length; j++) {
    // top
    mazeGrids.appendChild(
      generateWallGrid(
        {
          x: j * MAZE_GRID_SETTINGS.object.width, //(MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH),
          y: 0,
          z: -MAZE_GRID_SETTINGS.object.height / 2, //(MAZE_GRID_SETTINGS.object.height + MAZE_WALLGRID_WIDTH) / -2,
        },
        { x: -90, y: 90, z: 0 },
        true
      )
    );
    // bottom
    mazeGrids.appendChild(
      generateWallGrid(
        {
          x: j * MAZE_GRID_SETTINGS.object.width, //(MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH),
          y: 0,
          z:
            MAZE_GRID_SETTINGS.object.height *
            (dataObject.board.length - 1 / 2),
          //(MAZE_GRID_SETTINGS.object.height + MAZE_WALLGRID_WIDTH) * (dataObject.board.length - 1 / 2),
        },
        { x: -90, y: 90, z: 0 },
        true
      )
    );
  }

  // set Grids, Walls, static objects
  for (let i = 0; i < dataObject.board.length; i++) {
    for (let j = 0; j < dataObject.board[i].length; j++) {
      // set Grid
      let newGridEl = document.createElement("a-entity");
      setNewElementProperties(
        newGridEl,
        MAZE_GRID_SETTINGS.object,
        MAZE_GRID_SETTINGS.color,
        {
          x: j * MAZE_GRID_SETTINGS.object.width, //(MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH),
          y: 0,
          z: i * MAZE_GRID_SETTINGS.object.height, //(MAZE_GRID_SETTINGS.object.height + MAZE_WALLGRID_WIDTH),
        },
        MAZE_GRID_SETTINGS.rotation,
        true
      );
      newGridEl.setAttribute("text", MAZE_GRID_SETTINGS.text(i, j));

      // set walls
      const settings = dataObject.board[i][j];
      newGridEl.appendChild(
        generateWallGrid(
          MAZE_WALLGRID_SETTINGS.position.below,
          MAZE_WALLGRID_SETTINGS.rotation.below,
          settings.isBelowWall
        )
      );
      newGridEl.appendChild(
        generateWallGrid(
          MAZE_WALLGRID_SETTINGS.position.right,
          MAZE_WALLGRID_SETTINGS.rotation.right,
          settings.isRightWall
        )
      );

      // set objects
      const partsNames = Object.keys(EDITMODE_PARTS).filter(
        (item) => !["all", "textblock"].includes(item)
      );
      if (partsNames.includes(settings.partsName)) {
        // select make parts function
        let newMakePartsFunc = () => {
          throw new Error("no func");
        };
        if (settings.partsName === "octahedron") {
          newMakePartsFunc = makeOctahedronModel;
        } else if (settings.partsName === "startportal") {
          newMakePartsFunc = makeStartPortalModel;
          document.getElementById("player").setAttribute("position", {
            x: j * MAZE_GRID_SETTINGS.object.width, //(MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH),
            y: 1.6,
            z: i * MAZE_GRID_SETTINGS.object.height, //(MAZE_GRID_SETTINGS.object.height + MAZE_WALLGRID_WIDTH),
          });
        } else if (settings.partsName === "goalflag") {
          newMakePartsFunc = makeGoalFlagModel;
        } else if (settings.partsName === "spiketrap") {
          newMakePartsFunc = makeSpikeTrapModel;
        }
        let newPartsEl = newMakePartsFunc(ZERO_VEC3_OBJECT);
        if (!settings.isInitVisibility) {
          toggleVisible(newPartsEl);
        }
        // set additional
        if (settings.partsName === "octahedron") {
          clickableObjects.push(newPartsEl); // set later
        } else if (settings.partsName === "spiketrap") {
          newPartsEl.classList.add("wall");
        } else if (settings.partsName === "goalflag") {
          newPartsEl.setAttribute("goal-alert-popup", "");
        }
        newGridEl.appendChild(newPartsEl);
      }
      mazeGrids.appendChild(newGridEl);
    }
  }

  // set funcs of dynamic objects (octahedron)
  clickableObjects.forEach((clickableObject) => {
    clickableObject.classList.add("raycastable");
    // find settings
    const currentGridName = clickableObject.parentEl.getAttribute("text").value;
    const match = currentGridName.match(/Grid (\d+) (\d+)/);
    const currentState = dataObject.board[Number(match[1])][Number(match[2])];
    // set funcs for each target
    currentState.actionTargets.forEach((targetName) => {
      if (!(targetName === null)) {
        // find target grid element
        let targetGridName = targetName;
        let index = 2; // 0: Below Wall, 1: Right Wall, 2: gimmick
        if (targetName.includes("Wall")) {
          // generate grid name
          const parts = targetName.split(" ");
          targetGridName = parts.slice(0, 3).join(" ");
          if (parts[3] === "'s\nBelow") {
            index = 0;
          } else if (parts[3] === "'s\nRight") {
            index = 1;
          } else {
            throw new Error(`${parts[3]} is invalid direction.`);
          }
        }
        const targetGridEl = findGridElByTextValue(mazeGrids, targetGridName);
        const targetEl = targetGridEl.children[index];
        clickableObject.addEventListener("click", () => {
          toggleVisible(targetEl);
        });
      }
    });
  });

  // add collision detector
  document.getElementById("player").setAttribute("wall-collision-detector", "");
}

/**
 * mazeGridsが有するmazeGridのうち、文字列textvalueをtext.valueに有するmazeGridを特定する関数
 * @param {HTMLElement} mazeGrids 複数のmazeGridを有するelement
 * @param {String} textValue 探したいmazeGridがtext.valueに有する文字列
 * @returns HTMLElement 探したいmazeGrid
 */
function findGridElByTextValue(mazeGrids, textValue) {
  let targetEl = null;
  Object.values(mazeGrids.children).forEach((childEl) => {
    if (
      childEl.getAttribute("text") !== null &&
      childEl.getAttribute("text").value === textValue
    ) {
      targetEl = childEl;
    }
  });
  return targetEl;
}
