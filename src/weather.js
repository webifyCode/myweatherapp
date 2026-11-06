import iconDrizzle from "./assets/images/icon-drizzle.webp";
import iconFog from "./assets/images/icon-fog.webp";
import iconOvercast from "./assets/images/icon-overcast.webp";
import iconPartlyCloudy from "./assets/images/icon-partly-cloudy.webp";
import iconRain from "./assets/images/icon-rain.webp";
import iconSnow from "./assets/images/icon-snow.webp";
import iconStorm from "./assets/images/icon-storm.webp";
import iconSunny from "./assets/images/icon-sunny.webp";

// Maps a WMO weather code (as returned by Open-Meteo) to an icon.
export function getWeatherIcon(code) {
  switch (code) {
    case 1:
    case 2:
      return iconPartlyCloudy;
    case 3:
      return iconOvercast;
    case 45:
    case 48:
      return iconFog;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return iconDrizzle;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return iconRain;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return iconSnow;
    case 95:
    case 96:
    case 99:
      return iconStorm;
    default:
      return iconSunny;
  }
}
