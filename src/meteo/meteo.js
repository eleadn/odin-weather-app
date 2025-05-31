import { parse } from "date-fns";

export default class Meteo {
	constructor(meteoStruct) {
		this.meteoStruct = meteoStruct;
	}

	getDay(datetime) {
		const date = parse(datetime, "yyyy-MM-dd");
		return this.meteoStruct.days.find((day) => day.datetime === date);
	}

	getHour(datetime) {}

	getTemperature(datetime) {}
}
