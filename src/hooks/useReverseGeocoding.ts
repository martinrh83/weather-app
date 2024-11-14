import { weatherApi } from "@/services/ApiWeather";
import { Coordinates } from "@/services/types";
import { useQuery } from "@tanstack/react-query";

export default function useReverseGeo(coordinates: Coordinates | null) {
  const {
    data: reverseGeo,
    error,
    isLoading,
    refetch: refetchReverseGeo,
  } = useQuery({
    queryKey: ["reverseGeo"],
    queryFn: () =>
      coordinates ? weatherApi.reverseGeocode(coordinates) : null,
    enabled: !!coordinates,
  });

  return { reverseGeo, error, isLoading, refetchReverseGeo };
}
