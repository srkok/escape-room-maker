const EDITMODE_PARTS = {
  all: {
    position: { x: 0, y: 5, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  },
  octahedron: {
    geometry: { primitive: "octahedron" },
    color: "royalblue",
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  },
  startportal: {
    background: {
      geometry: { primitive: "circle", radius: 1.5 },
      color: "yellow",
      position: { x: 0, y: 0, z: 0.1 },
      rotation: { x: 0, y: 0, z: 0 },
      opacity: 0.1,
      text: "value: start; align: center; width: 5; opacity: 0; color: black",
    },
    ring: {
      geometry: { primitive: "torus", radius: 1.5, radiusTubular: 0.1 },
      color: "blue",
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  goalflag: {
    base: {
      geometry: { primitive: "cylinder", height: 0.5, radius: 0.8 },
      color: "gray",
      position: { x: 6, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    pole: {
      geometry: { primitive: "cylinder", height: 4, radius: 0.2 },
      color: "white",
      position: { x: 0, y: 2, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    flag: {
      geometry: { primitive: "box", height: 1.2, width: 1.2, depth: 0.4 },
      color: "red",
      position: { x: 0.7, y: 1.2, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  spiketrap: {
    base: {
      geometry: { primitive: "plane", height: 4, width: 4 },
      color: "gray",
      position: { x: 10, y: 0.1, z: 0 },
      rotation: { x: -90, y: 0, z: 0 },
    },
    spike: {
      geometry: { primitive: "cone" },
      color: "gray",
      rotation: { x: 90, y: 0, z: 0 },
    },
    num_spikes_per_side: 4,
  },
};

function makeOctahedronModel(position) {
  let newOctahedronEl = document.createElement("a-entity");
  setNewElementProperties(
    newOctahedronEl,
    EDITMODE_PARTS.octahedron.geometry,
    EDITMODE_PARTS.octahedron.color,
    sumObjectsByKey({ ...EDITMODE_PARTS.octahedron.position }, position),
    EDITMODE_PARTS.octahedron.rotation,
    true
  );
  newOctahedronEl.classList.add("raycastable");
  newOctahedronEl.classList.add("octahedron");
  return newOctahedronEl;
}

function makeStartPortalModel(position) {
  let newEl = document.createElement("a-entity");
  setNewElementProperties(
    newEl,
    EDITMODE_PARTS.startportal.background.geometry,
    EDITMODE_PARTS.startportal.background.color,
    sumObjectsByKey(EDITMODE_PARTS.startportal.background.position, position),
    EDITMODE_PARTS.startportal.background.rotation,
    true
  );
  newEl.setAttribute(
    "material",
    `side: double; opacity: ${EDITMODE_PARTS.startportal.background.opacity}`
  );
  newEl.setAttribute("text", EDITMODE_PARTS.startportal.background.text);
  let newRingEl = document.createElement("a-entity");
  setNewElementProperties(
    newRingEl,
    EDITMODE_PARTS.startportal.ring.geometry,
    EDITMODE_PARTS.startportal.ring.color,
    EDITMODE_PARTS.startportal.ring.position,
    EDITMODE_PARTS.startportal.ring.rotation,
    true
  );
  newEl.appendChild(newRingEl);
  newEl.classList.add("startportal");
  return newEl;
}

function makeGoalFlagModel(position) {
  let newBaseEl = document.createElement("a-entity");
  setNewElementProperties(
    newBaseEl,
    EDITMODE_PARTS.goalflag.base.geometry,
    EDITMODE_PARTS.goalflag.base.color,
    sumObjectsByKey({ ...EDITMODE_PARTS.goalflag.base.position }, position),
    EDITMODE_PARTS.goalflag.base.rotation,
    true
  );
  newBaseEl.classList.add("goalflag");
  let newPoleEl = document.createElement("a-entity");
  setNewElementProperties(
    newPoleEl,
    EDITMODE_PARTS.goalflag.pole.geometry,
    EDITMODE_PARTS.goalflag.pole.color,
    EDITMODE_PARTS.goalflag.pole.position,
    EDITMODE_PARTS.goalflag.pole.rotation,
    true
  );
  let newFlagEl = document.createElement("a-entity");
  setNewElementProperties(
    newFlagEl,
    EDITMODE_PARTS.goalflag.flag.geometry,
    EDITMODE_PARTS.goalflag.flag.color,
    EDITMODE_PARTS.goalflag.flag.position,
    EDITMODE_PARTS.goalflag.flag.rotation,
    true
  );
  newPoleEl.appendChild(newFlagEl);
  newBaseEl.appendChild(newPoleEl);
  return newBaseEl;
}

function makeSpikeTrapModel(position) {
  let newSpikeTrapEl = document.createElement("a-entity");
  setNewElementProperties(
    newSpikeTrapEl,
    EDITMODE_PARTS.spiketrap.base.geometry,
    EDITMODE_PARTS.spiketrap.base.color,
    sumObjectsByKey({ ...EDITMODE_PARTS.spiketrap.base.position }, position),
    EDITMODE_PARTS.spiketrap.base.rotation,
    true
  );
  newSpikeTrapEl.setAttribute("material", "side: double");
  const radius_bottom =
    EDITMODE_PARTS.spiketrap.base.geometry.height /
    (EDITMODE_PARTS.spiketrap.num_spikes_per_side * 2);
  for (let i = 0; i < EDITMODE_PARTS.spiketrap.num_spikes_per_side; i++) {
    for (let j = 0; j < EDITMODE_PARTS.spiketrap.num_spikes_per_side; j++) {
      let newSpikeEl = document.createElement("a-entity");
      setNewElementProperties(
        newSpikeEl,
        {
          ...EDITMODE_PARTS.spiketrap.spike.geometry,
          radiusBottom: radius_bottom,
        },
        EDITMODE_PARTS.spiketrap.spike.color,
        {
          x:
            i * radius_bottom * 2 -
            radius_bottom * (EDITMODE_PARTS.spiketrap.num_spikes_per_side - 1),
          y:
            j * radius_bottom * 2 -
            radius_bottom * (EDITMODE_PARTS.spiketrap.num_spikes_per_side - 1),
          z: 0.5,
        },
        EDITMODE_PARTS.spiketrap.spike.rotation,
        true
      );
      newSpikeTrapEl.appendChild(newSpikeEl);
    }
  }
  newSpikeTrapEl.classList.add("spiketrap");
  return newSpikeTrapEl;
}
