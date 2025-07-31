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
    return <CloudRain className={`${size} text-weather-rainy`} />;
  } else if (conditionLower.includes('cloud')) {
    return <Cloud className={`${size} text-weather-cloudy`} />;
  } else if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
    return <Sun className={`${size} text-weather-sunny`} />;
  }
  return <Cloud className={`${size} text-weather-cloudy`} />;
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
    <Card className="glass-card p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-6 text-foreground">7-Day Forecast</h3>
      
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 rounded-xl bg-white/30 hover:bg-white/40 smooth-transition"
          >
            <div className="flex items-center space-x-4">
              <div className="weather-icon">
                {getWeatherIcon(day.condition)}
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {formatDate(day.date)}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {day.condition}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex space-x-2">
                <span className="font-semibold text-foreground">
                  {Math.round(day.maxTemp)}°
                </span>
                <span className="text-muted-foreground">
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