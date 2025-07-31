import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye } from "lucide-react";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: string;
}

interface WeatherCardProps {
  weather: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return <CloudRain className="h-16 w-16 text-weather-rainy animate-weather-pulse" />;
  } else if (conditionLower.includes('cloud')) {
    return <Cloud className="h-16 w-16 text-weather-cloudy animate-float" />;
  } else if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
    return <Sun className="h-16 w-16 text-weather-sunny animate-weather-pulse" />;
  }
  return <Cloud className="h-16 w-16 text-weather-cloudy animate-float" />;
};

const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <Card className="glass-card p-8 text-center animate-fade-in">
      <div className="space-y-6">
        {/* Location */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {weather.city}
          </h2>
          <p className="text-muted-foreground">{weather.country}</p>
        </div>

        {/* Weather Icon */}
        <div className="flex justify-center">
          {getWeatherIcon(weather.condition)}
        </div>

        {/* Temperature */}
        <div>
          <div className="text-6xl font-bold text-primary">
            {Math.round(weather.temperature)}°
          </div>
          <p className="text-xl text-muted-foreground capitalize">
            {weather.condition}
          </p>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/30">
          <div className="flex flex-col items-center space-y-2">
            <Wind className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Wind</span>
            <span className="font-semibold">{weather.windSpeed} km/h</span>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <Droplets className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Humidity</span>
            <span className="font-semibold">{weather.humidity}%</span>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <Eye className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Visibility</span>
            <span className="font-semibold">{weather.visibility} km</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;