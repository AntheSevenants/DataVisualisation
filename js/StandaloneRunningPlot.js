class StandaloneRunningPlot extends GeoRunningPlot {
	constructor(targetElementName, segment, efforts, toolbar, multiplier=1) { 
		super(targetElementName, segment, efforts, toolbar, multiplier)
		this.initToolbar();
		this.initMultiplierNotice();
	}

	initMultiplierNotice() {
		this.multiplierNotice = this.originalTargetElement.append("div")
										 				  .attr("class", "notice")
										 				  .html(`x${this.multiplier} speed`);
	}

	/*initToolbar() {
		this.toolbar.registerButton("play",
							Constants.playIcon,
							"btn btn-primary",
							() => { this.togglePlayPause(); });

		this.toolbar.registerButton("stop",
									Constants.stopIcon,
									"btn btn-primary",
									() => { this.playing = false;
											this.resetAnimation(); });
	}*/
}