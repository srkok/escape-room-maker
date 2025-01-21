/**
 * newElを設定
 * @param {Node} newEl 設定対象
 * @param {String} geometry 形状
 * @param {String} color 色
 * @param {vec3} position 位置
 * @param {vec3} rotation 回転
 * @param {Boolean} isVisible 可視性
 */
function setNewElementProperties(
  newEl,
  geometry,
  color,
  position,
  rotation,
  isVisible
) {
  newEl.setAttribute("geometry", geometry);
  newEl.setAttribute("material", "color", color);
  newEl.setAttribute("position", position);
  newEl.setAttribute("rotation", rotation);
  if (!isVisible) {
    toggleVisible(newEl);
  }
}

/**
 * newElにマウスカーソルが乗った/離れた際の色について設定する
 * @param {Node} newEl 設定対象
 * @param {String} defaultColor マウスが触れていない状態での色
 * @param {String} highlightColor マウスが触れている状態での色
 */
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
  /** XXX いらなさそう.
  // recursive execution for child elements as well
  for (const child of element.children) {
    toggleVisible(child);
  }
  /** */
}

function isEqual(objA, objB) {
  if (objA === objB) return true; // 同じ参照の場合
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false; // オブジェクトでない場合
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false; // プロパティ数が異なる場合

  for (const key of keysA) {
    if (!keysB.includes(key) || !isEqual(objA[key], objB[key])) {
      return false; // プロパティの値を再帰的に比較
    }
  }

  return true; // すべてのプロパティが一致
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
