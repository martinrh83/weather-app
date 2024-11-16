import { Button } from "@/components/ui/button";
import useWeather from "@/hooks/useWeather";
import { Loader2, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FavoriteCityTableProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}
export default function FavoriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityTableProps) {
  const navigate = useNavigate();
  const { weather, isLoading } = useWeather({ lat, lon });
  return (
    <div
      role="button"
      tabIndex={0}
      className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-sm"
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from favorites`);
        }}
      >
        <X className="h-4 w-4" />
      </Button>
      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather.icon}.png`}
              alt={weather.weather.description}
              className="h-8 w-8"
            />
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">
              {weather.sys.country}
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold">{Math.round(weather.main.temp)}</p>
            <p className="text-xs capitalize text-muted-foreground">
              {weather.weather.description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
