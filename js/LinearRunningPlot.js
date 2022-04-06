class LinearRunningPlot {
	constructor(targetElementName, length, efforts) {
		// Find the target element in the DOM
		this.targetElement = d3.select(`#${targetElementName}`);

		this.name = "example";

		// Length of the segment in meters
		this.length = length
		// Arary for efforts for this segmetn
		this.efforts = efforts;

		// Extract only the effort times (we need them for the scaler)
		this.times = this.efforts.map(effort => effort["time"]);

		// Best time (we need this multiple times)
		this.bestTime = Math.min(...this.times);

		// Should the plot be animated?
		this.doAnimate = true;

		// Is the animation currently playing?
		this._playing = false;
		this.ended = false;

		this.initPlot();
		this.initToolbar();

		this.drawTrack();
		this.drawText();
		this.drawEfforts();
	}

	initPlot() {
		// Set the correct plot class
		this.targetElement.attr("class", "Plot LinearRunningPlot");

		// Add container and toolbar
		this.container = this.targetElement.append("div")
										   .attr("class", "container");
		this.toolbar = this.targetElement.append("div")
										 .attr("class", "toolbar");

		this.dimensions = { "width": parseInt(this.container.style('width'), 10),
							"height": parseInt(this.container.style('height'), 10),
							"padding": 30 };

		this.chartRange = this.dimensions["width"] - this.dimensions["padding"];

		// Add a vector element
		this.svg = this.container.append("svg");

		// Create a scaler
		this.scaler = d3.scaleLinear()
						// The domain of our data goes between 0 and the best time
    					.domain([0, this.bestTime])
    					.range([ this.dimensions["padding"], 
    						     this.chartRange ]);
	}

	initToolbar() {
		this.toolbar = new Toolbar(this.toolbar);

		this.toolbar.registerButton("play",
									Constants.playIcon,
									"",
									() => { this.togglePlayPause(); });

		this.toolbar.registerButton("stop",
									Constants.stopIcon,
									"",
									() => { this.playing = false;
											this.resetAnimation(); });
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

	drawText() {
		// 0m
		this.svg.append("text")
				.attr("x", this.dimensions["padding"])
				.attr("y", this.lineHeight + 40)
				.attr("text-anchor", "middle")
				.text("0m");

		// segment lent m
		this.svg.append("text")
				.attr("x", this.chartRange)
				.attr("y", this.lineHeight + 40)
				.attr("text-anchor", "middle")
				.text(`${this.length}m`);
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
									.attr("fill-opacity", 0.7)
								  	.attr("pointIndex", (row, index) => index);

		if (this.doAnimate) {
			// We'll need a CSS modifier to add the animation rules to a stylesheet
			this.cssModifier = new CssModifier();

			// Register the animation for each effort point
			this.effortPointCoordinates.forEach((effortPointCoordinate, index) => {
				// We need to "translateX" all points to the starting position of the plot
				let animationRule = `@keyframes ${this.generateAnimationName(index)} {
									   from { transform: ${this.generateStartLineTransform(index)}; }
									   to { transform-color: translateX(0px); }
									 }`
				this.cssModifier.insertRule(animationRule)
			});

			this.setAnimations();
		}
	}

	setAnimations() {
		// We define an animation time which is equal to the fastest time in the dataset
		this.effortPoints = this.effortPoints.style("animation-name", (point, index) => this.generateAnimationName(index))
												 .style("animation-duration", `${this.bestTime}s`)
												 .style("animation-timing-function", "linear")
												 .attr("class", "paused");

		// Animation end callback only needs to run for one element (the first one, for example)
		d3.select(this.effortPoints.nodes()[0]).on("animationend", () => {
	  		this.playing = false;
	  		this.ended = true;
		});
	}

	generateAnimationName(index) {
		return `${this.name}_${index}`;
	}

	generateStartLineTransform(index) {
		let transformLine = `translateX(${-this.effortPointCoordinates[index] + this.dimensions["padding"]}px)`;

		return transformLine;
	}

	animate() {
		// We now translateX back to 0, which will cause all circles to smooth to their original positions
		this.effortPoints = this.effortPoints.style("transform", `translateX(0px)`);
	}

	resetAnimation() {
		// First, reset the animation name (needed in case the animation has already played)
		this.effortPoints = this.effortPoints.style("animation-name", "")

		// Trigger re-flow
		this.effortPoints.style("width");

		this.ended = false;

		this.setAnimations();

	}

	get playing() {
		return this._playing;
	}

	set playing(isPlaying) {
		this._playing = isPlaying;

		if (this.ended) {
			this.resetAnimation();
		}

		// Add paused class only if not playing
		this.effortPoints = this.effortPoints.classed("paused", !this.playing);

		this.toolbar.buttons["play"].text(this.playing ?
										  Constants.pauseIcon :
										  Constants.playIcon);
	}

	togglePlayPause() {
		this.playing = !this.playing;
		this.animate();
	}
}