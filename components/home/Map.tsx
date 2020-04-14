import axios from "axios";
import { values } from "lodash";
import React, { FC, useEffect, useState } from "react";
import { Map as LeafletMap, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet-universal";
// import { default as bezierSpline } from "@turf/bezier-spline";
// import * as helpers from "@turf/helpers";
// import dynamic from "next/dynamic";
// import RotatedMarker from "../utils/RotatedMarker";

type MapProps = {};
type Cars = {
	latitude: number;
	longitude: number;
	course: number | string;
	CarModel: number | string;
};
// const L = dynamic((): any => import("leaflet"));
// const markerIcon = L.icon({
// 	iconUrl: require('../../assets/img/car.png'),
// 	shadowUrl: undefined,
// 	shadowSize: [0, 0],
// 	shadowAnchor: [0, 0],
// 	iconSize: [20, 40], // size of the icon
// 	iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
// 	popupAnchor: [-3, -6]
// });

export const Map: FC<MapProps> = () => {
	const [isReady, setIsReady] = useState(false);
	const [cars, setCars] = useState<Cars[]>([]);
	// const carIcon = require("../../assets/img/car.png");
	const request = () => {
		axios.get("http://taxi.tools:8000/cabsformetrasite").then(({ data }) => {
			const _cars = values(data.carsList);
			setCars(_cars);
			setIsReady(true);
			setTimeout(() => {
				request();
				// setPath();
			}, 3000);
		});
	};

	// const setPath = () => {
	// 	const { res } = props;
	// 	const points = res.OrderCalc.pointsway;
	// 	const line = helpers.lineString(points);
	// 	const curved = bezierSpline(line);

	// 	return res !== "" ? <GeoJSON data={curved} key={Math.random()} style={{ weight: 3 }} /> : null;
	// };

	useEffect(() => {
		request();
	}, []);

	// const renderCars = () => {
	// 	if (!isReady) {
	// 		return "Загрузка...";
	// 	} else {
	// 		return cars.map((item, i) => {
	// 			const position: [number, number] = [item.latitude, item.longitude];
	// 			return (
	// 				<Marker key={i} position={position}>
	// 					<Popup>
	// 						<span>{item.CarModel}</span>
	// 					</Popup>
	// 				</Marker>
	// 			);
	// 		});
	// 	}
	// };

	return (
		<LeafletMap center={[44.561141, 38.076809]} zoom={15} zoomControl={false} maxZoom={20} minZoom={4}>
			<TileLayer url="http://taxi.tools:8000/tilesmass.{s}/{z}/{x}/{y}.png" />
			<ZoomControl position="bottomright" />
			{isReady
				? cars.map((item, i) => {
						const position: [number, number] = [item.latitude, item.longitude];
						return (
							<Marker key={i} position={position}>
								<Popup>
									<span>{item.CarModel}</span>
								</Popup>
							</Marker>
						);
				  })
				: "Загрузка..."}
			<Marker position={[44.561141, 38.076809]}>
				<Popup>
					<span>Заберем Вас здесь</span>
				</Popup>
			</Marker>
		</LeafletMap>
	);
};
