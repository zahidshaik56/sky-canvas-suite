import { useEffect } from "react";
import { Cloud } from "lucide-react";
import WeatherCard from "@/components/WeatherCard";
import SearchBar from "@/components/SearchBar";
import ForecastCard from "@/components/ForecastCard";
import { useWeather } from "@/hooks/useWeather";
import weatherLogo from "@/assets/weather-logo.png";

const Index = () => {
  const { weather, forecast, isLoading, searchWeather, searchByLocation } = useWeather();

  useEffect(() => {
    // Load default weather for London on initial load
    searchWeather("London");
  }, [searchWeather]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={weatherLogo} 
                alt="Weather App" 
                className="h-10 w-10 rounded-full"
              />
              <h1 className="text-2xl font-bold text-foreground">
                WeatherApp
              </h1>
            </div>
            <Cloud className="h-8 w-8 text-primary animate-float" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Search Section */}
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">
                Beautiful Weather
              </h2>
              <p className="text-xl text-muted-foreground">
                Get real-time weather updates for any city worldwide
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                onSearch={searchWeather}
                onLocationSearch={searchByLocation}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Weather Display */}
          {weather && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Current Weather */}
              <div className="lg:col-span-2">
                <WeatherCard weather={weather} />
              </div>

              {/* Forecast */}
              <div>
                <ForecastCard forecast={forecast} />
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !weather && (
            <div className="text-center py-16">
              <Cloud className="h-16 w-16 text-primary mx-auto animate-weather-pulse mb-4" />
              <p className="text-xl text-muted-foreground">
                Fetching weather data...
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/20 bg-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              Built with modern web technologies and OpenWeather API
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
