/**
 *
 * @param {Number} row 行指定
 * @param {Number} column 列指定
 * @param {String} partsName パーツ指定
 * @param {String} addon 動作指定
 * @param {Boolean} isBelowWall 下壁の有無
 * @param {Boolean} isRightWall 右壁の有無
 */
function updateRegistry(
  row,
  column,
  partsName,
  addon,
  isBelowWall,
  isRightWall
) {
  registry.board[row][column] = {
    partsName,
    addon,
    isBelowWall,
    isRightWall,
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
  downloadAnchor.setAttribute(
    "download",
    `${registry.escapeRoomType}_registry_${formattedDate}.json`
  ); // 日時を含めたファイル名
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

document.addEventListener("DOMContentLoaded", () => {
  const downloadButton = document.getElementById("downloadButton");
  downloadButton.addEventListener("click", downloadRegistry);
});
