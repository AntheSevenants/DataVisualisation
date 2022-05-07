class ResultsTable {
	constructor(targetElementName, efforts) {
		// Find the target element in the DOM
		this.targetElement = d3.select(`#${targetElementName}`);

		this.targetElement.html("");

		// Arary for efforts for this segment
		this.efforts = efforts;

		this.initTable();
	}

	initTable() {
		console.log(this.targetElement);

		let dataTableColumns = [ "#", "Time" ];
		let dataTableRows = this.efforts.map((effort, index) => 
			([ index + 1,
			   d3.timeFormat("%M:%S")(Helpers.secondsToDate(+effort["time"])) ]));
		let dataTableGender = this.efforts.map((effort, index) => effort["gender"]);

		console.log(dataTableGender);

		// Add the table to the target element
		this.table = this.targetElement.append("table")
									   .attr("class", "table");

		// Prepare the headings
		this.table.append("thead")
				  .append("tr")
				  .selectAll("th")
				  .data(dataTableColumns)
				  .enter()
				  .append("th")
				  .attr("scope", "col")
				  .text(column => column);

		// Create the necessary table row for each entry
		let rows = this.table.append("tbody")
							 .selectAll("tr")
							 .data(dataTableRows)
							 .enter()
							 .append("tr")
							 .classed("female", (values, index) => dataTableGender[index] == "F");

		// Fill the rows with data
		rows.selectAll("td")
			.data((value, index) => { return value; })
			.enter()
			.append("td")
			.classed("bold", (value, index) => index == 0)
			//.attr("data-th", row => row["name"])
			.text(value => value);
	}
}