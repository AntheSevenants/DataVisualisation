class Histogram extends ClassicPlot {
	constructor(targetElementName, data) {
		super(targetElementName, "Histogram", true);

		this.padding = 40;
		this.data = data.filter(row => +row["pace"] > 30 && +row["pace"] < 800);
		this.paces = this.data.map(row => +row["pace"]);
		//this.paces = data;

		this.histogramStyles = [ { "fill": "#69b3a2", "name": "Men" },
								 { "fill": "#404080", "name": "Women" } ];
		this.initPlot();
		this.drawPlot();
	}

	initPlot() {
		super.initPlot();

		this.dimensions["height"] = 400;
		this.chartRangeHeight = this.dimensions["height"] - this.dimensions["padding"];

		this.svg.attr("width", this.dimensions["width"])
				.attr("height", this.dimensions["height"]);

		let domain = [ this.secondsToDate(+Math.min(...this.paces)),
					   this.secondsToDate(+Math.max(...this.paces)) ];

		/*let domain = [ (+Math.min(...this.paces)),
					   (+Math.max(...this.paces)) ];*/

		this.scaleX = d3.scaleTime()
  						.domain(domain).nice()
    					.range([ 0, 
    						     this.chartRange - 20 ]);

    	/*this.scaleX = d3.scaleLinear()
  						.domain(domain)
    					.range([ 0, 
    						     this.chartRange ]);*/

    	this.scaleY = d3.scaleLinear()
    					.range([this.chartRangeHeight, 0]);
	}

	drawPlot() {
		this.svg = this.svg.append("g")
      					   .attr("transform", `translate(${this.dimensions["padding"]}, 0)`);

      	this.svg.append("g")
      			.attr("transform", `translate(0, ${this.chartRangeHeight})`)
      			.call(d3.axisBottom(this.scaleX)
      					.tickFormat(d3.timeFormat("%M:%S")));

  		// set the parameters for the histogram
  		this.histogram = d3.histogram()
      					   .value((d) => this.secondsToDate(+d["pace"]))   // I need to give the vector of value
      					   .domain(this.scaleX.domain())  // then the domain of the graphic
      					   .thresholds(this.scaleX.ticks(20)); // then the numbers of bins

  		// And apply this function to data to get the bins
  		this.bins = [ this.histogram(this.data.filter(d => d["athlete_gender"] == "M")),
  			 		  this.histogram(this.data.filter(d => d["athlete_gender"] == "F")) ];

      	this.scaleY.domain([0, d3.max(this.bins[0], (d) => d.length)]);   // d3.hist has to be called before the Y axis obviously

      	this.svg.append("g")
      			.call(d3.axisLeft(this.scaleY));

      	this.bins.forEach((bin, index) => {
			// append the bar rectangles to the svg element
			this.svg.selectAll(`rect${index}`)
			    	.data(bin)
			    	.enter()
			    	.append("rect")
			    	.attr("x", 1)
			    	.attr("transform", (d) => { return "translate(" + this.scaleX(d.x0) + "," + this.scaleY(d.length) + ")"; })
			    	.attr("width", (d) => { let width = this.scaleX(d.x1) - this.scaleX(d.x0) - 1;
			    							return width < 0 ? 0 : width; })
			    	.attr("height", (d) => { return this.chartRangeHeight - this.scaleY(d.length); })
			    	.style("fill", this.histogramStyles[index]["fill"])
			    	.style("opacity", 0.6);
		    });

      	// Handmade legend
      	this.bins.forEach((bin, index) => {
	  		this.svg.append("circle")
	  				.attr("cx", this.dimensions["width"] - 150)
	  				.attr("cy",30 * (index + 1))
	  				.attr("r", 6)
	  				.style("fill", this.histogramStyles[index]["fill"])
  			
  			this.svg.append("text")
  					.attr("x", this.dimensions["width"] - 130)
  					.attr("y", 30 * (index + 1))
  					.text(this.histogramStyles[index]["name"])
  					.style("font-size", "15px")
  					.attr("alignment-baseline","middle")
  		});

	}

	secondsToDate(seconds) {
		// Create a timezone-free epoch
		let date = new Date(Date.UTC(1970, 0, 1, 0, 0, seconds));
    	//date.setUTCSeconds(seconds);
    	return date;
	}
}