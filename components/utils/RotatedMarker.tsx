import React from "react";
import { LeafletProvider, withLeaflet, MapLayer } from "react-leaflet-universal";
import dynamic from "next/dynamic";
dynamic((): any => import("leaflet-rotatedmarker"));
dynamic((): any => import("leaflet"));
let LeafletMarker: any;

class RotatedMarker extends MapLayer {
	componentDidMount() {
		LeafletMarker = require("leaflet").Marker;
	}
	createLeafletElement(props: any) {
		const el = new LeafletMarker(props.position, this.getOptions(props));
		this.contextValue = { ...props.leaflet, popupContainer: el };
		return el;
	}

	updateLeafletElement(fromProps: any, toProps: any) {
		if (toProps.position !== fromProps.position) {
			this.leafletElement.setLatLng(toProps.position);
		}
		if (toProps.icon !== fromProps.icon) {
			this.leafletElement.setIcon(toProps.icon);
		}
		if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
			this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
		}
		if (toProps.opacity !== fromProps.opacity) {
			this.leafletElement.setOpacity(toProps.opacity);
		}
		if (toProps.draggable !== fromProps.draggable) {
			if (toProps.draggable === true) {
				this.leafletElement.dragging.enable();
			} else {
				this.leafletElement.dragging.disable();
			}
		}
		if (toProps.rotationAngle !== fromProps.rotationAngle) {
			this.leafletElement.setRotationAngle(toProps.rotationAngle);
		}
		if (toProps.rotationOrigin !== fromProps.rotationOrigin) {
			this.leafletElement.setRotationOrigin(toProps.rotationOrigin);
		}
	}

	render() {
		const { children } = this.props;
		return children == null || this.contextValue == null ? null : (
			<LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
		);
	}
}

export default withLeaflet(RotatedMarker);
