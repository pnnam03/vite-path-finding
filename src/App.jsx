import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Rectangle,
  Polyline,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import "./App.css";
import { useMap } from "./hooks";
import { Select } from "antd";
import DraggableMarker from "./components/DraggableMarker";

const blackOptions = { color: "yellow" };
const redOptions = { color: "red", weight: "4" };
const limeOptions = { color: "lime", weight: "4" };
const purpleOptions = { color: "purple", weight: "4" };

{/*
  To run on local machine, uncomment the line below
  const BASE_URL = "http://127.0.0.1:8000";
*/}
const BASE_URL = "https://fastapi-path-finding-production.up.railway.app";

const App = () => {
  const { position } = useMap();

  const algoOptions = [
    { value: "bfs", label: "BFS" },
    { value: "dfs", label: "DFS" },
    { value: "dijkstra", label: "Dijkstra" },
    { value: "bellman-ford", label: "Bellman-Ford" },
    { value: "a*", label: "A*" },
  ];

  const rectangle = [
    [21.0172, 105.8467],
    [21.0256, 105.8576],
  ];

  const [selectedValue, setSelectedValue] = useState(null);
  const [startPosition, setStartPosition] = useState(null);
  const [stopPosition, setStopPosition] = useState(null);
  const [turn, setTurn] = useState("start");
  const [bfsPath, setBFSPath] = useState(null);
  const [dfsPath, setDFSPath] = useState(null);
  const [dijkstraPath, setDijkstraPath] = useState(null);
  const [pathInvisibility, setPathInvisibility] = useState(false);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (startPosition && stopPosition && selectedValue) {
      findPath();
    }
  }, [startPosition, stopPosition, selectedValue]);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const findPath = () => {
    const fetcher = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          algorithm: selectedValue,
          start: startPosition,
          stop: stopPosition,
        }),
      };

      const nearestNode = await fetch(BASE_URL + "/find_path", options);
      const response = await nearestNode.json();

      if (selectedValue === "bfs") setBFSPath(response.path);

      if (selectedValue === "dfs") setDFSPath(response.path);

      if (selectedValue === "dijkstra") setDijkstraPath(response.path);

      setPathLength(response.length);
      setPathInvisibility(true);
    };

    fetcher();
  };

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        const fetcher = async () => {
          const currentLatLng = e.latlng;
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lat: currentLatLng.lat,
              lng: currentLatLng.lng,
            }),
          };
          const nearestNode = await fetch(
            BASE_URL + "/find_nearest_node",
            options
          );
          const response = await nearestNode.json();
          if (turn === "start") {
            setStartPosition(response);
            setTurn("stop");
          }

          if (turn === "stop") {
            setStopPosition(response);
            setTurn("none");
          }
        };

        fetcher();
      },
    });
    return null;
  };

  return (
    <div className="body">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        style={{ minHeight: "100vh", minWidth: "100vw" }}
      >
        <LocationFinderDummy />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Rectangle bounds={rectangle} pathOptions={blackOptions} />

        {selectedValue === "dfs" && dfsPath && pathInvisibility ? (
          <Polyline pathOptions={purpleOptions} positions={dfsPath}>
            <Tooltip>Length: {pathLength}m</Tooltip>
          </Polyline>
        ) : null}

        {selectedValue === "bfs" && bfsPath && pathInvisibility ? (
          <Polyline pathOptions={limeOptions} positions={bfsPath}>
            <Tooltip>Length: {pathLength}m</Tooltip>
          </Polyline>
        ) : null}

        {selectedValue === "dijkstra" && dijkstraPath && pathInvisibility ? (
          <Polyline pathOptions={redOptions} positions={dijkstraPath}>
            <Tooltip>Length: {pathLength}m</Tooltip>
          </Polyline>
        ) : null}

        {startPosition ? (
          <DraggableMarker
            position={startPosition}
            setPosition={setStartPosition}
            setPathInvisibility={setPathInvisibility}
            tooltip="Start location"
          />
        ) : null}

        {stopPosition ? (
          <DraggableMarker
            position={stopPosition}
            setPosition={setStopPosition}
            setPathInvisibility={setPathInvisibility}
            tooltip="Stop location"
          />
        ) : null}
      </MapContainer>

      <div className="select-algo-box">
        <Select
          style={{ width: "100%", height: "100%" }}
          onChange={handleChange}
          options={algoOptions}
        />
        {/* <Button
          type="primary"
          style={{ height: "100%", marginLeft: "10px" }}
          onClick={findPath}
        >
          Find
        </Button> */}
      </div>
    </div>
  );
};

export default App;
