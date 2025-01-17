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
    newWallGridEl.appendChild(newWallEl);
    return newWallGridEl;
  }

  // set outermost walls
  for (let i = 0; i < dataObject.board.length; i++) {
    // left
    mazeGrids.appendChild(
      generateWallGrid(
        {
          x: (MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH) / -2,
          y: 0,
          z: i * (MAZE_GRID_SETTINGS.object.height + MAZE_WALLGRID_WIDTH),
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
            (MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH) *
            (dataObject.board[i].length - 1 / 2),
          y: 0,
          z: i * (MAZE_GRID_SETTINGS.object.height + MAZE_WALLGRID_WIDTH),
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
          x: j * (MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH),
          y: 0,
          z: (MAZE_GRID_SETTINGS.object.height + MAZE_WALLGRID_WIDTH) / -2,
        },
        { x: -90, y: 90, z: 0 },
        true
      )
    );
    // bottom
    mazeGrids.appendChild(
      generateWallGrid(
        {
          x: j * (MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH),
          y: 0,
          z:
            (MAZE_GRID_SETTINGS.object.height + MAZE_WALLGRID_WIDTH) *
            (dataObject.board.length - 1 / 2),
        },
        { x: -90, y: 90, z: 0 },
        true
      )
    );
  }

  // set Grids, Walls, static objects
  for (let i = 0; i < dataObject.board.length; i++) {
    for (let j = 0; j < dataObject.board[i].length; j++) {
      let newGridEl = document.createElement("a-entity");
      setNewElementProperties(
        newGridEl,
        MAZE_GRID_SETTINGS.object,
        MAZE_GRID_SETTINGS.color,
        {
          x: j * (MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH),
          y: 0,
          z: i * (MAZE_GRID_SETTINGS.object.height + MAZE_WALLGRID_WIDTH),
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
      // TODO set objects
      if (settings.partsName === "octahedron") {
        console.log(`set ${settings.partsName} into Grid ${i} ${j}`);
      } else if (settings.partsName === "startportal") {
        if (settings.isInitVisibility) {
          newGridEl.appendChild(makeStartPortalModel(ZERO_VEC3_OBJECT));
        }
        document.getElementById("player").setAttribute("position", {
          x: j * (MAZE_GRID_SETTINGS.object.width + MAZE_WALLGRID_WIDTH),
          y: 1.6,
          z: i * (MAZE_GRID_SETTINGS.object.height + MAZE_WALLGRID_WIDTH),
        });
      } else if (settings.partsName === "goalflag") {
        console.log(`set ${settings.partsName} into Grid ${i} ${j}`);
      } else if (settings.partsName === "spiketrap") {
        console.log(`set ${settings.partsName} into Grid ${i} ${j}`);
      }
      /** */
      mazeGrids.appendChild(newGridEl);
    }
  }

  // TODO set funcs of dynamic objects (octahedron)
  /** */

  // add collision detector
  document.getElementById("player").setAttribute("wall-collision-detector", "");
}

/**
  // dataObjectに従い壁を構築
  for (let i = 0; i < dataObject.board.length; i++) {
    for (let j = 0; j < dataObject.board[i].length; j++) {
      const settings = dataObject.board[i][j];
      let newGridEl = document.createElement("a-entity");
      setNewElementProperties(
        newGridEl,
        MAZE_GRID_OBJECT,
        MAZE_GRID_COLOR,
        {
          x: i * (MAZE_GRID_OBJECT.width + MAZE_WALL_OBJECT.width),
          y: j * (MAZE_GRID_OBJECT.height + MAZE_WALL_OBJECT.width),
          z: 0,
        },
        ZERO_VEC3_OBJECT,
        true
      );
      if (settings.isBelowWall) {
        let newWallEl = document.createElement("a-entity");
        setNewElementProperties(
          newWallEl,
          MAZE_WALL_VISUALIZATION_OBJECT,
          MAZE_WALL_COLOR,
          ["x", "y", "z"].reduce((acc, key) => {
            acc[key] =
              MAZE_WALL_BELOW_RELATIVE_POSITION[key] +
              MAZE_WALL_VISUALIZATION_RELATIVE_POSITION[key];
            return acc;
          }, {}),
          ZERO_VEC3_OBJECT,
          true
        );
        newWallEl.classList.add("wall");
        newGridEl.appendChild(newWallEl);
      }
      if (settings.isRightWall) {
        let newWallEl = document.createElement("a-entity");
        setNewElementProperties(
          newWallEl,
          MAZE_WALL_OBJECT,
          MAZE_WALL_COLOR,
          ["x", "y", "z"].reduce((acc, key) => {
            acc[key] =
              MAZE_WALL_RIGHT_RELATIVE_POSITION[key] +
              MAZE_WALL_VISUALIZATION_RELATIVE_POSITION[key];
            return acc;
          }, {}),
          ZERO_VEC3_OBJECT,
          true
        );
        newWallEl.classList.add("wall");
        newGridEl.appendChild(newWallEl);
      }
      mazeGrids.appendChild(newGridEl);
    }
  }

 */
