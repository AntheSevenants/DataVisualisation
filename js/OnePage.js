files = [ d3.csv("data/strava-leaderboard-segment_finse_piste_heverlee.csv"),
		  d3.json("data/segment_900905.json") ,
		  d3.csv("data/timeofday.csv"),
		  d3.csv("data/weekday.csv"),
		  d3.csv("data/temperature.csv") ];

Promise.all(files).then((promiseData) => {
	let data = promiseData[0];
	let segment = promiseData[1];
	let timeOfDayData = promiseData[2];
	let weekdayData = promiseData[3];
	let temperatureData = promiseData[4];

	data.sort(Helpers.timeSort);

	new DensityPlot("chartOriginalHistogram",
				  data,
				  new DummyAffirmativeAction(),
				  true);

	let sample = Helpers.sample(data);
	sample.sort(Helpers.timeSort);

	new NewFullRunningPlot("chartGeoRunningOriginal",
						   "leaderboardOriginal",
					   	   segment,
					   	   sample.slice(0, 20));

	new NewFullRunningPlot("chartGeoRunningOriginalRepeat",
						   "leaderboardOriginalRepeat",
					   	   segment,
					   	   sample.slice(0, 20));

	new CheckboxHistogramMap("chartAgeGroupHistogram",
							 "ageGroupPicker",
							 "chartGeoRunningAgeGroups",
							 "leaderboardAgeGroups",
							 Constants.ageCategories,
							 Constants.genders,
							 segment,
							 data);

	new AffirmativeActionPlot("chartAffirmativeActionHistogram",
							  "chartGeoRunningAffirmativeAction",
							  "leaderboardAffirmativeAction",
							  segment,
							  data);

	new SplitEstimator("splitEstimator", { "men": { "display": "Men",
													"distribution": 75 },
										   "women": { "display": "Women",
										   			  "distribution": 25 } });

	new DragDropPlot("dragDropPlot", "dragDropGoals",
					 [ "enjoyment", "competence", "vitality",
					   "fitness", "social", "appearance" ],
					 { "Men": [ "vitality", "appearance", "social" ] ,
					   "Women": [ "competence", "enjoyment", "fitness" ] });

	new GroupedBarChart("chartTimeOfDayPlot",
						timeOfDayData, true);

	new GroupedBarChart("chartWeekdayPlot",
						weekdayData);

	new GroupedBarChart("chartTemperatureBarPlot",
						temperatureData, true);
});