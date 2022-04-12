class Toolbar {
	constructor(targetElement) {
		// Where is the toolbar located?
		this.targetElement = targetElement;
		this.elements = {}
		this.buttons = this.elements;
	}

	registerButton(name, content, className, onClickEvent) {
		console.log(this.targetElement);

		this.buttons[name] = this.targetElement.append("button")
											   .attr("id", name)
											   .text(content)
											   .attr("class", className)
											   .on("click", onClickEvent);
	}

	registerSlider(name, range, default_value, onChangeEvent) {
		this.elements[name] = this.targetElement.append("input")
												.attr("type", "range")
												.attr("min", range[0].toString())
												.attr("max", range[1].toString())
												.attr("step", range[2].toString())
												.attr("value", default_value)
												.on("change", onChangeEvent);
	}
}