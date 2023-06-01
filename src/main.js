import { Loader } from "@googlemaps/js-api-loader";
import { initMap, trackTarget } from "./distance";

const loader = new Loader({
  apiKey: "YOUR_API_KEY",
  version: "weekly",
});
await loader.load();
initMap();
trackTarget();
