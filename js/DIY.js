let segments = [ "10804677",
				 "11092875",
				 "13512598",
				 "14025619",
				 "22591068",
				 "2294376",
				 "23778272",
				 "26745458",
				 "8435453",
				 "8565430",
				 "8687556",
				 "900905" ]

let multiplierAffirmativeAction = new MultiplierAffirmativeAction([0.01, 1, 0.01],
														1,
														() => {});

let paceHistogram;
let segmentLoader = new SegmentLoader2(segments, (data) => {
	paceHistogram = new Histogram("pacePlot", data["all"]["efforts"], multiplierAffirmativeAction);
});