import { useEffect, useState } from "react";
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
import { VITE_BASE_URL } from "./env";

const blackOptions = { color: "yellow" };
const option1 = { color: "red", weight: "4" };
const option2 = { color: "blue", weight: "4" };
const option3 = { color: "green", weight: "4" };
const option4 = { color: "magenta", weight: "4" };
const option5 = { color: "purple", weight: "4" };
const option6 = { color: "cyan", weight: "4" };
const option7 = { color: "olive", weight: "4" };

const App = () => {
  const { position } = useMap();

  const algoOptions = [
    { value: "bfs", label: "BFS (Breadth First Search)" },
    { value: "dfs", label: "DFS (Depth First Search)" },
    { value: "dijkstra", label: "Dijkstra" },
    { value: "astar", label: "A*" },
    { value: "ids", label: "IDS (Iterative Deepening Search)" },
    { value: "gbfs", label: "GBFS (Greedy Best-First Search)" },
    { value: "ucs", label: "UCS (Uniform-Cost Search)" },
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
  const [astarPath, setAstarPath] = useState(null);
  const [idsPath, setIDSPath] = useState(null);
  const [gbfsPath, setGBFSPath] = useState(null);
  const [ucsPath, setUCSPath] = useState(null);
  const [pathInvisibility, setPathInvisibility] = useState(false);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (startPosition && stopPosition && selectedValue) {
      findPath();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const nearestNode = await fetch(VITE_BASE_URL + "/find_path", options);
      const response = await nearestNode.json();

      if (selectedValue === "bfs") setBFSPath(response.path);

      if (selectedValue === "dfs") setDFSPath(response.path);

      if (selectedValue === "dijkstra") setDijkstraPath(response.path);

      if (selectedValue === "astar") setAstarPath(response.path);

      if (selectedValue === "ucs") setUCSPath(response.path);

      if (selectedValue === "ids") setIDSPath(response.path);

      if (selectedValue === "gbfs") setGBFSPath(response.path);

      setPathLength(response.length.toFixed());
      setPathInvisibility(true);
    };

    fetcher();
  };

  const LocationFinderDummy = () => {
    // eslint-disable-next-line no-unused-vars
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
            VITE_BASE_URL + "/find_nearest_node",
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
          <Polyline pathOptions={option1} positions={dfsPath}>
            <Tooltip sticky>Length: {pathLength}m</Tooltip>
          </Polyline>
        ) : null}

        {selectedValue === "bfs" && bfsPath && pathInvisibility ? (
          <Polyline pathOptions={option2} positions={bfsPath}>
            <Tooltip sticky>Length: {pathLength}m</Tooltip>
          </Polyline>
        ) : null}

        {selectedValue === "dijkstra" && dijkstraPath && pathInvisibility ? (
          <Polyline pathOptions={option3} positions={dijkstraPath}>
            <Tooltip sticky>Length: {pathLength}m</Tooltip>
          </Polyline>
        ) : null}

        {selectedValue === "astar" && astarPath && pathInvisibility ? (
          <Polyline pathOptions={option4} positions={astarPath}>
            <Tooltip sticky>Length: {pathLength}m</Tooltip>
          </Polyline>
        ) : null}

        {selectedValue === "ids" && idsPath && pathInvisibility ? (
          <Polyline pathOptions={option5} positions={idsPath}>
            <Tooltip sticky>Length: {pathLength}m</Tooltip>
          </Polyline>
        ) : null}

        {selectedValue === "ucs" && ucsPath && pathInvisibility ? (
          <Polyline pathOptions={option6} positions={ucsPath}>
            <Tooltip sticky>Length: {pathLength}m</Tooltip>
          </Polyline>
        ) : null}

        {selectedValue === "gbfs" && gbfsPath && pathInvisibility ? (
          <Polyline pathOptions={option7} positions={gbfsPath}>
            <Tooltip sticky>Length: {pathLength}m</Tooltip>
          </Polyline>
        ) : null}

        {startPosition ? (
          <DraggableMarker
            position={startPosition}
            setPosition={setStartPosition}
            setPathInvisibility={setPathInvisibility}
            tooltip="Start location"
            iconProps={{
              iconUrl: "/marker.png",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            }}
          />
        ) : null}

        {stopPosition ? (
          <DraggableMarker
            position={stopPosition}
            setPosition={setStopPosition}
            setPathInvisibility={setPathInvisibility}
            tooltip="Stop location"
            iconProps={{
              iconUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
              iconSize: [16, 32],
              iconAnchor: [8, 32],
            }}
          />
        ) : null}
      </MapContainer>

      <div className="select-algo-box" style={{ minWidth: "280px" }}>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange}
          options={algoOptions}
        />
      </div>
    </div>
  );
};

export default App;
