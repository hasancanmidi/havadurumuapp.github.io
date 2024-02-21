import clear_icon from "../../assets/clear.png";
import cloud_icon from "../../assets/cloud.png";
import drizzle_icon from "../../assets/drizzle.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";

const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
        case "01d":
        case "01n":
            return clear_icon;
        case "02d":
        case "02n":
        case "03d":
        case "03n":
            return cloud_icon;
        case "04d":
        case "04n":
            return drizzle_icon;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
            return rain_icon;
        case "13d":
        case "13n":
            return snow_icon;
        default:
            return clear_icon;
    }
};

export default getWeatherIcon;
