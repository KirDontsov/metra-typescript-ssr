import Link from "next/link";
import Layout from "../components/Layout";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet-universal";
import { useState, FC, useEffect } from "react";
// import "../scss/Map.scss";

type IndexPageProps = {
	lat: number;
	lng: number;
	zoom: number;
	center: [number, number];
	position: [number, number];
};

const IndexPage: FC<IndexPageProps> = () => {
	const [lat] = useState(44.561141);
	const [lng] = useState(38.076809);
	const [zoom] = useState(14);

	useEffect(() => {}, []);

	return (
		<Layout title="Home | Next.js + TypeScript Example">
			<h1>Привет Next.js 👋</h1>
			<p>
				<Link href="/about">
					<a>About</a>
				</Link>
			</p>
			<LeafletMap center={[lat, lng]} zoom={zoom}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={[lat, lng]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</LeafletMap>
		</Layout>
	);
};

export default IndexPage;
