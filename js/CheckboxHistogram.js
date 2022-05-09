class CheckboxHistogramMap {
	constructor(targetElementName,
				checkboxElementName,
				mapElementName,
				leaderboardElementName,
				categories,
				genders,
				segment,
				data) {

		this.segment = segment;
		this.data = data;
		this.targetElementName = targetElementName;

		this.mapElementName = mapElementName;
		this.leaderboardElementName = leaderboardElementName;

		this.densityPlot = null;
		this.standaloneRunningPlot = null;

		let onCheckboxChange = this.onCheckboxChange.bind(this);

		let checkboxGenerator = new CheckboxGenerator(checkboxElementName,
							  						  categories,
							    					  genders,
							  						  onCheckboxChange);

		checkboxGenerator.doCallback();
	}

	onCheckboxChange(settings) {
		let filteredData = [];

		Object.keys(settings).forEach(gender => {
			console.log(gender, settings[gender]);

			filteredData = filteredData.concat(this.data.filter(row => {
				return row["gender"] == gender && row["age_category"] == settings[gender]; }));
			});

		let sample = Helpers.sample(filteredData);
		sample.sort(Helpers.timeSort);
		let slicedData = sample.slice(0, 20);

		if (this.densityPlot == null) {
			this.densityPlot = new DensityPlot(this.targetElementName,
					     					   filteredData,
					     					   new DummyAffirmativeAction(),
					     					   true,
					     					   0.003,
					     					   45);
		} else {
			this.densityPlot.initData(filteredData);
			this.densityPlot.updatePlot();
		}

		if (this.standaloneRunningPlot == null) {
			this.standaloneRunningPlot = new StandaloneRunningPlot(this.mapElementName,
																   this.segment,
																   slicedData,
																   toolbar);
		} else {
			this.standaloneRunningPlot.initData(slicedData);
		}

		new ResultsTable(this.leaderboardElementName,
						 slicedData);
	}
}