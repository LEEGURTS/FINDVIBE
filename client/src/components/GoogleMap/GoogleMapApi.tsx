/* eslint-disable react-hooks/exhaustive-deps */
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
  MarkerClustererF,
} from "@react-google-maps/api";
import { useState, useEffect, useLayoutEffect } from "react";
import cursor from "../../assets/Svg/Cursor.svg";

interface GoogleMapApiProps {
  coordinate: { lat: number; lng: number }[][];
}

const GoogleMapApi: React.FunctionComponent<GoogleMapApiProps> = ({
  coordinate,
}) => {
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null
  );

  const [map, setMap] = useState<google.maps.Map>();
  const [rotatedMarkers, setRotatedMarkers] = useState<string[][]>([]);

  useLayoutEffect(() => {
    class RotateIcon {
      img: any;
      canvas: any;
      context: any;

      constructor() {
        let img = new Image();
        img.src = cursor;
        
        this.img = img;

        let canvas = document.createElement("canvas");
        canvas.width = 30;
        canvas.height = 45;
        this.context = canvas.getContext("2d");
        this.canvas = canvas;

      }
    }
    interface RotateIcon {
      setRotation(deg: number): any;
      getUrl(): string;
    }
    RotateIcon.prototype.setRotation = function (deg: number) {
      let angle = (deg * 360 * Math.PI) / 180,
        centerX = 60 / 2,
        centerY = 60 / 2;
      this.context.drawImage(this.img, 0, 0);
      return this;
    };

    RotateIcon.prototype.getUrl = function () {
      return this.canvas.toDataURL("image/png");
    };

    const getAngle = (
      pos1: { lat: number; lng: number },
      pos2: { lat: number; lng: number }
    ) => {
      const pi1 = (pos1.lat * Math.PI) / 180;
      const pi2 = (pos2.lat * Math.PI) / 180;
      const lambda1 = (pos1.lng * Math.PI) / 180;
      const lambda2 = (pos2.lng * Math.PI) / 180;

      const y = Math.sin(lambda2 - lambda1) * Math.cos(pi2);
      const x =
        Math.cos(pi1) * Math.sin(pi2) -
        Math.sin(pi1) * Math.cos(pi2) * Math.cos(lambda2 - lambda1);
      const setta = Math.atan2(y, x);
      return ((setta * 180) / Math.PI + 360) % 360;
    };

    const newMarkerList: string[][] = [];

    const koreaUniverSity = {
      lat: 37.588556,
      lng: 127.019981,
    };
    let rotateIcon = new RotateIcon();
    coordinate.forEach((selected) => {
      const markerList: string[] = [];
      selected.forEach((location) => {
        markerList.push(
          rotateIcon.setRotation(getAngle(koreaUniverSity, location)).getUrl()
        );
      });
      newMarkerList.push(markerList);
    });

    setRotatedMarkers(newMarkerList);
    setSelectedLocationIndex(coordinate.length - 1);
  }, [map, coordinate.length]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY as string,
  });
  useEffect(() => {
    if (isLoaded && selectedLocationIndex) {
      const bounds = new window.google.maps.LatLngBounds();
      coordinate[selectedLocationIndex]?.forEach((item) => {
        bounds.extend(item);
      });
      map?.fitBounds(bounds);
    }
  }, [isLoaded, map, selectedLocationIndex]);

  if (!isLoaded) {
    return <div className="col-start-1 col-end-13">Loading...</div>;
  }
  return (
    <>
      <div className="col-start-1 flex flex-col items-center justify-center">
        {coordinate.map((_, idx) => {
          return (
            <button
              className="w-full"
              key={idx}
              onClick={() => {
                setSelectedLocationId(null);
                setSelectedLocationIndex(idx);
              }}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      <div className="col-start-2 col-end-12 h-[50dvh]">
        <GoogleMap
          onLoad={(map) => {
            setMap(map);
          }}
          onClick={() => setSelectedLocationId(null)}
          center={{
            lat:
              coordinate[selectedLocationIndex]?.reduce(
                (acc, cur) => acc + cur.lat,
                0
              ) / coordinate[selectedLocationIndex]?.length || 37.551399,
            lng:
              coordinate[selectedLocationIndex]?.reduce(
                (acc, cur) => acc + cur.lng,
                0
              ) / coordinate[selectedLocationIndex]?.length || 126.988259,
          }}
          mapContainerStyle={{
            height: "50vh",
          }}
        >
          <MarkerClustererF>
            {(clusterer) => {
              return (
                <>
                  {coordinate[selectedLocationIndex]?.map((location, idx) => {
                    return (
                      <MarkerF
                        key={location.lat + location.lng}
                        position={location}
                        clusterer={clusterer}
                        icon={{
                          scale: 1,
                          url:
                            rotatedMarkers[selectedLocationIndex][idx] ??
                            cursor,
                        }}
                        onClick={() => setSelectedLocationId(idx)}
                      >
                        {selectedLocationId === idx ? (
                          <InfoWindowF
                            position={location}
                            onCloseClick={() => setSelectedLocationId(null)}
                          >
                            <div>{`${idx + 1}번째 설명`}</div>
                          </InfoWindowF>
                        ) : null}
                      </MarkerF>
                    );
                  })}
                </>
              );
            }}
          </MarkerClustererF>
        </GoogleMap>
      </div>
    </>
  );
};
export default GoogleMapApi;
