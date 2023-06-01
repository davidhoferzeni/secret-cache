import { trackTarget } from "./distance";
import { trackOrientation } from "./compass";

const startButton = document.getElementById("start");
if (!startButton) {
  alert("Error!");
} else {
  startButton.onclick = () => {
    trackTarget();
    trackOrientation();
  };
}
