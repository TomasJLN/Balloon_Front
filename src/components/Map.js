import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useParams } from "react-router-dom";
import { useExperience } from "../hooks/useExperience";
import "../pages/experience/experience.css";

mapboxgl.accessToken =
	"pk.eyJ1IjoidGhlZGVzY2VuZGVudDg2IiwiYSI6ImNsMDM0N2owaDA5b3Aza3FwZWIzbDNvdWUifQ.PptFyeMPXEgq97xokTWL9Q";

const Map = () => {
	const { id } = useParams();

	const {
		idCategory,
		title,
		description,
		price,
		location,
		coords,
		photo,
		endDate,
		conditions,
		normatives,
	} = useExperience(id);

	const mapContainer = useRef("");
	const map = useRef(null);
	const [lng, setLng] = useState(-8.71245);
	const [lat, setLat] = useState(42.2314);
	const [zoom, setZoom] = useState(14);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v9",
			center: [lng, lat],
			zoom: zoom,
		});
	});

	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		map.current.on("move", () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
	});

	return (
		<div>
			<div ref={mapContainer} className="map-container" />
		</div>
	);
};

export default Map;
