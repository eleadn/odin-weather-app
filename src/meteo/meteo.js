import { format } from "date-fns";

export default class Meteo {
	constructor(meteoStruct, unitGroup) {
		this.meteoStruct = meteoStruct;
		this.unitGroup = unitGroup;
	}

	getDay(datetime) {
		const date = format(datetime, "yyyy-MM-dd");
		return this.meteoStruct.weather.find((day) => day.date === date);
	}

	getHour(datetime) {
		const day = this.getDay(datetime);
		const index = Math.floor(datetime.getHours() / 3);
		return day.hourly[index];
	}

	getTemperature(datetime) {
		const hour = this.getHour(datetime);
		return this.unitGroup === "us" ? hour.tempF : hour.tempC;
	}

	getMaxTemperature(datetime) {
		const day = this.getDay(datetime);
		return this.unitGroup === "us" ? day.maxtempF : day.maxtempC;
	}

	getMinTemperature(datetime) {
		const day = this.getDay(datetime);
		return this.unitGroup === "us" ? day.mintempF : day.mintempC;
	}
}
