import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/src/localization";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const redIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const unloadIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CreateRoutineMachineLayer = (props: any) => {
  const { waypoints } = props;

  const instance = (L as any).Routing.control({
    createMarker: function (i: any, wp: any, nWps: any) {
      if (Array.isArray(waypoints)) {
        const resSimple = [...(waypoints[0]?.coord ?? [])].find((coord) => {
          return (
            coord.lat.toString() === wp.latLng.lat.toString() &&
            coord.lng.toString() === wp.latLng.lng.toString()
          );
        });

        if (resSimple) {
          return L.marker(wp.latLng, {
            icon: redIcon, // here pass the custom marker icon instance
          });
        } else {
          return L.marker(wp.latLng, {
            icon: unloadIcon, // here pass the custom marker icon instance
          });
        }
      }
    },
    lineOptions: {
      styles: [{ color: "#48bb00", weight: 6 }],
    },
    waypoints: Array.isArray(waypoints)
      ? [...(waypoints[0]?.coord ?? []), ...(waypoints[1]?.coord ?? [])]
      : [...(waypoints?.coord ?? [])],
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: true,
    toolbar: false,
    altLineOptions: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(CreateRoutineMachineLayer);

export default RoutingMachine;
