import {useEffect, useState} from "react";
import {Slider} from "@/components/ui/slider";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FilterOptions} from "@/models/filter.model.ts";

interface FiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableColors: string[];
}

const Filters = ({onFilterChange, availableColors}: FiltersProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) =>
        prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      colors: selectedColors.length > 0 ? selectedColors : undefined,
      // sortBy: sortBy as 'price-low' | 'price-high',
    });
  };

  const resetFilters = () => {
    setPriceRange([0, 100000000]);
    setSelectedColors([]);
    // setSortBy("newest");
    onFilterChange({});
  };

  return (
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Sort By</h3>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort By"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <Slider
              value={priceRange}
              min={0}
              max={100000000}
              step={1000000}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            {
              priceRange.map((price, index) => (
                  <span key={index}>${price}</span>
              ))
            }
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Color</h3>
          <div className="grid grid-cols-2 gap-2">
            {
              availableColors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                        id={`color-${color}`}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={() => handleColorToggle(color)}
                    />
                    <div className="flex items-center">
                <span
                    className="w-4 h-4 rounded-full mr-2 inline-block border"
                    style={{backgroundColor: color}}
                ></span>
                      <Label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                        {color}
                      </Label>
                    </div>
                  </div>
              ))
            }
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="w-full" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>
  );
};

export default Filters;
