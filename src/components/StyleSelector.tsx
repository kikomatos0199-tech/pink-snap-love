interface StyleOption {
  id: string;
  name: string;
  emoji: string;
}

const styles: StyleOption[] = [
  { id: 'polaroid', name: 'Polaroid', emoji: '📷' },
  { id: 'film', name: 'Film Strip', emoji: '🎞️' },
  { id: 'instagram', name: 'Instagram', emoji: '📱' },
  { id: 'scrapbook', name: 'Scrapbook', emoji: '📔' },
  { id: 'modern', name: 'Modern', emoji: '🖼️' },
  { id: 'retro', name: 'Retro 90s', emoji: '🌈' },
  { id: 'kawaii', name: 'Kawaii', emoji: '🌸' },
  { id: 'wedding', name: 'Wedding', emoji: '💒' },
];

interface StyleSelectorProps {
  selected: string;
  onSelect: (style: string) => void;
}

export const StyleSelector = ({ selected, onSelect }: StyleSelectorProps) => {
  return (
    <div className="glass-card rounded-2xl p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <span>🎨</span> Strip Style
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={`
              flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200
              ${selected === style.id 
                ? 'bg-primary text-primary-foreground shadow-soft scale-105' 
                : 'bg-white/50 text-foreground hover:bg-white/70 hover:scale-102'
              }
            `}
          >
            <span className="text-xl">{style.emoji}</span>
            <span className="text-xs font-medium">{style.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
