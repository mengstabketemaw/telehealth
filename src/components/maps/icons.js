import L from "leaflet"
import Config from "../../api/Config";

const point = new L.Icon({
    iconUrl: require("../../assets/icons/po.png"),
    iconSize: new L.Point(60, 70)
});


function DoctorsIcon(username) {
    return new L.Icon({
        iconUrl: `${Config.USER_URL}/avatar/${username}`,
        iconSize: [70, 70], // size of the icon
        iconAnchor: [70 / 2, 70 / 2], // point of the icon which will correspond to marker's location
        popupAnchor: [0, 70 / 2] // point from which the popup should open relative to the iconAnchor
    });
}

export default DoctorsIcon;

export { point };