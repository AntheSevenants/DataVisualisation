class LinearRunningPlot {
	constructor(targetElementName, length, efforts) {
		// Find the target element in the DOM
		this.targetElement = d3.select(`#${targetElementName}`);

		// Length of the segment in meters
		this.length = length
		// Arary for efforts for this segmetn
		this.efforts = efforts;

		// Extract only the effort times (we need them for the scaler)
		this.times = this.efforts.map(effort => effort["time"]);

		this.initPlot();
	}

	initPlot() {
		// Set the correct plot class
		this.targetElement.attr("class", "Plot LinearRunningPlot");

		// Create a scaler
		this.scaler = d3.scaleLinear()
						// The domain of our data goes between 0 and the best time
    					.domain([0, Math.min(...this.times)])
    					.range([0, 100]);
	}

	// We need to "invert" the scale, because low values = good, high values = bad
	scale(time) {
		return -this.scaler(time) + 200;
	}
}