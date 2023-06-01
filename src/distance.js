/**
 * @type {number}
 */
let id;
/**
 * @type {GeolocationCoordinates}
 */
let target;
let options;
/**
 * @type {HTMLElement | null}
 */
let infoField;
/**
 * @type {(arg0: any, arg1: any) => number}
 */
let distanceFunc;

/**
 * @param {GeolocationPosition} pos
 */
function success(pos) {
  if (!infoField) {
    return;
  }
  const crd = pos.coords;

  if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    infoField.textContent = "Congratulations, you reached the target";
    navigator.geolocation.clearWatch(id);
  }
  let distance = 0;
  if (distanceFunc) {
    const myPos = new google.maps.LatLng(crd.latitude, crd.longitude);
    const targetPos = new google.maps.LatLng(target.latitude, target.longitude);
    distance = distanceFunc(myPos, targetPos);
  }

  infoField.textContent = `Got position: ${crd.latitude}/${crd.longitude}, distance is ${distance}m`;
}

/**
 * @param {GeolocationPositionError} err
 */
function error(err) {
  console.error(`ERROR(${err.code}): ${err.message}`);
}

export function trackTarget() {
  target = {
    latitude: 48.22490343350816,
    longitude: 16.366320654317832,
    accuracy: 1,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  };

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  id = navigator.geolocation.watchPosition(success, error, options);
  infoField = document.getElementById("info");
}

export async function initMap() {
  const { spherical } = await google.maps.importLibrary("geometry");
  distanceFunc = spherical.computeDistanceBetween;
}
