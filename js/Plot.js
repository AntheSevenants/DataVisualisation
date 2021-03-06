class Plot {
	constructor(targetElementName, plotType, noToolbar=false, noContainer=false) {
		// Find the target element in the DOM
		this.targetElement = d3.select(`#${targetElementName}`);
		this.targetElement.html("");
		this.targetElement.attr("class", `${plotType}`);

		console.log(targetElementName, "notoolbar:", noToolbar);

		if (noContainer) {
			this.targetElementName = targetElementName;
			return;
		}

		this.targetElementName = `${targetElementName}-container`;

		this.container = this.targetElement.append("div")
										   .attr("class", "plotcontainer")
										   .attr("id", this.targetElementName);

		this.originalTargetElement = this.targetElement;
		this.targetElement = this.container;

		this.noToolbar = noToolbar;
	}

	initToolbar() {
		this.toolbar = this.originalTargetElement.append("div")
										 .attr("class", "toolbar");

		this.toolbar = new Toolbar(this.toolbar);

		this.toolbar.registerButton("play",
					Constants.playIcon,
					"btn btn-primary",
					() => { this.togglePlayPause(); });

		this.toolbar.registerButton("stop",
							Constants.stopIcon,
							"btn btn-danger",
							() => { this.playing = false;
									this.resetAnimation(); });
	}
}