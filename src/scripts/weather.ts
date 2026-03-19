// Open-Meteo Weather API - Lima, Peru
// No API key required

const LIMA_LAT = -12.0464;
const LIMA_LON = -77.0428;

const WMO_CODES: Record<number, { description: string; icon: string }> = {
  0:  { description: 'Clear Sky',        icon: '☀️' },
  1:  { description: 'Mainly Clear',     icon: '🌤️' },
  2:  { description: 'Partly Cloudy',    icon: '⛅' },
  3:  { description: 'Overcast',         icon: '☁️' },
  45: { description: 'Foggy',            icon: '🌫️' },
  48: { description: 'Icy Fog',          icon: '🌫️' },
  51: { description: 'Light Drizzle',    icon: '🌦️' },
  53: { description: 'Drizzle',          icon: '🌧️' },
  55: { description: 'Heavy Drizzle',    icon: '🌧️' },
  61: { description: 'Light Rain',       icon: '🌧️' },
  63: { description: 'Rain',             icon: '🌧️' },
  65: { description: 'Heavy Rain',       icon: '🌧️' },
  71: { description: 'Light Snow',       icon: '🌨️' },
  73: { description: 'Snow',             icon: '❄️' },
  75: { description: 'Heavy Snow',       icon: '❄️' },
  80: { description: 'Rain Showers',     icon: '🌦️' },
  81: { description: 'Rain Showers',     icon: '🌧️' },
  82: { description: 'Violent Showers',  icon: '⛈️' },
  95: { description: 'Thunderstorm',     icon: '⛈️' },
  96: { description: 'Thunderstorm',     icon: '⛈️' },
  99: { description: 'Thunderstorm',     icon: '⛈️' },
};

function getWeatherInfo(code: number) {
  // Find closest matching code
  if (WMO_CODES[code]) return WMO_CODES[code];
  // Fallback for codes not mapped
  return { description: 'Cloudy', icon: '☁️' };
}

async function fetchWeather() {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${LIMA_LAT}&longitude=${LIMA_LON}` +
    `&current=temperature_2m,weathercode&temperature_unit=celsius&timezone=America%2FLima`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
  return response.json();
}

export async function initWeather() {
  const tempEl        = document.getElementById('weather-temp');
  const descEl        = document.getElementById('weather-desc');
  const iconEl        = document.getElementById('weather-icon');

  if (!tempEl || !descEl) return;

  try {
    const data  = await fetchWeather();
    const temp  = Math.round(data.current.temperature_2m);
    const info  = getWeatherInfo(data.current.weathercode);

    tempEl.textContent = `${temp}°`;
    descEl.textContent = info.description;
    if (iconEl) iconEl.textContent = info.icon;
  } catch (err) {
    console.error('Error fetching weather:', err);
    // Keep static fallback values already rendered
  }
}
