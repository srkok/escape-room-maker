function sceneMazeMaker(dataObject) {
  const mazeGrids = document.getElementById("mazeGrids");

  /** 周囲に壁を構築 **/
  /** dataObjectに従い壁を構築 **/
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
  // add collision detector
  document.getElementById("player").setAttribute("wall-collision-detector", "");
}
