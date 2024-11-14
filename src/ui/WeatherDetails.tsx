import { WeatherData } from "@/services/types";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;
  return <div>WeatherDetails</div>;
};

export default WeatherDetails;
