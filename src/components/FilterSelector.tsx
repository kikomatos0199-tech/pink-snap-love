interface FilterOption {
  id: string;
  name: string;
  preview: string;
}

const filters: FilterOption[] = [
  { id: 'original', name: 'Original', preview: 'none' },
  { id: 'bw', name: 'B&W', preview: 'grayscale(100%)' },
  { id: 'pink', name: 'Pink Glow', preview: 'saturate(1.2) hue-rotate(-10deg) brightness(1.05)' },
  { id: 'vintage', name: 'Vintage', preview: 'sepia(30%) saturate(1.1) contrast(0.95)' },
  { id: 'warm', name: 'Warm', preview: 'saturate(1.3) sepia(15%) brightness(1.05)' },
  { id: 'neon', name: 'Neon', preview: 'saturate(1.8) contrast(1.2) brightness(1.1)' },
  { id: 'pastel', name: 'Pastel', preview: 'saturate(0.8) brightness(1.1) contrast(0.9)' },
];

interface FilterSelectorProps {
  selected: string;
  onSelect: (filter: string) => void;
}

export const FilterSelector = ({ selected, onSelect }: FilterSelectorProps) => {
  return (
    <div className="glass-card rounded-2xl p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <span>✨</span> Filters
      </h3>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelect(filter.id)}
            className={`
              relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${selected === filter.id 
                ? 'bg-primary text-primary-foreground shadow-soft scale-105' 
                : 'bg-white/50 text-foreground hover:bg-white/70 hover:scale-102'
              }
            `}
          >
            {filter.name}
            {selected === filter.id && (
              <span className="absolute -top-1 -right-1 text-xs">💖</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
