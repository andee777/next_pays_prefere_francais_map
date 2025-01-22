import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import 'react-leaflet-markercluster/styles'
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import selectedMarker from './marker-iconred.png';
import MarkerClusterGroup from "react-leaflet-markercluster";

const defaultIcon = L.icon({
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedIcon = L.icon({
  iconUrl: selectedMarker.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Loader = () => {
  return (
    <div className="absolute z-[10000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <svg
        aria-hidden="true"
        className="w-24 h-24 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
};

const MapComponent = ({ markers }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);

  return (
    <>
      {loading && <Loader />}

      <MapContainer center={[46.2, 1.6997]} zoom={6} style={{ height: "100vh", width: "100vw" }} ref={mapRef}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerClusterGroup showCoverageOnHover={false} >
        {markers && markers.map((item, i) => (
          item.coordinates && (
            <Marker
              key={i}
              position={item.coordinates}
              icon={item === selectedMarker ? selectedIcon : defaultIcon}
              eventHandlers={{
                click: () => {
                  setSelectedMarker(item);
                },
              }}
            >
              <Popup>
                <div className="flex flex-col items-center w-100 max-w-[300px] p-2">
                  <h3 className="text-xl font-semibold ">{item.title}</h3>
                  <div className="text-lg mt-1 text-gray-700 align-left w-100">{item.description ? item.description : "No description"}</div>
                  <div className="text-lg mt-1 text-gray-500 align-left w-100">{item.type ? item.type : "No type"}</div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 mt-2 rounded hover:bg-blue-100 transition-colors flex items-center justify-between w-[160px]"
                  >
                    <div className="text-lg">Watch video</div>
                    <ArrowTopRightOnSquareIcon width={20} height={20} className="ml-1" />
                  </a>
                </div>
              </Popup>
            </Marker>
          )
        ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
};

export default MapComponent;