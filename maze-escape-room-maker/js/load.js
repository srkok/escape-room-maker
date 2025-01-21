async function loadProgress() {
  const mazeGrids = document.getElementById("mazeGrids");
  mazeGrids.innerHTML = "";
  await Promise.all([waitForObjectReady(mazeGrids)]);
  if (!registry) {
    console.error("ERR! registry is invalid.");
    return;
  }
  const ROWS = registry.board.length;
  const COLUMNS = registry.board[0].length;

  INITIAL_GRID_ROWS = ROWS;
  INITIAL_GRID_COLUMNS = COLUMNS;

  document.addEventListener(
    "DOMContentLoaded",
    initMazeMaker(INITIAL_GRID_ROWS, INITIAL_GRID_COLUMNS)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("jsonFileInput")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = function (e) {
          try {
            const jsonData = JSON.parse(e.target.result);
            if (jsonData.escapeRoomType !== "maze") {
              console.error("Invalid room type");
            } else {
              /** update registry */
              registry = {};
              Object.assign(registry, jsonData);
              /** update scene */
              loadProgress();
            }
          } catch (error) {
            console.error("Invalid JSON file");
          }
        };
        reader.readAsText(file);
      } else {
        console.error("Please select a valid JSON file.");
      }
    });
});
