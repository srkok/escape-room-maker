const MAZE_GRIDS_POSITION = { x: 0, y: 0, z: -4 };
const MAZE_GRIDS_ROTATION = { x: 0, y: 0, z: 0 };

const MAZE_GRID_SETTINGS = {
  object: { primitive: "plane", height: 4, width: 4 },
  color: "silver",
};

const MAZE_WALL_GRID_WIDTH = 0.5; // settingsでposition設定がobject.withに依存するため,ここで定義.
const MAZE_WALL_GRID_SETTINGS = {
  right: {
    object: {
      primitive: "plane",
      height: MAZE_GRID_SETTINGS.object.height,
      width: MAZE_WALL_GRID_WIDTH,
    },
    color: "gray",
    highlightColor: "green",
    position: {
      x: (MAZE_GRID_SETTINGS.object.width + MAZE_WALL_GRID_WIDTH) / 2,
      y: 0,
      z: 0,
    },
    rotation: { x: 0, y: 0, z: 0 },
  },
  below: {
    object: {
      primitive: "plane",
      height: MAZE_WALL_GRID_WIDTH,
      width: MAZE_GRID_SETTINGS.object.height,
    },
    color: "gray",
    highlightColor: "green",
    position: {
      x: 0,
      y: -(MAZE_GRID_SETTINGS.object.width + MAZE_WALL_GRID_WIDTH) / 2,
      z: 0,
    },
    rotation: { x: 0, y: 0, z: 0 },
  },
};

const MAZE_WALL_VISUALIZATION_HEIGHT = 4; // settingsでposition設定がobject.heightに依存するため,ここで定義.
const MAZE_WALL_VISUALIZATION_SETTINGS = {
  right: {
    object: {
      primitive: "box",
      height: MAZE_WALL_VISUALIZATION_HEIGHT,
      width: MAZE_WALL_GRID_SETTINGS.right.object.width,
      depth: MAZE_WALL_GRID_SETTINGS.right.object.height,
    },
    color: "gray",
    position: { x: 0, y: 0, z: MAZE_WALL_VISUALIZATION_HEIGHT / 2 },
    rotation: { x: 0, y: 0, z: 0 }, //
    opacity: OPACITY_VALUE,
  },
  below: {
    object: {
      primitive: "box",
      height: MAZE_WALL_VISUALIZATION_HEIGHT,
      width: MAZE_WALL_GRID_SETTINGS.below.object.width,
      depth: MAZE_WALL_GRID_SETTINGS.below.object.height,
    },
    color: "gray",
    position: { x: 0, y: 0, z: MAZE_WALL_VISUALIZATION_HEIGHT / 2 },
    rotation: { x: 90, y: 0, z: 0 },
    opacity: OPACITY_VALUE,
  },
};

