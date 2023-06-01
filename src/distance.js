import { Loader } from "@googlemaps/js-api-loader";
import config from "./config.json";

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
 * @type {google.maps.geometry.spherical}
 */
let sphereCalculator;

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
  let targetHeading = 0;
  if (sphereCalculator) {
    const myPos = new google.maps.LatLng(crd.latitude, crd.longitude);
    const targetPos = new google.maps.LatLng(target.latitude, target.longitude);
    distance = sphereCalculator.computeDistanceBetween(myPos, targetPos);
    targetHeading = sphereCalculator.computeHeading(myPos, targetPos) + 180;
  }

  infoField.textContent = `Got position: ${crd.latitude}/${crd.longitude}, accuracy is ${crd.accuracy}, distance is ${distance}m, targetHeading is ${targetHeading}, heading is ${crd.heading}°`;
}

/**
 * @param {GeolocationPositionError} err
 */
function error(err) {
  console.error(`ERROR(${err.code}): ${err.message}`);
}

export async function trackTarget() {
  await initLoader();
  await initMap();
  target = {
    latitude: 48.208238,
    longitude: 16.373666,
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
  infoField = document.getElementById("distance");
}

async function initLoader() {
  const loader = new Loader({
    apiKey: config.api_key,
    version: "weekly",
  });
  await loader.load();
}

async function initMap() {
  const importedLibrary = await google.maps.importLibrary("geometry");
  const { spherical } = /** @type {google.maps.GeometryLibrary}*/ (
    importedLibrary
  );
  sphereCalculator = spherical;
}
