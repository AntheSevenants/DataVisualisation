class CheckboxGenerator {
	constructor(targetElementName, categories, genders, callback) {
		this.targetElement = d3.select(`#${targetElementName}`);

		this.callback = callback;

		this.currentSettings = {};

		Object.keys(genders).forEach(gender => {
			this.currentSettings[genders[gender]] = categories[Object.keys(categories)[0]];

			let buttonGroup = this.targetElement.append("div")
												.attr("class", "button-group")
												.attr("role", "group")
												.attr("aria-label", "Age selection for gender");

			buttonGroup.append("a")
					  .attr("href", "#")
					  .attr("role", "button")
					  .attr("class", "btn btn-light label-btn")
					  .attr("aria-disabled", "true")
					  .text(gender);

			let radioId = `radio_${gender};`
			Object.keys(categories).forEach((category, index) => {
				let buttonId = `btn_${gender}_${index}`;
				buttonGroup.append("input")
						   .attr("type", "radio")
						   .attr("class", "btn-check")
						   .attr("name", radioId)
						   .attr("id", buttonId)
						   .attr("autocomplete", "off")
						   .attr("checked", index == 0 ? "yes" : null)
						   .attr("value", categories[category])
						   .on("click", () => this.onClick(genders[gender], categories[category]));

				buttonGroup.append("label")
						   .attr("class", "btn btn-outline-primary")
						   .attr("for", buttonId)
						   .text(category);
			});
		});
	}

	onClick(gender, categoryValue) {
		this.currentSettings[gender] = categoryValue;
		this.doCallback();
	}

	doCallback() {
		this.callback(this.currentSettings);
	}
}