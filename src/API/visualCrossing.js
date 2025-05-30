export default class VisualCrossing {
	#baseUrl;

	constructor(apiKey, location) {
		this.#baseUrl =
			"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

		this.apiKey = apiKey;
		this.location = location;
		this.fromDate = null;
		this.toDate = null;
		this.unitGroup = null;
		this.elements = [];
		this.includes = [];
	}

	#addToString(string, arg) {
		if (arg !== null) {
			string = `${string}/${arg}`;
		}
		return string;
	}

	#addArrayToString(string, arrName, arr) {
		if (arr.length > 0) {
			string = `${string}&${arrName}=${arr[0]}`;
			for (let i = 1; i < arr.length; ++i) {
				string = `${string}%2C${arr[i]}`;
			}
		}

		return string;
	}

	#buildString() {
		let result = `${this.#baseUrl}/${this.location}`;
		result = this.#addToString(result, this.fromDate);
		result = this.#addToString(result, this.toDate);
		result = this.#addToString(result, unitGroup);
		result = this.#addArrayToString(result, "elements", this.elements);
		result = this.#addArrayToString(result, "include", this.includes);

		return result;
	}

	async getMeteo() {
		const apiString = this.#buildString();
		const response = await fetch(apiString);
		return await response.json();
	}
}
