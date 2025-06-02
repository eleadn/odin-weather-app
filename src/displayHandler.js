import ButtonsDisplayer from "./displayer/buttonsDisplayer";
import CurrentDayDisplayer from "./displayer/currentDayDisplayer";
import getMeteo from "./meteo/getMeteo";
import MeteoParameters from "./meteo/meteoParameters";

export default class DisplayHandler {
	#meteo;
	#currentDatetime;
	#currentDayDisplayer;

	#buttonsDisplayer;

	constructor(meteo) {
		this.#meteo = meteo;
		this.#currentDatetime =
			this.#meteo === null ? null : new Date(Date.now());

		const currentDayContainer = document.querySelector(
			"#current-day-display"
		);
		this.#currentDayDisplayer = new CurrentDayDisplayer(
			currentDayContainer
		);
		this.#setCurrentDayEvents();

		const buttonsContainer = document.querySelector("#buttons");
		this.#buttonsDisplayer = new ButtonsDisplayer(buttonsContainer);
		this.#setButtonsEvents();

		this.#currentDayDisplayer.show();
		this.#buttonsDisplayer.show();
	}

	#setCurrentDayEvents() {
		this.#currentDayDisplayer.locationChangedEvent = (location) => {
			this.#onLocationChanged(location);
		};
	}

	#setButtonsEvents() {
		this.#buttonsDisplayer.dayClickEvent = (newDate) => {
			this.#currentDatetime = newDate;
			this.#displayCurrentDay();
		};
	}

	#displayCurrentDay() {
		this.#currentDayDisplayer.show(this.#meteo, this.#currentDatetime);
	}

	async #onLocationChanged(location) {
		const metric = this.#meteo.unitGroup;
		const minDate = this.#meteo.getDate(0);
		const maxDate = this.#meteo.getDate(this.#meteo.getDaysLength() - 1);
		const params = new MeteoParameters(location, minDate, maxDate, metric);
		this.#meteo = await getMeteo(params);
		this.display();
	}

	updateMeteo(meteo) {
		this.#meteo = meteo;
		this.#currentDatetime = new Date(Date.now());
		this.display();
	}

	display() {
		this.#displayCurrentDay();
		this.#buttonsDisplayer.show(this.#meteo, this.#currentDatetime);
	}
}
