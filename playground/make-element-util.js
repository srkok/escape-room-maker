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
