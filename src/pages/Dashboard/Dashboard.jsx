import React from "react";
import { defaultMarker } from './defaultMarker'
import 'leaflet/dist/leaflet.css'


import { MapContainer, TileLayer, Marker, Tooltip  } from 'react-leaflet'
import Chart from '../../components/Chart'
import './index.css'
const data = [
  {
    name: "Text",
    test1: 40,
    test2: 24,
    test3: 37,
    test4: 40,
    test5: 24
  },
  {
    name: "Text",
    test1: 30,
    test2: 13.98,
    test3: 20,
    test4: 60,
    test5: 22.1
  },
  {
    name: "Text",
    test1: 20,
    test2: 98,
    test3: 14,
    test4: 50,
    test5: 22.9
  },
  {
    name: "Text",
    test1: 27.8,
    test2: 39.08,
    test3: 60,
    test4: 90,
    test5: 20
  },
  {
    name: "Text",
    test1: 18.9,
    test2: 48,
    test3: 80,
    test4: 30,
    test5: 21.81
  },
  {
    name: "Text",
    test1: 23.9,
    test2: 38,
    test3: 50,
    test4: 80,
    test5: 25
  },
  {
    name: "Text",
    test1: 34.9,
    test2: 43,
    test3: 30,
    test5: 21
  }
];


function Map() {
  
  return (
    <MapContainer center={[22.623, 120.28]} zoom={15} scrollWheelZoom={false} className="h-[326px] bg-dark text-xl">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={[22.626, 120.282]} icon={defaultMarker}>
        <Tooltip direction="top" offset={[0, 40]} opacity={1} permanent>
          抬頭工作室
        </Tooltip>
      </Marker>
      <Marker position={[22.627886087250026, 120.2721660887429]} icon={defaultMarker}>
        <Tooltip direction="top" offset={[0, 40]} opacity={1} permanent >
          日產三菱
        </Tooltip>
      </Marker>
      <Marker position={[22.62001087201392, 120.27859890752116]} icon={defaultMarker}>
        <Tooltip direction="top" offset={[0, 40]} opacity={1} permanent>
          Ａ你好企業股份有限公司
        </Tooltip>
      </Marker>
    </MapContainer>
  )
}

function Dashboard() {
  return (
    <>
      <ul className="container relative z-[1] grid lg:grid-cols-2 gap-6">
        <li>
          <h2 className="text-white font-bold text-3xl">
          company info
          </h2>
          <Chart data={data}/>
        </li>
        <li>
          <h2 className="text-white font-bold text-3xl">
          company locations
          </h2>
          <Map/>
        </li>
      </ul>
    </>
  );
}

export default Dashboard;
