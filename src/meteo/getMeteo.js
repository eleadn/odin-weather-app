import Wttr from "../API/wttr";
import Meteo from "./meteo";

export default async function getMeteo(parameters) {
	let api = new Wttr(parameters.location);

	const meteo = await api.getMeteo();
	return new Meteo(meteo, parameters.unitGroup);
}
