// object情報更新の待機
function waitForObjectReady(obj) {
  return new Promise((resolve) => {
    if (obj.hasLoaded) {
      // すでにロードされている場合はすぐに解決
      resolve();
    } else {
      // ロードが完了するのを待つ
      obj.addEventListener("loaded", resolve);
    }
  });
}
