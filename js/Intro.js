d3.csv("data/strava-leaderboard-segment_finse_piste_heverlee.csv").then((data) => {
		let processedData = {
			"January": 0,
			"February": 0,
			"March": 0,
			"April": 0,
			"May": 0,
			"June": 0,
			"July": 0,
			"August": 0,
			"September": 0,
			"October": 0,
			"November": 0,
			"December": 0
		};

		data.forEach(row => {
			let date = new Date(row["date"]);
			let months = ["January","February","March","April","May",
					  	  "June","July", "August","September",
					  	  "October","November","December"];

			let month = months[date.getMonth()];

			processedData[month] += 1;
		});

		let processedDataList = [];

		Object.keys(processedData).forEach(month =>
			processedDataList.push({"label": month,
									"value": processedData[month]}));

	new BarChart("monthRun", processedDataList);
});