const ARRAY_WIDTH = 0.8;
const ARRAY_COLOR = "red";

// 始点を親ノードとする矢印の生成
async function makeArrow(startGridEl, endGridEl) {
  await Promise.all([
    waitForObjectReady(startGridEl),
    waitForObjectReady(endGridEl),
  ]);
  let startGridIdx = startGridEl.object3D.position.x / 4;
  let endGridIdx = endGridEl.object3D.position.x / 4;
  if (startGridIdx === endGridIdx) return; // TODO 描かないのでなく、一周回るような矢印を描くようにする
  /** 矢柄の構成 **/
  let newArrowShaftEl = document.createElement("a-entity");
  newArrowShaftEl.setAttribute("material", "color", ARRAY_COLOR);
  let newArrowShaftRelativePosition = {
    x: (startGridIdx + endGridIdx) * 2 - startGridIdx * 4, // = (startGrid.position.x + endGrid.position.x ) / 2 - startGrid.position.x
    y: 0,
    z: 5, // TODO あとで微調整
  };
  let distance =
    newArrowShaftRelativePosition.x *
    (newArrowShaftRelativePosition.x > 0 ? 1 : -1);
  let radiusInner = distance - ARRAY_WIDTH / 2;
  let radiusOuter = distance + ARRAY_WIDTH / 2;
  // 奇数なら下迂回、偶数なら上迂回
  let thetaStart = 0;
  if (startGridIdx % 2 === 0) {
    thetaStart = "0";
  } else {
    thetaStart = "180";
    newArrowShaftRelativePosition.z /= -4; // TODO あとで微調整
  }
  // XXX 値に応じて変動する一方で、コンソールにはunknown property errorが表示されている。A-Frame docsには、propertyの存在が明記されている。https://aframe.io/docs/1.6.0/primitives/a-ring.html
  newArrowShaftEl.setAttribute(
    "geometry",
    `primitive: ring; radius-inner: ${radiusInner}; radius-outer: ${radiusOuter}; theta-start: ${thetaStart}; theta-length: 180;`
  );
  newArrowShaftEl.setAttribute("position", newArrowShaftRelativePosition);
  newArrowShaftEl.setAttribute("rotation", "90 0 0");
  /** 矢尻の構成 **/
  let newArrowHeadEl = document.createElement("a-entity");
  newArrowHeadEl.setAttribute("material", "color", ARRAY_COLOR);
  newArrowHeadEl.setAttribute("geometry", "primitive: triangle");
  newArrowHeadEl.setAttribute("scale", "1.7 1.2 1.2");
  newArrowHeadRelativePosition = {
    x: (endGridIdx - startGridIdx) * 2,
    y: 0,
    z: 0,
  };
  newArrowHeadEl.setAttribute("position", newArrowHeadRelativePosition);
  if (startGridIdx % 2 === 0)
    newArrowHeadEl.setAttribute("rotation", "0 0 180");
  /** startGridElに矢印全体を追加 **/
  newArrowShaftEl.appendChild(newArrowHeadEl);
  startGridEl.appendChild(newArrowShaftEl);
}
