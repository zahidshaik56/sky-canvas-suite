import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

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

interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  icon: string;
}

// Mock data for demonstration - replace with actual API integration
const mockWeatherData: WeatherData = {
  city: "London",
  country: "United Kingdom",
  temperature: 22,
  condition: "partly cloudy",
  humidity: 65,
  windSpeed: 15,
  visibility: 10,
  icon: "partly-cloudy-day"
};

const mockForecastData: ForecastDay[] = [
  { date: new Date().toISOString(), maxTemp: 22, minTemp: 15, condition: "partly cloudy", icon: "partly-cloudy-day" },
  { date: new Date(Date.now() + 86400000).toISOString(), maxTemp: 25, minTemp: 18, condition: "sunny", icon: "clear-day" },
  { date: new Date(Date.now() + 172800000).toISOString(), maxTemp: 20, minTemp: 12, condition: "rainy", icon: "rain" },
  { date: new Date(Date.now() + 259200000).toISOString(), maxTemp: 23, minTemp: 16, condition: "cloudy", icon: "cloudy" },
  { date: new Date(Date.now() + 345600000).toISOString(), maxTemp: 24, minTemp: 17, condition: "sunny", icon: "clear-day" },
  { date: new Date(Date.now() + 432000000).toISOString(), maxTemp: 21, minTemp: 14, condition: "partly cloudy", icon: "partly-cloudy-day" },
  { date: new Date(Date.now() + 518400000).toISOString(), maxTemp: 26, minTemp: 19, condition: "sunny", icon: "clear-day" },
];

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const searchWeather = useCallback(async (city: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - replace with actual OpenWeather API call
      const weatherData = {
        ...mockWeatherData,
        city: city,
        temperature: Math.floor(Math.random() * 30) + 5 // Random temp between 5-35°C
      };
      
      setWeather(weatherData);
      setForecast(mockForecastData);
      
      toast({
        title: "Weather Updated",
        description: `Showing weather for ${city}`,
      });
    } catch (err) {
      const errorMessage = "Failed to fetch weather data. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const searchByLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by this browser.");
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // Simulate API call with coordinates
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const weatherData = {
        ...mockWeatherData,
        city: "Your Location",
        temperature: Math.floor(Math.random() * 30) + 5
      };
      
      setWeather(weatherData);
      setForecast(mockForecastData);
      
      toast({
        title: "Location Found",
        description: "Showing weather for your current location",
      });
    } catch (err) {
      const errorMessage = "Failed to get your location. Please allow location access or search manually.";
      setError(errorMessage);
      toast({
        title: "Location Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    weather,
    forecast,
    isLoading,
    error,
    searchWeather,
    searchByLocation
  };
};