class GeoRunningPlot extends Map {
	constructor(targetElementName, segment, efforts, multiplier=1) {
		// Decode polyline from segment
		let polyCoords = PolylineDecoder.decode(segment["polyline"]);

		// To find the focus for our map, we take the middle element of the polyline
		let centreCoord = polyCoords[Math.round((polyCoords.length - 1) / 3)];

		super(targetElementName, centreCoord, polyCoords=polyCoords);

		this.segment = segment;
		this.efforts = efforts;

		this.animatedMarkers = [];

		this.initAnimation();

		this.ended = false;
	}

	initAnimation() {
		// Remove existing markers
		this.animatedMarkers.forEach(animatedMarker => this.map.removeLayer(animatedMarker));

		this.animatedMarkers = this.efforts.map(effort => L.animatedMarker(this.polyline.getLatLngs(),
											  			  { autoStart: false,
											  			    distance: this.segment["distance"],
											  			    interval: effort["time"] * 1000,
											  			    onEnd: () => { this.ended = true; } }));

		this.animatedMarkers.forEach(animatedMarker => animatedMarker.addTo(this.map));
	}

	togglePlayPause() {
		if (this.ended) {
			this.initAnimation();
		} 

		this.animatedMarkers.forEach(animatedMarker => animatedMarker.start());
	}

	stop() {
		this.animatedMarkers.forEach(animatedMarker => animatedMarker.stop());
	}
}