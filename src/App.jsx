import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
  CircleMarker,
  Polyline,
} from "react-leaflet";
import { useMap } from "./hooks";
import { Select, Space } from "antd";

const blackOptions = { color: "yellow" };
const redOptions = { color: "red", weight: "4" };
const limeOptions = { color: "lime", weight: "8" };
const purpleOptions = { color: "purple", weight: "12" };

const position = [51.505, -0.09];

const App = () => {
  const { position } = useMap();
  // console.log(position);

  const algoOptions = [
    { value: "bfs", label: "BFS" },
    { value: "dfs", label: "DFS" },
    { value: "dijkstra", label: "Dijkstra" },
    { value: "bellman-ford", label: "Bellman-Ford" },
  ]
  const rectangle = [
    [21.0172, 105.8467],
    [21.0256, 105.8576],
  ];

  const bounds = [
    [51.49, -0.08],
    [51.5, -0.06],
  ];

  const bfsPath = [
    [21.0246815, 105.8513125],
    [21.0246329, 105.8514795],
    [21.0242462, 105.8527579],
    [21.0242048, 105.8529221],
    [21.0241655, 105.8530743],
    [21.0240361, 105.8535244],
    [21.0237354, 105.8545697],
    [21.0236852, 105.854762],
    [21.0235016, 105.8547034],
    [21.0229581, 105.854526],
    [21.02236, 105.8543307],
    [21.0222221, 105.8542857],
    [21.0220376, 105.8542215],
    [21.0217774, 105.8541309],
    [21.0206676, 105.85374],
    [21.0205574, 105.8537007],
    [21.0203437, 105.8536272],
    [21.0192618, 105.853253],
    [21.0191659, 105.8532227],
    [21.0191208, 105.8533242],
    [21.018735, 105.8541345],
    [21.0187112, 105.8541878],
    [21.0187513, 105.854209],
    [21.0191521, 105.854523],
  ];

  const dijkstraPath = [
    [21.0246815, 105.8513125],
    [21.0245416, 105.8512668],
    [21.0233759, 105.8508713],
    [21.023226, 105.8508198],
    [21.0230538, 105.8507647],
    [21.0227307, 105.8506639],
    [21.0216632, 105.8503147],
    [21.0215614, 105.8502802],
    [21.0214297, 105.8502391],
    [21.0206242, 105.8499702],
    [21.0205951, 105.8500407],
    [21.019819, 105.8518375],
    [21.0197634, 105.8519368],
    [21.0197168, 105.8520324],
    [21.0194452, 105.8526233],
    [21.0194209, 105.8526765],
    [21.0194006, 105.8527184],
    [21.0192925, 105.8529418],
    [21.0192342, 105.8530704],
    [21.0191659, 105.8532227],
    [21.0191208, 105.8533242],
    [21.018735, 105.8541345],
    [21.0187112, 105.8541878],
    [21.0187513, 105.854209],
    [21.0191521, 105.854523],
  ];

  const dfsPath = [
    [21.0246815, 105.8513125],
    [21.0246329, 105.8514795],
    [21.0242462, 105.8527579],
    [21.0242048, 105.8529221],
    [21.0243392, 105.8529557],
    [21.0253286, 105.8531889],
    [21.0254697, 105.8532279],
    [21.0254045, 105.8534134],
    [21.025144, 105.8543107],
    [21.0251189, 105.8544006],
    [21.024953, 105.8550051],
    [21.0249186, 105.8551489],
    [21.0248813, 105.85529],
    [21.0247091, 105.8559027],
    [21.0244824, 105.8566949],
    [21.0244033, 105.8569747],
    [21.0242032, 105.8570202],
    [21.0239295, 105.8568738],
    [21.0238913, 105.8568599],
    [21.0239104, 105.8567868],
    [21.0241903, 105.8557293],
    [21.0237652, 105.8555848],
    [21.0235093, 105.8554978],
    [21.0234704, 105.8554846],
    [21.0234225, 105.8554681],
    [21.0227522, 105.8552376],
    [21.0229375, 105.8545972],
    [21.0229581, 105.854526],
    [21.02236, 105.8543307],
    [21.0222221, 105.8542857],
    [21.0221801, 105.8544284],
    [21.0220222, 105.8549677],
    [21.0217227, 105.8560005],
    [21.0216867, 105.8561315],
    [21.0217826, 105.8561642],
    [21.0224236, 105.8563571],
    [21.0230077, 105.8565531],
    [21.0231316, 105.856595],
    [21.0230828, 105.8567571],
    [21.0229142, 105.857324],
    [21.0227961, 105.8574888],
    [21.0226242, 105.8575607],
    [21.0221286, 105.8577239],
    [21.0220815, 105.8577393],
    [21.0213324, 105.8575577],
    [21.0212525, 105.857519],
    [21.021099, 105.8574361],
    [21.0205994, 105.8572767],
    [21.0197129, 105.8569939],
    [21.0195874, 105.8569516],
    [21.0194235, 105.8568998],
    [21.0190734, 105.8567931],
    [21.0190858, 105.8567356],
    [21.0194507, 105.8554633],
    [21.0194661, 105.8554036],
    [21.0199235, 105.8555519],
    [21.0199953, 105.8555751],
    [21.0200486, 105.8554005],
    [21.0205139, 105.8538535],
    [21.0205574, 105.8537007],
    [21.0203437, 105.8536272],
    [21.0192618, 105.853253],
    [21.0191659, 105.8532227],
    [21.0192342, 105.8530704],
    [21.0192925, 105.8529418],
    [21.0194006, 105.8527184],
    [21.0194209, 105.8526765],
    [21.0194452, 105.8526233],
    [21.0197168, 105.8520324],
    [21.0197634, 105.8519368],
    [21.019819, 105.8518375],
    [21.0205951, 105.8500407],
    [21.0206242, 105.8499702],
    [21.0203782, 105.8498841],
    [21.0204231, 105.8497738],
    [21.0206684, 105.8491719],
    [21.0206394, 105.8491569],
    [21.0198738, 105.848777],
    [21.0198448, 105.8487625],
    [21.0198147, 105.8487519],
    [21.018974, 105.8484727],
    [21.0189279, 105.8484594],
    [21.0187958, 105.8490222],
    [21.0187503, 105.8493412],
    [21.018729, 105.8494728],
    [21.018639, 105.8499019],
    [21.0186208, 105.8499867],
    [21.0186058, 105.8500488],
    [21.0185297, 105.8504145],
    [21.0185114, 105.8505078],
    [21.0184935, 105.8506032],
    [21.0184855, 105.8506312],
    [21.0183123, 105.8514939],
    [21.0182926, 105.851603],
    [21.0182683, 105.8517354],
    [21.0181716, 105.852338],
    [21.0181024, 105.852777],
    [21.0180897, 105.8528936],
    [21.0179347, 105.8528822],
    [21.0168194, 105.8529519],
    [21.0169953, 105.8540474],
    [21.0174762, 105.8540553],
    [21.0177723, 105.8540634],
    [21.0179264, 105.854072],
    [21.0179301, 105.8541687],
    [21.0182805, 105.8548411],
    [21.0183662, 105.855011],
    [21.018439, 105.8548373],
    [21.0187112, 105.8541878],
    [21.0187513, 105.854209],
    [21.0191521, 105.854523],
  ];

  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ minHeight: "100vh", minWidth: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}

        <Rectangle bounds={rectangle} pathOptions={blackOptions} />
        {/* {path.map((coords) => (
          <CircleMarker
            center={[coords[0], coords[1]]}
            pathOptions={redOptions}
            radius={1}
          />
        ))} */}

        <Polyline pathOptions={purpleOptions} positions={dfsPath} />
        <Polyline pathOptions={limeOptions} positions={bfsPath} />
        <Polyline pathOptions={redOptions} positions={dijkstraPath} />
      </MapContainer>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
        }}
      >
        <Select
          defaultValue="BFS"
          style={{ width: 120 }}
          // onChange={handleChange}
          options={algoOptions}
        />
      </div>
    </div>
  );
};

export default App;