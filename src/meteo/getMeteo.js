import VisualCrossing from "../API/visualCrossing";
import Meteo from "./meteo";

export default async function getMeteo(parameters) {
	let api = new VisualCrossing(parameters.location);
	api.fromDate = parameters.fromDate;
	api.toDate = parameters.toDate;
	api.unitGroup = parameters.unitGroup;
	api.parameters = ["datetime", "tempmax", "tempmin", "temp", "preciptype"];
	api.includes = ["hours", "key"];

	const meteo = await api.getMeteo();
	return new Meteo(meteo);
}
