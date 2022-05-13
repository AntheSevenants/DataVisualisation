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
												.attr("class", "slidervalue")
												.text(default_value);
	}

	registerSlider(name, range, default_value, onChangeEvent, reverseSlider=false) {
		let sliderContainer = this.targetElement.append("div")
						  .attr("class", "slidercontainer")
		
		let sliderWidth = parseInt(sliderContainer.style("width")) - 20;

		sliderContainer.append("input")
						   .attr("id", "affirmative_slider")
						   .style("width", `${sliderWidth}px`);

		this.elements[name] = new Slider("#affirmative_slider", {
			"ticks": [0, 30, 60, 90, 120],
			"ticks_labels": ["-0'00\"","-0'30\"","-1'00\"","-1'30\"", "-2'00\""],
			"min": range[0].toString(),
			"max": range[1].toString(),
			"step": range[2].toString(),
			"value": default_value,
			"tooltip": "hide",
			"reversed": "true"
		});

		this.elements[name].on("change", onChangeEvent);
	}
}