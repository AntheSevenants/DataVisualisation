class BarChart extends ClassicPlot {
	constructor(targetElementName, data) {
		super(targetElementName,
			  "bar",
			  true);
		this.data = data;
		this.maxNum = Math.max(...this.data.map(d => d["value"]));

		this.initPlot();
		this.drawPlot();
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
  				  .range([ 0, this.chartRange ])
  				  .domain(this.data.map((d) => d["label"]))
  				  .padding(0.2);

		this.scaleY = d3.scaleLinear()
  				  .domain([0, this.maxNum])
  				  .range([ this.chartRangeHeight, 0]);
	}

	drawPlot() {
		// Draw X axis
		this.svg.append("g")
  				.attr("transform", "translate(0," + this.chartRangeHeight + ")")
  				.call(d3.axisBottom(this.scaleX))
  				.selectAll("text")
    			.attr("transform", "translate(-10,0)rotate(-45)")
    			.style("text-anchor", "end");

		// Draw Y axis
		this.svg.append("g")
  				.call(d3.axisLeft(this.scaleY));

		// Draw bars
		this.svg.selectAll("mybar")
  				.data(this.data)
  				.enter()
  				.append("rect")
    			.attr("x", (d) => this.scaleX(d["label"]))
    			.attr("y", (d) => this.scaleY(d["value"]))
    			.attr("width", this.scaleX.bandwidth())
    			.attr("height", (d) => this.chartRangeHeight - this.scaleY(d["value"]))
    			.attr("fill", "#69b3a2");
	}
}