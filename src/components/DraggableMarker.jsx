import React, { useState, useCallback, useRef, useMemo } from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
const BASE_URL = "https://fastapi-path-finding-production.up.railway.app";

const DraggableMarker = ({
  position,
  setPosition,
  setPathInvisibility,
  tooltip,
}) => {
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
            BASE_URL + "/find_nearest_node",
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
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Default marker icon
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    // You can customize the icon's color here
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
