import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useForecast from "@/hooks/useForecast";
import useWeather from "@/hooks/useWeather";
import CurrentWeather from "@/ui/CurrentWeather";
import FavoriteButton from "@/ui/FavoriteButton";
import HourlyTemperature from "@/ui/HourlyTemperature";
import WeatherDetails from "@/ui/WeatherDetails";
import WeatherForecast from "@/ui/WeatherForecast";
import WeatherSkeleton from "@/ui/WeatherSkeleton";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

export default function City() {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const {
    weather,
    isLoading: loadingWeather,
    error: weatherError,
    refetchWeather,
  } = useWeather(coordinates);
  const {
    forecast,
    isLoading: loadingForecast,
    error: forecastError,
    refetchForecast,
  } = useForecast(coordinates);

  if (weatherError || forecastError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weather || !forecast || !params.cityName) return <WeatherSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weather.sys.country}
        </h1>
        <div>
          <FavoriteButton data={{ ...weather, name: params.cityName }} />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          <CurrentWeather data={weather} />
          <HourlyTemperature data={forecast} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weather} />
          <WeatherForecast data={forecast} />
        </div>
      </div>
    </div>
  );
}
