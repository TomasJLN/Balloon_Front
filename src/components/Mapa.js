import { useEffect, useState } from "react";
import "../pages/experience/experience.css";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvents,
} from "react-leaflet";
import { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../pages/experience/experience.css";

const icon = new DivIcon({
	className: "balloon-location-marker",
	html: `
		<div class="balloon-marker">
			<div class="balloon-marker-envelope">
				<span class="balloon-marker-shine"></span>
			</div>
			<div class="balloon-marker-basket"></div>
			<div class="balloon-marker-pin"></div>
		</div>
	`,
	iconSize: [48, 64],
	iconAnchor: [24, 58],
	popupAnchor: [0, -58],
});

function LocationMarker({ splittedCoords, url, title, photo }) {
	const [position, setPosition] = useState(
		splittedCoords.map((c) => Number(c))
	);

	useEffect(() => {
		setPosition(splittedCoords.map((c) => Number(c)));
	}, [splittedCoords]);

	const map = useMapEvents({
		click() {
			map.flyTo(position, 12);
		},
	});

	return position === null ? null : (
		<Marker icon={icon} position={position}>
			<Popup className="popup-location">
				<a href={url} target="blank">
					<p>{title}</p>
				</a>
				{photo ? (
					<img
						src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photo}`}
						alt={title}
						className="card-thumbnail-map"
					/>
				) : (
					<img
						src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
						alt={title}
						className="card-thumbnail-map"
					/>
				)}
			</Popup>
		</Marker>
	);
}

const Mapa = ({ photo, title, coords, url }) => {
	// console.clear();
	const splittedCoords = coords?.split(",");
	const handleTargetClick = () => {
		document.querySelector("#targetLocation")?.click();
	};
	useEffect(() => {
		const temp = setTimeout(handleTargetClick, 2000);
		return () => {
			clearTimeout(temp);
		};
	}, [coords]);

	return (
		<div>
			{coords ? (
				<MapContainer
					scrollWheelZoom={false}
					id="targetLocation"
					center={splittedCoords}
					zoom={12}
					style={{ zIndex: 3, width: "100%", height: "300px" }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<LocationMarker
						splittedCoords={splittedCoords}
						url={url}
						title={title}
						photo={photo}
					/>
				</MapContainer>
			) : (
				<h1>No hay localización</h1>
			)}
		</div>
	);
};

export default Mapa;
