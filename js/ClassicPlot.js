class ClassicPlot extends Plot {
	constructor(targetElementName, plotType, noToolbar=false, noContainer=false) {
		super(targetElementName, plotType, noToolbar, noContainer);
	}

	initPlot() {
		this.dimensions = { "width": parseInt(this.container.style('width'), 10),
							"height": parseInt(this.container.style('height'), 10),
							"padding": 30 };

		this.chartRange = this.dimensions["width"] - this.dimensions["padding"];

		// Add a vector element
		this.svg = this.targetElement.append("svg");
	}
}