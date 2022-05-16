class Helpers {
	static zIndexFromIndex(index, gender) {
		console.log(index);

		if (gender == "M") {
			return 1000 - index;
		} else if (gender == "F") {
			return 2000 - index;
		}
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

	static insertLinebreaks(d) {
    	var el = d3.select(this);
    	var words = d.split('\\n');
    	el.text('');
	
    	for (var i = 0; i < words.length; i++) {
    	    var tspan = el.append('tspan').text(words[i]);
    	    if (i > 0) {
    	        tspan.attr('x', 0).attr('dy', '15');
    	    }
    	}
	}
}