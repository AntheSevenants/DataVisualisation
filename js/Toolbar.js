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
											   .html(content)
											   .attr("class", className)
											   .on("click", onClickEvent);
	}

	registerText(name, default_value) {
		this.elements[name] = this.targetElement.append("div")
												.style("width", "3em")
												.text(default_value);
	}

	registerSlider(name, range, default_value, onChangeEvent, reverseSlider=false) {
		this.elements[name] = this.targetElement.append("input")
												.attr("type", "range")
												.attr("min", range[0].toString())
												.attr("max", range[1].toString())
												.attr("step", range[2].toString())
												.attr("value", default_value)
												.style("direction", reverseSlider ? "rtl" : "ltr")
												.on("change", onChangeEvent);
	}
}