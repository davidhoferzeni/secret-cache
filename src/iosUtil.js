export function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

/**
 * @typedef {Object} IosDeviceOrientationEventType
 * @prop {() => Promise<'granted' | 'denied'>} requestPermission
 *
 * @typedef {DeviceOrientationEvent & IosDeviceOrientationEventType} IosDeviceOrientationEvent
 */
export async function grantOrientationPermission() {
  const IosDeviceOrientationEvent = /** @type {unknown} */ (
    window.DeviceOrientationEvent
  );
  const IosDeviceOrientationEvent2 =
    /** @type {IosDeviceOrientationEventType} */ (IosDeviceOrientationEvent);
  IosDeviceOrientationEvent2.requestPermission;
  if (typeof IosDeviceOrientationEvent2.requestPermission === "function") {
    const permissionGranted =
      await IosDeviceOrientationEvent2.requestPermission();
    if (permissionGranted === "denied") {
      return false;
    }
  }
  return true;
}
