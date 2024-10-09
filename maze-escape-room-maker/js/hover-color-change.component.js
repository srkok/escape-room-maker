AFRAME.registerComponent("hover-color-change", {
  schema: {
    mouseenterColor: { type: "color" },
    mouseleaveColor: { type: "color" },
  },
  events: {
    mouseenter: function (event) {
      this.el.setAttribute("material", "color", this.data.mouseenterColor);
      event.stopPropagation();
    },
    mouseleave: function (event) {
      this.el.setAttribute("material", "color", this.data.mouseleaveColor);
      event.stopPropagation();
    },
  },
});
