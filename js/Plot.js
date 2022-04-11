class Plot {
	constructor(targetElementName, plotType, noToolbar=false, noContainer=false) {
		// Find the target element in the DOM
		this.targetElement = d3.select(`#${targetElementName}`);
		this.targetElement.attr("class", `${plotType}`);

		console.log(targetElementName, "notoolbar:", noToolbar);

		if (!noToolbar) {
			this.initToolbar();
		}

		if (noContainer) {
			this.targetElementName = targetElementName;
			return;
		}

		this.targetElementName = `${targetElementName}-container`;

		this.container = this.targetElement.append("div")
										   .attr("class", "container")
										   .attr("id", this.targetElementName);

		this.originalTargetElement = this.targetElement;
		this.targetElement = this.container;
	}

	initToolbar() {
		this.toolbar = this.targetElement.append("div")
										 .attr("class", "toolbar");

		this.toolbar = new Toolbar(this.toolbar);

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