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

/**
 * sum of obj's values each keys
 * @param  {...any} objects
 * @returns object {(key: obj1.key + obj2.key + ...)*num_of_obj_keys}
 */
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

/**
 * reverse obj's values
 * @param {Object} obj
 * @returns object {(key: -obj.key)*num_of_obj_keys}
 */
function invertObjectValues(obj) {
  const invertedObj = {};
  for (const key in obj) {
    invertedObj[key] = -obj[key];
  }
  return invertedObj;
}
