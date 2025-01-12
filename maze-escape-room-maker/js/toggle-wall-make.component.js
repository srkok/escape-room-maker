AFRAME.registerComponent("toggle-wall-make", {
  schema: {
    direction: { type: "string" },
  },
  init: async function () {
    this.isVisible = false;
    // Identify the parent
    const parentEl = this.el.parentNode;
    await waitForObjectReady(parentEl);
    this.parentRow =
      parentEl.getAttribute("position").z /
      (MAZE_GRID_SETTINGS.object.width + MAZE_WALL_GRID_WIDTH);
    this.parentColumn =
      parentEl.getAttribute("position").x /
      (MAZE_GRID_SETTINGS.object.width + MAZE_WALL_GRID_WIDTH);
    if (this.data.direction === "below") this.target = "isBelowWall";
    if (this.data.direction === "right") this.target = "isRightWall";
  },
  events: {
    click: function (event) {
      // reverse visibility
      this.isVisible = !this.isVisible;
      toggleVisible(this.el.children[0]);

      // save registry
      registry.board[this.parentRow][this.parentColumn][this.target] =
        this.isVisible;

      /**
      console.log(
        `grid ${this.parentRow} ${this.parentColumn} 's ${this.target} is ${
          this.isVisible ? "Visualized." : "UnVisualized."
        }`
      );
      /**/
      //console.log(registry.board[this.parentRow][this.parentColumn]);

      event.stopPropagation();
    },
  },
});
