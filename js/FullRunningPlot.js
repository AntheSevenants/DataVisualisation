class FullRunningPlot extends Plot {
	constructor(targetElementName, segment, efforts, multiplier) {
		super(targetElementName, "FullRunningPlot", false, false);

		// Table
		let tableId = `${targetElementName}-table`;
		this.originalTargetElement.append("div")
						  		  .attr("id", tableId);
		this.resultsTable = new ResultsTable(tableId,
											 efforts);

		// LinearRunningPlot
		let linearRunningPlotName = `${targetElementName}-linear`;
		this.targetElement.append("div")
						  .attr("id", linearRunningPlotName);
		this.linearRunningPlotTable = new LinearRunningPlot(linearRunningPlotName,
															segment["distance"],
															efforts,
															this.toolbar);

		// GeoRunningPlot
		let geoRunningPlotName = `${targetElementName}-geo`;
		this.targetElement.append("div")
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
		let obj = { "coords": this.geoRunningPlot.map.getCenter(),
					"zoom": this.geoRunningPlot.map.getZoom() };

		navigator.clipboard.writeText(JSON.stringify(obj));
	}
}