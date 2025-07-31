import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSearch: () => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, onLocationSearch, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <Card className="glass-card p-8 animate-slide-in relative overflow-hidden">
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 shimmer"></div>
      
      <form onSubmit={handleSubmit} className="flex gap-4 relative z-10">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-12 h-14 bg-white/30 border-white/40 placeholder:text-white/70 text-white text-lg font-medium backdrop-blur-sm focus:bg-white/40 transition-all duration-300"
            disabled={isLoading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/80" />
        </div>
        
        <Button 
          type="submit" 
          size="lg"
          disabled={isLoading || !city.trim()}
          className="px-8 h-14 bg-white/20 hover:bg-white/30 text-white border-white/40 backdrop-blur-sm transition-all duration-300 font-semibold text-lg"
        >
          Search
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onLocationSearch}
          disabled={isLoading}
          className="px-5 h-14 bg-white/20 border-white/40 hover:bg-white/30 text-white backdrop-blur-sm transition-all duration-300"
        >
          <MapPin className="h-6 w-6" />
        </Button>
      </form>
    </Card>
  );
};

export default SearchBar;