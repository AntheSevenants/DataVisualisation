class Plot {
	constructor(targetElementName, plotType, noToolbar=false, noContainer=false) {
		// Find the target element in the DOM
		this.targetElement = d3.select(`#${targetElementName}`);
		this.targetElement.attr("class", `${plotType}`);

		console.log(targetElementName, "notoolbar:", noToolbar);

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

		if (!noToolbar) {
			this.initToolbar();
		}
	}

	initToolbar(type="play") {
		this.toolbar = this.originalTargetElement.append("div")
										 .attr("class", "toolbar");

		this.toolbar = new Toolbar(this.toolbar);

		switch (type) {
			case "play":
				this.toolbar.registerButton("play",
									Constants.playIcon,
									"",
									() => { this.togglePlayPause(); });

				this.toolbar.registerButton("stop",
											Constants.stopIcon,
											"",
											() => { this.playing = false;
													this.resetAnimation(); });
		
				this.toolbar.registerButton("coords",
											"COORDS",
											"",
											() => { this.getCoords(); });
				break;
		}
		
	}
}