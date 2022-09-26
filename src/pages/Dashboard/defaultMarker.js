import L from "leaflet";
import markerIcon from 'leaflet/dist/images/marker-icon-2x.png'

const defaultMarker = new L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [13, 0]
});

export { defaultMarker };