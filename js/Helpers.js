class Helpers {
	static zIndexFromIndex(index) {
		return 1000 - index;
	}

	static secondsToDate(seconds) {
		// Create a timezone-free epoch
		let date = new Date(Date.UTC(1970, 0, 1, 0, 0, seconds));
    	//date.setUTCSeconds(seconds);
    	return date;
	}

	static timeSort(a,b) {
		return +a["time"] - +b["time"]
	}
}