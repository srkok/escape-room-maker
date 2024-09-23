/**
 * newElを設定
 * @param {Node} newEl 設定対象
 * @param {String} geometry 形状
 * @param {String} color 色
 * @param {vector3} position 位置
 * @param {vector3} rotation 回転
 * @param {Boolean} isVisible 可視性
 * @param {Boolean} isClickable クリック可能性
 */
function setNewElementProperties(
  newEl,
  geometry,
  color,
  position,
  rotation,
  isVisible,
  isClickable
) {
  newEl.setAttribute("geometry", geometry);
  newEl.setAttribute("material", "color", color);
  newEl.setAttribute("position", position);
  newEl.setAttribute("rotation", rotation);
  if (!isVisible) {
    toggleVisible(newEl);
  }
  if (isClickable) {
    newEl.classList.add("raycastable");
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

async function toggleVisible(element) {
  await waitForObjectReady(element);
  //console.log(element.getAttribute("scale"));
  if (isEqual(element.getAttribute("scale"), { x: 0, y: 0, z: 0 })) {
    element.setAttribute("scale", { x: 1, y: 1, z: 1 });
  } else {
    element.setAttribute("scale", { x: 0, y: 0, z: 0 });
  }
}

function sceneMaker(dataObject) {
  const quizGrids = document.getElementById("quizGrids");

  /** 一度すべてのquizBlocksを生成し終える **/
  for (const name in dataObject) {
    /** 外箱の設定 **/
    let newQuizBoardEl = document.createElement("a-entity");
    setNewElementProperties(
      newQuizBoardEl,
      { primitive: "box", height: 4, width: 4, depth: 2 },
      dataObject[name].outerColor,
      { x: Number(name) * 4, y: 2, z: 0 },
      { x: 0, y: 0, z: 0 },
      dataObject[name].isVisible,
      dataObject[name].isClickable
    );
    /** 内テキストの設定 **/
    let newQuizTextEl = document.createElement("a-entity");
    setNewElementProperties(
      newQuizTextEl,
      { primitive: "plane", height: 3.5, width: 3.5 },
      dataObject[name].innerColor,
      { x: 0, y: 0, z: 1.1 },
      { x: 0, y: 0, z: 0 },
      true,
      dataObject[name].isClickable
    );
    newQuizTextEl.setAttribute("text", "value: " + dataObject[name].quizText);
    newQuizTextEl.setAttribute("text", "color", dataObject[name].quizTextColor);
    /** 生成 **/
    newQuizBoardEl.appendChild(newQuizTextEl);
    quizGrids.appendChild(newQuizBoardEl);
  }

  /** 全てのquizBlocksを生成し終えたのち、相互作用の設定に移る **/
  for (const name in dataObject) {
    if (dataObject[name].isClickable) {
      const clickableQuizBoardEl = quizGrids.children[Number(name)];
      clickableQuizBoardEl.setAttribute(
        "hover-color-change",
        `mouseenterColor: ${dataObject[name].highlightColor}; mouseleaveColor: ${dataObject[name].outerColor}`
      );
      clickableQuizBoardEl.addEventListener("click", () => {
        dataObject[name].influenceTargets.forEach((el) => {
          console.log(el);
          const targetEl = quizGrids.children[Number(el)];
          toggleVisible(targetEl);
        });
      });
    }
  }
}
