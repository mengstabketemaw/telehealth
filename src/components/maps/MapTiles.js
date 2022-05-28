import { LayersControl, TileLayer } from "react-leaflet";

const MapTiles = () => {
    return <>
        return (
        <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Open Stree Map">
                <TileLayer
                    key={1}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Streets">
                <TileLayer
                    key={2}
                    url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    maxZoom={20}
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Satellite">
                <TileLayer
                    key={3}
                    url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                    maxZoom={20}
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Hybride">
                <TileLayer
                    key={4}
                    url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                    maxZoom={20}
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Terrain">
                <TileLayer
                    key={5}
                    url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                    maxZoom={20}
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
            </LayersControl.BaseLayer>
        </LayersControl>
        );
    </>
};

export default MapTiles;