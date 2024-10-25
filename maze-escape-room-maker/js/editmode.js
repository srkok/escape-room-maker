AFRAME.registerComponent("move-edit-mode", {
  events: {
    click: function () {
      toggleCamera();
      /** TODO editmodeでのblockなりslotなりを生成? */
    },
  },
});

function toggleCamera() {
  const camera = document.getElementById("camera");
  const isCameraActive = camera.getAttribute("camera").active;
  const editCamera = document.getElementById("edit-camera");
  const isEditCameraActive = editCamera.getAttribute("camera").active;
  camera.setAttribute("camera", "active", String(!isCameraActive));
  editCamera.setAttribute("camera", "active", String(!isEditCameraActive));
}
