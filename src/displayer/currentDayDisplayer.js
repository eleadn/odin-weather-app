import { format } from "date-fns";
import DisplayerBase from "./displayerBase";

export default class CurrentDayDisplayer extends DisplayerBase {
	constructor(container) {
		super(container);
	}

	#showLocation(meteo) {
		const location = document.createElement("input");
		location.setAttribute("name", "location");
		location.setAttribute("placeholder", "location");
		location.setAttribute("type", "text");
		if (meteo === null) {
			location.toggleAttribute("readonly", true);
		} else {
			location.textContent = meteo.getLocation();
		}

		this._container.appendChild(location);
	}

	#showCurrentDate(datetime) {
		const currentDate = document.createElement("div");
		currentDate.classList.add("current-date");

		const currentDay = document.createElement("span");
		currentDay.classList.add("current-day");

		const dateHourSep = document.createElement("span");
		dateHourSep.textContent = " - ";

		const currentHour = document.createElement("span");
		currentHour.classList.add("current-hour");

		if (datetime === null) {
			currentDay.textContent = "#";
			currentHour.textContent = "#";
		} else {
			currentDay.textContent = format(datetime, "dd-MM-yyyy");
			currentHour.textContent = `${format(datetime, "hh")}h`;
		}

		currentDate.appendChild(currentDay);
		currentDate.appendChild(dateHourSep);
		currentDate.appendChild(currentHour);

		this._container.appendChild(currentDate);
	}

	#showCurrentTemperature(meteo, datetime) {
		const currentTemp = document.createElement("h1");
		currentTemp.classList.add("current-temp");

		const currentTempValue = document.createElement("span");
		currentTempValue.classList.add("current-temp-value");

		const tempUnitSep = document.createElement("span");
		tempUnitSep.textContent = "°";

		const unit = document.createElement("span");
		unit.classList.add("current-unit");

		if (meteo === null) {
			currentTempValue.textContent = "#";
			unit.textContent = "#";
		} else {
			currentTempValue.textContent = meteo.getTemperature(datetime);
			unit.textContent = meteo.getTemperatureUnit();
		}

		currentTemp.appendChild(currentTempValue);
		currentTemp.appendChild(tempUnitSep);
		currentTemp.appendChild(unit);

		this._container.appendChild(currentTemp);
	}

	#showCurrentInfos(meteo, datetime) {
		const currentInfos = document.createElement("div");
		currentInfos.classList.add("current-infos");

		const currentMeteo = document.createElement("span");
		currentMeteo.classList.add("current-meteo");

		const meteoMaxSep = document.createElement("span");
		meteoMaxSep.textContent = " - ";

		const currentMax = document.createElement("span");
		currentMax.classList.add("current-max");

		const maxMinSep = document.createElement("span");
		maxMinSep.textContent = " / ";

		const currentMin = document.createElement("span");
		currentMin.classList.add("current-min");

		if (meteo === null) {
			currentMeteo.textContent = "#";
			currentMax.textContent = "#";
			currentMin.textContent = "#";
		} else {
			currentMeteo.textContent = meteo.getMeteo(datetime);
			currentMax.textContent = meteo.getMaxTemperature(datetime);
			currentMin.textContent = meteo.getMinTemperature(datetime);
		}

		currentInfos.appendChild(currentMeteo);
		currentInfos.appendChild(meteoMaxSep);
		currentInfos.appendChild(currentMax);
		currentInfos.appendChild(maxMinSep);
		currentInfos.appendChild(currentMin);

		this._container.appendChild(currentInfos);
	}

	show(meteo = null, datetime = null) {
		super.show();

		this.#showLocation(meteo);
		this.#showCurrentDate(datetime);
		this.#showCurrentTemperature(meteo, datetime);
		this.#showCurrentInfos(meteo, datetime);
	}
}
