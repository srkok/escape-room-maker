const HUD_BACKSCREEN_OBJECT = { primitive: "plane", height: 1.5, width: 1.2 };
const HUD_BACKSCREEN_POSITION = { x: 0.7, y: -0.05, z: -1 };
const HUD_TAB_OBJECT = {
  primitive: "plane",
  height: 0.1,
  width: HUD_BACKSCREEN_OBJECT.width / 3,
};
const HUD_WHAT_COLOR = "deeppink";
const HUD_DO_COLOR = "blue";
const HUD_WHERE_COLOR = "green";
const HUD_HIGHLIGHT_COLOR = "red";
const HUD_OPACITY = 0.8;

function showWhat() {
  const backScreen = document.getElementById("backScreen");
  backScreen.innerHTML = "";
  backScreen.setAttribute("material", "color", HUD_WHAT_COLOR);
  // TODO drag可能なoctahedronとかtrapとかgoalとかを置く
  let newOctahedron = document.createElement("a-entity");
  setNewElementProperties(
    newOctahedron,
    { primitive: "octahedron", radius: 0.15 },
    "royalblue",
    { x: -0.1, y: 0.4, z: 0.1 },
    { x: 0, y: -15, z: 0 }
  );
  backScreen.appendChild(newOctahedron);
}

function showDo() {
  const backScreen = document.getElementById("backScreen");
  backScreen.innerHTML = "";
  backScreen.setAttribute("material", "color", HUD_DO_COLOR);
  // TODO drag可能なvisibleとかunvisibleとかを置く
  // set block visible
  let blockVisible = document.createElement("a-entity");
  setNewElementProperties(
    blockVisible,
    { primitive: "box", height: 0.1, width: 0.5, depth: 0.1 },
    "black",
    { x: 0, y: 0.5, z: 0 },
    { x: 0, y: 0, z: 0 }
  );
  let blockVisibleText = document.createElement("a-entity");
  blockVisibleText.setAttribute(
    "text",
    "value: visible; align: center: width: 1"
  );
  blockVisibleText.setAttribute("position", { x: 0.4, y: -0.02, z: 0.1 }); // FIXME いちいち設定しないといけないの意味わかんないんだよな。automaticなやつあるやろ絶対。
  blockVisible.appendChild(blockVisibleText);
  backScreen.appendChild(blockVisible);
  // set block unvisible
  let blockUnVisible = document.createElement("a-entity");
  setNewElementProperties(
    blockUnVisible,
    { primitive: "box", height: 0.1, width: 0.5, depth: 0.1 },
    "black",
    { x: 0, y: 0.2, z: 0 },
    { x: 0, y: 0, z: 0 }
  );
  let blockUnVisibleText = document.createElement("a-entity");
  blockUnVisibleText.setAttribute(
    "text",
    "value: unvisible; align: center: width: 1"
  );
  blockUnVisibleText.setAttribute("position", { x: 0.37, y: -0.01, z: 0.1 }); // FIXME いちいち設定しないといけないの意味わかんないんだよな。automaticなやつあるやろ絶対。
  blockUnVisible.appendChild(blockUnVisibleText);
  backScreen.appendChild(blockUnVisible);
}

function showWhere() {
  const backScreen = document.getElementById("backScreen");
  backScreen.innerHTML = "";
  backScreen.setAttribute("material", "color", HUD_WHERE_COLOR);
  // TODO drag可能な2D mazeとかを置く
}

AFRAME.registerComponent("change-edit-mode", {
  schema: {
    mode: { type: "string" },
  },
  events: {
    click: function () {
      //console.log(`change ${this.data.mode} mode.`);
      if (this.data.mode === "what") {
        showWhat();
      } else if (this.data.mode === "do") {
        showDo();
      } else if (this.data.mode === "where") {
        showWhere();
      } else {
        console.log("ERROR mode.");
      }
    },
  },
});

function showHUD() {
  const HUDEl = document.getElementById("headUpDisplay");
  // set tab what
  let tabWhat = document.createElement("a-entity");
  setNewElementProperties(
    tabWhat,
    HUD_TAB_OBJECT,
    HUD_WHAT_COLOR,
    {
      x: HUD_BACKSCREEN_POSITION.x - HUD_BACKSCREEN_OBJECT.width / 3,
      y: HUD_BACKSCREEN_OBJECT.height / 2,
      z: -1,
    },
    ZERO_VEC3_OBJECT
  );
  tabWhat.setAttribute("text", "value: what; align: center; width: 1");
  setActionSettingsProperties(tabWhat, HUD_WHAT_COLOR, HUD_HIGHLIGHT_COLOR);
  tabWhat.setAttribute("change-edit-mode", "mode: what");
  HUDEl.appendChild(tabWhat);

  // set tab do
  let tabDo = document.createElement("a-entity");
  setNewElementProperties(
    tabDo,
    HUD_TAB_OBJECT,
    HUD_DO_COLOR,
    {
      x: HUD_BACKSCREEN_POSITION.x,
      y: HUD_BACKSCREEN_OBJECT.height / 2,
      z: -1,
    },
    ZERO_VEC3_OBJECT
  );
  tabDo.setAttribute("text", "value: do; align: center; width: 1");
  setActionSettingsProperties(tabDo, HUD_DO_COLOR, HUD_HIGHLIGHT_COLOR);
  tabDo.setAttribute("change-edit-mode", "mode: do");
  HUDEl.appendChild(tabDo);

  // set tab where
  let tabWhere = document.createElement("a-entity");
  setNewElementProperties(
    tabWhere,
    HUD_TAB_OBJECT,
    HUD_WHERE_COLOR,
    {
      x: HUD_BACKSCREEN_POSITION.x + HUD_BACKSCREEN_OBJECT.width / 3,
      y: HUD_BACKSCREEN_OBJECT.height / 2,
      z: -1,
    },
    ZERO_VEC3_OBJECT
  );
  tabWhere.setAttribute("text", "value: where; align: center; width: 1");
  setActionSettingsProperties(tabWhere, HUD_WHERE_COLOR, HUD_HIGHLIGHT_COLOR);
  tabWhere.setAttribute("change-edit-mode", "mode: where");
  HUDEl.appendChild(tabWhere);

  // set backScreen
  let backScreen = document.createElement("a-entity");
  backScreen.setAttribute("id", "backScreen");
  setNewElementProperties(
    backScreen,
    HUD_BACKSCREEN_OBJECT,
    HUD_WHAT_COLOR, // 任意.
    HUD_BACKSCREEN_POSITION,
    ZERO_VEC3_OBJECT
  );
  backScreen.setAttribute("material", "opacity", HUD_OPACITY);
  HUDEl.appendChild(backScreen);
  //初回起動時はwhat選択画面が表示
  showWhat();
}

document.addEventListener("DOMContentLoaded", showHUD);
