let efforts = [ { "time": 31 },
				{ "time": 33 },
				{ "time": 36 },
				{ "time": 38 },
				{ "time": 41 },
				{ "time": 42 } ];

let linearRunningPlot = new LinearRunningPlot("linearRunningPlot",
											  240,
											  efforts,
											  3);

let resultsTable = new ResultsTable("resultsTable", efforts);

let linearRunningPlotTable = new LinearRunningPlotTable("linearRunningPlotTable",
											  240,
											  efforts,
											  3);