import { weatherApi } from "@/services/ApiWeather";
import { useQuery } from "@tanstack/react-query";

function useLocationSearch(query: string) {
  const {
    data: locationSearchData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["location-search", query],
    queryFn: () => weatherApi.searchLocations(query),
    enabled: query.length >= 3,
  });

  return { locationSearchData, error, isLoading };
}

export default useLocationSearch;
