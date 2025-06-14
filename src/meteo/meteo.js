import { format, parse } from "date-fns";

export default class Meteo {
	constructor(meteoStruct, unitGroup) {
		this.meteoStruct = meteoStruct;
		this.unitGroup = unitGroup;
	}

	getDay(datetime) {
		const date = format(datetime, "yyyy-MM-dd");
		let day = this.meteoStruct.weather.find((day) => day.date === date);
		if (day === undefined) {
			day = this.meteoStruct.weather[0];
		}
		return day;
	}

	getHour(datetime) {
		const day = this.getDay(datetime);
		const index = Math.floor(datetime.getHours() / 3);
		return day.hourly[index];
	}

	getDaysLength() {
		return this.meteoStruct.weather.length;
	}

	getHoursLength(datetime) {
		const day = this.getDay(datetime);
		return day.hourly.length;
	}

	getDate(index) {
		const day = this.meteoStruct.weather[index];
		return parse(day.date, "yyyy-MM-dd", new Date());
	}

	getDateHour(index) {
		return index * 3;
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

	getMeteo(datetime) {
		const hour = this.getHour(datetime);
		return hour.weatherDesc[0].value;
	}

	getTemperatureUnit() {
		return this.unitGroup === "us" ? "F" : "C";
	}

	getLocation() {
		const location = this.meteoStruct.nearest_area[0];
		const areaName = location.areaName[0].value;
		const region = location.region[0].value;
		const country = location.country[0].value;
		return `${areaName}, ${region}, ${country}`;
	}
}
