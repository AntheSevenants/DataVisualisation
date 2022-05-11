class Constants {
	static get playIcon () { return '<i class="bi bi-play-fill"></i>'; }
	static get pauseIcon () { return '<i class="bi bi-pause-fill"></i>'; }
	static get stopIcon () { return '<i class="bi bi-stop-fill"></i>'; }

	static get affirmativeActions () {
		return {
			"multiplier": new MultiplierAffirmativeAction([0.01, 1, 0.01],
														  1,
														  () => {}),
			"constant": new ConstantAffirmativeAction([0, 120, 1],
													  0,
													  () => {})
		}
	}

	static get ageCategories () {
		return { "0-19": "0_19",
				 "20-24": "20_24",
				 "25-34": "25_34",
				 "35-44": "35_44",
				 "45-54": "45_54"/*,
				 "55-64": "55_64",
				 "65-69": "65_69"*/ }
	}

	static get genders () {
		return { "Men": "M",
				 "Women": "F" }
	}

	static get colours () {
		return { "men": "#00108d",
				 "women": "#f2ea66",
				 "shadow": "#434C5E" };
	}
}