// TODO registryに従いobjectを生やす
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
      setNewElementProperties(
        newGridEl,
        MAZE_GRID_SETTINGS.object,
        MAZE_GRID_SETTINGS.color,
        {
          x: j * (MAZE_GRID_SETTINGS.object.width + MAZE_WALL_GRID_WIDTH),
          y: 0,
          z: i * (MAZE_GRID_SETTINGS.object.height + MAZE_WALL_GRID_WIDTH),
        },
        { x: -90, y: 0, z: 0 }
      );
      newGridEl.setAttribute("text", `value: Grid ${i} ${j}; align: center`);
      newGridEl.classList.add("code-block-slot");
      newGridEl.setAttribute(
        "code-block-slot",
        `operation: show-settings-initialvisibility;`
      );
      // make gridname's textblock
      dragContainer.appendChild(
        makeTextBlockModel(
          EDITMODE_PARTS.textblock.inner.text.gridname(i, j),
          sumObjectsByKey(EDITMODE_PARTS.textblock.outer.position.gridname, {
            x: j * (MAZE_GRID_SETTINGS.object.width + MAZE_WALL_GRID_WIDTH),
            y: 0,
            z: i * (MAZE_GRID_SETTINGS.object.height + MAZE_WALL_GRID_WIDTH),
          })
        )
      );

      /* make below wall*/
      // below wall grid
      let newBelowWallEl = document.createElement("a-entity");
      setNewElementProperties(
        newBelowWallEl,
        MAZE_WALL_GRID_SETTINGS.below.object,
        MAZE_WALL_GRID_SETTINGS.below.color,
        MAZE_WALL_GRID_SETTINGS.below.position,
        MAZE_WALL_GRID_SETTINGS.below.rotation
      );
      setActionSettingsProperties(
        newBelowWallEl,
        MAZE_WALL_GRID_SETTINGS.below.color,
        MAZE_WALL_GRID_SETTINGS.below.highlightColor
      );
      newBelowWallEl.setAttribute("toggle-wall-make", "direction: below");
      // below wall visualization
      let newBelowWallVisualization = document.createElement("a-entity");
      setNewElementProperties(
        newBelowWallVisualization,
        MAZE_WALL_VISUALIZATION_SETTINGS.below.object,
        MAZE_WALL_VISUALIZATION_SETTINGS.below.color,
        MAZE_WALL_VISUALIZATION_SETTINGS.below.position,
        MAZE_WALL_VISUALIZATION_SETTINGS.below.rotation
      );
      newBelowWallVisualization.setAttribute(
        "material",
        "opacity",
        MAZE_WALL_VISUALIZATION_SETTINGS.below.opacity //OPACITY_VALUE
      );
      if (!registry.board[i][j].isBelowWall) {
        newBelowWallVisualization.setAttribute("scale", ZERO_VEC3_OBJECT);
      }
      newBelowWallEl.appendChild(newBelowWallVisualization);
      // below wall textblock
      dragContainer.appendChild(
        makeTextBlockModel(
          EDITMODE_PARTS.textblock.inner.text.wallname(i, j, "Below"),
          sumObjectsByKey(
            EDITMODE_PARTS.textblock.outer.position.wallname_below,
            MAZE_WALL_GRID_SETTINGS.below.position,
            {
              x: j * (MAZE_GRID_SETTINGS.object.width + MAZE_WALL_GRID_WIDTH),
              y: 0,
              z: i * (MAZE_GRID_SETTINGS.object.height + MAZE_WALL_GRID_WIDTH),
            }
          )
        )
      );
      newGridEl.appendChild(newBelowWallEl);

      /* make right wall */
      // right wall grid
      let newRightWallEl = document.createElement("a-entity");
      setNewElementProperties(
        newRightWallEl,
        MAZE_WALL_GRID_SETTINGS.right.object,
        MAZE_WALL_GRID_SETTINGS.right.color,
        MAZE_WALL_GRID_SETTINGS.right.position,
        MAZE_WALL_GRID_SETTINGS.right.rotation
      );
      setActionSettingsProperties(
        newRightWallEl,
        MAZE_WALL_GRID_SETTINGS.right.color,
        MAZE_WALL_GRID_SETTINGS.right.highlightColor
      );
      newRightWallEl.setAttribute("toggle-wall-make", "direction: right");
      // right wall visualization
      let newRightWallVisualization = document.createElement("a-entity");
      setNewElementProperties(
        newRightWallVisualization,
        MAZE_WALL_VISUALIZATION_SETTINGS.right.object,
        MAZE_WALL_VISUALIZATION_SETTINGS.right.color,
        MAZE_WALL_VISUALIZATION_SETTINGS.right.position,
        MAZE_WALL_VISUALIZATION_SETTINGS.right.rotation
      );
      newRightWallVisualization.setAttribute(
        "material",
        "opacity",
        MAZE_WALL_VISUALIZATION_SETTINGS.right.opacity
      );
      if (!registry.board[i][j].isRightWall) {
        newRightWallVisualization.setAttribute("scale", ZERO_VEC3_OBJECT);
      }
      newRightWallEl.appendChild(newRightWallVisualization);
      // right wall textblock
      dragContainer.appendChild(
        makeTextBlockModel(
          EDITMODE_PARTS.textblock.inner.text.wallname(i, j, "Right"),
          sumObjectsByKey(
            EDITMODE_PARTS.textblock.outer.position.wallname_right,
            MAZE_WALL_GRID_SETTINGS.right.position,
            {
              x: j * (MAZE_GRID_SETTINGS.object.width + MAZE_WALL_GRID_WIDTH),
              y: 0,
              z: i * (MAZE_GRID_SETTINGS.object.height + MAZE_WALL_GRID_WIDTH),
            }
          )
        )
      );
      newGridEl.appendChild(newRightWallEl);

      mazeGrids.appendChild(newGridEl);
      // TODO registryに従いobjectを生やす
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // make registry
  for (let row = 0; row < INITIAL_GRID_ROWS; row++) {
    for (let column = 0; column < INITIAL_GRID_COLUMNS; column++) {
      updateRegistry(row, column, null, null, null, false, false);
    }
  }
  initMazeMaker(INITIAL_GRID_ROWS, INITIAL_GRID_COLUMNS);
});
