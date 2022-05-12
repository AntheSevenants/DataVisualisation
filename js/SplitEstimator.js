class SplitEstimator {
	constructor(targetElementName, splitInfo) {
		// Find the target element in the DOM
		this.originalTargetElement = d3.select(`#${targetElementName}`);

		this.targetElement = this.originalTargetElement.append("div")
													   .attr("class", "split estimator");

		this.statusElement = this.originalTargetElement.append("p")
											   		   .attr("class", "lead text-center mt-3")
											   		   .html("Drag the slider to estimate the division of premium memberships between sexes");

		this.splitInfo = splitInfo;
		this.percentageDivs = [];
		this.innerGuesses = [];
		this.innerSplits = [];

		this.buildSplit();
		this.onDrag();
	}

	createDivId(category) {
		return `splitEstimator_${category}`;
	}

	buildSplit() {
		for (let category in this.splitInfo) {
			let innerSplit = this.targetElement.append("div")
							 				   .attr("id", this.createDivId(category))
							  				   .attr("class", `innersplit ${category} text-center`);
			this.innerSplits.push(innerSplit);

			let innerInfo = innerSplit.append("div")
									  .attr("class", "info");

			let innerPercentage = innerInfo.append("p")
					 					   .attr("class", "display-3")
					 					   .html("??%");
			this.percentageDivs.push(innerPercentage);

			/*let innerGuess = innerInfo.append("p")
									  .attr("class", "lead offset")
									  .html("Your guess: 50%");
			this.innerGuesses.push(innerGuess);*/

			innerInfo.append("p")
					 .attr("class", "lead offset")
					 .html(this.splitInfo[category]["display"]);
		}

		let splitDivs = Object.keys(this.splitInfo).map(category => `#${this.createDivId(category)}`);

		this.split = Split(splitDivs, { snapOffset: 0,
										onDragStart: () => { this.onDragStart() },
								  	    onDrag: () => { this.onDrag(); },
								  	    onDragEnd: () => { this.onDragEnd(); } } );
	}

	getSplitSizes() {
		return this.split.getSizes();
	}

	onDragStart() {
		this.statusElement.html("Release the slider to check your guess");
	}

	onDrag() {
		let sizes = this.getSplitSizes();

		sizes.forEach((size, index) => {
			let percentageRound = Math.round(size);
			this.percentageDivs[index].html(`${percentageRound}%`);
		});
	}

	onDragEnd() {
		let userSizes = this.getSplitSizes();
		let realSizes = Object.keys(this.splitInfo).map(category => this.splitInfo[category]["distribution"]);

		this.statusElement.html("Let's see!");
		//let difference = realSizes.map((value, index) => value - userSizes[index]);

		this.innerSplits.forEach(innerSplit => innerSplit.style("transition", "width 1s ease-in-out"));
		this.split.setSizes(realSizes);

		this.targetElement.select(".gutter").style("pointer-events", "none");

		setTimeout(() => { this.onDrag();
						   this.statusElement.html(`Your guesses: ${Math.round(userSizes[0])}%, ${Math.round(userSizes[1])}%`)
 		}, 1000);
	}
}