class GroupedBarChart extends ClassicPlot {
	constructor(targetElementName, data, needsLineBreaks=false) {
		super(targetElementName,
			  "bar",
			  true);
		this.data = data;
		this.maxNum = 100;

		this.needsLineBreaks = needsLineBreaks;

		this.subgroups = this.data.columns.slice(1)
		this.groups = this.data.map(d => d["group"]);

		this.initPlot();
		this.drawPlot();
		this.drawLegend();
	}

	initPlot() {
		super.initPlot();

		this.originalSvg = this.svg;

		this.dimensions["padding"] = 50;
		this.dimensions["height"] = 400;
		this.chartRangeHeight = this.dimensions["height"] - this.dimensions["padding"] * 2;

		this.svg.attr("width", this.dimensions["width"])
				.attr("height", this.dimensions["height"]);

		this.svg = this.svg.append("g")
						   .attr("transform",
					  		`translate(${this.dimensions['padding']}, 10)`);

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
  						.range(['#e41a1c','#377eb8']);
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

		// Draw Y axis
		this.svg.append("g")
  				.call(d3.axisLeft(this.scaleY));

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
      			.attr("fill", d => this.colour(d["key"]));
	}

	drawLegend() {
      	// Handmade legend
      	this.subgroups.forEach((subgroup, index) => {
	  		this.svg.append("circle")
	  				.attr("cx", this.dimensions["width"] - 70)
	  				.attr("cy",30 * (index + 1))
	  				.attr("r", 6)
	  				.attr("fill-opacity", 0.6)
	  				.attr("class", "legend_piece")
	  				.style("fill", this.colour(subgroup));
  			
  			this.svg.append("text")
  					.attr("x", this.dimensions["width"] - 90)
  					.attr("y", 30 * (index + 1))
  					.text(subgroup)
  					.style("font-size", "15px")
	  				.attr("class", "legend_piece")
  					.attr("alignment-baseline","middle")
  					.attr("text-anchor", "end");
  		});
	}
}