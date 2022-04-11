class Toolbar {
	constructor(targetElement) {
		// Where is the toolbar located?
		this.targetElement = targetElement;
		this.buttons = {};
	}

	registerButton(name, content, className, onClickEvent) {
		console.log(this.targetElement);

		this.buttons[name] = this.targetElement.append("button")
											   .attr("id", name)
											   .text(content)
											   .attr("class", className)
											   .on("click", onClickEvent);
	}
}