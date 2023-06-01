import { grantOrientationPermission, iOS } from "./iosUtil";

/**
 * @param {DeviceOrientationEvent} orientation
 * @returns {number | null}
 */
function getDeviceHeading(orientation) {
  // @ts-ignore
  if (orientation.webkitCompassHeading) {
    // @ts-ignore
    return 180 - orientation.webkitCompassHeading;
  }
  if (!orientation.alpha) {
    return orientation.alpha;
  }
  return orientation.absolute ? orientation.alpha : 360 - orientation.alpha;
}

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

function checkCompassAvailability() {
  //@ts-ignore
  if (window.DeviceOrientationEvent || window.DeviceOrientationAbsoluteEvent) {
    return true;
  }
  alert();
  return false;
}

/**
 * @param {DeviceOrientationEvent} event
 */
function deviceOrientationListener(event) {
  const heading = getDeviceHeading(event);
  rotate(heading);
}

async function registerDeviceOrientation() {
  if (!checkCompassAvailability()) {
    alert("Your device is unable to view your orientation!");
    return;
  }
  if (!iOS()) {
    // @ts-ignore
    window.addEventListener(
      "deviceorientationabsolute",
      deviceOrientationListener
    );
  } else if (window.DeviceOrientationEvent) {
    const permission = await grantOrientationPermission();
    if (!permission) {
      alert("No permission granted! Please refresh the page and try again!");
    }
    window.addEventListener("deviceorientation", deviceOrientationListener);
  }
}

function deregisterDeviceOrientation() {
  if (!checkCompassAvailability()) {
    alert("Your device is unable to view your orientation!");
    return;
  }
  if (!iOS()) {
    // @ts-ignore
    window.removeEventListener(
      "deviceorientationabsolute",
      deviceOrientationListener
    );
  } else if (window.DeviceOrientationEvent) {
    window.removeEventListener("deviceorientation", deviceOrientationListener);
  }
}

export function trackOrientation() {
  registerDeviceOrientation();
}
