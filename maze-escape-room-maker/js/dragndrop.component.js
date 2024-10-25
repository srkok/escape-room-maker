/**
 * これは以下を改造したものです。
 * https://github.com/extraymond/aframe-mouse-dragndrop/blob/master/src/index.js
 */
if (window.AFRAME == null) {
  console.error("aframe not found, please import it before this component.");
}

AFRAME.registerSystem("track-cursor", {
  init: function () {
    this.el.setAttribute("cursor", { rayOrigin: "mouse" });
  },
});

AFRAME.registerComponent("track-cursor", {
  init: function () {
    this.targetEl = null;
    this.el.addEventListener("mousedown", (e) => {
      if (this.el.is("cursor-hovered")) {
        this.el.sceneEl.camera.el.setAttribute("look-controls", {
          enabled: false,
        });
        this.el.addState("dragging");
        /** 交差イベントの停止 **/
        if (this.targetEl) {
          this.targetEl.emit("diverging");
        }
      }
    });
    this.el.addEventListener("click", (e) => {
      if (this.el.is("dragging")) {
        this.el.sceneEl.camera.el.setAttribute("look-controls", {
          enabled: true,
        });
        this.el.removeState("dragging");
        this.handleMouseUp();
      }
    });
  },
  /** mouseを離した後の動作指定 **/
  handleMouseUp: function () {
    const INTERSECTING_THRESHOLD = 0.5; // TODO 初期設定ファイルで定義する
    const currentPosition = this.el.object3D.position;
    const slotElements = document.querySelectorAll(".code-block-slot");
    /** 最も近いcode-block-slot要素の特定 **/
    this.targetEl = null;
    let closestDistance = Infinity;
    slotElements.forEach((el) => {
      const targetPosition = el.object3D.position;
      const distance = currentPosition.distanceTo(targetPosition);
      if (distance < closestDistance) {
        this.targetEl = el;
        closestDistance = distance;
      }
    });
    /** 交差していればblockをslotに嵌め, 交差イベント発行 **/
    if (this.targetEl && closestDistance < INTERSECTING_THRESHOLD) {
      this.el.setAttribute("position", this.targetEl.object3D.position);
      this.targetEl.emit("intersecting");
    }
  },
});

AFRAME.registerComponent("dragndrop", {
  dependencies: ["track-cursor"],
  init: function () {
    this.range = 0;
    this.dist = 0;

    this.el.addEventListener("stateadded", (e) => {
      if (e.detail == "dragging") {
        this.range = 0;
        this.dist = this.el.object3D.position
          .clone()
          .sub(this.el.sceneEl.camera.el.object3D.position)
          .length();
      }
    });

    this.direction = new AFRAME.THREE.Vector3();
    this.target = new AFRAME.THREE.Vector3();
    document.addEventListener("wheel", (e) => {
      if (e.deltaY < 0) {
        this.range += 0.1;
      } else {
        this.range -= 0.1;
      }
    });
  },
  updateDirection: function () {
    this.direction.copy(this.el.sceneEl.getAttribute("raycaster").direction);
  },
  updateTarget: function () {
    let camera = this.el.sceneEl.camera.el;
    this.target.copy(
      camera.object3D.position
        .clone()
        .add(this.direction.clone().multiplyScalar(this.dist + this.range))
    );
  },
  tick: function () {
    if (this.el.is("dragging")) {
      this.updateDirection();
      this.updateTarget();
      this.el.object3D.position.copy(this.target);
    }
  },
});
