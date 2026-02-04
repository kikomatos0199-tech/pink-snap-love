interface StyleOption {
  id: string;
  name: string;
  emoji: string;
  category: 'classic' | 'celebration' | 'seasonal' | 'aesthetic';
}

const styles: StyleOption[] = [
  // Classic
  { id: 'polaroid', name: 'Polaroid', emoji: '📷', category: 'classic' },
  { id: 'film', name: 'Film Strip', emoji: '🎞️', category: 'classic' },
  { id: 'instagram', name: 'Instagram', emoji: '📱', category: 'classic' },
  { id: 'modern', name: 'Modern', emoji: '🖼️', category: 'classic' },
  
  // Aesthetic
  { id: 'kawaii', name: 'Kawaii', emoji: '🌸', category: 'aesthetic' },
  { id: 'cuties', name: 'Cuties Pink', emoji: '🎀', category: 'aesthetic' },
  { id: 'neon', name: 'Cyberpunk', emoji: '🌃', category: 'aesthetic' },
  { id: 'retro', name: 'Retro 90s', emoji: '🌈', category: 'aesthetic' },
  { id: 'boho', name: 'Rustic Boho', emoji: '🌾', category: 'aesthetic' },
  { id: 'floral', name: 'Garden Floral', emoji: '🌷', category: 'aesthetic' },
  { id: 'concert', name: 'Rock Concert', emoji: '🎸', category: 'aesthetic' },
  
  // Celebration
  { id: 'wedding', name: 'Wedding', emoji: '💒', category: 'celebration' },
  { id: 'birthday', name: 'Birthday', emoji: '🎂', category: 'celebration' },
  { id: 'graduation', name: 'Graduation', emoji: '🎓', category: 'celebration' },
  { id: 'travel', name: 'Travel', emoji: '✈️', category: 'celebration' },
  { id: 'summer', name: 'Summer Fun', emoji: '🌴', category: 'celebration' },
  { id: 'scrapbook', name: 'Scrapbook', emoji: '📔', category: 'celebration' },
  
  // Seasonal
  { id: 'christmas', name: 'Christmas', emoji: '🎄', category: 'seasonal' },
  { id: 'halloween', name: 'Halloween', emoji: '🎃', category: 'seasonal' },
  { id: 'thanksgiving', name: 'Thanksgiving', emoji: '🦃', category: 'seasonal' },
];

const categoryLabels = {
  classic: '✨ Classic',
  aesthetic: '🎨 Aesthetic',
  celebration: '🎉 Celebration',
  seasonal: '🗓️ Seasonal',
};

interface StyleSelectorProps {
  selected: string;
  onSelect: (style: string) => void;
}

export const StyleSelector = ({ selected, onSelect }: StyleSelectorProps) => {
  const categories = ['classic', 'aesthetic', 'celebration', 'seasonal'] as const;

  return (
    <div className="glass-card rounded-2xl p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <span>🎨</span> Strip Style
      </h3>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category}>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              {categoryLabels[category]}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {styles
                .filter((style) => style.category === category)
                .map((style) => (
                  <button
                    key={style.id}
                    onClick={() => onSelect(style.id)}
                    className={`
                      flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all duration-200
                      ${selected === style.id 
                        ? 'bg-primary text-primary-foreground shadow-soft scale-105' 
                        : 'bg-white/50 text-foreground hover:bg-white/70 hover:scale-102'
                      }
                    `}
                  >
                    <span className="text-lg">{style.emoji}</span>
                    <span className="text-[10px] font-medium leading-tight text-center">{style.name}</span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
