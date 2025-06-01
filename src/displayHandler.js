import CurrentDayDisplayer from "./displayer/currentDayDisplayer";

export default class DisplayHandler {
	#meteo;
	#currentDayDisplayer;

	constructor(meteo) {
		this.#meteo = meteo;

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
	}

	display() {
		this.#currentDayDisplayer.show(this.#meteo);
	}
}
