const MAZE_ADD_MATRIX_BUTTON_SETTINGS = {
  rowButton: {
    object: { primitive: "triangle" },
    color: "silver",
    highlightColor: "green",
    text: "value: add\nrow; align: center; width: 5; color: black",
    position: (row, column) => {
      return {
        x:
          ((MAZE_GRID_SETTINGS.object.height + MAZE_WALL_GRID_WIDTH) *
            (column - 1)) /
          2,
        y: 0,
        z:
          (MAZE_GRID_SETTINGS.object.height + MAZE_WALL_GRID_WIDTH) * (row - 1),
      };
    },
    rotation: { x: -90, y: 0, z: 60 },
  },
  columnButton: {
    object: { primitive: "triangle" },
    color: "silver",
    highlightColor: "green",
    text: "value: add\ncolumn; align: center; width: 5; color: black",
    position: (row, column) => {
      return {
        x: (MAZE_GRID_SETTINGS.object.height + MAZE_WALL_GRID_WIDTH) * column,
        y: 0,
        z:
          ((MAZE_GRID_SETTINGS.object.height + MAZE_WALL_GRID_WIDTH) *
            (row - 2)) /
          2,
      };
    },
    rotation: { x: -90, y: 0, z: 60 },
  },
};

AFRAME.registerComponent("expand-maze-matrix", {
  schema: {
    direction: { type: "string" },
  },
  events: {
    click: function () {
      // update registry
      if (this.data.direction === "row") {
        INITIAL_GRID_ROWS++;
        registry.board.push(new Array(registry.board[0].length).fill(null));
        for (let column = 0; column < INITIAL_GRID_COLUMNS; column++) {
          updateRegistry(
            registry.board.length - 1,
            column,
            null,
            null,
            [null, null],
            false,
            false,
            false
          );
        }
      } else if (this.data.direction === "column") {
        INITIAL_GRID_COLUMNS++;
        for (let row = 0; row < INITIAL_GRID_ROWS; row++) {
          registry.board[row].push(null);
          updateRegistry(
            row,
            registry.board[row].length - 1,
            null,
            null,
            [null, null],
            false,
            false,
            false
          );
        }
      }
      // update button position
      this.el.setAttribute(
        "position",
        MAZE_ADD_MATRIX_BUTTON_SETTINGS[
          `${this.data.direction}Button`
        ].position(INITIAL_GRID_ROWS, INITIAL_GRID_COLUMNS)
      );
      // update maze
      initMazeMaker(INITIAL_GRID_ROWS, INITIAL_GRID_COLUMNS);
    },
  },
});

function makeExpandMazeMatrixButton(direction) {
  if (direction === "row" || direction === "column") {
    let newEl = document.createElement("a-entity");
    setNewElementProperties(
      newEl,
      MAZE_ADD_MATRIX_BUTTON_SETTINGS[`${direction}Button`].object,
      MAZE_ADD_MATRIX_BUTTON_SETTINGS[`${direction}Button`].color,
      MAZE_ADD_MATRIX_BUTTON_SETTINGS[`${direction}Button`].position(
        INITIAL_GRID_ROWS,
        INITIAL_GRID_COLUMNS
      ),
      MAZE_ADD_MATRIX_BUTTON_SETTINGS[`${direction}Button`].rotation
    );
    setActionSettingsProperties(
      newEl,
      MAZE_ADD_MATRIX_BUTTON_SETTINGS[`${direction}Button`].color,
      MAZE_ADD_MATRIX_BUTTON_SETTINGS[`${direction}Button`].highlightColor
    );
    newEl.setAttribute(
      "text",
      MAZE_ADD_MATRIX_BUTTON_SETTINGS[`${direction}Button`].text
    );
    newEl.setAttribute("scale", "2 2 2");
    newEl.setAttribute("expand-maze-matrix", `direction: ${direction}`);
    return newEl;
  } else {
    console.error("ERROR! missing direction.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mazeGridsAddRowButton = document.getElementById(
    "mazeGridsAddRowButton"
  );
  const mazeGridsAddColumnButton = document.getElementById(
    "mazeGridsAddColumnButton"
  );

  mazeGridsAddRowButton.appendChild(makeExpandMazeMatrixButton("row"));
  mazeGridsAddColumnButton.appendChild(makeExpandMazeMatrixButton("column"));
});
