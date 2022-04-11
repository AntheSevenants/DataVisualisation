class LatLongInterpolator {
	constructor(latlongs) {
		this.latlongs = latlongs;
	}

	interpolate(jumpConstant=0.00002) {
		let newLatlongs = [];

		for (let i = 0; i < this.latlongs.length; i++) {
			let currentCoordinate = this.latlongs[i];

			if (i == this.latlongs.length - 1) {
				// End
				newLatlongs.push(currentCoordinate);
				continue
			}
			
			let nextCoordinate = this.latlongs[i + 1];


			let x_jumps = Math.floor((currentCoordinate[0] - nextCoordinate[0]) / jumpConstant);
			let y_jumps = Math.floor((currentCoordinate[1] - nextCoordinate[1]) / jumpConstant);

			let jumps = Math.max(Math.abs(x_jumps), Math.abs(y_jumps));

			let interpolator_x = d3.interpolate(currentCoordinate[0], nextCoordinate[0]);
			let interpolator_y = d3.interpolate(currentCoordinate[1], nextCoordinate[1]);

			for (let jump = 1; jump <= jumps; jump++) {

				let x_new = interpolator_x((1 / jumps) * jump);
				let y_new = interpolator_y((1 / jumps) * jump);

				newLatlongs.push([x_new, y_new]);
			}
		}

		return newLatlongs;
	}
}