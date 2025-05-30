export default class MeteoParameters {
	constructor(
		location,
		fromDate = Date.now(),
		toDate = null,
		unitGroup = "metric"
	) {
		this.location = location;
		this.fromDate = fromDate;
		this.toDate = toDate;
		this.unitGroup = unitGroup;
	}
}
