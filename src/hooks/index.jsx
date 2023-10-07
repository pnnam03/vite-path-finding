import { useState, useEffect } from "react";
import axios from "axios";

export const useMap = () => {
  const [position, setPosition] = useState({
    lat: 21.0173952,
    lng: 105.8603008,
  });
  return { position };
};
