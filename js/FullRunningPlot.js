class FullRunningPlot extends Plot {
	constructor(targetElementName, segment, efforts, multiplier) {
		super(targetElementName, "FullRunningPlot", false, true);

		// LinearRunningPlotTable
		let linearRunningPlotTableName = `${targetElementName}-linear`;
		this.targetElement.append("div")
						  .attr("id", linearRunningPlotTableName);
		this.linearRunningPlotTable = new LinearRunningPlotTable(linearRunningPlotTableName,
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
		this.linearRunningPlotTable.linearRunningPlot.playing = 
			!this.linearRunningPlotTable.linearRunningPlot.playing;

		this.geoRunningPlot.playing = !this.geoRunningPlot.playing;
	}

	set playing(isPlaying) {
		this.linearRunningPlotTable.linearRunningPlot.playing = isPlaying;
		this.geoRunningPlot.playing = isPlaying;
	}

	resetAnimation() {
		this.linearRunningPlotTable.linearRunningPlot.resetAnimation();
		this.geoRunningPlot.resetAnimation();
	}
}