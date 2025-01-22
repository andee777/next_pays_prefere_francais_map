'use client'; // Mark this as a Client Component
import { locations } from "../data/locations";
import dynamic from 'next/dynamic';
const MapComponent = dynamic(() => import('../components/MapComponent'), {ssr: false});

export default function Home() {
  return (
    <div>
      <MapComponent markers={locations}/>
    </div>
  );
}