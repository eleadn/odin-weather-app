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
const meteo = await getMeteo(params);
displayHandler.updateMeteo(meteo);
