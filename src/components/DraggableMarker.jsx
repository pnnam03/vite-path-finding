/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useCallback, useRef, useMemo } from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { VITE_BASE_URL } from "../env";

const DraggableMarker = ({ position, setPosition, tooltip, iconProps, iconUrl, iconSize }) => {
  const [draggable, setDraggable] = useState(true);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const fetcher = async () => {
          const marker = markerRef.current;
          const currentLatLng = marker.getLatLng();
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lat: currentLatLng.lat,
              lng: currentLatLng.lng,
            }), // Convert the data to JSON format
          };
          const nearestNode = await fetch(
            VITE_BASE_URL + "/find_nearest_node",
            options
          );
          const response = await nearestNode.json();

          if (marker != null) {
            setPosition(response);
          }
        };

        fetcher();
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const customIcon = new L.Icon({
    iconUrl: iconProps.iconUrl,
    iconSize: iconProps.iconSize,
    iconAnchor: iconProps.iconAnchor,
  });

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={customIcon}
    >
      <Tooltip>{tooltip}</Tooltip>
    </Marker>
  );
};

export default DraggableMarker;
