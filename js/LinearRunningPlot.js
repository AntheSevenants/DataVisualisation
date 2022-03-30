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

		this.drawTrack();
		this.drawEfforts();
	}

	initPlot() {
		// Set the correct plot class
		this.targetElement.attr("class", "Plot LinearRunningPlot");

		this.dimensions = { "width": parseInt(this.targetElement.style('width'), 10),
							"height": parseInt(this.targetElement.style('height'), 10),
							"padding": 20 };

		this.chartRange = this.dimensions["width"] - this.dimensions["padding"];

		// Add a vector element
		this.svg = this.targetElement.append("svg");

		// Create a scaler
		this.scaler = d3.scaleLinear()
						// The domain of our data goes between 0 and the best time
    					.domain([0, Math.min(...this.times)])
    					.range([ this.dimensions["padding"], 
    						     this.chartRange ]);
	}

	// We need to "invert" the scale, because low values = good, high values = bad
	scale(time) {
		return -this.scaler(time) + 2 * this.chartRange;
	}

	drawTrack() {
		this.lineHeight = 40;

		this.svg.append('line')
				.style("stroke", "lightgreen")
				.style("stroke-width", 10)
				.attr("x1", this.dimensions["padding"])
				.attr("y1", this.lineHeight)
				.attr("x2", this.chartRange)
				.attr("y2", this.lineHeight); 
	}

	generateCoordinates() {
		// Pre-compute the point coordinates
		// This way, we can save them for later use
		this.effortPointCoordinates = this.efforts.map(row => this.scale(row["time"]));
	}

	drawEfforts() {
		this.generateCoordinates();

		this.effortPoints = this.svg.append("g") // create another SVG group
								   	// give it the "dot" class
								    .attr("class", "dot") 
								    .attr("transform", "translate(0, 0)")
								  	.selectAll("circle")
								  	.data(this.efforts)
								  	.enter()
								   	// create an SVG circle for every data point
								  	.append("circle")
									// give the SVG path coordinates
									// this will effectively absolutely position the token
								  	.attr("cx", (row, index) => this.effortPointCoordinates[index])
								  	.attr("cy", this.lineHeight)
								  	.attr("r", 10)
								  	.attr("stroke", "black")
								  	.attr("fill", "#69B3A2")
								  	.attr("pointIndex", (row, index) => index);
	}
}