AFRAME.registerComponent("wall-collision-detector", {
  init: function () {
    this.cameraEl = this.el;
    this.updateWalls();
    this.prevPosition = this.cameraEl.object3D.position.clone();
  },

  tick: function () {
    const cameraPosition = this.cameraEl.object3D.position;

    // カメラのバウンディングボックスを作成
    const cameraBoundingBox = new THREE.Box3().setFromCenterAndSize(
      cameraPosition,
      new THREE.Vector3(0.5, 1.6, 0.5)
    );

    this.updateWalls();

    // 各壁に対して衝突判定
    let collided = false;
    this.wallBoundingBoxes.forEach((wallBoundingBox) => {
      if (cameraBoundingBox.intersectsBox(wallBoundingBox)) {
        collided = true;
      }
    });

    // 衝突が検出されたらカメラを前の位置に戻す
    if (collided) {
      this.cameraEl.object3D.position.copy(this.prevPosition);
    } else {
      // 衝突していない場合、現在の位置を保存
      this.prevPosition.copy(cameraPosition);
    }
  },

  updateWalls: function () {
    const wallEls = document.querySelectorAll(".wall");

    // バウンディングボックスを更新
    this.wallBoundingBoxes = [];
    wallEls.forEach((wallEl) => {
      const boundingBox = new THREE.Box3().setFromObject(wallEl.object3D);
      this.wallBoundingBoxes.push(boundingBox);
    });
  },
});
