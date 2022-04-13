class AffirmativeAction {
	constructor(name,
				range,
				defaultValue,
				callback) {
		this.name = name;
		this.valueFunction = null;
		this.formatFunction = null;

		this.variable = defaultValue;
		this.callback = callback;

		this.defaultValue = defaultValue;
		this.range = range;
	}
}