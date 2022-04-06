class LinearRunningPlotTable {
	constructor(targetElementName, length, efforts, multiplier=1) {
		// Find the target element in the DOM
		this.targetElement = d3.select(`#${targetElementName}`);
		this.targetElement.attr("class", "LinearRunningPlotTable");

		let plotId = `${targetElementName}-plot`;
		this.targetElement.append("div")
						  .attr("id", plotId);

		let tableId = `${targetElementName}-table`;
		this.targetElement.append("div")
						  .attr("id", tableId);

		let linearRunningPlot = new LinearRunningPlot(plotId,
													  length,
													  efforts,
													  multiplier);

		let resultsTable = new ResultsTable(tableId,
											efforts);
	}
}