class SegmentLoader {
	constructor(plotElementName, segments) {
		this.plotElement = d3.select(`#${plotElementName}`);

		for (let i = 0; i < segments.length; i++) {
			let segmentId = segments[i];

			Promise.all([
			    d3.json(`data/segment_${segmentId}.json`),
			    d3.csv(`data/segment_${segmentId}.csv`),
			]).then((files) => {
				let segmentDivName = `${plotElementName}_${segmentId}`;

				let plotDiv = this.plotElement.append("div")
											  .attr("id", segmentDivName);

				let plot = new FullRunningPlot(segmentDivName,
									files[0],
									files[1].slice(0, 25));
			}).catch((err) => {
			    console.log(err);
			});
		}
	}
}