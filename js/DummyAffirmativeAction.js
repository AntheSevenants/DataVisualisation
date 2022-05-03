class DummyAffirmativeAction extends AffirmativeAction {
	constructor() {
		super("constant", null, null, null);

		this.valueFunction = (value) => value;
		this.formatFunction = null;
	}
}