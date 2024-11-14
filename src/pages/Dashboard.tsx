import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import WeatherSkeleton from "../ui/WeatherSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useWeather from "@/hooks/useWeather";
import useForecast from "@/hooks/useForecast";
import useReverseGeo from "@/hooks/useReverseGeocoding";
import CurrentWeather from "@/ui/CurrentWeather";

export default function Dashboard() {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();
  const {
    weather,
    error: weatherApiError,
    isLoading: loadingWeatherData,
    refetchWeather,
  } = useWeather(coordinates);

  const {
    forecast,
    error: forecastApiError,
    isLoading: loadingForecastData,
    refetchForecast,
  } = useForecast(coordinates);

  const {
    reverseGeo,
    error: reverseGeoError,
    isLoading: loadingReverseGeoData,
    refetchReverseGeo,
  } = useReverseGeo(coordinates);

  console.log(reverseGeo);
  function handleRefresh() {
    getLocation();
    refetchForecast();
    refetchWeather();
    refetchReverseGeo();
  }

  if (
    locationLoading ||
    loadingForecastData ||
    loadingReverseGeoData ||
    loadingWeatherData
  )
    return <WeatherSkeleton />;

  if (locationError) {
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{locationError}</p>
        <Button variant="outline" onClick={getLocation} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>;
  }

  if (!coordinates) {
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location required</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Please enable location access to see your weather</p>
        <Button variant="outline" onClick={getLocation} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>;
  }

  if (weatherApiError || forecastApiError) {
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Failed to fetch weather data. Please try again</p>
        <Button variant="outline" onClick={handleRefresh} className="w-fit">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={locationLoading}
        >
          <RefreshCw
            className={`h-4 w-4 ${loadingWeatherData ? "animate=spin" : ""}`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        <div>
          <CurrentWeather data={weather} locationName={reverseGeo[0]} />
        </div>
      </div>
    </div>
  );
}
