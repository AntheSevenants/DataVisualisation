class DragDropPlot {
	constructor(targetElementName, goalsDivName, goals, categories) {
		// Find the target element in the DOM
		this.targetElement = d3.select(`#${targetElementName}`);
		this.targetElement.attr("class", "DragDropPlot row text-center");

		this.goalsDiv = d3.select(`#${goalsDivName}`);

		this.goals = goals;
		this.categoriesSorted = categories;
		this.categories = Object.keys(categories);

		this.buildColumns();
		this.buildGoals();
	}

	createDragBlockId(goal) {
		return `dragDrop_${goal}`;
	}

	createDragBlock(goal, canDrag=true) {
		let dragBlock = d3.create("div")
						   .attr("class", "goal")
						   .attr("id", this.createDragBlockId(goal))
						   .html(goal);

		this.categories.forEach(category => {
			if (this.categoriesSorted[category].includes(goal)) {
				dragBlock.classed(category, true)
			}
		})

		if (canDrag) {
			dragBlock = dragBlock.attr("draggable", "true")
						   		 .on("dragstart", (event) => { 
						   			this.onDrag(event, goal); });
		}

		return dragBlock.node();
	}

	buildColumns() {
		this.categories.forEach(category => {
			this.targetElement.append("div")
							  .attr("class", `col category ${category}`)
							  .attr("is-category", "true")
							  .on("dragover", (event) => event.preventDefault())
							  .on("drop", (event) => this.onDrop(event, category))
							  .style("background-image", `url(./assets/dnd_${category}.png)`);
							  //.html(category);
		});
	}

	buildGoals() {
		this.goals.forEach((goal, index) => {
			this.goalsDiv.append(() => this.createDragBlock(goal));
		});
	}

	onDrag(event, goal) {
		event.dataTransfer.setData('text/plain', goal);
	}

	onDrop(event, category) {
		event.preventDefault();

		let goal = event.dataTransfer.getData('text/plain');
		let node = document.getElementById(this.createDragBlockId(goal));

		if (d3.select(event.target).attr("is-category") == "true") {
			event.target.appendChild(node);
		}
		//d3.select(event.target).append(() => this.createDragBlock(goal, false));

		event.target.ondrop = "none";
  		event.target.ondragover = "none";
	}
}