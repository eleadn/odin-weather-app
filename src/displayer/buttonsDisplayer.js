import { format } from "date-fns";
import DisplayerBase from "./displayerBase";

export default class ButtonsDisplayer extends DisplayerBase {
	dayClickEvent;
	hourClickEvent;

	constructor(container) {
		super(container);

		this.dayClickEvent = null;
	}

	#displayHoursButtons(container, meteo = null, index = null) {
		const button = document.createElement("button");
		button.dataset.index = index;
		button.addEventListener("click", () => {
			if (button.dataset.index !== null) {
				this._invokeEvent(
					this.hourClickEvent,
					meteo.getDateHour(button.dataset.index)
				);
			}
		});
		if (meteo === null) {
			button.toggleAttribute("disabled", true);
		}

		const hourDisplay = document.createElement("div");

		if (meteo === null) {
			hourDisplay.textContent = "#h";
		} else {
			const hour = meteo.getDateHour(index);
			hourDisplay.textContent = `${hour}h`;
		}

		button.appendChild(hourDisplay);

		container.appendChild(button);
	}

	#displayHours(meteo = null, datetime = null) {
		const hoursContainer = document.createElement("div");
		hoursContainer.id = "hours-display";

		if (meteo === null) {
			this.#displayHoursButtons(hoursContainer);
		} else {
			for (let i = 0; i < meteo.getHoursLength(datetime); ++i) {
				this.#displayHoursButtons(hoursContainer, meteo, i);
			}
		}

		this._container.appendChild(hoursContainer);
	}

	#displayDayButton(container, meteo = null, index = null) {
		const button = document.createElement("button");
		button.dataset.index = index;
		button.addEventListener("click", () => {
			if (button.dataset.index !== null) {
				this._invokeEvent(
					this.dayClickEvent,
					meteo.getDate(button.dataset.index)
				);
			}
		});
		if (meteo === null) {
			button.toggleAttribute("disabled", true);
		}

		const date = document.createElement("div");

		const minMax = document.createElement("div");

		const maxTemp = document.createElement("span");

		const maxTempSep = document.createElement("span");
		maxTempSep.textContent = "°";

		const maxTempUnit = document.createElement("span");

		const minMaxSep = document.createElement("span");
		minMaxSep.textContent = " / ";

		const minTemp = document.createElement("span");

		const minTempSep = document.createElement("span");
		minTempSep.textContent = "°";

		const minTempUnit = document.createElement("span");

		if (meteo === null) {
			date.textContent = "#/#/#";
			maxTemp.textContent = "#";
			maxTempUnit.textContent = "#";
			minTemp.textContent = "#";
			minTempUnit.textContent = "#";
		} else {
			const datetime = meteo.getDate(index);
			date.textContent = format(datetime, "dd/MM/yyyy");
			maxTemp.textContent = meteo.getMaxTemperature(datetime);
			maxTempUnit.textContent = meteo.getTemperatureUnit();
			minTemp.textContent = meteo.getMinTemperature(datetime);
			minTempUnit.textContent = meteo.getTemperatureUnit();
		}

		minMax.appendChild(maxTemp);
		minMax.appendChild(maxTempSep);
		minMax.appendChild(maxTempUnit);
		minMax.appendChild(minMaxSep);
		minMax.appendChild(minTemp);
		minMax.appendChild(minTempSep);
		minMax.appendChild(minTempUnit);

		button.appendChild(date);
		button.appendChild(minMax);

		container.appendChild(button);
	}

	#displayDays(meteo = null) {
		const daysContainer = document.createElement("div");
		daysContainer.id = "days-display";

		if (meteo === null) {
			this.#displayDayButton(daysContainer);
		} else {
			for (let i = 0; i < meteo.getDaysLength(); ++i) {
				this.#displayDayButton(daysContainer, meteo, i);
			}
		}

		this._container.appendChild(daysContainer);
	}

	show(meteo = null, datetime = null) {
		super.show();

		this.#displayDays(meteo);
		this.#displayHours(meteo, datetime);
	}
}
