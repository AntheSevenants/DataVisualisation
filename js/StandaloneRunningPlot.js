class StandaloneRunningPlot extends GeoRunningPlot {
	constructor(targetElementName, segment, efforts, toolbar, multiplier=1) { 
		super(targetElementName, segment, efforts, toolbar, multiplier)
		this.initToolbar();
	}

	initToolbar() {
		this.toolbar.registerButton("play",
							Constants.playIcon,
							"",
							() => { this.togglePlayPause(); });

		this.toolbar.registerButton("stop",
									Constants.stopIcon,
									"",
									() => { this.playing = false;
											this.resetAnimation(); });
	}
}