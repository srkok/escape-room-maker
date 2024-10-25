/** usage:
 * document.addEventListener("DOMContentLoaded", () => {
 *  your_object.classList.add("code-block-slot");
    your_object.setAttribute("code-block-slot", "targetId: ; operation: ");
  });
 */

AFRAME.registerComponent("code-block-slot", {
  schema: {
    targetId: { type: "string" },
    operation: { type: "string" },
  },
  init: function () {
    this.target = document.getElementById(this.data.targetId);
    this.el.addEventListener("intersecting", () => {
      this.target.setAttribute(this.data.operation, "");
    });
    this.el.addEventListener("diverging", () => {
      this.target.removeAttribute(this.data.operation);
    });
  },
});

AFRAME.registerComponent("spin", {
  schema: {
    speed: { type: "number", default: 100 }, // 回転速度の指定
  },
  tick: function (time, timeDelta) {
    this.el.object3D.rotation.x += this.data.speed * (timeDelta / 1000);
  },
});

/** delete? *
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".code-block-slot")
    .setAttribute("code-block-slot", "targetId: box; operation: spin");
});
/****/
