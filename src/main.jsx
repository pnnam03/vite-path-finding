import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import "leaflet/dist/leaflet.css"; // <- Leaflet styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
