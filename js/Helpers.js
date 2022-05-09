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

	static sampleDeep(arr, n) {
		var rng = new Math.seedrandom("jefke");

    	var result = new Array(n),
    	    len = arr.length,
    	    taken = new Array(len);
    	if (n > len)
    	    throw new RangeError("getRandom: more elements taken than available");
    	while (n--) {
    	    var x = Math.floor(rng() * len);
    	    result[n] = arr[x in taken ? taken[x] : x];
    	    taken[x] = --len in taken ? taken[len] : len;
    	}
    	return result;
	}

	static sample(arr) {
		let men = arr.filter(row => row["gender"] == "M");
		let women = arr.filter(row => row["gender"] == "F");

		// We can only sample as many as the least number of entries available
		let n = Math.min(men.length, women.length);
		console.log(n);

		let sampledMen = Helpers.sampleDeep(men, n);
		let sampledWomen = Helpers.sampleDeep(women, n);

		return sampledMen.concat(sampledWomen);
	}
}