import DisplayHandler from "./displayHandler";
import getMeteo from "./meteo/getMeteo";
import MeteoParameters from "./meteo/meteoParameters";
import "./style.css";

const params = new MeteoParameters(
	"Paris",
	"2025-05-26",
	"2025-06-01",
	"metric"
);

const displayHandler = new DisplayHandler(null);
displayHandler.display();

setTimeout(async () => {
	const meteo = await getMeteo(params);
	console.log(meteo.getLocation());
	displayHandler.updateMeteo(meteo);
}, 5000);
