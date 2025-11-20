const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface WeatherData {
  temp: number;
  humidity: number;
  description: string;
  rainChance: number;
  windSpeed: number;
}

interface ForecastResponse {
  location: string;
  current: WeatherData;
  forecast: Array<{
    date: string;
    temp_max: number;
    temp_min: number;
    description: string;
  }>;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { lat, lon, location } = await req.json();

    const apiKey = Deno.env.get("OPENWEATHER_API_KEY");
    if (!apiKey) {
      throw new Error("OpenWeather API key not configured");
    }

    if (!lat || !lon) {
      throw new Error("Latitude and longitude required");
    }

    // Fetch current weather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const currentResponse = await fetch(currentWeatherUrl);
    const currentData = await currentResponse.json();

    // Fetch forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    // Process forecast data (get daily forecasts)
    const dailyForecasts = new Map();
    for (const item of forecastData.list.slice(0, 40)) {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyForecasts.has(date)) {
        dailyForecasts.set(date, item);
      }
    }

    const forecast = Array.from(dailyForecasts.values()).slice(0, 5).map((item) => ({
      date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      temp_max: Math.round(item.main.temp_max),
      temp_min: Math.round(item.main.temp_min),
      description: item.weather[0].main,
    }));

    const response: ForecastResponse = {
      location: location || currentData.name,
      current: {
        temp: Math.round(currentData.main.temp),
        humidity: currentData.main.humidity,
        description: currentData.weather[0].main,
        rainChance: currentData.clouds?.all || 0,
        windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
      },
      forecast,
    };

    return new Response(JSON.stringify(response), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch weather" }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
