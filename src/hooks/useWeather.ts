import { useQuery } from "@tanstack/react-query";
import { weatherApi } from "@/services/ApiWeather";
import { Coordinates } from "@/services/types";

export default function useWeather(coordinates?: Coordinates | null) {
  const {
    data: weather,
    error,
    isLoading,
    refetch: refetchWeather,
  } = useQuery({
    queryKey: ["getWeather"],
    queryFn: () => {
      if (!coordinates) return null;
      return weatherApi.getCurrentWeather(coordinates);
    },
    enabled: !!coordinates,
  });

  return { weather, error, isLoading, refetchWeather };
}
