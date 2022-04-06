class Map {
	constructor(targetElementName, coordinates, polyCoords=null) {
		// Find the target element in the DOM
		this.targetElement = d3.select(`#${targetElementName}`);
		this.targetElement.attr("class", "Map");

		// Initialise the map
		this.map = L.map(targetElementName, { "zoomControl": false })
					.setView(coordinates, 18);

		let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		});

		OpenStreetMap_Mapnik.addTo(this.map);

		if (polyCoords !== null) {
			this.setPolyline(polyCoords);
		}

		//this.disableMapFunctions();
	}

	setPolyline(latlngs, color="red") {
		this.polyline = L.polyline(latlngs, {color: color});
		this.polyline.addTo(this.map);
	}

	disableMapFunctions() {
		this.map.touchZoom.disable();
		this.map.doubleClickZoom.disable();
		this.map.scrollWheelZoom.disable();
		this.map.boxZoom.disable();
		this.map.keyboard.disable();
		this.map.dragging.disable();
	}
}