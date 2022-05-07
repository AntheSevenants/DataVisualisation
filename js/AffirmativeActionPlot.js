class AffirmativeActionPlot {
	constructor(targetElementName,
				mapElementName,
				leaderboardElementName,
				segment,
				data) {

		this.segment = segment;
		this.data = data;
		this.targetElementName = targetElementName;

		this.mapElementName = mapElementName;
		this.leaderboardElementName = leaderboardElementName;

		this.standaloneRunningPlot = null;

		this.onSliderEnd(data);
		
		let onSliderEndFunction = this.onSliderEnd.bind(this);

		new DensityPlot(this.targetElementName,
						data,
						new ConstantAffirmativeAction([0, 120, 1],
													 0,
													 onSliderEndFunction),
						false);
	}

	onSliderEnd(data) {
		let slicedData = data.slice(0, 20);

		if (this.standaloneRunningPlot == null) {
			this.standaloneRunningPlot = new StandaloneRunningPlot(this.mapElementName,
																   this.segment,
																   slicedData);
		} else {
			this.standaloneRunningPlot.initData(slicedData);
		}

		new ResultsTable(this.leaderboardElementName,
						 slicedData);
	}
}