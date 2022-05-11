class GeoRunningPlot extends MapPlot {
	constructor(targetElementName, segment, efforts, toolbar, multiplier=1) {
		// Decode polyline from segment
		let polyCoords = PolylineDecoder.decode(segment["polyline"]);

		let interpolator = new LatLongInterpolator(polyCoords);
		polyCoords = interpolator.interpolate();

		// To find the focus for our map, we take the middle element of the polyline
		let centreCoord = polyCoords[Math.round((polyCoords.length - 1) / 3)];

		super(targetElementName, centreCoord, polyCoords, toolbar);

		this.segment = segment;

		this.conversion = { "M": "men", "F": "women" };

		this.animatedMarkers = [];

		if (toolbar) {
			this.toolbar = toolbar;
		}

		this._playing = false;

		this.initData(efforts, true);
	}

	initData(efforts, init=false) {
		this.efforts = efforts;
		this.resetAnimation();
		this.ended = false;

		if (!init) {
			this.playing = false;
		}
	}

	resetAnimation() {
		// Remove existing markers
		this.animatedMarkers.forEach(animatedMarker => this.map.removeLayer(animatedMarker));

		this.animatedMarkers = this.efforts.map((effort, index) => L.animatedMarker(this.polyline.getLatLngs(),
											  			  { autoStart: false,
											  			  	zIndexOffset: Helpers.zIndexFromIndex(index),
											  			    distance: this.segment["distance"],
											  			    icon: L.icon({ iconUrl: `minimap/${this.conversion[effort["gender"]]}.png`,
											  			    			   iconSize: 8 }),
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

		this.toolbar.buttons["play"].html(this.playing ?
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