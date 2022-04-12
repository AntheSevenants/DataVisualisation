class SegmentLoader2 {
	constructor(segments, callback) {
		this.segments = segments;

		let files = []
		let data = {};

		for (let i = 0; i < segments.length; i++)
		{
			let segmentId = segments[i];

			data[segmentId] = { "segment": null,
								"efforts": null,
								"segmentIndex": i,
								"effortsIndex": i*2 + 1 };

			files.push(d3.json(`data/segment_${segmentId}.json`));
			files.push(d3.csv(`data/segment_${segmentId}.csv`));
		}

		Promise.all(files).then((files) => {
			data["all"] = { "efforts": [] };

			for (let i = 0; i < segments.length; i++)
			{
				let segmentId = segments[i];
				data[segmentId]["segment"] = files[data[segmentId]["segmentIndex"]];
				data[segmentId]["efforts"] = files[data[segmentId]["effortsIndex"]];

				data["all"]["efforts"] = data["all"]["efforts"].concat(data[segmentId]["efforts"]);
			}

			callback(data);
		}).catch((err) => {
			    console.log(err);
		});
	}
}