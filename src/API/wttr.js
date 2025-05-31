export default class Wttr {
	#baseUrl;

	constructor(location) {
		this.#baseUrl = "https://wttr.in";

		this.location = location;
	}

	get unitGroup() {
		return this.unitGroup;
	}

	#buildString() {
		return `${this.#baseUrl}/${this.location}?format=j1`;
	}

	async getMeteo() {
		const apiString = this.#buildString();
		const response = await fetch(apiString);
		return await response.json();
	}
}
