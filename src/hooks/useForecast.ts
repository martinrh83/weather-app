import { weatherApi } from "@/services/ApiWeather";
import { Coordinates } from "@/services/types";
import { useQuery } from "@tanstack/react-query";

export default function useForecast(coordinates: Coordinates | null) {
  const {
    data: forecast,
    error,
    isLoading,
    refetch: refetchForecast,
  } = useQuery({
    queryKey: ["forecast"],
    queryFn: () => (coordinates ? weatherApi.getForecast(coordinates) : null),
    enabled: !!coordinates,
  });

  return { forecast, error, isLoading, refetchForecast };
}
