import React, { Component, Fragment } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup, ZoomControl, GeoJSON } from "react-leaflet-universal";
import RotatedMarker from "../utils/RotatedMarker";
// import L from "leaflet";
import { connect } from "react-redux";
import axios from "axios";
import { values } from "lodash";
import { default as bezierSpline } from "@turf/bezier-spline";
import * as helpers from "@turf/helpers";

import "../scss/Map.scss";

const carIcon = require("../../assets/img/car.png");

let LeafletMap: any, TileLayer: any, Marker: any, Popup: any, ZoomControl: any, GeoJSON: any, L: any, markerIcon: any;
export class MyMap extends Component {
	state = { cars: [] };
	request(that: any) {
		const { setItems } = that.props;
		axios.get("http://taxi.tools:8000/cabsformetrasite").then(({ data }) => {
			const cars = values(data.carsList);
			setItems(cars);

			setTimeout(() => {
				that.request(that);
				this.setPath();
			}, 3000);
		});
	}

	setPath() {
		const { res } = this.props;
		const points = res !== "" ? res.OrderCalc.pointsway : null;
		const line = res !== "" ? helpers.lineString(points) : null;
		const curved = res !== "" ? bezierSpline(line) : null;

		return res !== "" ? <GeoJSON data={curved} key={Math.random()} style={{ weight: 3 }} /> : null;
	}

	componentWillMount() {
		L = require("leaflet");
		markerIcon = L.icon({
			iconUrl: carIcon,
			shadowUrl: null,
			shadowSize: [0, 0],
			shadowAnchor: [0, 0],
			iconSize: [20, 40], // size of the icon
			iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
			popupAnchor: [-3, -6]
		});
		this.request(this);
	}

	renderCars() {
		if (!this.props.isReady) {
			return "Загрузка...";
		} else {
			return this.props.items.map((item, i) => {
				let pos = [item.latitude, item.longitude];
				return (
					<RotatedMarker key={i} position={pos} icon={markerIcon} rotationAngle={item.course} rotationOrigin={"center"}>
						<Popup>
							<span>{item.CarModel}</span>
						</Popup>
					</RotatedMarker>
				);
			});
		}
	}

	render() {
		const {
			zoom,
			latitude,
			longitude,
			firstAddress,
			secondAddress,
			additionalAddress,
			didFetched1,
			didFetched2,
			didFetched3
		} = this.props;
		let position = [latitude, longitude];

		const pos1 =
			firstAddress !== "" && didFetched1 === true
				? firstAddress.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
						.split(" ")
						.reverse()
						.map(value => parseFloat(value))
				: null;

		const pos2 =
			secondAddress !== "" && didFetched2 === true
				? secondAddress.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
						.split(" ")
						.reverse()
						.map(value => parseFloat(value))
				: null;

		const pos3 =
			additionalAddress !== "" && didFetched3 === true
				? additionalAddress.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
						.split(" ")
						.reverse()
						.map(value => parseFloat(value))
				: null;

		if (firstAddress !== "" && didFetched1 === true) {
			position = [this.props.latitude, this.props.longitude];
			this.props.setZoom(13);
		}

		return (
			<Fragment>
				<LeafletMap center={position} zoom={zoom} zoomControl={false} maxZoom={20} minZoom={4}>
					<TileLayer url="http://taxi.tools:8000/tilesmass.{s}/{z}/{x}/{y}.png" />

					<ZoomControl position="bottomright" />

					{this.setPath()}

					{/* {this.state.haveUsersLocation ? (
            <Marker position={position}>
              <Popup>
                <span>Здесь находитесь Вы</span>
              </Popup>
            </Marker>
          ) : (
            ""
          )} */}

					{pos1 ? (
						<Marker position={pos1}>
							<Popup>
								<span>Заберем Вас здесь</span>
							</Popup>
						</Marker>
					) : (
						""
					)}
					{pos2 ? (
						<Marker position={pos2}>
							<Popup>
								<span>Поедем сюда</span>
							</Popup>
						</Marker>
					) : (
						""
					)}
					{pos3 ? (
						<Marker position={pos3}>
							<Popup>
								<span>Заедем по пути сюда</span>
							</Popup>
						</Marker>
					) : (
						""
					)}

					{this.renderCars()}
				</LeafletMap>
			</Fragment>
		);
	}
}
