class CssModifier {
	constructor() {
		let stylesheet = document.createElement('style');
		document.head.appendChild(stylesheet);

		this.sheet = stylesheet.sheet;
	}

	insertRule(rule) {
		console.log(rule);
		this.sheet.insertRule(rule, this.sheet.cssRules.length);
	}
}