//let registry = {};

/** 考え中. **
window.onload = function () {
  document.getElementById("fileInput").addEventListener("change", function () {
    const file = this.files[0]; // 選択されたファイルを取得

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const jsonString = event.target.result; // 読み込まれたデータ
        try {
          const data = JSON.parse(jsonString); // JSONをオブジェクトに変換
          //registry = data;
          //console.log("Loaded JSON data:", registry); // コンソールに表示
          loadProgress(data);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.readAsText(file); // ファイルをテキストとして読み込む
      document.getElementById("overlay").style.display = "none"; // モーダルを非表示にする
    }
  });
};

*/
