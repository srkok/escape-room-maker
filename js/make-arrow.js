// 始点を親ノードとする矢印の生成
async function makeArrow(startGridEl, endGridEl) {
  await Promise.all([
    waitForObjectReady(startGridEl),
    waitForObjectReady(endGridEl),
  ]);
  const startGridIdx = startGridEl.object3D.position.x / 4;
  const endGridIdx = endGridEl.object3D.position.x / 4;
  if (startGridIdx === endGridIdx) return; // TODO 描かないのでなく、一周回るような矢印を描くようにする
  /** 矢柄の構成 **/
  let newArrowShaftEl = document.createElement("a-entity");
  newArrowShaftEl.setAttribute(
    "material",
    `color: ${ARROW_COLOR}; side: double`
  );
  const newArrowShaftRelativePosition = {
    x: (startGridIdx + endGridIdx) * 2 - startGridIdx * 4, // = (startGrid.position.x + endGrid.position.x ) / 2 - startGrid.position.x
    y: ARROW_DISTANCE * startGridIdx,
    z: ARROW_POSITION_Z[startGridIdx % 2], // 奇数なら下迂回、偶数なら上迂回
  };
  newArrowShaftEl.setAttribute("position", newArrowShaftRelativePosition);
  newArrowShaftEl.setAttribute("rotation", "90 0 0");
  const distance = Math.abs(newArrowShaftRelativePosition.x);
  const radiusInner = distance - ARROW_WIDTH / 2;
  const radiusOuter = distance + ARROW_WIDTH / 2;
  // XXX 値に応じて変動する一方で、コンソールにはunknown property errorが表示されている。A-Frame docsには、propertyの存在が明記されている。https://aframe.io/docs/1.6.0/primitives/a-ring.html
  newArrowShaftEl.setAttribute(
    "geometry",
    `primitive: ring; radius-inner: ${radiusInner}; radius-outer: ${radiusOuter}; theta-start: ${
      ["0", "180"][startGridIdx % 2]
    }; theta-length: 180;`
  ); // 奇数なら下迂回、偶数なら上迂回
  /** 矢尻の構成 **/
  let newArrowHeadEl = document.createElement("a-entity");
  newArrowHeadEl.setAttribute(
    "material",
    `color: ${ARROW_COLOR}; side: double`
  );
  newArrowHeadEl.setAttribute("geometry", "primitive: triangle");
  newArrowHeadEl.setAttribute("scale", ARROW_HEAD_SCALE);
  const newArrowHeadRelativePosition = {
    x: (endGridIdx - startGridIdx) * 2,
    y: 0,
    z: 0,
  };
  newArrowHeadEl.setAttribute("position", newArrowHeadRelativePosition);
  // 奇数なら上向き、偶数なら下向き
  //if (startGridIdx % 2 === 0) newArrowHeadEl.setAttribute("rotation", "0 0 180");
  newArrowHeadEl.setAttribute(
    "rotation",
    `0 0 ${["180", "0"][startGridIdx % 2]}`
  );
  /** startGridElに矢印全体を追加 **/
  newArrowShaftEl.appendChild(newArrowHeadEl);
  startGridEl.appendChild(newArrowShaftEl);
}
