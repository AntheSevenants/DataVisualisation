class MultiplierAffirmativeAction extends AffirmativeAction {
	constructor(range, defaultValue, callback) {
		super("multiplier", range, defaultValue, callback);

		this.valueFunction = (value) => value * this.variable;
		this.formatFunction = () => `x${this.variable}`;
	}
}