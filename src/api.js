// Single place for every Open-Meteo request the app makes.

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

export const UNIT_PRESETS = {
  metric: { temperature: "celsius", windSpeed: "kmh", precipitation: "mm" },
  imperial: { temperature: "fahrenheit", windSpeed: "mph", precipitation: "inch" },
};

export function buildForecastUrl(lat, lon, units) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    daily: "temperature_2m_min,temperature_2m_max,weather_code",
    hourly: "temperature_2m,weather_code",
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code",
    temperature_unit: units.temperature,
    windspeed_unit: units.windSpeed,
    precipitation_unit: units.precipitation,
    timezone: "auto",
  });
  return `${FORECAST_URL}?${params}`;
}

async function getJson(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  return res.json();
}

export function fetchForecast(lat, lon, units, signal) {
  return getJson(buildForecastUrl(lat, lon, units), signal);
}

// Resolves to an array of places (empty when nothing matches).
export async function searchPlaces(name, signal) {
  const params = new URLSearchParams({
    name,
    count: "10",
    language: "en",
    format: "json",
  });
  const data = await getJson(`${GEOCODING_URL}?${params}`, signal);
  return data.results ?? [];
}
