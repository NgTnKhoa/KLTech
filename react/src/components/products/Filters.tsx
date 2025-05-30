import {useEffect, useState} from "react";
import {FilterOptions} from "@/types";
import {Slider} from "@/components/ui/slider";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface FiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableColors: { name: string; value: string }[];
}

const Filters = ({onFilterChange, availableColors}: FiltersProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
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
      sortBy: sortBy as any,
    });
  };

  const resetFilters = () => {
    setPriceRange([0, 200]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy("newest");
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
              max={200}
              step={10}
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
                  <div key={color.name} className="flex items-center space-x-2">
                    <Checkbox
                        id={`color-${color.name}`}
                        checked={selectedColors.includes(color.name)}
                        onCheckedChange={() => handleColorToggle(color.name)}
                    />
                    <div className="flex items-center">
                <span
                    className="w-4 h-4 rounded-full mr-2 inline-block border"
                    style={{backgroundColor: color.value}}
                ></span>
                      <Label htmlFor={`color-${color.name}`} className="text-sm cursor-pointer">
                        {color.name}
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
