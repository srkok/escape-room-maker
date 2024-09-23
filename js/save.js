// 保存先
const registry = {};

/**
 * registryに現在のquizGridにおける設定を保存する関数
 * @param {String} name グリッド位置名称
 * @param {String} outerColor 外箱色指定
 * @param {String} innerColor 内窓色指定
 * @param {String} quizText 問題文
 * @param {String} quizTextColor 問題文色指定
 * @param {Boolean} isVisible 起動時の可視性
 * @param {Boolean} isClickable クリック可能性
 * @param {String} highlightColor マウスがオブジェクト上にあるときの色指定
 * @param {Array} influenceTargets オブジェクトをクリックした場合に影響を与える対象
 */
function updateRegistry(
  name,
  outerColor,
  innerColor,
  quizText,
  quizTextColor,
  isVisible,
  isClickable,
  highlightColor,
  influenceTargets
) {
  registry[name] = {
    outerColor,
    innerColor,
    quizText,
    quizTextColor,
    isVisible,
    isClickable,
    highlightColor,
    influenceTargets,
  };
}

function downloadRegistry() {
  // 現在の日時を取得
  const now = new Date();
  const formattedDate = now
    .toISOString()
    .replace(/T/, "_")
    .replace(/:/g, "-")
    .substring(0, 19);

  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(registry));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `registry_${formattedDate}.json`); // 日時を含めたファイル名
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/** 旧型 **
function downloadRegistry() {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(registry));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "registry.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
/****/

/** **
window.onload = () => {
  document
    .getElementById("downloadButton")
    .addEventListener("click", downloadRegistry());
};
/**  **/
