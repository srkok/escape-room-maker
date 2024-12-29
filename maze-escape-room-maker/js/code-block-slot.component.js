/** usage:
 * document.addEventListener("DOMContentLoaded", () => {
 *  your_object.classList.add("code-block-slot");
    your_object.setAttribute("code-block-slot", "operation: zzz");
  });
 */
const CODE_BLOCK_SETMENU = {
  outer: {
    geometry: { primitive: "box", height: 0.5, width: 1.2, depth: 1 },
    color: "red",
    position: {
      menu_initialVisibility: { x: -1.5, y: -1.5, z: 0.5 },
      menu_actionTarget: { x: 0, y: 0, z: 0 },
    },
    rotation: { x: 0, y: 0, z: 0 },
  },
  inner: {
    geometry: { primitive: "plane", height: 0.4, width: 1 },
    color: "white",
    position: { x: 0, y: -0.3, z: 0.25 },
    rotation: { x: 90, y: 0, z: 0 },
    text: {
      menu_initialVisibility:
        "value: init visibility:; align: center; width: 3; color: black",
      menu_actionTarget:
        "value: action target:; align: center; width: 3; color: black",
    },
  },
  slot: {
    geometry: { primitive: "box", height: 0.4, width: 1, depth: 0.4 },
    color: "gray",
    position: {
      menu_initialVisibility: { x: 0, y: -0.1, z: -0.25 },
      menu_actionTarget1: { x: 0, y: 0, z: 0 },
      menu_actionTarget2: { x: 0, y: 0, z: 0 },
    },
    rotation: { x: 0, y: 0, z: 0 },
    opacity: 0.5,
  },
};

AFRAME.registerComponent("code-block-slot", {
  schema: {
    targetEl: { type: "string", default: "el" },
    operation: { type: "string", default: "show-debug-explain" },
  },
  init: function () {
    this.el.addEventListener("intersecting", () => {
      this.el.setAttribute(this.data.operation, "");
    });
    this.el.addEventListener("diverging", () => {
      this.el.removeAttribute(this.data.operation);
    });
  },
});

AFRAME.registerComponent("show-settings-initialvisibility", {
  init: function () {
    // set outer box
    let newEl = document.createElement("a-entity");
    setNewElementProperties(
      newEl,
      CODE_BLOCK_SETMENU.outer.geometry,
      CODE_BLOCK_SETMENU.outer.color,
      CODE_BLOCK_SETMENU.outer.position.menu_initialVisibility,
      CODE_BLOCK_SETMENU.outer.rotation
    );
    // set inner text plane
    let newTextEl = document.createElement("a-entity");
    setNewElementProperties(
      newTextEl,
      CODE_BLOCK_SETMENU.inner.geometry,
      CODE_BLOCK_SETMENU.inner.color,
      CODE_BLOCK_SETMENU.inner.position,
      CODE_BLOCK_SETMENU.inner.rotation
    );
    newTextEl.setAttribute(
      "text",
      CODE_BLOCK_SETMENU.inner.text.menu_initialVisibility
    );
    newEl.appendChild(newTextEl);
    // set codeblock slot
    /** error position
    let newSlotEl = document.createElement("a-entity");
    setNewElementProperties(
      newSlotEl,
      CODE_BLOCK_SETMENU.slot.geometry,
      CODE_BLOCK_SETMENU.slot.color,
      CODE_BLOCK_SETMENU.slot.position.menu_initialVisibility,
      CODE_BLOCK_SETMENU.slot.rotation
    );
    newSlotEl.setAttribute(
      "material",
      `opacity: ${CODE_BLOCK_SETMENU.slot.opacity}`
    );
    newSlotEl.classList.add("code-block-slot");
    newSlotEl.setAttribute("code-block-slot", "");
    newEl.appendChild(newSlotEl);
    /** */
    this.el.appendChild(newEl);
  },
  remove: function () {
    this.el.innerHTML = "";
  },
});

/** just for debugging. */
AFRAME.registerComponent("show-debug-explain", {
  init: function () {
    console.log("show-debug-explain loaded.");
  },
});

/** delete? *
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".code-block-slot")
    .setAttribute("code-block-slot", "targetId: box; operation: spin");
});
/****/
