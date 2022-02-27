import React from "react";
import "../pages/experience/experience.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../pages/experience/experience.css";

const icon = new Icon({
	iconUrl: "/imgs/balloon-map.png",
	iconSize: [40, 40],
});

const Map = ({ photo, title, coords, url }) => {
	const position = ["40.41669509716843", "-3.678061492369516"];

	console.clear();
	console.log("coords", coords);
	const splittedCoords = coords?.split(",");
	console.log("splitted coords", splittedCoords);

	return (
		<div
			className="leaflet-container"
			style={{ width: "100%", height: "300px" }}
		>
			<div>
				{position && coords && (
					<MapContainer
						center={splittedCoords}
						zoom={10}
						style={{ width: "100%", height: "300px" }}
					>
						<TileLayer
							attribution=""
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker icon={icon} position={splittedCoords}>
							<Popup>
								<a href={url} target="blank">
									<h2>{title}</h2>
								</a>
								{`<img src="http://localhost:4000/uploads/${photo}"></img>`}
							</Popup>
						</Marker>
					</MapContainer>
				)}
			</div>
		</div>
	);
};

export default Map;
