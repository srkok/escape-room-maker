AFRAME.registerComponent("toggle-wall-make", {
  schema: {
    direction: { type: "string" },
  },
  init: function () {
    this.isVisible = false;
    // Identify the parent
    this.parentRow =
      this.el.parentElement.getAttribute("position").x /
      (MAZE_GRID_OBJECT.width + MAZE_WALL_OBJECT.width);
    this.parentColumn =
      this.el.parentElement.getAttribute("position").y /
      (MAZE_GRID_OBJECT.width + MAZE_WALL_OBJECT.width);
    if (this.data.direction === "right") this.target = "isRightWall";
    if (this.data.direction === "above") this.target = "isAboveWall";
  },
  events: {
    click: function (event) {
      this.isVisible = !this.isVisible;
      toggleVisible(this.el.children[0]);

      // save registry
      registry.board[this.parentRow][this.parentColumn][this.target] =
        this.isVisible;

      event.stopPropagation();
    },
  },
});
