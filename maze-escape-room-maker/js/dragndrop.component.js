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
          this.targetEl.dispatchEvent(new Event("diverging"));
          // TODO delete registry
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
    const INTERSECTING_THRESHOLD = 1;
    const currentPosition = this.el.object3D.position;
    const slotElements = document.querySelectorAll(".code-block-slot");
    /** 最も近いcode-block-slot要素の特定 **/
    this.targetEl = null;
    let targetWorldPosition = new THREE.Vector3();
    let closestDistance = Infinity;
    slotElements.forEach((el) => {
      const elWorldPosition = new THREE.Vector3();
      el.object3D.getWorldPosition(elWorldPosition);
      const distance = currentPosition.distanceTo(elWorldPosition);
      if (distance < closestDistance) {
        this.targetEl = el;
        targetWorldPosition = elWorldPosition;
        closestDistance = distance;
      }
    });
    // 交差していればblockをslotに嵌め, 交差イベント発行
    if (this.targetEl && closestDistance < INTERSECTING_THRESHOLD) {
      /**
       * this.targetEl: slot element
       * this.source: "Grid i j" string
       * this.action: "init visibility:" or "actionTarget:" or extras.
       */
      this.el.setAttribute("position", targetWorldPosition);
      //this.targetEl.dispatchEvent(new Event("intersecting"));
      if (this.el.classList.contains("octahedron")) {
        this.targetEl.dispatchEvent(new Event("octahedron"));
        // Grid にしか置けない
        if (this.targetEl.getAttribute("geometry").primitive === "plane") {
          this.source = this.targetEl.getAttribute("text").value;
          this.saveRegistryUsingDragAndDrop(
            this.source,
            "octahedron",
            "toggleVisible",
            ["any", "any"],
            "any"
          );
        } else {
          console.log("You can't put octahedron on slot.");
        }
      } else if (this.el.classList.contains("textblock")) {
        this.targetEl.dispatchEvent(new Event("textblock"));
        // slot が box でないと動かない
        if (!(this.targetEl.getAttribute("geometry").primitive === "plane")) {
          this.source =
            this.targetEl.parentEl.parentEl.getAttribute("text").value;
          this.action =
            this.targetEl.parentEl.children[0].getAttribute("text").value;
          let targets = ["any", "any"];
          let initVisibility = "any";
          const thisTextValue = this.el.children[0].getAttribute("text").value;
          if (this.action.includes("init visibility")) {
            if (Object.values(INIT_VISIBILITY_TEXT).includes(thisTextValue)) {
              initVisibility =
                thisTextValue === INIT_VISIBILITY_TEXT.enable ? true : false;
            } else {
              console.log("You can't put Grid/Wall_Pos on initVis_menu.");
            }
          } else if (this.action.includes("action target")) {
            if (!Object.values(INIT_VISIBILITY_TEXT).includes(thisTextValue)) {
              // select save slot on registry
              const targetPos = this.targetEl.getAttribute("position");
              const leftSlotPos =
                CODE_BLOCK_SETMENU.slot.position.menu_actionTarget1;
              const rightSlotPos =
                CODE_BLOCK_SETMENU.slot.position.menu_actionTarget2;
              if (isEqual(targetPos, leftSlotPos)) {
                targets[0] = thisTextValue;
              } else if (isEqual(targetPos, rightSlotPos)) {
                targets[1] = thisTextValue;
              }
            } else {
              console.log(
                "You can't put initVis_textblock on actionTarget_menu."
              );
            }
          }
          this.saveRegistryUsingDragAndDrop(
            this.source,
            "any",
            "any",
            targets,
            initVisibility
          );
        } else {
          console.log("no save.");
        }
        /*
        if (this.action.includes("actionTarget")) {
          if (
            this.targetEl.getAttribute("position") ===
            CODE_BLOCK_SETMENU.slot.position.menu_actionTarget1
          ) {
            targets[0] = null; // dare wo ugokasu?
          } else if (
            this.targetEl.getAttribute("position") ===
            CODE_BLOCK_SETMENU.slot.position.menu_actionTarget2
          ) {
            targets[1] = null; // dare wo ugokasu?
          }
        } else if (this.action.includes("init visibility")) {
          initVisibility = false; // dounaru?
        }
        /** */
        //this.actionTarget = this.el.children[0].getAttribute("text").value;
        /** */
      } else {
        this.targetEl.dispatchEvent(new Event("normal_object"));
        if (this.targetEl.getAttribute("geometry").primitive === "plane") {
          this.source = this.targetEl.getAttribute("text").value;
          this.saveRegistryUsingDragAndDrop(
            this.source,
            this.el.classList.item(1),
            this.el.classList.item(1),
            ["any", "any"],
            "any"
          );
        } else {
          console.log("You can't put objects on slot.");
        }
      }
    } else {
      // 交差していなければ現targetを初期化
      this.targetEl = null;
    }
  },
  /**
   * dragndrop の動作結果に従う registry への save. "any"を引数とすれば, 該当項目を変更しない.
   * @param {String} source グリッド指定. 必ず"Grid i j"の形式で.
   * @param {ClassName} partsName 配置するパーツの種類
   * @param {String} addon 動作させる関数
   * @param {Array} actionTargets 動作対象
   * @param {Boolean} initVisibility 起動時のパーツの可視性
   */
  saveRegistryUsingDragAndDrop: function (
    source,
    partsName,
    addon,
    actionTargets,
    initVisibility
  ) {
    //console.log(this.source, this.action, this.actionTargets);
    const regex = /Grid (\d+) (\d+)/;
    const match = source.match(regex);
    const row = Number(match[1]);
    const column = Number(match[2]);
    const currentState = registry.board[row][column];
    let targets = [null, null];
    let isInitVisibility = null;
    if (typeof actionTargets === "string") {
      targets[0] = currentState.actionTargets[0];
      targets[1] = currentState.actionTargets[1];
    } else {
      for (let i = 0; i < actionTargets.length; i++) {
        if (actionTargets[i].includes("any")) {
          targets[i] = currentState.actionTargets[i];
        } else {
          targets[i] = actionTargets[i];
        }
      }
    }
    if (typeof initVisibility === "boolean") {
      isInitVisibility = initVisibility;
    } else if (
      typeof initVisibility === "string" &&
      Object.values(INIT_VISIBILITY_TEXT).includes(initVisibility)
    ) {
      isInitVisibility =
        initVisibility === INIT_VISIBILITY_TEXT.enable ? true : false;
    } else {
      isInitVisibility = currentState.isInitVisibility;
    }

    console.log(currentState);
    updateRegistry(
      row,
      column,
      partsName.includes("any") ? currentState.partsName : partsName,
      addon.includes("any") ? currentState.addon : addon,
      targets,
      isInitVisibility,
      currentState.isBelowWall,
      currentState.isRightWall
    );
    console.log(registry.board[row][column]);
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
