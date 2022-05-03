d3.csv("data/strava-leaderboard-segment_finse_piste_heverlee.csv").then((data) => {
	new Histogram("chartOriginalHistogram",
				  data,
				  new DummyAffirmativeAction(),
				  true);
});