function initMazeMaker(row, column) {
  const mazeGrids = document.getElementById("mazeGrids");
  mazeGrids.setAttribute("position", MAZE_GRIDS_POSITION);
  mazeGrids.setAttribute("rotation", MAZE_GRIDS_ROTATION);
  mazeGrids.innerHTML = "";
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      // make grid
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
        { x: 0, y: 0, z: 90 }
      );
      newGridEl.setAttribute("text", `value: Grid ${i} ${j}; align: center`);
      // make gridname's textblock
      document.querySelector("a-scene").appendChild(
        makeTextBlockModelGridName(i, j, {
          x: j * (MAZE_GRID_OBJECT.width + MAZE_WALL_OBJECT.width),
          y: 0.1,
          z: i * (MAZE_GRID_OBJECT.height + MAZE_WALL_OBJECT.width) - 4,
        })
      );

      /** make wall **/
      let newBelowWallEl = document.createElement("a-entity");
      setNewElementProperties(
        newBelowWallEl,
        MAZE_WALL_OBJECT,
        MAZE_WALL_COLOR,
        MAZE_WALL_BELOW_RELATIVE_POSITION,
        { x: 0, y: 0, z: 90 }
      );
      setActionSettingsProperties(
        newBelowWallEl,
        MAZE_WALL_COLOR,
        MAZE_WALL_HIGHLIGHT_COLOR
      );
      newBelowWallEl.setAttribute("toggle-wall-make", "direction: below");
      let newBelowWallVisualization = document.createElement("a-entity");
      setNewElementProperties(
        newBelowWallVisualization,
        MAZE_WALL_VISUALIZATION_OBJECT,
        MAZE_WALL_COLOR,
        MAZE_WALL_VISUALIZATION_RELATIVE_POSITION,
        ZERO_VEC3_OBJECT
      );
      newBelowWallVisualization.setAttribute(
        "material",
        "opacity",
        OPACITY_VALUE
      );
      newBelowWallVisualization.setAttribute("scale", ZERO_VEC3_OBJECT);
      newBelowWallEl.appendChild(newBelowWallVisualization);
      newGridEl.appendChild(newBelowWallEl);

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

      mazeGrids.appendChild(newGridEl);
      /** save registry **/
      updateRegistry(i, j, null, null, false, false); // FIXME
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMazeMaker(INITIAL_GRID_ROWS, INITIAL_GRID_COLUMNS);
});
