class ConstantAffirmativeAction extends AffirmativeAction {
	constructor(range, defaultValue, callback) {
		super("constant", range, defaultValue, callback);

		this.valueFunction = (value) => value - this.variable;
		this.formatFunction = () => { let date = Helpers.secondsToDate(this.variable);
									  let formatted = d3.timeFormat("%M:%S")(date);
									  return `-${formatted}`; };

		this.reverseSlider = true;
	}
}