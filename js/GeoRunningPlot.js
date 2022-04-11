class GeoRunningPlot extends Map {
	constructor(targetElementName, segment, efforts, multiplier=1) {
		// Decode polyline from segment
		let polyCoords = PolylineDecoder.decode(segment["polyline"]);

		let interpolator = new LatLongInterpolator(polyCoords);
		polyCoords = interpolator.interpolate();

		// To find the focus for our map, we take the middle element of the polyline
		let centreCoord = polyCoords[Math.round((polyCoords.length - 1) / 3)];

		super(targetElementName, centreCoord, polyCoords, true);

		this.segment = segment;
		this.efforts = efforts;

		this.animatedMarkers = [];
		this._playing = false;

		this.resetAnimation();

		this.ended = false;
	}

	resetAnimation() {
		// Remove existing markers
		this.animatedMarkers.forEach(animatedMarker => this.map.removeLayer(animatedMarker));

		this.animatedMarkers = this.efforts.map((effort, index) => L.animatedMarker(this.polyline.getLatLngs(),
											  			  { autoStart: false,
											  			    distance: this.segment["distance"],
											  			    icon: L.icon({ iconUrl: `minimap/${index}.png`,
											  			    			   iconSize: 64 }),
											  			    interval: effort["time"] * 1000,
											  			    onEnd: () => { this.ended = true;
											  			    			   if (index == 0) {
											  			    			   	this.playing = false;
											  			    			   } } }));

		this.animatedMarkers.forEach(animatedMarker => animatedMarker.addTo(this.map));
	}

	get playing() {
		return this._playing;
	}

	set playing(isPlaying) {
		this._playing = isPlaying;

		if (this.playing) {
			if (this.ended) {
				this.ended = false;
				this.resetAnimation();
			}

			this.animate();
		} else {
			this.stop();
		}

		this.toolbar.buttons["play"].text(this.playing ?
										  Constants.pauseIcon :
										  Constants.playIcon);
	}

	togglePlayPause() {
		this.playing = !this.playing;
	}

	animate() {
		this.animatedMarkers.forEach(animatedMarker => animatedMarker.start());
	}

	stop() {
		this.animatedMarkers.forEach(animatedMarker => animatedMarker.stop());
	}
}