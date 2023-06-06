import { registerOrientation } from "ovid-core-ts";

/**
 * @param {number | null} angle
 */
function rotate(angle) {
  var infoField = document.getElementById("compass");
  if (!infoField) {
    return;
  }
  (infoField.style.webkitTransform = `rotate(${angle}deg)`),
    // @ts-ignore
    (infoField.style.mozTransform = `rotate(${angle}deg)`),
    // @ts-ignore
    (infoField.style.msTransform = `rotate(${angle}deg)`),
    // @ts-ignore
    (infoField.style.oTransform = `rotate(${angle}deg)`),
    (infoField.style.transform = `rotate(${angle}deg)`);
}

/**
 * @param {import("ovid-core-ts").DeviceHeadingEvent} event
 */
function deviceOrientationListener(event) {
  if (event.heading) {
    rotate(event.heading);
  }
}

export function trackOrientation() {
  registerOrientation(deviceOrientationListener);
}
