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
            // FIXME escapeRoomType: "multiChoice" でなければthrow new error
            if (jsonData.escapeRoomType !== "multiChoice") {
              throw new this.error("Invalid room type");
            }
            /** update registry */
            registry = {};
            Object.assign(registry, jsonData);
            /** update scene */
            loadProgress();
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
