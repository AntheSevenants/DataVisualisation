class NewFullRunningPlot {
	constructor(runningPlotName, leaderboardName, segment, efforts) {
		new StandaloneRunningPlot(runningPlotName,
								  segment,
								  efforts,
								  toolbar);

		new ResultsTable(leaderboardName,
						 efforts);
	}
}