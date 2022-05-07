class NewFullRunningPlot {
	constructor(runningPlotName, leaderboardName, segment, efforts) {
		new StandaloneRunningPlot(runningPlotName,
								  segment,
								  efforts,
								  false);

		new ResultsTable(leaderboardName,
						 efforts);
	}
}