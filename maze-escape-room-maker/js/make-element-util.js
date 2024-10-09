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
