window.onload = function () {
  document.getElementById("fileInput").addEventListener("change", function () {
    const file = this.files[0]; // 選択されたファイルを取得

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const jsonString = event.target.result; // 読み込まれたデータ
        try {
          const data = JSON.parse(jsonString); // JSONをオブジェクトに変換
          //console.log("Loaded JSON data:", data); // コンソールに表示
          if (data.escapeRoomType === "multiChoice") {
            sceneMultiChoiceMaker(data);
          } else if (data.escapeRoomType === "maze") {
            sceneMazeMaker(data);
          } else if (data.escapeRoomType === "raceAndJump") {
            //sceneRaceAndJumpMaker(data);
            console.log("race and jump: 工事中");
          } else {
            throw "The room type is unknown or invalid.";
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.readAsText(file); // ファイルをテキストとして読み込む
      document.getElementById("overlay").style.display = "none"; // モーダルを非表示にする
    }
  });
};
