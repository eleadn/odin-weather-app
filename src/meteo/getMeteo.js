import VisualCrossing from "../API/visualCrossing";

export default async function getMeteo(key, parameters) {
	let api = new VisualCrossing(key, parameters.location);
	api.fromDate = parameters.fromDate;
	api.toDate = parameters.toDate;
	api.unitGroup = parameters.unitGroup;
	api.parameters = ["datetime", "tempmax", "tempmin", "temp", "preciptype"];
	api.includes = ["hours", "key"];

	return await api.getMeteo();
}
