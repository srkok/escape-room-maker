const EDITMODE_PARTS = {
  all: {
    position: { x: 0, y: 5, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  },
  octahedron: {
    geometry: { primitive: "octahedron" },
    color: "royalblue",
    position: { x: 0, y: 1.6, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  },
  startportal: {
    background: {
      geometry: { primitive: "circle", radius: 1.5 },
      color: "yellow",
      position: { x: 3, y: 1.6, z: 0 },
      rotation: { x: -90, y: 0, z: 0 },
      opacity: 0.1,
      text: "value: start; align: center; width: 5; color: black",
    },
    ring: {
      geometry: { primitive: "torus", radius: 1.5, radiusTubular: 0.1 },
      color: "blue",
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  goalflag: {
    base: {
      geometry: { primitive: "cylinder", height: 0.5, radius: 0.8 },
      color: "gray",
      position: { x: 6, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    pole: {
      geometry: { primitive: "cylinder", height: 4, radius: 0.2 },
      color: "white",
      position: { x: 0, y: 2, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    flag: {
      geometry: { primitive: "box", height: 1.2, width: 1.2, depth: 0.4 },
      color: "red",
      position: { x: 0.7, y: 1.2, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  spiketrap: {
    base: {
      geometry: { primitive: "plane", height: 4, width: 4 },
      color: "gray",
      position: { x: 10, y: 0.1, z: 0 },
      rotation: { x: -90, y: 0, z: 0 },
    },
    spike: {
      geometry: { primitive: "cone" },
      color: "gray",
      rotation: { x: 90, y: 0, z: 0 },
    },
    num_spikes_per_side: 4,
  },
  textblock: {
    outer: {
      geometry: { primitive: "box", height: 0.4, width: 1, depth: 0.3 },
      color: "black",
      position: {
        enable: { x: 13, y: 2, z: 0 },
        disable: { x: 13, y: 0, z: 0 },
        gridname: { x: 0, y: 0.1, z: -4 },
        wallname_below: { x: 0, y: 2.4, z: -1.7 },
        wallname_right: { x: 0, y: 0.1, z: -4 },
      },
      rotation: { x: 0, y: 0, z: 0 },
    },
    inner: {
      geometry: { primitive: "plane", height: 0.3, width: 0.8 },
      color: "white",
      position: { x: 0, y: 0, z: 0.16 },
      rotation: { x: 0, y: 0, z: 0 },
      text: {
        enable: "value: enable; align: center; width: 5; color: black",
        disable: "value: disable; align: center; width: 5; color: black",
        gridname: (i, j) =>
          `value: Grid ${i} ${j}; align: center; width: 5; color: black`,
        wallname: (i, j, direction) =>
          `value: Grid ${i} ${j} 's\n${direction} Wall; align: center; width: 3; color: black`,
      },
    },
  },
};

AFRAME.registerComponent("repop-model", {
  schema: {
    model: { type: "string" },
    position: {
      type: "string",
      default: JSON.stringify(EDITMODE_PARTS.all.position),
    },
    text: {
      type: "string",
      default: JSON.stringify({ value: "no_text" }),
    },
  },
  init: function () {
    if (this.data.model === "octahedron") {
      this.handleclick = makeOctahedronModel;
    } else if (this.data.model === "goalflag") {
      this.handleclick = makeGoalFlagModel;
    } else if (this.data.model === "spiketrap") {
      this.handleclick = makeSpikeTrapModel;
    } else if (this.data.model.includes("textblock")) {
      this.handleclick = makeTextBlockModel;
    } else {
      this.handleclick = () => {
        console.log("ERROR model.");
      };
    }
  },
  events: {
    click: function () {
      // 動かした場合repop
      if (this.data.model.includes("textblock")) {
        this.el.parentEl.appendChild(
          this.handleclick(
            JSON.parse(this.data.text),
            JSON.parse(this.data.position)
          )
        );
      } else {
        this.el.sceneEl.appendChild(
          this.handleclick(JSON.parse(this.data.position))
        );
      }
      // あとで消す用. initMazeMaker起動時(行列数拡張時or再開時)に消える.
      this.el.classList.add("delete-me");
      // 動かしたものを再度動かしてもrepopしないようにする
      this.el.removeAttribute("repop-model");
    },
  },
});

function makeOctahedronModel(position) {
  let newOctahedronEl = document.createElement("a-entity");
  setNewElementProperties(
    newOctahedronEl,
    EDITMODE_PARTS.octahedron.geometry,
    EDITMODE_PARTS.octahedron.color,
    sumObjectsByKey({ ...EDITMODE_PARTS.octahedron.position }, position),
    EDITMODE_PARTS.octahedron.rotation
  );
  newOctahedronEl.classList.add("raycastable");
  newOctahedronEl.setAttribute("dragndrop", "");
  newOctahedronEl.setAttribute("repop-model", "model: octahedron");
  return newOctahedronEl;
}

function makeStartPortalModel(position) {
  let newEl = document.createElement("a-entity");
  setNewElementProperties(
    newEl,
    EDITMODE_PARTS.startportal.background.geometry,
    EDITMODE_PARTS.startportal.background.color,
    sumObjectsByKey(EDITMODE_PARTS.startportal.background.position, position),
    EDITMODE_PARTS.startportal.background.rotation
  );
  newEl.setAttribute(
    "material",
    `side: double; opacity: ${EDITMODE_PARTS.startportal.background.opacity}`
  );
  newEl.setAttribute("text", EDITMODE_PARTS.startportal.background.text);
  let newRingEl = document.createElement("a-entity");
  setNewElementProperties(
    newRingEl,
    EDITMODE_PARTS.startportal.ring.geometry,
    EDITMODE_PARTS.startportal.ring.color,
    EDITMODE_PARTS.startportal.ring.position,
    EDITMODE_PARTS.startportal.ring.rotation
  );
  newEl.appendChild(newRingEl);
  newEl.classList.add("raycastable");
  newEl.setAttribute("dragndrop", "");
  // repopfunc is unnecessary.
  return newEl;
}

function makeGoalFlagModel(position) {
  let newBaseEl = document.createElement("a-entity");
  setNewElementProperties(
    newBaseEl,
    EDITMODE_PARTS.goalflag.base.geometry,
    EDITMODE_PARTS.goalflag.base.color,
    sumObjectsByKey({ ...EDITMODE_PARTS.goalflag.base.position }, position),
    EDITMODE_PARTS.goalflag.base.rotation
  );
  newBaseEl.classList.add("raycastable");
  newBaseEl.setAttribute("dragndrop", "");
  newBaseEl.setAttribute("repop-model", "model: goalflag");
  let newPoleEl = document.createElement("a-entity");
  setNewElementProperties(
    newPoleEl,
    EDITMODE_PARTS.goalflag.pole.geometry,
    EDITMODE_PARTS.goalflag.pole.color,
    EDITMODE_PARTS.goalflag.pole.position,
    EDITMODE_PARTS.goalflag.pole.rotation
  );
  let newFlagEl = document.createElement("a-entity");
  setNewElementProperties(
    newFlagEl,
    EDITMODE_PARTS.goalflag.flag.geometry,
    EDITMODE_PARTS.goalflag.flag.color,
    EDITMODE_PARTS.goalflag.flag.position,
    EDITMODE_PARTS.goalflag.flag.rotation
  );
  newPoleEl.appendChild(newFlagEl);
  newBaseEl.appendChild(newPoleEl);
  return newBaseEl;
}

function makeSpikeTrapModel(position) {
  let newSpikeTrapEl = document.createElement("a-entity");
  setNewElementProperties(
    newSpikeTrapEl,
    EDITMODE_PARTS.spiketrap.base.geometry,
    EDITMODE_PARTS.spiketrap.base.color,
    sumObjectsByKey({ ...EDITMODE_PARTS.spiketrap.base.position }, position),
    EDITMODE_PARTS.spiketrap.base.rotation
  );
  newSpikeTrapEl.setAttribute("material", "side: double");
  const radius_bottom =
    EDITMODE_PARTS.spiketrap.base.geometry.height /
    (EDITMODE_PARTS.spiketrap.num_spikes_per_side * 2);
  for (let i = 0; i < EDITMODE_PARTS.spiketrap.num_spikes_per_side; i++) {
    for (let j = 0; j < EDITMODE_PARTS.spiketrap.num_spikes_per_side; j++) {
      let newSpikeEl = document.createElement("a-entity");
      setNewElementProperties(
        newSpikeEl,
        {
          ...EDITMODE_PARTS.spiketrap.spike.geometry,
          radiusBottom: radius_bottom,
        },
        EDITMODE_PARTS.spiketrap.spike.color,
        {
          x:
            i * radius_bottom * 2 -
            radius_bottom * (EDITMODE_PARTS.spiketrap.num_spikes_per_side - 1),
          y:
            j * radius_bottom * 2 -
            radius_bottom * (EDITMODE_PARTS.spiketrap.num_spikes_per_side - 1),
          z: 0.5,
        },
        EDITMODE_PARTS.spiketrap.spike.rotation
      );
      newSpikeTrapEl.appendChild(newSpikeEl);
    }
  }
  newSpikeTrapEl.classList.add("raycastable");
  newSpikeTrapEl.setAttribute("dragndrop", "");
  newSpikeTrapEl.setAttribute("repop-model", "model: spiketrap");
  return newSpikeTrapEl;
}

function makeTextBlockModel(text, position) {
  // make model
  let newBlockEl = document.createElement("a-entity");
  setNewElementProperties(
    newBlockEl,
    EDITMODE_PARTS.textblock.outer.geometry,
    EDITMODE_PARTS.textblock.outer.color,
    position,
    EDITMODE_PARTS.textblock.outer.rotation
  );
  let newBlockTextEl = document.createElement("a-entity");
  setNewElementProperties(
    newBlockTextEl,
    EDITMODE_PARTS.textblock.inner.geometry,
    EDITMODE_PARTS.textblock.inner.color,
    EDITMODE_PARTS.textblock.inner.position,
    EDITMODE_PARTS.textblock.inner.rotation
  );
  newBlockTextEl.setAttribute("text", text);
  newBlockEl.appendChild(newBlockTextEl);
  // set funcs
  let textblock_textvalue = newBlockTextEl.getAttribute("text").value;
  newBlockEl.classList.add("raycastable");
  newBlockEl.setAttribute("dragndrop", "");
  newBlockEl.setAttribute(
    "repop-model",
    `
     model: ${"textblock_" + textblock_textvalue};
     text: ${JSON.stringify(newBlockTextEl.getAttribute("text"))};
     position: ${JSON.stringify(position)};
    `
  );
  return newBlockEl;
}

document.addEventListener("DOMContentLoaded", () => {
  // 初期配置
  const sceneEl = document.querySelector("a-scene");
  sceneEl.appendChild(makeOctahedronModel(EDITMODE_PARTS.all.position));
  sceneEl.appendChild(makeStartPortalModel(EDITMODE_PARTS.all.position));
  sceneEl.appendChild(makeGoalFlagModel(EDITMODE_PARTS.all.position));
  sceneEl.appendChild(makeSpikeTrapModel(EDITMODE_PARTS.all.position));
  sceneEl.appendChild(
    makeTextBlockModel(
      EDITMODE_PARTS.textblock.inner.text.enable,
      sumObjectsByKey(
        EDITMODE_PARTS.textblock.outer.position.enable,
        EDITMODE_PARTS.all.position
      )
    )
  );
  sceneEl.appendChild(
    makeTextBlockModel(
      EDITMODE_PARTS.textblock.inner.text.disable,
      sumObjectsByKey(
        EDITMODE_PARTS.textblock.outer.position.disable,
        EDITMODE_PARTS.all.position
      )
    )
  );
});

/*
// textの内容がenableのmodelを返却する関数
function makeTextBlockModelEnable(position) {
  let newEl = makeTextBlockModel(
    EDITMODE_PARTS.textblock.inner.text.enable, //
    sumObjectsByKey(EDITMODE_PARTS.textblock.outer.position.enable, position) //
  );
  // set functions
  //  newEl.classList.add("raycastable");
  //  newEl.setAttribute("dragndrop", "");
  //  newEl.setAttribute("repop-model", "model: textblock_enable"); //
  return newEl;
}

// textの内容がdisableのmodelを返却する関数
function makeTextBlockModelDisable(position) {
  let newEl = makeTextBlockModel(
    EDITMODE_PARTS.textblock.inner.text.disable,
    sumObjectsByKey(EDITMODE_PARTS.textblock.outer.position.disable, position)
  );
  // set functions
  //  newEl.classList.add("raycastable");
  //  newEl.setAttribute("dragndrop", "");
  //  newEl.setAttribute("repop-model", "model: textblock_disable");
  return newEl;
}

function makeTextBlockModelGridName(i, j, position) {
  let newEl = makeTextBlockModel(
    EDITMODE_PARTS.textblock.inner.text.gridname(i, j),
    sumObjectsByKey(EDITMODE_PARTS.textblock.outer.position.gridname, position)
  );
  // set func
  //  newEl.classList.add("raycastable");
  //newEl.setAttribute("dragndrop", "");
  //newEl.setAttribute("repop-model", `model: textblock_grid${i}${j}`);
  return newEl;
}
/** */
