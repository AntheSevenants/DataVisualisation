class FullRunningPlot extends Plot {
	constructor(targetElementName, segment, efforts, multiplier) {
		super(targetElementName, "FullRunningPlot", false, false);

		this.initToolbar();

		this.segment = segment;

		// Title
		let titleDiv = this.originalTargetElement.append("div").lower()
												 .attr("class", "title")
												 .text(segment["name"]);

		// Inner container
		let innerContainerId = `${targetElementName}-inner`;
		this.innerContainer = this.targetElement.append("div")
												.attr("class", "inner")
										   	 	.attr("id", innerContainerId);

		// Table
		let tableId = `${targetElementName}-table`;
		this.targetElement.append("div")
						  .attr("id", tableId);
		this.resultsTable = new ResultsTable(tableId,
											 efforts);

		// LinearRunningPlot
		let linearRunningPlotName = `${targetElementName}-linear`;
		this.innerContainer.append("div")
						  .attr("id", linearRunningPlotName);
		this.linearRunningPlotTable = new LinearRunningPlot(linearRunningPlotName,
															segment["distance"],
															efforts,
															this.toolbar);

		// GeoRunningPlot
		let geoRunningPlotName = `${targetElementName}-geo`;
		this.innerContainer.append("div")
						  .attr("id", geoRunningPlotName);
		this.geoRunningPlot = new GeoRunningPlot(geoRunningPlotName,
											segment,
											efforts,
											this.toolbar);
	}

	togglePlayPause() {
		this.linearRunningPlotTable.playing = 
			!this.linearRunningPlotTable.playing;

		this.geoRunningPlot.playing = !this.geoRunningPlot.playing;
	}

	set playing(isPlaying) {
		this.linearRunningPlotTable.playing = isPlaying;
		this.geoRunningPlot.playing = isPlaying;
	}

	resetAnimation() {
		this.linearRunningPlotTable.resetAnimation();
		this.geoRunningPlot.resetAnimation();
	}

	getCoords() {
		let obj = { "name": this.segment["name"],
					"coords": this.geoRunningPlot.map.getCenter(),
					"zoom": this.geoRunningPlot.map.getZoom() };

		navigator.clipboard.writeText(JSON.stringify(obj));
	}
}