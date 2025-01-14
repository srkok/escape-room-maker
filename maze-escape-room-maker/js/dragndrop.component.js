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
    this.source = undefined;
    this.action = undefined;
    this.savedSlot = undefined;
    this.el.addEventListener("mousedown", (e) => {
      if (this.el.is("cursor-hovered")) {
        this.el.sceneEl.camera.el.setAttribute("look-controls", {
          enabled: false,
        });
        this.el.addState("dragging");
        if (this.targetEl) {
          this.handleMouseDown();
          this.targetEl = null;
          this.source = undefined;
          this.action = undefined;
          this.savedSlot = undefined;
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
  /** mouseを離す前の動作指定 **/
  handleMouseDown: function () {
    if (
      this.targetEl.getAttribute("geometry").primitive === "plane" &&
      !this.el.classList.contains("textblock")
    ) {
      this.targetEl.dispatchEvent(new Event("objects_diverging"));
      // objects move away from Grid
      this.saveRegistryUsingDragAndDrop(
        this.source,
        null,
        null,
        [null, null],
        false
      );
    } else if (
      !(this.targetEl.getAttribute("geometry").primitive === "plane") &&
      this.el.classList.contains("textblock")
    ) {
      // textblock move away from slot
      let targets = ["any", "any"];
      let initVisibility = "any";
      const thisTextValue = this.el.children[0].getAttribute("text").value;
      if (
        this.action.includes("init visibility") &&
        Object.values(INIT_VISIBILITY_TEXT).includes(thisTextValue)
      ) {
        // InitVisibility textblock move away from initVisibility slot
        initVisibility = false;
        if (this.targetEl.parentEl) {
          this.deleteTextBlockDataOfGrid(
            this.targetEl.parentEl.parentEl,
            "initial_visibility"
          );
        }
      } else if (
        this.action.includes("action target") &&
        !Object.values(INIT_VISIBILITY_TEXT).includes(thisTextValue)
      ) {
        // Grid/Wall textblock move away from actionTarget slot
        targets[this.savedSlot] = null;
        if (this.targetEl.parentEl) {
          this.deleteTextBlockDataOfGrid(
            this.targetEl.parentEl.parentEl,
            `action_target_${this.savedSlot + 1}`
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
    }
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
      this.el.setAttribute("position", targetWorldPosition);
      this.source = undefined; // "Grid i j" string
      this.action = undefined; // "init visibility:" or "action target:" or extras.
      this.savedSlot = undefined; // actionTargets slot index of registry.
      //this.targetEl.dispatchEvent(new Event("intersecting"));
      if (this.el.classList.contains("octahedron")) {
        this.targetEl.dispatchEvent(new Event("octahedron"));
        // Grid にしか置けない
        if (this.targetEl.getAttribute("geometry").primitive === "plane") {
          this.source = this.targetEl.getAttribute("text").value;
          // もし既にtextblockがmenu上に存在していれば、当て嵌める
          let initVisibility = "any";
          let actionTargets = ["any", "any"];
          Array.from(this.targetEl.children).forEach((child) => {
            if (child.classList.contains("initial_visibility")) {
              initVisibility =
                child.getAttribute("text").value === INIT_VISIBILITY_TEXT.enable
                  ? true
                  : false;
            } else if (child.classList.contains("action_target_1")) {
              actionTargets[0] = child.getAttribute("text").value;
            } else if (child.classList.contains("action_target_2")) {
              actionTargets[1] = child.getAttribute("text").value;
            }
          });
          this.saveRegistryUsingDragAndDrop(
            this.source,
            "octahedron",
            "toggleVisible",
            actionTargets,
            initVisibility
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
              this.saveTextBlockDataToGrid(
                this.targetEl.parentEl.parentEl,
                thisTextValue,
                "initial_visibility"
              );
            } else {
              console.log("You can't put Grid/Wall_Pos on initVis_menu.");
            }
          } else if (this.action.includes("action target")) {
            // 動かしているtextblockが、Grid/Wall情報だった場合
            if (!Object.values(INIT_VISIBILITY_TEXT).includes(thisTextValue)) {
              // select save slot
              const slotPositionsObj = CODE_BLOCK_SETMENU.slot.position;
              for (let i = 0; i < Object.keys(slotPositionsObj).length; i++) {
                const slotPos = slotPositionsObj[`menu_actionTarget${i + 1}`];
                if (isEqual(this.targetEl.getAttribute("position"), slotPos)) {
                  targets[i] = thisTextValue;
                  this.savedSlot = i;
                  this.saveTextBlockDataToGrid(
                    this.targetEl.parentEl.parentEl,
                    thisTextValue,
                    `action_target_${i + 1}`
                  );
                  break; // 2つ以上のslotと一致することはない.
                }
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
          console.log("You can't put textblock on Grid.");
        }
      } else {
        this.targetEl.dispatchEvent(new Event("normal_object"));
        if (this.targetEl.getAttribute("geometry").primitive === "plane") {
          this.source = this.targetEl.getAttribute("text").value;
          let initVisibility = "any";
          // もし既にtextblockがmenu上に存在していれば、当て嵌める
          Array.from(this.targetEl.children).forEach((child) => {
            if (child.classList.contains("initial_visibility")) {
              initVisibility =
                child.getAttribute("text").value === INIT_VISIBILITY_TEXT.enable
                  ? true
                  : false;
            }
          });
          this.saveRegistryUsingDragAndDrop(
            this.source,
            this.el.classList.item(1),
            this.el.classList.item(1),
            ["any", "any"],
            initVisibility
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
  /** 現在menu slot位置に置いてあるtextblockのtext情報を, 子要素として保存する関数
   * @param {Element} gridEl 保存場所となるGrid element
   * @param {String} textData 保存するtextblock data string
   * @param {Class} data_class 保存先, "initial_visibility" or "action_target_1" or "action_target_2"
   */
  saveTextBlockDataToGrid: function (gridEl, textData, data_class) {
    let newEl = document.createElement("a-entity");
    newEl.setAttribute("text", `value: ${textData}`);
    newEl.classList.add("textblockdata");
    newEl.classList.add(data_class);
    gridEl.appendChild(newEl);
  },
  /** gridElの子要素のうち, クラスにdata_classを含む要素を全て削除する関数
   * @param {Element} gridEl 対象のGrid element
   * @param {Class} data_class 対象のclass name string
   */
  deleteTextBlockDataOfGrid: function (gridEl, data_class) {
    Array.from(gridEl.children).forEach((child) => {
      if (child.classList.contains(data_class)) {
        child.remove();
      }
    });
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
    const regex = /Grid (\d+) (\d+)/;
    const match = source.match(regex);
    const row = Number(match[1]);
    const column = Number(match[2]);
    const currentState = registry.board[row][column];
    let targets = [null, null];
    let isInitVisibility = null;

    console.log("before save registry:");
    console.log(currentState);

    if (typeof actionTargets === "string") {
      targets[0] = currentState.actionTargets[0];
      targets[1] = currentState.actionTargets[1];
    } else {
      for (let i = 0; i < actionTargets.length; i++) {
        if (actionTargets[i] && actionTargets[i].includes("any")) {
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

    updateRegistry(
      row,
      column,
      partsName && partsName.includes("any")
        ? currentState.partsName
        : partsName,
      addon && addon.includes("any") ? currentState.addon : addon,
      targets,
      isInitVisibility,
      currentState.isBelowWall,
      currentState.isRightWall
    );

    console.log("after save registry:");
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
