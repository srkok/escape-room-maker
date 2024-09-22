AFRAME.registerComponent("hover-color-change", {
  schema: {
    mouseenterColor: { type: "color" },
    mouseleaveColor: { type: "color" },
  },
  events: {
    mouseenter: function () {
      this.el.setAttribute("material", "color", this.data.mouseenterColor);
    },
    mouseleave: function () {
      this.el.setAttribute("material", "color", this.data.mouseleaveColor);
    },
  },
});
