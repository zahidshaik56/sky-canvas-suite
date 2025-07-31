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
    return <CloudRain className="h-24 w-24 text-blue-300 animate-weather-pulse drop-shadow-2xl" />;
  } else if (conditionLower.includes('cloud')) {
    return <Cloud className="h-24 w-24 text-gray-300 animate-float drop-shadow-2xl" />;
  } else if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
    return <Sun className="h-24 w-24 text-yellow-300 animate-weather-pulse drop-shadow-2xl" />;
  }
  return <Cloud className="h-24 w-24 text-gray-300 animate-float drop-shadow-2xl" />;
};

const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <Card className="glass-card p-10 text-center animate-fade-in relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-white rounded-full animate-bounce-subtle"></div>
      </div>
      
      <div className="relative z-10 space-y-8">
        {/* Location */}
        <div className="animate-slide-in">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            {weather.city}
          </h2>
          <p className="text-white/70 text-lg drop-shadow-md">{weather.country}</p>
        </div>

        {/* Weather Icon */}
        <div className="flex justify-center animate-fade-in" style={{animationDelay: '0.2s'}}>
          {getWeatherIcon(weather.condition)}
        </div>

        {/* Temperature */}
        <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="text-8xl font-bold text-white drop-shadow-2xl mb-2">
            {Math.round(weather.temperature)}°
          </div>
          <p className="text-2xl text-white/80 capitalize drop-shadow-lg">
            {weather.condition}
          </p>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/30 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <div className="flex flex-col items-center space-y-3 hover:scale-105 transition-transform duration-300">
            <Wind className="h-6 w-6 text-white/90 drop-shadow-lg" />
            <span className="text-sm text-white/70">Wind</span>
            <span className="font-bold text-white text-lg">{weather.windSpeed} km/h</span>
          </div>
          
          <div className="flex flex-col items-center space-y-3 hover:scale-105 transition-transform duration-300">
            <Droplets className="h-6 w-6 text-white/90 drop-shadow-lg" />
            <span className="text-sm text-white/70">Humidity</span>
            <span className="font-bold text-white text-lg">{weather.humidity}%</span>
          </div>
          
          <div className="flex flex-col items-center space-y-3 hover:scale-105 transition-transform duration-300">
            <Eye className="h-6 w-6 text-white/90 drop-shadow-lg" />
            <span className="text-sm text-white/70">Visibility</span>
            <span className="font-bold text-white text-lg">{weather.visibility} km</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;