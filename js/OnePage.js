files = [ d3.csv("data/strava-leaderboard-segment_finse_piste_heverlee.csv"),
		  d3.json("data/segment_900905.json") ];

Promise.all(files).then((promiseData) => {
	let data = promiseData[0];
	let segment = promiseData[1];

	new Histogram("chartOriginalHistogram",
				  data,
				  new DummyAffirmativeAction(),
				  true);

	new NewFullRunningPlot("chartGeoRunningOriginal",
						   "leaderboardOriginal",
					   	   segment,
					   	   data.slice(0, 25));
});