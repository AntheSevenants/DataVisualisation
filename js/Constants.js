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
}