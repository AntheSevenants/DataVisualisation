class GroupedBarChart extends ClassicPlot {
	constructor(targetElementName, data, xTitle, needsLineBreaks=false) {
		super(targetElementName,
			  "bar",
			  true);
		this.data = data;

		this.maxNum = Math.max(...this.data.map(row => Math.max(...Object.values(row).slice(1))));
		this.maxNum = Math.ceil(this.maxNum / 10) * 10;

		this.needsLineBreaks = needsLineBreaks;

		this.subgroups = this.data.columns.slice(1)
		this.groups = this.data.map(d => d["group"]);

		this.xTitle = xTitle;

		this.initPlot();
		this.drawPlot();
		this.drawLegend();
	}

	initPlot() {
		super.initPlot();

		this.originalSvg = this.svg;

		this.dimensions["padding"] = 60;
		this.dimensions["height"] = 400;
		this.chartRange = this.chartRange - 40;
		this.chartRangeHeight = this.dimensions["height"] - this.dimensions["padding"] - 15;

		this.svg.attr("width", this.dimensions["width"])
				.attr("height", this.dimensions["height"]);

		this.svg = this.svg.append("g")
						   .attr("transform",
					  		`translate(70, 10)`);

		this.scaleX = d3.scaleBand()
				  .domain(this.groups)
  				  .range([ 0, this.chartRange ])
  				  .padding(0.2);

		this.scaleY = d3.scaleLinear()
  				  .domain([0, this.maxNum])
  				  .range([ this.chartRangeHeight, 0]);

  		this.scaleXsub = d3.scaleBand()
  						   .domain(this.subgroups)
  						   .range([0, this.scaleX.bandwidth()])
  						   .padding([0.05]);

  		this.colour = d3.scaleOrdinal()
  						.domain(this.subgroups)
  						.range(Object.values(Constants.colours));
	}

	drawPlot() {
		// Draw X axis
		let xAxis = this.svg.append("g")
  				.attr("transform", "translate(0," + this.chartRangeHeight + ")")
  				.call(d3.axisBottom(this.scaleX))

  		if (this.needsLineBreaks) {
  			xAxis.selectAll('text').each(Helpers.insertLinebreaks);
  		}
  		
  		xAxis.selectAll("text")
  			 .attr("transform", "translate(0, 5)")
    		 //.attr("transform", "translate(-10,0)") /* rotate(-45)*/
    		 .style("text-anchor", "middle");

      	// text label for the x axis
  		this.svg.append("text")             
      		    .attr("transform", `translate(${this.chartRange / 2},
      		    					${this.dimensions["height"] - 15})`)
      			.style("text-anchor", "middle")
      			.text(this.xTitle);

		// Draw Y axis
		this.svg.append("g")
  				.call(d3.axisLeft(this.scaleY)
  						.tickFormat(d => `${d}%`));

      	// text label for the y axis
      	this.originalSvg.append("text")
      			.attr("transform", "rotate(-90)")
      			.attr("y", 10)
      			.attr("x", 0 - (this.chartRangeHeight / 2))
      			.attr("dy", "1em")
      			.style("text-anchor", "middle")
      			.text("share (bigger is larger)");

		// Draw bars
		this.svg.append("g")
				.selectAll("g")
				.data(this.data)
				.join("g")
				.attr("transform", d => { 
					console.log(d["group"]);
					return `translate(${this.scaleX(d["group"])}, 0)` })
				.selectAll("rect")
				.data(d => this.subgroups.map(key => ({key: key, value: d[key]})))
				.join("rect")
      			.attr("x", d => this.scaleXsub(d["key"]))
      			.attr("y", d => this.scaleY(d["value"]))
      			.attr("width", this.scaleXsub.bandwidth())
      			.attr("height", d => this.chartRangeHeight - this.scaleY(d["value"]))
      			.attr("fill", d => this.colour(d["key"]))
			    .attr("opacity", 0.6)
			    .attr("stroke", "#000")
      			.attr("stroke-width", 1)
      			.attr("stroke-linejoin", "round");
	}

	drawLegend() {
      	// Handmade legend
      	this.subgroups.forEach((subgroup, index) => {
	  		this.svg.append("circle")
	  				.attr("cx", this.dimensions["width"] - 100)
	  				.attr("cy",30 * (index))
	  				.attr("r", 6)
	  				.attr("fill-opacity", 0.6)
	  				.attr("class", "legend_piece")
	  				.style("fill", this.colour(subgroup));
  			
  			this.svg.append("text")
  					.attr("x", this.dimensions["width"] - 120)
  					.attr("y", 30 * (index))
  					.text(subgroup)
  					.style("font-size", "15px")
	  				.attr("class", "legend_piece")
  					.attr("alignment-baseline","middle")
  					.attr("text-anchor", "end");
  		});
	}
}