import { MarkerF } from "@react-google-maps/api";
import { useEffect, useState } from "react";

interface CustomMarkerProps {
  rotate?: number;
  location: { lat: number; lng: number };
  onClick?: () => void;
  clusterer?: any;
  uri: string;
}

const CustomMarker: React.FunctionComponent<CustomMarkerProps> = ({
  location,
  onClick,
  clusterer,
  uri,
}) => {
  const [markerRef, setMarkerRef] = useState<google.maps.Marker | null>(null);

  const handleOnLoad = (marker: google.maps.Marker) => {
    setMarkerRef(marker);
  };

  useEffect(() => {
    if (markerRef) {
      markerRef.setOptions({ icon: { url: uri } });
    }
  }, [markerRef, uri]);

  return (
    <MarkerF
      onLoad={handleOnLoad}
      position={location}
      clusterer={clusterer}
      onClick={onClick}
    />
  );
};

export default CustomMarker;
