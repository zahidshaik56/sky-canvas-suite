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
    <Card className="glass-card p-6 animate-slide-in">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-10 h-12 bg-white/50 border-white/30 placeholder:text-muted-foreground/70"
            disabled={isLoading}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        
        <Button 
          type="submit" 
          size="lg"
          disabled={isLoading || !city.trim()}
          className="px-6"
        >
          Search
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onLocationSearch}
          disabled={isLoading}
          className="px-4 bg-white/50 border-white/30 hover:bg-white/70"
        >
          <MapPin className="h-5 w-5" />
        </Button>
      </form>
    </Card>
  );
};

export default SearchBar;