import VisualCrossing from "../API/visualCrossing";
import Wttr from "../API/wttr";
import Meteo from "./meteo";

export default async function getMeteo(parameters) {
	let api = new Wttr(parameters.location);
	api.unitGroup = parameters.unitGroup;

	const meteo = await api.getMeteo();
	return new Meteo(meteo);
}
