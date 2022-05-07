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

		let slicedData = filteredData.slice(0, 20);

		new DensityPlot(this.targetElementName,
				      filteredData,
				      new DummyAffirmativeAction(),
				      true,
				      0.003,
				      45);

		new StandaloneRunningPlot(this.mapElementName,
								  this.segment,
								  slicedData,
								  toolbar);

		new ResultsTable(this.leaderboardElementName,
						 slicedData);
	}
}