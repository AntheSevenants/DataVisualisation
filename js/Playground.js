let efforts = [ { "time": 31 },
				{ "time": 33 },
				{ "time": 36 },
				{ "time": 38 },
				{ "time": 41 },
				{ "time": 42 } ];

let map;
d3.json("data/segment_11092875.json").then(segment => {
	map = new FullRunningPlot("fullRunningPlot", segment, efforts);
});