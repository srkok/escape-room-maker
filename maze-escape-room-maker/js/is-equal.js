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
