# Weather App (React + Vite)

A responsive weather app built with React and Vite. Search for any place in the world and see its current conditions, an hourly forecast and a daily forecast, with a switch between metric and imperial units. Weather and geocoding data come from the free [Open-Meteo](https://open-meteo.com/) APIs, so no API key is needed.

Live demo: [webifyCode.github.io/myweatherapp](https://webifyCode.github.io/myweatherapp)

## Tech Stack

- [React 19](https://react.dev/) is the UI library. It uses function components and hooks (`useState`, `useEffect`) with `StrictMode` enabled.
- [Vite 7](https://vite.dev/) is the dev server and bundler, with HMR.
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh.
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs) provides current, hourly and daily weather data.
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) powers the place search and autocomplete.
- Plain CSS (`src/index.css`) handles styling, with self-hosted fonts (Bricolage Grotesque for headings, DM Sans for body text) loaded through `@font-face`.
- [ESLint 9](https://eslint.org/) with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` handles linting.
- [GitHub Pages](https://pages.github.com/) hosts the app (see `homepage` in `package.json`).

## Getting Started

```bash
npm install
npm run dev        # start the dev server
npm run build      # production build
npm run preview    # preview the production build
npm run lint       # run ESLint
```

## Project Structure

```
.github/workflows/
└── deploy.yml                # lint, build and deploy to GitHub Pages on push to main
src/
├── main.jsx                  # entry point, mounts <App /> in StrictMode
├── App.jsx                   # root component: owns all state and the main forecast fetch
├── api.js                    # all Open-Meteo requests (forecast URL builder, geocoding, unit presets)
├── weather.js                # maps WMO weather codes to icons
├── index.css                 # global styles, fonts and responsive rules
├── components/
│   ├── Header.jsx            # logo and units dropdown (metric/imperial, per-unit options)
│   ├── Main.jsx              # page layout; composes search and forecast sections
│   ├── Search.jsx            # debounced place search and suggestion list
│   ├── Today.jsx             # current conditions card
│   ├── HourlyForecast.jsx    # hourly list with a day selector
│   ├── DailyForecast.jsx     # daily min/max forecast cards
│   └── Error.jsx             # API error screen with retry
└── assets/
    ├── images/               # weather icons (.webp) and UI icons (.svg)
    ├── fonts/                # Bricolage Grotesque and DM Sans
    └── data.json             # sample geocoding response (not used at runtime)
```

## Architecture Decisions

### Single-page, client-only app
There is no backend. The browser calls the Open-Meteo APIs directly, which keeps deployment to static files and removes the need to store or hide API keys, since Open-Meteo is free and keyless.

### State lifted to `App`
All shared state lives in `App.jsx`: the weather response, search query, suggestion matches, selected location, unit system, per-unit settings, display values, loading flag and error flag. It is passed down as props to `Header` and `Main`. For an app this size that is simpler than Context or a state library, and it gives one place to read the data flow. The trade-off is some prop drilling, which would be the first thing to replace (with Context or a reducer) if the app grows.

### Component composition
The UI is split by responsibility: `Header` (settings), `Search` (input), `Today`, `HourlyForecast` and `DailyForecast` (display) and `Error` (failure state). `Main` only arranges the layout. The display components are mostly presentational and derive what they render from `weatherData`.

### Data flow
1. The user types in `Search`. After a 300 ms pause it calls the Geocoding API and shows up to 10 matches.
2. Picking a match sets `location` (name, country, lat, lon) in `App`.
3. A `useEffect` in `App` watches `location` and `unitSystem`, and fetches `/v1/forecast` with `current`, `hourly` and `daily` variables and `timezone=auto`.
4. The response is stored in `weatherData`, and the display components re-render from it.

### Centralised API layer
`src/api.js` is the only file that talks to Open-Meteo. It builds query strings with `URLSearchParams` (so user input is always encoded), checks `res.ok`, and exposes `fetchForecast` and `searchPlaces`. Both accept an `AbortSignal`.

### Debounced, cancellable requests
Search input is debounced, and every effect that fetches data aborts its in-flight request on cleanup. This prevents request floods while typing and stops a slow, older response from overwriting a newer one.

### Unit handling
The unit system (metric or imperial) maps to Open-Meteo's `temperature_unit`, `windspeed_unit` and `precipitation_unit` query parameters, so conversion happens server-side and no unit math is done in the client. Individual units (for example °C with mph) can also be mixed from the dropdown. `Header` re-requests the forecast with the chosen units and stores the rounded results in `values`, which the display components prefer over the raw response when set.

### Weather code to icon mapping
Open-Meteo returns [WMO weather codes](https://open-meteo.com/en/docs#weather_variables). `getWeatherIcon` in `src/weather.js` maps these codes to one of a small set of icons (sunny, partly cloudy, overcast, fog, drizzle, rain, snow, storm), defaulting to sunny. It is shared by the current, hourly and daily views.

### Error handling
Failed requests set a single `serverError` flag. A search with no matches shows an inline "No results found" message instead. `App` then renders the `Error` screen in place of the main view, and its Retry button resets the search, location and weather state. A `loading` flag drives a loading state on the current-conditions card.

### Styling
Plain global CSS was chosen over a CSS framework or CSS-in-JS to avoid extra dependencies. The layout is responsive, and fonts are self-hosted to avoid a third-party font request. Shared press and focus effects are applied through `mouseDown` and `mouseUp` handlers that toggle CSS classes.

### Tooling
Vite was chosen over Create React App for fast startup and builds. ESLint uses the flat config with React Hooks rules to catch hook misuse early.

## Deployment

The app is deployed to GitHub Pages by `.github/workflows/deploy.yml`. On every push to `main` it runs `npm ci`, `npm run lint` and `npm run build`, then publishes `dist`. No extra deployment dependency is needed.

One-time setup: in the GitHub repo go to **Settings → Pages** and set **Source** to **GitHub Actions**.

`vite.config.js` sets `base: '/myweatherapp/'` so assets resolve under the GitHub Pages sub-path. If you rename the repo or host elsewhere, update `base` (use `'/'` for a root domain) and `homepage` in `package.json`.

## Future Improvements

- Replace prop drilling with Context or a reducer if the app grows.
- Add tests (for example Vitest and React Testing Library) and consider TypeScript.
- Try the [React Compiler](https://react.dev/learn/react-compiler/installation). It is not enabled because of its impact on dev and build performance.
