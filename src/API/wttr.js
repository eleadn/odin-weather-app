export default class Wttr {
	#baseUrl;
	#unitGroup;

	constructor(location) {
		this.#baseUrl = "https://wttr.in";
		this.#unitGroup = null;

		this.location = location;
	}

	get unitGroup() {
		return this.unitGroup;
	}

	set unitGroup(value) {
		if (value === "us") {
			this.#unitGroup = "u";
		} else {
			this.#unitGroup = "m";
		}
	}

	#buildString() {
		let result = `${this.#baseUrl}/${this.location}?format=j1`;
		if (this.#unitGroup !== null) {
			result = `${result}&${this.#unitGroup}`;
		}
		return result;
	}

	async getMeteo() {
		const apiString = this.#buildString();
		const response = await fetch(apiString);
		return await response.json();
	}
}
