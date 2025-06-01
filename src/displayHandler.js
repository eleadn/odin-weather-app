import CurrentDayDisplayer from "./displayer/currentDayDisplayer";

export default class DisplayHandler {
	#meteo;
	#currentDatetime;
	#currentDayDisplayer;

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
		this.#currentDayDisplayer.show();
	}

	updateMeteo(meteo) {
		this.#meteo = meteo;
		this.#currentDatetime = new Date(Date.now());
		this.display();
	}

	display() {
		this.#currentDayDisplayer.show(this.#meteo, this.#currentDatetime);
	}
}
