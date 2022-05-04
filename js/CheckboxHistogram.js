class CheckboxHistogram {
	constructor(targetElementName, checkboxElementName, categories, genders, data) {
		this.data = data;
		this.targetElementName = targetElementName;

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

			console.log(filteredData);
			});

		console.log(filteredData);

		new DensityPlot(this.targetElementName,
				      filteredData,
				      new DummyAffirmativeAction(),
				      true,
				      0.003,
				      45);
	}
}