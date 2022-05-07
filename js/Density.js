// Function to compute density
function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
    	console.log(x, d3.mean(V, function(v) { return kernel(x - v); }));
      return [x, d3.mean(V, function(v) { return kernel(x - v); })];
    });
  };
}
function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}

class DensityPlot extends ClassicPlot {
	constructor(targetElementName, data, affirmativeAction, noToolbar=false, maxY=null, ticks=40) {
		super(targetElementName, "Histogram", noToolbar);

		this.centralColumn = "time";
		this.affirmativeAction = affirmativeAction;

		this.padding = 40;
		this.maxY = maxY;
		this.ticks = ticks;

		// We copy all female data (faster than copying it on the fly each time)
		this.data = data.concat(data.filter(d => d["gender"] == "F")
  			 		  						  .map(d => { let copy = Object.assign({}, d);
  			 		  						  			  copy["gender"] = "FF";
  			 		  						  			  return copy; }))

		this.data = this.data.filter(row => +row["time"] > 30 && +row["time"] < 800);
		this.paces = this.data.map(row => +row["time"]);
		//this.paces = data;

		this.histogramStyles = [ { "fill": "#69b3a2", "name": "Men", "column": "M" },
								 { "fill": "#404080", "name": "Women", "column": "F" },
								 { "fill": "#434C5E", "name": "Women*", "column": "FF" } ];
		this.initPlot();
		this.drawPlot();
	}

	initPlot() {
		super.initPlot();

		this.originalSvg = this.svg;

		this.curves = [];

		this.dimensions["height"] = 400;
		this.chartRangeHeight = this.dimensions["height"] - this.dimensions["padding"];

		this.svg.attr("width", this.dimensions["width"])
				.attr("height", this.dimensions["height"]);

		let domain = [ 30,
					   800 ];

		this.scaleX = d3.scaleLinear()
  						.domain(domain).nice()
    					.range([ 0, 
    						     this.chartRange - 20 ]);

    	this.scaleY = d3.scaleLinear()
    					.range([this.chartRangeHeight, 0]);

    	this.kde = kernelDensityEstimator(kernelEpanechnikov(7),
    									  this.scaleX.ticks(this.ticks))
	}

	initToolbar() {
		this.toolbar = this.originalTargetElement.append("div")
										 .attr("class", "toolbar slider");

		this.toolbar = new Toolbar(this.toolbar);

		this.toolbar.registerText("multiplier", this.affirmativeAction.formatFunction());
		this.toolbar.registerSlider("slider",
							this.affirmativeAction.range,
							this.affirmativeAction.defaultValue,
							(event) => { this.affirmativeAction.variable = event.target.value;
										 this.toolbar.elements["multiplier"].text(this.affirmativeAction.formatFunction());
										 this.updatePlot(); },
							this.affirmativeAction.reverseSlider);
	}

	updatePlot() {
  		// Create the kdes
  		this.densities[1] = this.kde(this.data.filter(d => d["gender"] == "F")
  			 		   	   					 .map(d => (this.affirmativeAction.valueFunction(+d["time"]))));

  		this.curves[1].datum(this.densities[1])
  					  .transition()
					  .duration(300)
			    	  .attr("d", d3.line()
			    				 .curve(d3.curveBasis)
			    				 .x(d => this.scaleX(d[0]))
			    				 .y(d => this.scaleY(d[1])));
	}

	drawPlot() {
		this.originalSvg.html("");

		// Inner frame
		this.svg = this.originalSvg.append("g")
      					   .attr("transform", `translate(${this.dimensions["padding"]}, 10)`);

      	// X axis
      	this.svg.append("g")
      			.attr("transform", `translate(0, ${this.chartRangeHeight})`)
      			.call(d3.axisBottom(this.scaleX)
      					.tickValues(d3.range(60, 800, 60))
      					.tickFormat((secs, i) => d3.timeFormat("%M:%S")(Helpers.secondsToDate(secs))));

      	// Y axis
      	this.scaleY.domain([0,
      						this.maxY == null ? 0.01 : 0.015])
      			   .nice();

      	this.svg.append("g")
      			.call(d3.axisLeft(this.scaleY));

      	console.log(this.data.filter(d => d["gender"] == "M")
  											 .map(d => (+d["time"])));

  		// Create the kdes
  		this.densities = [ this.kde(this.data.filter(d => d["gender"] == "M")
  											 .map(d => (+d["time"]))),
  			 		   	   this.kde(this.data.filter(d => d["gender"] == "F")
  			 		   	   					 .map(d => (this.affirmativeAction.valueFunction(+d["time"])))),
  			 		   	   // Female "shadow" gender will be used for original values
  			 		   	   this.kde(this.data.filter(d => d["gender"] == "FF")
  			 		   	   					 .map(d => (+d["time"]))) ];

  		console.log(this.densities);

      	let noShadowBins = (this.affirmativeAction.variable == this.affirmativeAction.defaultValue);

      	this.densities.forEach((density, index) => {
      		if (index == 2 && noShadowBins) {
      			return;
      		}

			// append the densities to the svg element
			let curve = this.svg.append("path")
					.attr("class", "mypath")
			    	.datum(density)
			    	.attr("fill", this.histogramStyles[index]["fill"])
			    	.attr("opacity", !(index == 2) ? 0.6 : 0.1)
			    	.attr("stroke", "#000")
      				.attr("stroke-width", 1)
      				.attr("stroke-linejoin", "round")
			    	.attr("d", d3.line()
			    				 .curve(d3.curveBasis)
			    				 .x(d => this.scaleX(d[0]))
			    				 .y(d => this.scaleY(d[1])));

			this.curves.push(curve);
		    });

      	// Handmade legend
      	this.densities.forEach((bin, index) => {
      		if (index == 2 && noShadowBins) {
      			return;
      		}

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
}