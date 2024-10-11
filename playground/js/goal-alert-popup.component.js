AFRAME.registerComponent("goal-alert-popup", {
  init: async function () {
    await waitForObjectReady(this.el);
    this.absolutePosition = this.el.object3D.position
      .clone()
      .add(this.el.parentNode.object3D.position);
  },
  tick: function () {
    // Goalが不可視の時動作しない
    if (isEqual(this.el.getAttribute("scale"), ZERO_VEC3_OBJECT)) return;

    const playerPosition = document.querySelector("[camera]").object3D.position;
    const distanceToPlayer = playerPosition.distanceTo(this.absolutePosition);

    if (distanceToPlayer < ALERT_DISTANCE) {
      alert("Congratulations!");
      this.el.removeAttribute("goal-alert-popup"); // 二度とアラートを表示しない
    }
  },
});
