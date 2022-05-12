// Function to compute density
function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
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
		
		this.initData(data);

		this.histogramStyles = [ { "fill": Constants.colours["men"], "name": "Men", "column": "M" },
								 { "fill": Constants.colours["women"], "name": "Women", "column": "F" },
								 { "fill": Constants.colours["shadow"], "name": "Women without boost", "column": "FF" } ];
		this.initPlot();
		this.drawPlot();
	}

	initData(data) {
		this.originalData = data;

		// We copy all female data (faster than copying it on the fly each time)
		this.data = data.concat(data.filter(d => d["gender"] == "F")
  			 		  						  .map(d => { let copy = Object.assign({}, d);
  			 		  						  			  copy["gender"] = "FF";
  			 		  						  			  return copy; }))

		this.data = this.data.filter(row => +row["time"] > 30 && +row["time"] < 800);

		this.menData = this.data.filter(d => d["gender"] == "M")
  								.map(d => (+d["time"]));

  		this.updateWomen();
	}

	updateWomen() {
  		this.womenData = this.data.filter(d => d["gender"] == "F")
  			 		   	   		  .map(d => (this.affirmativeAction.valueFunction(+d["time"])))
	}

	initPlot() {
		super.initPlot();

		this.originalSvg = this.svg;

		this.curves = [];

		this.dimensions["height"] = 420;
		this.dimensions["padding"] = 60;
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
										 this.updateWomen();
										 this.updatePlot();

										 let boostedDataset = this.originalData.map(d => { 
										 	// If not a women, we don't need to apply the value function
										 	if (d["gender"] != "F") {
										 		return d;
										 	// If a women, create a deep copy, and apply value function
										 	} else {
										 		let copy = Object.assign({}, d);
												copy["time"] = this.affirmativeAction.valueFunction(copy["time"]);
  			 		  						  	return copy;
										 	}
										 });
										 boostedDataset.sort(Helpers.timeSort);

										 console.log(boostedDataset);

										 this.affirmativeAction.callback(boostedDataset); },
							this.affirmativeAction.reverseSlider);
	}

	defineDensities() {
  		// Create the kdes (which can change)
		this.densities[0] = this.kde(this.menData);
		this.densities[1] = this.kde(this.womenData);
	}

	get noShadowBins() {
		return (this.affirmativeAction.variable == this.affirmativeAction.defaultValue);
	}

	showHideShadowPlot() {
		this.curves[2].style("display", this.noShadowBins ? "none": "inline");
      	this.drawLegend();
	}

	updatePlot() {
  		this.defineDensities();

  		this.curves.forEach((curve, index) => {
  			if (index == 2) {
  				return;
  			}

  			curve.datum(this.densities[index])
  				 .transition()
				 .duration(300)
			     .attr("d", d3.line()
			     			  .curve(d3.curveBasis)
			     			  .x(d => this.scaleX(d[0]))
			     			  .y(d => this.scaleY(d[1])));
  		});

  		this.showHideShadowPlot();
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

      	// text label for the x axis
  		this.svg.append("text")             
      		    .attr("transform", `translate(${this.chartRange / 2},
      		    					${this.chartRangeHeight + 40})`)
      			.style("text-anchor", "middle")
      			.text("1000m running time (lower is better)");

      	// Y axis
      	this.scaleY.domain([0,
      						this.maxY == null ? 0.01 : 0.014])
      			   .nice();

      	// text label for the y axis
      	this.svg.append("text")
      			.attr("transform", "rotate(-90)")
      			.attr("y", 0 - this.dimensions["padding"])
      			.attr("x", 0 - (this.chartRangeHeight / 2))
      			.attr("dy", "1em")
      			.style("text-anchor", "middle")
      			.text("density (higher means more entries)");   		   

      	this.svg.append("g")
      			.call(d3.axisLeft(this.scaleY)
      							.tickFormat(d3.format(".1%")));

      	console.log(this.data.filter(d => d["gender"] == "M")
  											 .map(d => (+d["time"])));

      	// Female "shadow" gender will be used for original values
		this.densities = [ null, null, this.kde(this.data.filter(d => d["gender"] == "FF")
  			 		   	   					 			 .map(d => (+d["time"]))) ];

  		// Create the kdes
  		this.defineDensities();

      	this.densities.forEach((density, index) => {
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

      	this.showHideShadowPlot();
	}

	drawLegend() {
		// Remove pre-existing legend things
		console.log(this.svg.selectAll(".legend_piece"));
		this.svg.selectAll(".legend_piece").remove();

      	// Handmade legend
      	this.densities.forEach((bin, index) => {
      		if (index == 2 && this.noShadowBins) {
      			return;
      		}

	  		this.svg.append("circle")
	  				.attr("cx", this.dimensions["width"] - 100)
	  				.attr("cy",30 * (index + 1))
	  				.attr("r", 6)
	  				.attr("fill-opacity", !(index == 2) ? 0.6 : 0.1)
	  				.attr("class", "legend_piece")
	  				.style("fill", this.histogramStyles[index]["fill"])
  			
  			this.svg.append("text")
  					.attr("x", this.dimensions["width"] - 120)
  					.attr("y", 30 * (index + 1))
  					.text(this.histogramStyles[index]["name"])
  					.style("font-size", "15px")
	  				.attr("class", "legend_piece")
  					.attr("alignment-baseline","middle")
  					.attr("text-anchor", "end")
  		});
	}
}