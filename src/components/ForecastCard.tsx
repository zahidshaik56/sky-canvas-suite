import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudRain } from "lucide-react";

interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  icon: string;
}

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const getWeatherIcon = (condition: string, size = "h-8 w-8") => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return <CloudRain className={`${size} text-blue-300 drop-shadow-lg`} />;
  } else if (conditionLower.includes('cloud')) {
    return <Cloud className={`${size} text-gray-300 drop-shadow-lg`} />;
  } else if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
    return <Sun className={`${size} text-yellow-300 drop-shadow-lg`} />;
  }
  return <Cloud className={`${size} text-gray-300 drop-shadow-lg`} />;
};

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <Card className="glass-card p-8 animate-fade-in relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      
      <h3 className="text-2xl font-bold mb-8 text-white drop-shadow-lg relative z-10">7-Day Forecast</h3>
      
      <div className="space-y-4 relative z-10">
        {forecast.map((day, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-[1.02] group"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="flex items-center space-x-5">
              <div className="weather-icon group-hover:scale-110 transition-transform duration-300">
                {getWeatherIcon(day.condition, "h-10 w-10")}
              </div>
              <div>
                <p className="font-bold text-white text-lg drop-shadow-md">
                  {formatDate(day.date)}
                </p>
                <p className="text-sm text-white/70 capitalize drop-shadow-sm">
                  {day.condition}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex space-x-3 items-center">
                <span className="font-bold text-white text-xl drop-shadow-md">
                  {Math.round(day.maxTemp)}°
                </span>
                <span className="text-white/60 text-lg">
                  {Math.round(day.minTemp)}°
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ForecastCard;