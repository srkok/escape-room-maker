function initMazeMaker(row, column) {
  const mazeGrids = document.getElementById("mazeGrids");
  mazeGrids.innerHTML = "";
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      /** make grid **/
      let newGridEl = document.createElement("a-entity");
      setNewElementProperties(
        newGridEl,
        MAZE_GRID_OBJECT,
        MAZE_GRID_COLOR,
        {
          x: j * (MAZE_GRID_OBJECT.width + MAZE_WALL_OBJECT.width),
          y: i * (MAZE_GRID_OBJECT.height + MAZE_WALL_OBJECT.width),
          z: 0,
        },
        ZERO_VEC3_OBJECT
      );
      //setActionSettingsProperties(newGridEl, MAZE_GRID_COLOR, MAZE_GRID_HIGHLIGHT_COLOR);

      /** make wall **/
      let newRightWallEl = document.createElement("a-entity");
      setNewElementProperties(
        newRightWallEl,
        MAZE_WALL_OBJECT,
        MAZE_WALL_COLOR,
        MAZE_WALL_RIGHT_RELATIVE_POSITION,
        ZERO_VEC3_OBJECT
      );
      setActionSettingsProperties(
        newRightWallEl,
        MAZE_WALL_COLOR,
        MAZE_WALL_HIGHLIGHT_COLOR
      );
      newRightWallEl.setAttribute("toggle-wall-make", "direction: right");
      let newRightWallVisualization = document.createElement("a-entity");
      setNewElementProperties(
        newRightWallVisualization,
        MAZE_WALL_VISUALIZATION_OBJECT,
        MAZE_WALL_COLOR,
        MAZE_WALL_VISUALIZATION_RELATIVE_POSITION,
        ZERO_VEC3_OBJECT
      );
      newRightWallVisualization.setAttribute(
        "material",
        "opacity",
        OPACITY_VALUE
      );
      newRightWallVisualization.setAttribute("scale", ZERO_VEC3_OBJECT);
      newRightWallEl.appendChild(newRightWallVisualization);
      newGridEl.appendChild(newRightWallEl);

      let newAboveWallEl = document.createElement("a-entity");
      setNewElementProperties(
        newAboveWallEl,
        MAZE_WALL_OBJECT,
        MAZE_WALL_COLOR,
        MAZE_WALL_ABOVE_RELATIVE_POSITION,
        { x: 0, y: 0, z: 90 }
      );
      setActionSettingsProperties(
        newAboveWallEl,
        MAZE_WALL_COLOR,
        MAZE_WALL_HIGHLIGHT_COLOR
      );
      newAboveWallEl.setAttribute("toggle-wall-make", "direction: above");
      let newAboveWallVisualization = document.createElement("a-entity");
      setNewElementProperties(
        newAboveWallVisualization,
        MAZE_WALL_VISUALIZATION_OBJECT,
        MAZE_WALL_COLOR,
        MAZE_WALL_VISUALIZATION_RELATIVE_POSITION,
        ZERO_VEC3_OBJECT
      );
      newAboveWallVisualization.setAttribute(
        "material",
        "opacity",
        OPACITY_VALUE
      );
      newAboveWallVisualization.setAttribute("scale", ZERO_VEC3_OBJECT);
      newAboveWallEl.appendChild(newAboveWallVisualization);
      newGridEl.appendChild(newAboveWallEl);

      mazeGrids.appendChild(newGridEl);
      /** save registry **/
      updateRegistry(i, j, null, null, false, false);
    }
  }
  console.log(registry);
}

document.addEventListener("DOMContentLoaded", () => {
  initMazeMaker(INITIAL_GRID_ROWS, INITIAL_GRID_COLUMNS);
});
