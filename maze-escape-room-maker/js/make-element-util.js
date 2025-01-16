function setNewElementProperties(newEl, geometry, color, position, rotation) {
  newEl.setAttribute("geometry", geometry);
  newEl.setAttribute("material", "color", color);
  newEl.setAttribute("position", position);
  newEl.setAttribute("rotation", rotation);
}

function setActionSettingsProperties(newEl, defaultColor, highlightColor) {
  newEl.classList.add("raycastable");
  newEl.setAttribute(
    "hover-color-change",
    `mouseenterColor: ${highlightColor}; mouseleaveColor: ${defaultColor}`
  );
}

async function toggleVisible(element) {
  await waitForObjectReady(element);
  if (isEqual(element.getAttribute("scale"), ZERO_VEC3_OBJECT)) {
    element.setAttribute("scale", { x: 1, y: 1, z: 1 });
  } else {
    element.setAttribute("scale", ZERO_VEC3_OBJECT);
  }
}

function sumObjectsByKey(...objects) {
  return objects.reduce((acc, obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        acc[key] = (acc[key] || 0) + obj[key];
      }
    }
    return acc;
  }, {});
}

function removeElementsByClass(className) {
  // 指定されたクラス名を持つすべての要素を取得
  const elements = document.querySelectorAll(`.${className}`);

  // 各要素を順番に削除
  elements.forEach((element) => {
    element.remove();
  });
}

// 数値の反転を返却する関数
function invertObjectValues(obj) {
  const invertedObj = {};
  for (const key in obj) {
    invertedObj[key] = -obj[key];
  }
  return invertedObj;
}
