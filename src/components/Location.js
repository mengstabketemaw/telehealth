import {Wrapper,Status} from "@googlemaps/react-wrapper"
import React, { useEffect, useRef,useState } from "react"
import {createCustomEqual} from "fast-equals";
import {Button, Grid,Container, Stack} from "@mui/material"
import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyDqEI8VirEe1RwV7uqz_nTp9VpQAORVjT8");
Geocode.setRegion("et");
Geocode.setLocationType("ROOFTOP")


const status = (s)=>{
    <h1>{s}</h1>
}

const Location = ({setUserLocation,setModalOpen}) =>{
    const [clicks, setClicks] = useState([]);
    const [zoom, setZoom] = useState(15);
    const [center,setCenter] = useState({lat:9,lng:38});
    const onClick = (e)=>{
        setClicks([e?.latLng]);
      }

    const setMarkerUserLocation = (m) => {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
              (position) => {
                setClicks([new window.google.maps.LatLng(position.coords.latitude,position.coords.longitude)])
                setCenter({lat:position.coords.latitude,lng:position.coords.longitude})
                setZoom(zoom);
                //coverting location coordinate to street name and country name should be coded here 
                // Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                //     (response) => {
                //       const address = response.results[0].formatted_address;
                //       console.log(address);
                //     },
                //     (error) => {
                //       console.error(error);
                //     }
                //   );
              },
              () => {
                console.log("error in navigator position")
            }
            );
          } else {
            // Browser doesn't support Geolocation
            console.log("browser doesn't support geolocation")
        }
    }


    const onIdle =(m)=>{
      setMarkerUserLocation(m);
    }

    return <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            >
                <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={3}>
                    <Button variant="contained" color="secondary" onClick={()=>setMarkerUserLocation()}>Mark My Location</Button>
                    <Button variant="contained" color="primary"
                      onClick={()=>{
                        setModalOpen(false);
                        setUserLocation(state=>({...state,location:{lat:clicks[0].lat(),lng:clicks[0].lng()}}))
                      }
                    }>Choose Location</Button>
                </Stack>
                <Wrapper apiKey="AIzaSyDqEI8VirEe1RwV7uqz_nTp9VpQAORVjT8" render={status}>
                    <Map 
                    center={center}
                    onClick={onClick}
                    onIdle={onIdle}
                    zoom={zoom}
                    style={{height:"400px",width:"100%"}}
                    >
                        {clicks.map((latLng, i) => (<Marker key={i} position={latLng} /> ))}
                    </Map>
                </Wrapper>
        </Stack>
}


const Map =({onClick, onIdle, children, style,...options})=>{
    const ref = useRef(null);
    const [map,setMap] = useState();
    
    useEffect(()=>{
        if(ref?.current&&!map){
            setMap(new window.google.maps.Map(ref.current,{}))
        }
    },[ref,map]);

    useDeepCompareEffectForMaps(() => {
        if (map) {
          map.setOptions(options);
        }
      }, [map, options]);

    useEffect(() => {
        if (map) {
          ["click", "idle"].forEach((eventName) =>
            window.google.maps.event.clearListeners(map, eventName)
          );
          if (onClick) {
            map.addListener("click", onClick);
          }
      
          if (onIdle) {
            map.addListener("idle", () => onIdle(map));
          }
        }
      }, [map, onClick, onIdle]);
      
   

    return <>
    <div ref={ref} style={style} />
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // set the map prop on the child component
        return React.cloneElement(child, { map });
      }
    })}
  </>
}

const Marker = (options) => {
    const [marker, setMarker] = useState();
  
    React.useEffect(() => {
      if (!marker) {
        setMarker(new window.google.maps.Marker());
      }
  
      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);
  
    React.useEffect(() => {
      if (marker) {
        marker.setOptions(options);
      }
    }, [marker, options]);
  
    return null;
  };
  

const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a, b) => {
      if (a instanceof window.google.maps.LatLng || b instanceof window.google.maps.LatLng ) {
        return new window.google.maps.LatLng(a).equals(new window.google.maps.LatLng(b));
      }
      return deepEqual(a, b);
    }
  );

function useDeepCompareMemoize(value) {
    const ref =useRef();
  
    if (!deepCompareEqualsForMaps(value, ref.current)) {
      ref.current = value;
    }
  
    return ref.current;
  }

function useDeepCompareEffectForMaps(callback, dependencies) {
    useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
  


export default Location;