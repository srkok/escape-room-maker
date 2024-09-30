AFRAME.registerComponent("goal-alert-popup", {
  init: async function () {
    await waitForObjectReady(this.el);
    // 正方形 (this.el) の絶対位置を取得
    this.absolutePosition = this.el.object3D.position
      .clone()
      .add(QUIZ_GRIDS_POSITION_OBJECT);
  },
  tick: function () {
    // Goalが不可視の時動作しない
    if (isEqual(this.el.getAttribute("scale"), ZERO_VEC3_OBJECT)) return;

    // プレイヤー (カメラ) の位置を取得
    const playerPosition = document.querySelector("[camera]").object3D.position;

    // プレイヤーと正方形の距離を計算
    const distanceToPlayer = playerPosition.distanceTo(this.absolutePosition);

    // 距離が一定以下になったらアラートを表示
    if (distanceToPlayer < ALERT_DISTANCE) {
      alert("Congratulations!");
      this.el.removeAttribute("goal-alert-popup"); // コンポーネントを削除
    }
  },
});
