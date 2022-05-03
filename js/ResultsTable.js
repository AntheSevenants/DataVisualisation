class ResultsTable {
	constructor(targetElementName, efforts) {
		// Find the target element in the DOM
		this.targetElement = d3.select(`#${targetElementName}`);

		// Arary for efforts for this segment
		this.efforts = efforts;

		this.initTable();
	}

	initTable() {
		console.log(this.targetElement);

		let dataTableColumns = [ "#", "Time" ];
		let dataTableRows = this.efforts.map((effort, index) => 
			([ index + 1, `${effort["time"]}s` ]));

		console.log(dataTableRows);

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
							 .append("tr");

		// Fill the rows with data
		rows.selectAll("td")
			.data((value, index) => { console.log(value, index); return value; })
			.classed("female", row => row["gender"] == "F")
			.enter()
			.append("td")
			.classed("bold", (value, index) => index == 0)
			//.attr("data-th", row => row["name"])
			.text(row => row);
	}
}