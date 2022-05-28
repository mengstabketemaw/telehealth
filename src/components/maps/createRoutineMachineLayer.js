import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ me, patient }) => {

    const instance = L.Routing.control({
        waypoints: [
            L.latLng(me[0], me[1]),
            L.latLng(patient[0], patient[1])
        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        show: true,
        createMarker() { return null }
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
