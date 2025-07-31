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
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/20 border-b border-white/30 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={weatherLogo} 
                alt="Weather App" 
                className="h-12 w-12 rounded-full shadow-lg animate-glow"
              />
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                WeatherApp
              </h1>
            </div>
            <Cloud className="h-10 w-10 text-white/80 animate-float drop-shadow-lg" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Search Section */}
          <div className="text-center space-y-8 animate-fade-in">
            <div>
              <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">
                Beautiful Weather
              </h2>
              <p className="text-xl text-white/80 drop-shadow-lg max-w-2xl mx-auto">
                Experience stunning weather forecasts with real-time updates for any city worldwide
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
            <div className="text-center py-20 animate-fade-in">
              <Cloud className="h-20 w-20 text-white mx-auto animate-weather-pulse mb-6 drop-shadow-2xl" />
              <p className="text-2xl text-white/90 drop-shadow-lg">
                Fetching beautiful weather data...
              </p>
              <div className="mt-4 flex justify-center space-x-2">
                <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce-subtle"></div>
                <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce-subtle" style={{animationDelay: '0.2s'}}></div>
                <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce-subtle" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/30 bg-white/10 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-10">
          <div className="text-center">
            <p className="text-white/70 text-lg drop-shadow-md">
              Built with ❤️ using modern web technologies and beautiful design
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
