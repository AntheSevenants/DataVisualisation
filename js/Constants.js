class Constants {
	static get playIcon () { return "▶"; }
	static get pauseIcon () { return "❚❚"; }
	static get stopIcon () { return "⏹"; }

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