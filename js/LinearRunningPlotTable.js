class LinearRunningPlotTable {
	constructor(targetElementName, length, efforts, toolbar, multiplier=1) {
		// Find the target element in the DOM
		this.targetElement = d3.select(`#${targetElementName}`);
		this.targetElement.attr("class", "LinearRunningPlotTable");

		let plotId = `${targetElementName}-plot`;
		this.targetElement.append("div")
						  .attr("id", plotId);

		let tableId = `${targetElementName}-table`;
		this.targetElement.append("div")
						  .attr("id", tableId);

		this.linearRunningPlot = new LinearRunningPlot(plotId,
													  length,
													  efforts,
													  toolbar,
													  multiplier);

		this.resultsTable = new ResultsTable(tableId,
											efforts);
	}
}