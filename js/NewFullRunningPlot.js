class NewFullRunningPlot {
	constructor(runningPlotName, leaderboardName, segment, efforts) {
		new StandaloneRunningPlot(runningPlotName,
								  segment,
								  efforts,
								  false,
								  5);

		new ResultsTable(leaderboardName,
						 efforts);
	}
}